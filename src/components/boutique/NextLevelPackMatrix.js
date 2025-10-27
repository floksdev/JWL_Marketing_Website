'use client';

import { useState } from 'react';
import Link from 'next/link';

const GOLD = '#E8C88F';

export default function NextLevelPackMatrix({
  title = 'Comparer les packs',          // titre section (affiché)
  rows = [],                              // [{ label, href?, price, items[], sub?, note?, badge?, highlight?, cta? }]
  note,                                   // texte en bas
  accentColor = GOLD,                     // couleur d’accent
  className = '',
}) {
  const sectionClassName = ['', className].filter(Boolean).join(' ');

  return (
    <section className={sectionClassName}>
      {/* Titre (tu peux passer title="" si tu ne veux rien) */}
      {title ? (
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
          <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: accentColor }} />
        </div>
      ) : null}

      {/* Table wrapper (sans en-tête) */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_6px_30px_rgba(0,0,0,.06)] ring-1 ring-black/10">
        <div className="divide-y divide-black/5">
          {rows.map((r, i) => (
            <Row key={`${r.label}-${i}`} row={r} index={i} accentColor={accentColor} />
          ))}
        </div>

        {/* footer bar */}
        <div className="h-[3px] w-full" style={{ backgroundColor: accentColor }} />
      </div>

      {note ? <p className="mt-3 text-sm text-neutral-600">{note}</p> : null}
    </section>
  );
}

/* ---------- Row (desktop + mobile) ---------- */

function Row({ row, index, accentColor }) {
  const [open] = useState(false); // hook conservé si tu veux ajouter des sections pliables plus tard

  return (
    <>
      {/* DESKTOP */}
      <div
        className="hidden md:grid md:grid-cols-[240px,220px,1fr] items-stretch group relative"
        style={{ background: index % 2 ? 'white' : 'rgba(0,0,0,.015)' }}
      >
        {/* accent left when highlight */}
        {row.highlight ? (
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[6px] rounded-tr-lg rounded-br-lg"
            style={{ backgroundColor: accentColor }}
          />
        ) : null}

        {/* PACK (bande taupe légère) */}
        <div
          className="relative p-5 border-r border-black/5 bg-[rgba(186,151,134,.12)]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.04)' }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="text-neutral-900 font-semibold leading-6">
              {row.href ? (
                <Link
                  href={row.href}
                  className="underline decoration-2 underline-offset-[6px] hover:text-neutral-700"
                >
                  {row.label}
                </Link>
              ) : (
                row.label
              )}
            </div>
            {row.badge ? <Badge text={row.badge} /> : null}
          </div>
          {row.sub ? <div className="mt-1 text-[12.5px] text-neutral-600">{row.sub}</div> : null}
        </div>

        {/* PRICE + CTA */}
        <div className="p-5 border-r border-black/5">
          {row.price ? <div className="text-neutral-900 font-semibold">{row.price}</div> : null}
          {row.cta ? (
            <Link
              href={row.cta.href}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1.5 text-white text-[12.5px] shadow-sm hover:translate-x-[1px]"
            >
              {row.cta.label}
              <ArrowIcon />
            </Link>
          ) : null}
        </div>

        {/* INCLUDES */}
        <div className="p-5">
          <ul className="grid grid-cols-1 gap-1.5">
            {row.items?.map((it, j) => (
              <li key={j} className="flex items-start gap-2 text-[15px] leading-6 text-neutral-800">
                <CheckIcon className="mt-[5px] h-4 w-4" color={accentColor} />
                <span dangerouslySetInnerHTML={{ __html: it }} />
              </li>
            ))}
          </ul>
          {row.note ? <div className="mt-2 text-[12.5px] text-neutral-600">{row.note}</div> : null}
        </div>

        {/* lift-on-hover */}
        <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 group-hover:shadow-[0_10px_30px_rgba(0,0,0,.08)]" />
      </div>

      {/* MOBILE CARD */}
      <div className="md:hidden p-4">
        <div
          className="relative rounded-xl border border-black/10 bg-white p-4 shadow-sm"
          style={{
            boxShadow: row.highlight ? '0 10px 30px rgba(232,200,143,.25)' : '0 6px 20px rgba(0,0,0,.05)',
          }}
        >
          {row.highlight ? (
            <span
              className="absolute left-0 top-0 h-full w-[5px] rounded-tr-lg rounded-br-lg"
              style={{ backgroundColor: accentColor }}
            />
          ) : null}

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[15px] font-semibold text-neutral-900">
                {row.href ? (
                  <Link href={row.href} className="underline decoration-[2px] underline-offset-[5px]">
                    {row.label}
                  </Link>
                ) : (
                  row.label
                )}
              </div>
              {row.sub ? <div className="text-[12px] text-neutral-600">{row.sub}</div> : null}
            </div>
            {row.badge ? <Badge text={row.badge} /> : null}
          </div>

          <div className="mt-2 flex items-center justify-between">
            {row.price ? <div className="text-[15px] font-semibold text-neutral-900">{row.price}</div> : <span />}
            {row.cta ? (
              <Link
                href={row.cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1.5 text-white text-[12px]"
              >
                {row.cta.label}
                <ArrowIcon />
              </Link>
            ) : null}
          </div>

          <ul className="mt-3 space-y-1.5">
            {row.items?.map((it, j) => (
              <li key={j} className="flex items-start gap-2 text-[14.5px] leading-6 text-neutral-800">
                <CheckIcon className="mt-[5px] h-4 w-4" color={accentColor} />
                <span dangerouslySetInnerHTML={{ __html: it }} />
              </li>
            ))}
          </ul>

          {row.note ? <div className="mt-2 text-[12px] text-neutral-600">{row.note}</div> : null}
        </div>
      </div>
    </>
  );
}

/* ---------- UI atoms ---------- */

function Badge({ text }) {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11.5px] font-medium text-amber-900 ring-1 ring-amber-300/60">
      {text}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = '', color = GOLD }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
