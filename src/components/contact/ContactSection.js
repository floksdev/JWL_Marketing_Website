// components/ContactSection.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

const GOLD = '#E8C88F';

export default function ContactSection({
  title = 'Formulaire de contact',
  illustration = 'https://www.dropbox.com/scl/fi/i3qdmowrp0btkfln1drdp/5-contact-marketing-jwl-marketing.png?rlkey=cycksjnttfzux5s2buso772qz&st=0p5nbrhg&raw=1', // tu remplaceras
}) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [err, setErr] = useState('');
  const [consent, setConsent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setOk(false);
    setSuccessMessage('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    // honeypot
    if (fd.get('website')) return;

    // validations simples
    if (!fd.get('nom') || !fd.get('prenom') || !fd.get('email') || !fd.get('message')) {
      setErr('Merci de compléter les champs obligatoires.');
      return;
    }
    if (!consent) {
      setErr('Merci d’accepter le traitement de vos données.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Impossible d’envoyer votre message.');
      }
      setOk(true);
      setSuccessMessage(data?.message || 'Merci ! Votre message a bien été envoyé. Un e-mail de confirmation vient de vous être adressé.');
      form.reset();
      setConsent(false);
    } catch (e_) {
      setErr(e_?.message || 'Oups, l’envoi a échoué. Merci de réessayer ou contactez service@jwl-marketing.fr.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Titre + séparateur */}
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{title}</h2>
      <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        {/* Illustration à gauche (ou remplace par ton image dédiée) */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative -rotate-1 md:-rotate-2 transition hover:rotate-0">
            <div className="relative w-[260px] sm:w-[300px] md:w-[340px] overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/10">
              <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                <Image
                  src={illustration}
                  alt="Illustration formulaire"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 340px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nom *" name="nom" autoComplete="family-name" />
            <Field label="Prénom *" name="prenom" autoComplete="given-name" />
          </div>

          <Field type="email" label="E-mail *" name="email" placeholder="vous@exemple.com" autoComplete="email" />
          <Field label="Fonction" name="fonction" />
          <Field label="Entreprise" name="entreprise" autoComplete="organization" />
          <Field label="Objet" name="objet" />

          <Textarea label="Message *" name="message" rows={6} />

          {/* Honeypot (ne pas retirer) */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Consentement RGPD */}
          <label className="mt-2 flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <span className="text-sm text-neutral-700">
              J’autorise JWL Marketing à utiliser ces informations pour me répondre. Mes données ne seront ni vendues ni partagées.
            </span>
          </label>

          {/* Feedback */}
          {err && <p className="text-sm text-red-600">{err}</p>}
          {ok && (
            <p className="text-sm text-green-700">
              {successMessage || 'Merci ! Votre message a bien été envoyé. Un e-mail de confirmation vient de vous être adressé.'}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Spinner />
                  Envoi en cours…
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowIcon />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            * champs obligatoires — un e-mail automatique de bonne réception vous sera envoyé.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ---------- sous-composants champs ---------- */
function Field({ label, name, type = 'text', autoComplete, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-900">{label}</span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] shadow-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
      />
    </label>
  );
}

function Textarea({ label, name, rows = 5 }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-900">{label}</span>
      <textarea
        name={name}
        rows={rows}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
      />
    </label>
  );
}

/* ---------- icônes ---------- */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z" />
    </svg>
  );
}
