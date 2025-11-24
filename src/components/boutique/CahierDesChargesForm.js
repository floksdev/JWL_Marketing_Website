'use client';

import { createContext, useContext, useMemo, useRef, useState } from 'react';

const FormValuesContext = createContext({ values: {}, disabled: false });

function useFormValues() {
  return useContext(FormValuesContext);
}

const SECTION_DEFS = [
  { id: 'audit-seo', title: '1. Audit SEO' },
  { id: 'refonte-web', title: '2. Refonte Web' },
  { id: 'branding-logo', title: '3. Visual Branding & Logo' },
  { id: 'social-media', title: '4. Social Media & Rédaction Web' },
  { id: 'business-dev', title: '5. Développement Commercial' },
  { id: 'formation', title: '6. Formation' },
  { id: 'google-my-business', title: '7. Google My Business' },
];

const TOTAL_STEPS = 1 + SECTION_DEFS.length;

export default function CahierDesChargesForm({
  orderId,
  accessToken,
  canEdit = false,
  initialResponses = {},
  initialStatuses = {},
  status = 'progress',
  onAfterSave,
}) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const formRef = useRef(null);
  const initialStatusMap = useMemo(() => {
    const map = {};
    SECTION_DEFS.forEach((section) => {
      map[section.id] = initialStatuses?.[section.id] ?? 'todo';
    });
    return map;
  }, [initialStatuses]);
  const [sectionsStatus, setSectionsStatus] = useState(initialStatusMap);

  const handleSectionStatus = (sectionId, nextValue) => {
    setSectionsStatus((prev) => ({
      ...prev,
      [sectionId]: nextValue,
    }));
  };

  const collectFormData = () => {
    const payload = {};
    if (!formRef.current) return payload;
    const formData = new FormData(formRef.current);
    for (const [key, value] of formData.entries()) {
      if (payload[key]) {
        if (Array.isArray(payload[key])) {
          payload[key].push(value);
        } else {
          payload[key] = [payload[key], value];
        }
      } else {
        payload[key] = value;
      }
    }
    return payload;
  };

  const computeOverallStatus = (map) => {
    return SECTION_DEFS.every((section) => map[section.id] === 'done') ? 'done' : 'progress';
  };

  const saveToServer = async (overrides = {}, forcedStatus) => {
    if (!orderId || !accessToken) return;
    setSaving(true);
    setFeedback(null);
    try {
      const mergedStatus = { ...sectionsStatus, ...overrides };
      const payload = collectFormData();
      const nextStatus = forcedStatus || computeOverallStatus(mergedStatus);

      const response = await fetch(`/api/orders/${orderId}/form`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload,
          sections: mergedStatus,
          status: nextStatus,
          accessToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Impossible d’enregistrer le formulaire.');
      }

      const data = await response.json();
      setSectionsStatus(data?.form?.form_sections ?? mergedStatus);
      setFeedback('Formulaire enregistré.');
      onAfterSave?.(data?.form?.form_status ?? nextStatus);
      return data?.form?.form_status ?? nextStatus;
    } catch (error) {
      setFeedback(error.message || 'Erreur inattendue.');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleValidateSection = (sectionId) => {
    if (!canEdit) return;
    const overrides = { [sectionId]: 'done' };
    handleSectionStatus(sectionId, 'done');
    saveToServer(overrides);
  };

  const handleReopenSection = (sectionId) => {
    if (!canEdit) return;
    const overrides = { [sectionId]: 'progress' };
    handleSectionStatus(sectionId, 'progress');
    saveToServer(overrides);
  };

  const renderSection = (section) => {
    switch (section.id) {
      case 'audit-seo':
        return (
          <Accordion
            title="1. Audit SEO"
            status={sectionsStatus['audit-seo']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('audit-seo')}
            onReopen={() => handleReopenSection('audit-seo')}
            onInteract={() => handleSectionStatus('audit-seo', 'progress')}
          >
            <CheckboxGroup
              label="Sous-packs"
              name="audit-seo-packs"
              options={['Pack SEO', 'Booster SEO', 'SEO Local']}
              columns={3}
            />
            <CheckboxGroup
              label="Objectifs principaux"
              name="audit-seo-objectifs"
              options={["Augmenter le trafic", "Améliorer la visibilité locale", "Convertir plus de visiteurs"]}
            />
            <CheckboxGroup
              label="Priorités spécifiques"
              name="audit-seo-priorites"
              options={["Pages optimisées", "Mots-clés concurrents"]}
            />
            <RadioGroup
              label="Actions SEO déjà mises en place"
              name="audit-seo-actions"
              options={[{ label: 'Oui', value: 'oui' }, { label: 'Non', value: 'non' }]}
            />
            <CheckboxGroup
              label="Outils utilisés"
              name="audit-seo-outils"
              options={["Google Analytics", "Search Console"]}
              includeOther
            />
            <CheckboxGroup
              label="CMS utilisé"
              name="audit-seo-cms"
              options={["WordPress", "Wix", "Shopify", "Sur-mesure"]}
              columns={2}
            />
            <Textarea label="Quels mots-clés stratégiques souhaitez-vous cibler ?" name="audit-seo-keywords" />
            <Textarea label="Pages déjà optimisées et contenus existants" name="audit-seo-pages" />
            <Textarea label="Analyse de la concurrence" name="audit-seo-competitors" />
            <Textarea label="Indicateurs de performance actuels (visites, taux de rebond, conversions…)" name="audit-seo-kpi" />
            <RadioGroup
              label="Optimisation Google My Business déjà réalisée ?"
              name="audit-seo-gmb"
              options={[{ label: 'Oui', value: 'oui' }, { label: 'Non', value: 'non' }]}
            />
            <Textarea label="Cible et audience du site" name="audit-seo-audience" />
            <Textarea label="Problématiques clients à résoudre" name="audit-seo-problems" />
            <Textarea label="Contraintes techniques, juridiques ou budgétaires" name="audit-seo-contraintes" />
            <Textarea label="Ressources internes disponibles (rédacteurs, développeurs…)" name="audit-seo-ressources" />
            <Textarea label="Attentes de la collaboration (ponctuelle ou long terme ?)" name="audit-seo-collaboration" />
            <Textarea label="Fréquence et mode de contact souhaités" name="audit-seo-contact" />
          </Accordion>
        );
      case 'refonte-web':
        return (
          <Accordion
            title="2. Refonte Web"
            status={sectionsStatus['refonte-web']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('refonte-web')}
            onReopen={() => handleReopenSection('refonte-web')}
            onInteract={() => handleSectionStatus('refonte-web', 'progress')}
          >
            <CheckboxGroup
              label="Type de site actuel"
              name="refonte-site-type"
              options={["Vitrine", "E-commerce", "Blog", "Autre"]}
            />
            <CheckboxGroup
              label="Objectifs principaux"
              name="refonte-objectifs"
              options={["Améliorer l’UX", "Générer des leads", "Vendre en ligne", "Optimiser le SEO"]}
            />
            <Textarea label="Fonctionnalités spécifiques souhaitées (formulaire, paiement, chat…)" name="refonte-fonctionnalites" />
            <Textarea label="Sites de référence inspirants" name="refonte-inspirations" />
            <Textarea label="Contraintes techniques et budget" name="refonte-contraintes" />
            <Textarea label="Ressources internes disponibles" name="refonte-ressources" />
          </Accordion>
        );
      case 'branding-logo':
        return (
          <Accordion
            title="3. Visual Branding & Logo"
            status={sectionsStatus['branding-logo']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('branding-logo')}
            onReopen={() => handleReopenSection('branding-logo')}
            onInteract={() => handleSectionStatus('branding-logo', 'progress')}
          >
            <RadioGroup
              label="Charte graphique existante"
              name="branding-charte"
              options={[{ label: 'Oui', value: 'oui' }, { label: 'Non', value: 'non' }]}
            />
            <CheckboxGroup
              label="Style recherché"
              name="branding-style"
              options={["Moderne", "Minimaliste", "Classique", "Fun", "Autre"]}
            />
            <Textarea label="Couleurs préférées / à éviter" name="branding-colors" />
            <Textarea label="Inspirations visuelles" name="branding-inspirations" />
            <Textarea label="Message ou image à transmettre" name="branding-message" />
            <Textarea label="Supports à créer (logo, carte de visite, papeterie, goodies…)" name="branding-supports" />
          </Accordion>
        );
      case 'social-media':
        return (
          <Accordion
            title="4. Social Media & Rédaction Web"
            status={sectionsStatus['social-media']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('social-media')}
            onReopen={() => handleReopenSection('social-media')}
            onInteract={() => handleSectionStatus('social-media', 'progress')}
          >
            <CheckboxGroup
              label="Réseaux utilisés"
              name="social-reseaux"
              options={["Facebook", "Instagram", "LinkedIn", "TikTok", "Autre"]}
            />
            <CheckboxGroup
              label="Objectifs"
              name="social-objectifs"
              options={["Augmenter la visibilité", "Développer la communauté", "Générer du trafic", "Améliorer l’image de marque"]}
            />
            <Textarea label="Ton et style de communication souhaités" name="social-ton" />
            <Textarea label="Thématiques prioritaires pour les contenus" name="social-thematiques" />
            <Textarea label="Contenus existants à valoriser" name="social-contenus" />
            <Textarea label="Indicateurs de performance souhaités" name="social-kpi" />
          </Accordion>
        );
      case 'business-dev':
        return (
          <Accordion
            title="5. Développement Commercial"
            status={sectionsStatus['business-dev']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('business-dev')}
            onReopen={() => handleReopenSection('business-dev')}
            onInteract={() => handleSectionStatus('business-dev', 'progress')}
          >
            <CheckboxGroup
              label="Type de client cible"
              name="biz-client-type"
              options={["B2B", "B2C", "Les deux"]}
            />
            <CheckboxGroup
              label="Objectifs"
              name="biz-objectifs"
              options={["Générer des leads", "Fidéliser les clients", "Organisation salons / événements", "Prise de rendez-vous"]}
            />
            <Textarea label="Organisation / modalités souhaitées" name="biz-organisation" />
            <Textarea label="Durée et déroulé des actions" name="biz-duree" />
            <Textarea label="Niveau actuel de développement commercial" name="biz-niveau" />
            <Textarea label="Indicateurs de succès / KPI (taux de participation, rendez-vous générés…)" name="biz-kpi" />
            <Textarea label="Contraintes et particularités (dates, horaires, langues, outils internes)" name="biz-contraintes" />
            <Textarea label="Besoins spécifiques liés à vos activités" name="biz-besoins" />
          </Accordion>
        );
      case 'formation':
        return (
          <Accordion
            title="6. Formation"
            status={sectionsStatus['formation']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('formation')}
            onReopen={() => handleReopenSection('formation')}
            onInteract={() => handleSectionStatus('formation', 'progress')}
          >
            <CheckboxGroup
              label="Thématiques souhaitées"
              name="formation-thematiques"
              options={["Prospection", "Négociation", "Réseaux sociaux", "Rédaction web", "Autre"]}
            />
            <CheckboxGroup
              label="Public visé"
              name="formation-public"
              options={["Débutant", "Intermédiaire", "Avancé"]}
            />
            <CheckboxGroup
              label="Format"
              name="formation-format"
              options={["Présentiel", "Distanciel", "Mixte"]}
            />
            <Textarea label="Objectifs précis et indicateurs de progression" name="formation-objectifs" />
            <Textarea label="Contraintes organisationnelles" name="formation-contraintes" />
          </Accordion>
        );
      case 'google-my-business':
        return (
          <Accordion
            title="7. Google My Business"
            status={sectionsStatus['google-my-business']}
            disabled={!canEdit}
            onComplete={() => handleValidateSection('google-my-business')}
            onReopen={() => handleReopenSection('google-my-business')}
            onInteract={() => handleSectionStatus('google-my-business', 'progress')}
          >
            <CheckboxGroup
              label="Objectifs"
              name="gmb-objectifs"
              options={[
                'Nouvelle entreprise',
                'Changement d’entreprise / rebranding',
                'Améliorer la visibilité locale',
                'Augmenter les avis clients',
                'Mettre à jour les informations',
                'Autre',
              ]}
            />
            <Textarea label="Souhaitez-vous qu’un prestataire s’occupe de la fiche chaque mois ?" name="gmb-gestion" />
            <Textarea label="Ou préférez-vous une mise à jour ponctuelle et gérer le reste en interne ?" name="gmb-interne" />
            <Textarea label="Informations complémentaires / remarques" name="gmb-informations" />
            <Textarea label="Services ou produits à mettre en avant" name="gmb-services" />
            <Textarea label="Promotions ou événements à intégrer" name="gmb-promotions" />
            <p className="text-sm text-neutral-600">
              À savoir : JWL Marketing propose également des plaques Google My Business pour vos comptoirs, salons ou locaux afin d’inciter vos clients à laisser des avis.
            </p>
          </Accordion>
        );
      default:
        return null;
    }
  };

  const handleStepNavigate = async (direction) => {
    if (!canEdit) {
      setStep((prev) => {
        const next = prev + direction;
        if (next < 1) return 1;
        if (next > TOTAL_STEPS) return TOTAL_STEPS;
        return next;
      });
      return;
    }
    try {
      await saveToServer();
    } catch (error) {
      // feedback already set in saveToServer
    }
    setStep((prev) => {
      const next = prev + direction;
      if (next < 1) return 1;
      if (next > TOTAL_STEPS) return TOTAL_STEPS;
      return next;
    });
  };

  const handleFinish = async () => {
    if (!canEdit) return;
    const overrides = SECTION_DEFS.reduce((acc, section) => {
      acc[section.id] = 'done';
      return acc;
    }, {});
    try {
      await saveToServer(overrides, 'done');
    } catch (error) {
      // error handled by saveToServer
    }
  };

  const renderStepOne = () => (
    <div>
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Cahier des charges – JWL Marketing</p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Fiche client / Projet</h2>
        <p className="mt-4 text-sm leading-6 text-neutral-700">
          Remplissez ce cahier des charges pour préciser vos objectifs marketing, le contexte de l’entreprise et les outils déjà en place.
          Les informations restent modifiables à tout moment avant notre rendez-vous en visio.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Présentation du projet</p>
          <Input label="Nom du projet" name="project-name" />
          <Input label="Objectif principal" name="project-goal" />
          <Input label="Site Internet / URL" name="project-url" type="url" placeholder="https://" />
          <Input label="Date de livraison souhaitée" name="project-date" type="date" />
          <Input label="Budget estimé" name="project-budget" placeholder="€" />
          <Textarea label="Bref descriptif du projet" name="project-description" rows={4} />
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Présentation du client</p>
          <Input label="Nom de l’entreprise" name="client-company" />
          <Input label="Activité / Secteur" name="client-activity" />
          <Input label="Cible / Audience" name="client-audience" />
          <Input label="Localisation" name="client-location" />
          <Input label="Personne de contact (Nom / Prénom / Fonction / Service)" name="client-contact" />
          <Input label="Email / Téléphone" name="client-contact-details" />
          <Input label="Référence interne / collaboration précédente" name="client-reference" />
        </div>
      </div>

      <p className="mt-6 text-sm italic text-neutral-700">
        Ce cahier des charges a pour objectif de mieux cerner vos attentes, comprendre le contexte de votre entreprise et vos ambitions de croissance commerciale,
        ainsi que les actions et outils que vous avez déjà mis en place. Merci de le remplir avec le plus de précision possible avant le rendez-vous en visio.
      </p>
    </div>
  );

  return (
    <FormValuesContext.Provider value={{ values: initialResponses, disabled: !canEdit }}>
      <form ref={formRef} className="space-y-6">
        <div className={step === 1 ? 'block' : 'hidden'}>{renderStepOne()}</div>
        {SECTION_DEFS.map((section, index) => (
          <div key={section.id} className={step === index + 2 ? 'block' : 'hidden'}>
            {renderSection(section)}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={async () => {
              if (step === 1) return;
              await handleStepNavigate(-1);
            }}
            disabled={step === 1 || saving}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-transparent"
          >
            ← Retour
          </button>
          <p className="text-sm text-neutral-600">Page {step} / {TOTAL_STEPS}</p>
          {step === TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleFinish}
              disabled={!canEdit || saving}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {saving ? 'Enregistrement…' : 'Terminer'}
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await handleStepNavigate(1);
              }}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              Suivant →
            </button>
          )}
        </div>

        {feedback ? (
          <p className="text-sm text-neutral-600">{feedback}</p>
        ) : null}
      </form>
    </FormValuesContext.Provider>
  );
}

function Accordion({ title, status, disabled, onComplete, onReopen, onInteract, children }) {
  return (
    <details className="group rounded-2xl border border-black/10 bg-neutral-50" open>
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
        <span className="text-lg font-semibold text-neutral-900">{title}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(status)}`}>{statusLabel(status)}</span>
      </summary>
      <div
        className="space-y-4 border-t border-black/10 px-4 py-4"
        onChange={onInteract}
        onInput={onInteract}
      >
        {children}
        {disabled ? null : (
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            {status === 'done' ? (
              <button
                type="button"
                onClick={onReopen}
                className="rounded-full border border-neutral-900 px-4 py-1.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Modifier
              </button>
            ) : (
              <button
                type="button"
                onClick={onComplete}
                className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Marquer comme validé
              </button>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

function statusStyle(value) {
  switch (value) {
    case 'done':
      return 'bg-emerald-100 text-emerald-700';
    case 'progress':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-neutral-100 text-neutral-600';
  }
}

function statusLabel(value) {
  switch (value) {
    case 'done':
      return 'Terminé';
    case 'progress':
      return 'En cours';
    default:
      return 'À faire';
  }
}

function Input({ label, name, type = 'text', ...props }) {
  const { values, disabled } = useFormValues();
  const defaultValue = values?.[name] ?? '';
  return (
    <label className="block text-sm">
      <span className="text-neutral-700">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none disabled:bg-neutral-100"
        {...props}
      />
    </label>
  );
}

function Textarea({ label, name, rows = 3 }) {
  const { values, disabled } = useFormValues();
  const defaultValue = values?.[name] ?? '';
  return (
    <label className="block text-sm">
      <span className="text-neutral-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none disabled:bg-neutral-100"
      />
    </label>
  );
}

function CheckboxGroup({ label, name, options, columns = 2, includeOther = false }) {
  const { values, disabled } = useFormValues();
  const stored = values?.[name];
  const isChecked = (value) => {
    if (Array.isArray(stored)) {
      return stored.includes(value);
    }
    return stored === value;
  };

  return (
    <div className="text-sm">
      <p className="font-semibold text-neutral-800">{label}</p>
      <div className={`mt-2 grid gap-2 ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const text = typeof option === 'string' ? option : option.label;
          return (
            <label key={value} className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-neutral-700 hover:border-black/10">
              <input
                type="checkbox"
                name={name}
                value={value}
                defaultChecked={isChecked(value)}
                disabled={disabled}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span>{text}</span>
            </label>
          );
        })}
      </div>
      {includeOther ? (
        <input
          type="text"
          name={`${name}-autre`}
          placeholder="Autre"
          defaultValue={values?.[`${name}-autre`] ?? ''}
          disabled={disabled}
          className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none disabled:bg-neutral-100"
        />
      ) : null}
    </div>
  );
}

function RadioGroup({ label, name, options }) {
  const { values, disabled } = useFormValues();
  const stored = values?.[name] ?? null;
  return (
    <div className="text-sm">
      <p className="font-semibold text-neutral-800">{label}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-neutral-700 hover:border-black/10">
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={stored === option.value}
              disabled={disabled}
              className="text-neutral-900 focus:ring-neutral-900"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
