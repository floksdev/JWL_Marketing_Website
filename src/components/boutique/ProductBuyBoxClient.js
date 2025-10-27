'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const GOLD = '#E8C88F';

const SCALES = [
  { key: 'indep', label: 'Indépendant / Freelance', factor: 1.0 },
  { key: 'tpe', label: 'Petite entreprise (≤ 10 salariés)', factor: 1.2 },
  { key: 'pme', label: 'PME / SARL / EURL / SA', factor: 1.35 },
];

const SELECT_BASE_CLASSES =
  'w-full appearance-none rounded-xl border border-black/10 bg-white px-3 pr-10 py-2.5 text-[15px] font-medium text-neutral-900 shadow-sm transition focus:border-neutral-900/40 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:cursor-not-allowed disabled:opacity-60';

/**
 * Gestion de la buy box produit avec plusieurs modes de pricing :
 * - scale    : multiplicateur en fonction de la taille d’entreprise
 * - options  : cases à cocher simples (SEO, visuel…)
 * - advanced : configuration déclarative via advanced.fields ou ancien format
 */
export default function ProductBuyBoxClient({
  title,
  productSlug,
  productImage,
  basePrice,
  rating = 5,
  reviewsCount = 0,
  tvaNote = '',
  checkoutHref = '#',

  pricingMode = 'scale',
  optionsConfig,
  defaultScale = 'indep',
  advanced,
  highlights = [],
}) {
  /* ----- legacy scale ----- */
  const [scaleKey, setScaleKey] = useState(defaultScale);
  const factorScale = useMemo(
    () => SCALES.find((s) => s.key === scaleKey)?.factor ?? 1,
    [scaleKey],
  );

  /* ----- simple options ----- */
  const [withSEO, setWithSEO] = useState(false);
  const [withVisual, setWithVisual] = useState(false);

  /* ----- legacy advanced config (compat) ----- */
  const perDay = !!advanced?.perDay;
  const daysCfg = advanced?.days ?? { min: 1, max: 1, default: 1 };
  const [days, setDays] = useState(clamp(daysCfg.default ?? 1, daysCfg.min ?? 1, daysCfg.max ?? 99));

  const sf = advanced?.selectFactors;
  const [selectVal, setSelectVal] = useState(sf?.options?.[0]?.value ?? '');
  const factorSelect = useMemo(() => {
    if (!sf?.options) return 1;
    return sf.options.find((o) => o.value === selectVal)?.factor ?? 1;
  }, [sf, selectVal]);

  const dd = advanced?.dropdownPrice;
  const [ddVal, setDdVal] = useState(dd?.options?.[0]?.value ?? '');
  const baseFromDropdown = useMemo(() => {
    if (!dd?.options) return undefined;
    const found = dd.options.find((o) => o.value === ddVal);
    return typeof found?.price === 'number' ? found.price : undefined;
  }, [dd, ddVal]);

  const cbx = advanced?.checkboxes || [];
  const [checked, setChecked] = useState(Object.fromEntries(cbx.map((c) => [c.key, false])));

  const partCfg = advanced?.participants;
  const [participants, setParticipants] = useState(partCfg?.default ?? 1);

  const freeText = advanced?.freeText;
  const [freeTextVal, setFreeTextVal] = useState('');
  const { addItem } = useCart();

  /* ----- nouvelle API advanced.fields ----- */
  const advancedFields = useMemo(
    () =>
      Array.isArray(advanced?.fields)
        ? advanced.fields.filter((field) => field && typeof field.key === 'string')
        : [],
    [advanced?.fields],
  );

  const [fieldValues, setFieldValues] = useState(() => initializeAdvancedFields(advancedFields));
  useEffect(() => {
    setFieldValues(initializeAdvancedFields(advancedFields));
  }, [advancedFields]);

  const handleFieldChange = (key, value) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  /* ----- pricing ----- */
  const computedPriceNum = useMemo(() => {
    if (advanced?.hidePrice || basePrice == null) return Number.NaN;

    if (pricingMode === 'advanced') {
      if (advancedFields.length) {
        return computeAdvancedPrice({
          basePrice,
          fields: advancedFields,
          values: fieldValues,
        });
      }

      let price = Number.isFinite(baseFromDropdown) ? baseFromDropdown : basePrice;

      if (perDay) price *= Number.isFinite(days) ? days : 1;
      price *= factorSelect;

      if (partCfg) {
        const thr = partCfg.threshold ?? 10;
        const step = partCfg.stepSize ?? 10;
        const pct = partCfg.percentPerGroup ?? 0.3;
        const over = Math.max(0, (participants ?? 0) - thr);
        const groups = step > 0 ? Math.ceil(over / step) : 0;
        if (groups > 0) price *= 1 + pct * groups;
      }

      let addAbs = 0;
      let addPct = 0;
      for (const c of cbx) {
        if (!checked[c.key]) continue;
        if (c.type === 'percent') addPct += c.value;
        else addAbs += c.value;
      }
      price = price * (1 + addPct) + addAbs;

      return price;
    }

    if (pricingMode === 'options') {
      const seo = withSEO ? (optionsConfig?.seoDelta ?? 0) : 0;
      const vis = withVisual ? (optionsConfig?.visualDelta ?? 0) : 0;
      return (basePrice ?? 0) + seo + vis;
    }

    return (basePrice ?? 0) * factorScale;
  }, [
    advanced,
    advancedFields,
    baseFromDropdown,
    basePrice,
    cbx,
    checked,
    days,
    factorScale,
    factorSelect,
    fieldValues,
    optionsConfig,
    participants,
    perDay,
    pricingMode,
    withSEO,
    withVisual,
  ]);

  const displayPrice =
    advanced?.hidePrice || basePrice == null || Number.isNaN(computedPriceNum)
      ? 'Sur devis'
      : formatPrice(computedPriceNum);

  const ctaLabel = advanced?.ctaLabel || 'Ajouter au panier';
  const isCustomQuote = displayPrice === 'Sur devis';

  const handleAddToCart = () => {
    if (isCustomQuote) return;
    const id = productSlug || title;
    addItem({
      id,
      title,
      price: Number.isFinite(computedPriceNum) ? computedPriceNum : null,
      priceDisplay: displayPrice,
      href: checkoutHref,
      image: productImage,
    });
  };

  return (
    <>
      <aside className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h1 className="text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl">{title}</h1>

        <div className="mt-3 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StarsXXL value={rating} />
          <span className="text-base text-neutral-700">({reviewsCount} avis)</span>
          {tvaNote ? (
            <>
              <span className="text-neutral-300">•</span>
              <span className="text-sm text-neutral-600">{tvaNote}</span>
            </>
          ) : null}
        </div>

        <TrustTags className="mt-4" />

        {Array.isArray(highlights) && highlights.length ? (
          <ul className="mt-4 space-y-1.5 text-sm text-neutral-700">
            {highlights.map((item, idx) => (
              <li key={`${idx}-${item}`} className="flex items-start gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* ----- UI PRICING ----- */}
        {pricingMode === 'advanced' ? (
          advancedFields.length ? (
            <div className="mt-5 space-y-4">
              {advancedFields.map((field) => (
                <FieldControl
                  key={field.key}
                  field={field}
                  value={fieldValues[field.key]}
                  onChange={(value) => handleFieldChange(field.key, value)}
                  accentColor={GOLD}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {dd?.options?.length ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">{dd.label ?? 'Choix'}</label>
                  <SelectShell>
                    <select
                      value={ddVal}
                      onChange={(e) => setDdVal(e.target.value)}
                      className={SELECT_BASE_CLASSES}
                    >
                      {dd.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label} {typeof o.price === 'number' ? `– ${formatPrice(o.price)}` : ''}
                        </option>
                      ))}
                    </select>
                  </SelectShell>
                </div>
              ) : null}

              {sf?.options?.length ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">{sf.label ?? 'Type'}</label>
                  <SelectShell>
                    <select
                      value={selectVal}
                      onChange={(e) => setSelectVal(e.target.value)}
                      className={SELECT_BASE_CLASSES}
                    >
                      {sf.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </SelectShell>
                </div>
              ) : null}

              {perDay ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">Nombre de jours</label>
                  <input
                    type="range"
                    min={daysCfg.min ?? 1}
                    max={daysCfg.max ?? 10}
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                  <div className="mt-1 text-sm text-neutral-700">
                    {days} jour{days > 1 ? 's' : ''}
                  </div>
                </div>
              ) : null}

              {partCfg ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">Nombre de participants</label>
                  <input
                    type="number"
                    min={partCfg.min ?? 1}
                    step={partCfg.step ?? 1}
                    value={participants}
                    onChange={(e) => setParticipants(parseInt(e.target.value, 10) || partCfg.min || 1)}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[15px]"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    +{Math.round((partCfg?.percentPerGroup ?? 0.3) * 100)}% par groupe de{' '}
                    {partCfg?.stepSize ?? 10} au-delà de {partCfg?.threshold ?? 10} participants.
                  </p>
                </div>
              ) : null}

              {cbx.length ? (
                <div>
                  <div className="mb-1 block text-sm font-medium">Options</div>
                  <div className="space-y-2">
                    {cbx.map((c) => (
                      <label key={c.key} className="flex items-center gap-2 text-[15px]">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={!!checked[c.key]}
                          onChange={(e) => setChecked((prev) => ({ ...prev, [c.key]: e.target.checked }))}
                        />
                        <span>
                          {c.label}{' '}
                          {c.type === 'percent'
                            ? `( +${Math.round((c.value ?? 0) * 100)}% )`
                            : typeof c.value === 'number' && c.value > 0
                            ? `( +${formatPrice(c.value)} )`
                            : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {freeText ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">{freeText.label}</label>
                  <input
                    type="text"
                    value={freeTextVal}
                    onChange={(e) => setFreeTextVal(e.target.value)}
                    placeholder={freeText.placeholder || ''}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[15px]"
                  />
                </div>
              ) : null}
            </div>
          )
        ) : pricingMode === 'options' ? (
          <div className="mt-5 space-y-3">
            <div className="text-sm font-medium text-neutral-900">Options</div>
            <label className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-800 shadow-sm transition hover:border-neutral-300">
              <span>
                <span className="font-medium text-neutral-900">SEO</span>{' '}
                {optionsConfig?.seoDelta ? <span className="text-neutral-600">(+{formatPrice(optionsConfig.seoDelta)})</span> : null}
              </span>
              <input
                type="checkbox"
                className="h-[18px] w-[18px]"
                style={{ accentColor: GOLD }}
                checked={withSEO}
                onChange={(e) => setWithSEO(e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-800 shadow-sm transition hover:border-neutral-300">
              <span>
                <span className="font-medium text-neutral-900">Création visuelle</span>{' '}
                {optionsConfig?.visualDelta ? (
                  <span className="text-neutral-600">(+{formatPrice(optionsConfig.visualDelta)})</span>
                ) : null}
              </span>
              <input
                type="checkbox"
                className="h-[18px] w-[18px]"
                style={{ accentColor: GOLD }}
                checked={withVisual}
                onChange={(e) => setWithVisual(e.target.checked)}
              />
            </label>
          </div>
        ) : (
          <div className="mt-5">
            <label className="mb-1 block text-sm font-medium text-neutral-900">Taille de l’entreprise</label>
            <SelectShell>
              <select
                value={scaleKey}
                onChange={(e) => setScaleKey(e.target.value)}
                className={SELECT_BASE_CLASSES}
              >
                {SCALES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
        )}

        {/* Prix + CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {isCustomQuote ? (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:text-base"
              >
                Sur devis
              </Link>
            ) : (
              <div className="text-2xl font-bold text-neutral-900 sm:text-3xl">{displayPrice}</div>
            )}
          </div>

          {!isCustomQuote && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="hidden items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60 lg:inline-flex"
              >
                {ctaLabel}
                <ArrowIcon />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60 lg:hidden"
              >
                {ctaLabel}
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ===== UI bits ===== */
function TrustTags({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Tag icon={BoltIcon} text="Paiement sécurisé" />
      <Tag icon={CalendarIcon} text="Délais tenus" />
      <Tag icon={BoxIcon} text="Droits inclus" />
    </div>
  );
}
function Tag({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 text-[12.5px] text-neutral-800">
      <Icon className="h-4 w-4 text-neutral-500" />
      {text}
    </span>
  );
}
export function StarsXXL({ value = 5 }) {
  const full = Math.round(value);
  return (
    <span aria-label={`${value}/5`} className="text-[22px] leading-none">
      <span style={{ color: GOLD }}>{'★'.repeat(full)}</span>
      <span className="text-neutral-300">{'★'.repeat(5 - full)}</span>
    </span>
  );
}
function ArrowIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
function BoltIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
    </svg>
  );
}
function CalendarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function BoxIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M12 3v18M3 7l9 4 9-4" />
    </svg>
  );
}
function ChevronDownIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SelectShell({ children, disabled = false }) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <ChevronDownIcon className={disabled ? 'h-4 w-4 text-neutral-300' : 'h-4 w-4 text-neutral-500'} />
      </span>
    </div>
  );
}

/* ===== helpers pricing/fields ===== */
function initializeAdvancedFields(fields) {
  const init = {};
  for (const field of fields) {
    const key = field.key;
    switch (field.type) {
      case 'checkbox':
        init[key] = !!field.default;
        break;
      case 'checkbox-group':
        init[key] = Array.isArray(field.default) ? [...field.default] : [];
        break;
      case 'number':
      case 'slider': {
        const min = field.min ?? Number.NEGATIVE_INFINITY;
        const max = field.max ?? Number.POSITIVE_INFINITY;
        const raw = toNumber(field.default ?? field.min ?? 0);
        init[key] = clamp(raw, min, max);
        break;
      }
      case 'select':
      case 'segmented':
      case 'radio': {
        const fallback = field.options?.[0]?.value ?? '';
        init[key] = field.default ?? fallback;
        break;
      }
      case 'text':
      case 'textarea':
      default:
        init[key] = field.default ?? '';
        break;
    }
  }
  return init;
}

function computeAdvancedPrice({ basePrice, fields, values }) {
  let price = Number(basePrice);
  if (!Number.isFinite(price)) return Number.NaN;

  for (const field of fields) {
    const value = values[field.key];
    const effects = resolveFieldEffects(field, value);
    for (const effect of effects) {
      price = applyPricingEffect(price, effect, value);
    }
  }

  return price >= 0 ? price : 0;
}

function resolveFieldEffects(field, value) {
  if (!field || typeof field !== 'object') return [];
  const type = field.type ?? 'text';

  if (type === 'select' || type === 'segmented' || type === 'radio') {
    const opts = Array.isArray(field.options) ? field.options : [];
    const current = opts.find((opt) => opt.value === value) ?? opts[0];
    const effect = extractPricingConfig(current);
    return effect ? [effect] : [];
  }

  if (type === 'checkbox') {
    if (!value) return [];
    const effect = extractPricingConfig(field);
    return effect ? [effect] : [];
  }

  if (type === 'checkbox-group') {
    if (!Array.isArray(value) || !Array.isArray(field.options)) return [];
    return value
      .map((val) => field.options.find((opt) => opt.value === val))
      .map((opt) => extractPricingConfig(opt))
      .filter(Boolean);
  }

  if (type === 'number' || type === 'slider') {
    const effect = extractPricingConfig(field);
    return effect ? [effect] : [];
  }

  return [];
}

function extractPricingConfig(source) {
  if (!source || typeof source !== 'object') return null;
  const raw =
    source.pricing && typeof source.pricing === 'object'
      ? { ...source.pricing }
      : {};
  const merged = { ...source, ...raw };

  const effect = {};
  if (typeof merged.absolute === 'number') effect.absolute = merged.absolute;
  if (typeof merged.price === 'number') effect.absolute = merged.price;
  if (typeof merged.delta === 'number') effect.delta = merged.delta;
  if (typeof merged.deltaPerUnit === 'number') effect.deltaPerUnit = merged.deltaPerUnit;
  if (typeof merged.factor === 'number') effect.factor = merged.factor;
  if (typeof merged.factorPerUnit === 'number') effect.factorPerUnit = merged.factorPerUnit;
  if (typeof merged.percent === 'number') effect.percent = merged.percent;
  if (typeof merged.percentPerUnit === 'number') effect.percentPerUnit = merged.percentPerUnit;
  if (typeof merged.baseUnits === 'number') effect.baseUnits = merged.baseUnits;
  if (merged.allowBelowBase != null) effect.allowBelowBase = !!merged.allowBelowBase;
  if (merged.percentSteps && typeof merged.percentSteps === 'object') {
    effect.percentSteps = merged.percentSteps;
  }

  return Object.keys(effect).length ? effect : null;
}

function applyPricingEffect(price, effect, value) {
  if (!effect || typeof effect !== 'object') return price;
  let next = Number(price);
  const numericValue = toNumber(value);

  if (typeof effect.absolute === 'number' && Number.isFinite(effect.absolute)) {
    next = effect.absolute;
  }

  if (typeof effect.deltaPerUnit === 'number' && Number.isFinite(numericValue)) {
    const baseUnits = typeof effect.baseUnits === 'number' ? effect.baseUnits : 0;
    const diff = numericValue - baseUnits;
    const units = effect.allowBelowBase ? diff : Math.max(0, diff);
    next += units * effect.deltaPerUnit;
  }

  if (typeof effect.delta === 'number') {
    next += effect.delta;
  }

  if (effect.percentSteps && Number.isFinite(numericValue)) {
    const { threshold = 0, step = 1, percent = 0 } = effect.percentSteps;
    const over = Math.max(0, numericValue - threshold);
    if (over > 0 && step > 0) {
      const groups = Math.ceil(over / step);
      next *= 1 + percent * groups;
    }
  }

  if (typeof effect.factorPerUnit === 'number' && Number.isFinite(numericValue)) {
    const baseUnits = typeof effect.baseUnits === 'number' ? effect.baseUnits : 0;
    const diff = numericValue - baseUnits;
    if (diff !== 0) {
      next *= Math.pow(effect.factorPerUnit, diff);
    }
  }

  if (typeof effect.factor === 'number') {
    next *= effect.factor;
  }

  if (typeof effect.percentPerUnit === 'number' && Number.isFinite(numericValue)) {
    const baseUnits = typeof effect.baseUnits === 'number' ? effect.baseUnits : 0;
    const units = Math.max(0, numericValue - baseUnits);
    if (units > 0) {
      next *= 1 + effect.percentPerUnit * units;
    }
  }

  if (typeof effect.percent === 'number') {
    next *= 1 + effect.percent;
  }

  return Number.isFinite(next) ? next : price;
}

function formatFieldValueLabel(field, value) {
  if (field == null) return String(value ?? '');
  if (typeof field.valueTemplate === 'string') {
    return field.valueTemplate.replace('{{value}}', value);
  }
  if (field.unit) {
    const plural = field.unitPlural ?? `${field.unit}s`;
    const singular = field.unitSingular ?? field.unit;
    const label = Number(value) > 1 ? plural : singular;
    return `${value} ${label}`.trim();
  }
  return String(value ?? '');
}

function FieldControl({ field, value, onChange, accentColor = GOLD }) {
  if (!field) return null;
  const { type = 'text', label, helper, disabled } = field;

  if (type === 'select' || type === 'segmented' || type === 'radio') {
    const display = field.display ?? (type === 'segmented' ? 'segmented' : 'dropdown');
    const options = Array.isArray(field.options) ? field.options : [];

    if (display === 'segmented') {
      return (
        <div>
          {label ? <span className="mb-2 block text-sm font-medium text-neutral-900">{label}</span> : null}
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  disabled={disabled || opt.disabled}
                  onClick={() => onChange(opt.value)}
                  className={[
                    'rounded-full border px-4 py-2 text-sm transition',
                    isActive
                      ? 'border-transparent bg-neutral-900 text-white shadow-sm'
                      : 'border-black/10 bg-neutral-50 text-neutral-700 hover:border-neutral-300',
                    disabled || opt.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                  ].join(' ')}
                  style={isActive ? { boxShadow: `0 0 0 1px ${accentColor}` } : undefined}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
        </div>
      );
    }

    return (
      <div>
        {label ? <label className="mb-1 block text-sm font-medium text-neutral-900">{label}</label> : null}
        <SelectShell disabled={disabled}>
          <select
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className={SELECT_BASE_CLASSES}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
        </SelectShell>
        {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <label
        className={[
          'flex items-start justify-between gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-800 shadow-sm transition',
          disabled ? 'opacity-60' : 'hover:border-neutral-300',
        ].join(' ')}
      >
        <span className="pr-4">
          <span className="font-medium text-neutral-900">{field.label}</span>
          {field.description ? <p className="text-xs text-neutral-600">{field.description}</p> : null}
          {helper ? <p className="text-xs text-neutral-500">{helper}</p> : null}
        </span>
        <input
          type="checkbox"
          className="mt-1 h-[18px] w-[18px]"
          style={{ accentColor }}
          checked={!!value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    );
  }

  if (type === 'checkbox-group') {
    const options = Array.isArray(field.options) ? field.options : [];
    const current = Array.isArray(value) ? value : [];
    const toggle = (val) => {
      if (current.includes(val)) {
        onChange(current.filter((item) => item !== val));
      } else {
        onChange([...current, val]);
      }
    };

    return (
      <div>
        {label ? <div className="mb-1 text-sm font-medium text-neutral-900">{label}</div> : null}
        <div className="space-y-2">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={[
                'flex items-start justify-between gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-800 shadow-sm transition',
                disabled || opt.disabled ? 'opacity-60' : 'hover:border-neutral-300',
              ].join(' ')}
            >
              <span className="pr-4">
                <span className="font-medium text-neutral-900">{opt.label}</span>
                {opt.helper ? <p className="text-xs text-neutral-500">{opt.helper}</p> : null}
              </span>
              <input
                type="checkbox"
                className="mt-1 h-[18px] w-[18px]"
                style={{ accentColor }}
                checked={current.includes(opt.value)}
                disabled={disabled || opt.disabled}
                onChange={() => toggle(opt.value)}
              />
            </label>
          ))}
        </div>
        {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
      </div>
    );
  }

  if (type === 'slider') {
    const min = field.min ?? 0;
    const max = field.max ?? 100;
    const step = field.step ?? 1;
    const formatted = formatFieldValueLabel(field, value);

    return (
      <div>
        {label ? <label className="mb-1 block text-sm font-medium text-neutral-900">{label}</label> : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(toNumber(e.target.value))}
          className="w-full"
          style={{ accentColor }}
        />
        <div className="mt-1 text-sm font-medium text-neutral-800">{formatted}</div>
        {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div>
        {label ? <label className="mb-1 block text-sm font-medium text-neutral-900">{label}</label> : null}
        <input
          type="number"
          value={value ?? ''}
          disabled={disabled}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          onChange={(e) => {
            const next = toNumber(e.target.value);
            const min = field.min ?? Number.NEGATIVE_INFINITY;
            const max = field.max ?? Number.POSITIVE_INFINITY;
            onChange(clamp(next, min, max));
          }}
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/60 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        {label ? <label className="mb-1 block text-sm font-medium text-neutral-900">{label}</label> : null}
        <textarea
          value={value ?? ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/60 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
      </div>
    );
  }

  return (
    <div>
      {label ? <label className="mb-1 block text-sm font-medium text-neutral-900">{label}</label> : null}
      <input
        type="text"
        value={value ?? ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/60 disabled:cursor-not-allowed disabled:opacity-60"
      />
      {helper ? <p className="mt-1 text-xs text-neutral-500">{helper}</p> : null}
    </div>
  );
}

function formatPrice(n) {
  try {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  } catch {
    return `${Math.round(n)} €`;
  }
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function toNumber(value) {
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
