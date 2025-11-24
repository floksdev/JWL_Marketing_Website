'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

import { PRODUCTS } from '@/lib/catalogue';
import { useCart } from '@/context/CartContext';

const BG = 'rgba(227, 209, 194, 0.9)';
const HEADER_STYLE = {
  backgroundColor: BG,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

const buildCalendlyUrl = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `https://calendly.com/contact-jwlmarketing/test?back=1&month=${year}-${month}`;
};

const PRODUCT_ALIAS_OVERRIDES = {
  'pack-starter-digital': ['pack starter', 'starter digital'],
  'pack-starter': ['pack starter', 'starter'],
  'seo-local-starter': ['seo starter', 'pack seo local starter'],
  'seo-local-booster': ['seo booster', 'pack booster'],
  'seo-local-premium': ['seo premium', 'premium local'],
  'logo-essentiel': ['pack starter', 'logo starter'],
  'logo-pro': ['pack pro', 'logo professionnel'],
  'logo-premium': ['pack premium', 'logo haut de gamme'],
};

export default function Header({ isAdmin = false }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState(buildCalendlyUrl());
  const { count: cartCount } = useCart();
  const toggle = () => setOpen(v => !v);
  const close  = () => setOpen(false);
  const desktopInputRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const calendlyButtonClasses = 'hidden whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-800 md:inline-flex';

  const handleDesktopToggle = () => {
    setSearchOpen(prev => {
      const next = !prev;
      if (!next) {
        setSearchQuery('');
      }
      return next;
    });
  };

  const searchItems = useMemo(() => {
    const productItems = PRODUCTS.map(product => {
      const overrideAliases = PRODUCT_ALIAS_OVERRIDES[product.slug] ?? [];
      const normalizedSlug = product.slug.replace(/-/g, ' ');
      const aliasSet = new Set([
        normalizedSlug,
        product.category,
        product.title,
        ...overrideAliases,
      ].filter(Boolean));

      if (product.title && /^pack\s+/i.test(product.title)) {
        aliasSet.add(product.title.replace(/^pack\s+/i, '').trim());
      }

      const aliases = Array.from(aliasSet);

      return {
        href: `/boutique/${product.slug}`,
        title: product.title,
        type: 'Produit',
        keywords: [product.category, normalizedSlug].join(' '),
        aliases,
      };
    });

    const enrichWithSearchText = item => ({
      ...item,
      searchText: buildSearchText(item),
    });

    return productItems.map(enrichWithSearchText);
  }, []);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.trim().toLowerCase();

    return searchItems
      .map(item => ({
        ...item,
        score: computeSimilarity(normalizedQuery, item.searchText),
      }))
      .filter(item => item.score >= 0.45)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [searchItems, searchQuery]);

  useEffect(() => {
    if (searchOpen && desktopInputRef.current) {
      desktopInputRef.current.focus();
    }
  }, [searchOpen]);

  const openCalendlyPopup = () => {
    setCalendlyUrl(buildCalendlyUrl());
    setShowCalendly(true);
  };

  useEffect(() => {
    if (!showCalendly) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [showCalendly]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const handleClickOutside = event => {
      if (desktopContainerRef.current && !desktopContainerRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50" style={HEADER_STYLE}>
      <motion.div animate={{ height: 'auto' }} className="w-full px-2 sm:px-3 lg:px-4">
        {/* ===== MOBILE BAR (laisse tel quel) ===== */}
        <div className="relative flex h-16 items-center md:hidden">
          <button
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={toggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/5"
          >
            <Burger open={open} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <img src="/assets/logo_medium.png" alt="JWL Marketing" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {isAdmin ? (
              <Link href="/admin" className="text-sm font-semibold text-neutral-900 underline">
                Admin
              </Link>
            ) : null}
            <CartButton count={cartCount} />
          </div>
        </div>

        {/* ===== DESKTOP BAR (grid 3 colonnes pour centrer le logo) ===== */}
        <div className="hidden md:grid h-20 grid-cols-3 items-center">
          {/* Colonne gauche : nav gauche */}
          <nav className="flex items-center gap-5 text-neutral-900 justify-start">
            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/marketing-digital">Marketing digital</NavLink>
            <NavLink href="/seo-local">SEO Local</NavLink>
            {isAdmin ? <NavLink href="/admin">Admin</NavLink> : null}
            <div ref={desktopContainerRef} className="relative hidden items-center lg:flex">
              <button
                type="button"
                aria-label={searchOpen ? 'Fermer la recherche' : 'Ouvrir la recherche'}
                onClick={handleDesktopToggle}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition-colors ${searchOpen ? 'bg-white text-neutral-900 shadow-sm border-black/10' : 'hover:bg-black/5 text-neutral-900'}`}
              >
                <FaSearch className="h-4 w-4" />
              </button>

              {searchOpen && (
                <div className="absolute left-1/2 top-full z-40 mt-2 w-[18rem] -translate-x-1/2 rounded-xl border border-black/10 bg-white p-3 shadow-xl">
                  <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-neutral-50 px-2">
                    <FaSearch className="h-4 w-4 text-neutral-500" />
                    <input
                      ref={desktopInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={event => setSearchQuery(event.target.value)}
                      placeholder="Rechercher un produit"
                      className="h-9 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                    />
                  </div>
                  <SearchResultsList
                    results={results}
                    query={searchQuery}
                    onNavigate={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  />
                </div>
              )}
            </div>
          </nav>

          {/* Colonne centre : logo CENTRÉ */}
          <div className="flex justify-center">
            <Link href="/" className="block">
              <img src="/assets/logo_medium.png" alt="JWL Marketing" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Colonne droite : nav droite + CTA + panier */}
          <div className="flex items-center gap-5 text-neutral-900 justify-end">
            <NavLink href="/boutique">Boutique</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
              type="button"
              onClick={openCalendlyPopup}
              className={calendlyButtonClasses}
            >
              Prendre RDV
            </button>
            <CartButton count={cartCount} />
          </div>
        </div>

        {/* ===== MENU MOBILE animé ===== */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden md:hidden"
              aria-label="Menu mobile"
            >
              <motion.div
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-2 mb-3 overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm backdrop-blur-md"
              >
                <ul className="flex flex-col gap-2 px-3 py-3 text-sm text-neutral-900">
                  <li>
                    <div className="rounded-lg border border-black/10 bg-white px-3 py-2">
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                        placeholder="Rechercher un produit"
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto">
                      <SearchResultsList
                        results={results}
                        query={searchQuery}
                        variant="mobile"
                        onNavigate={() => {
                          setSearchQuery('');
                          setSearchOpen(false);
                          close();
                        }}
                      />
                    </div>
                  </li>
                  <li><MobileLink href="/" onClick={close}>Accueil</MobileLink></li>
                  <li><MobileLink href="/boutique" onClick={close}>Boutique</MobileLink></li>
                  <li><MobileLink href="/marketing-digital" onClick={close}>Marketing digital</MobileLink></li>
                  <li><MobileLink href="/seo-local" onClick={close}>SEO Local</MobileLink></li>
                  {isAdmin ? (
                    <li><MobileLink href="/admin" onClick={close}>Admin</MobileLink></li>
                  ) : null}
                  <li><MobileLink href="/contact" onClick={close}>Contact</MobileLink></li>
                  <li className="mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        openCalendlyPopup();
                      }}
                      className="block w-full rounded-full bg-neutral-900 px-4 py-2 text-center text-white transition hover:bg-neutral-800"
                    >
                      Prendre RDV
                    </button>
                  </li>
                </ul>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCalendly ? (
            <CalendlyModal
              url={calendlyUrl}
              onClose={() => setShowCalendly(false)}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

/* sub components */

function SearchResultsList({ results, onNavigate, variant = 'desktop', query = '' }) {
  if (!results.length) {
    if (!query.trim()) {
      return (
        <p className={`mt-3 text-xs ${variant === 'mobile' ? 'text-neutral-600' : 'text-neutral-500'}`}>
          Tapez un mot clé pour lancer la recherche.
        </p>
      );
    }

    return (
      <p className={`mt-3 text-xs ${variant === 'mobile' ? 'text-neutral-600' : 'text-neutral-500'}`}>
        Aucun résultat, essayez un autre terme.
      </p>
    );
  }

  return (
    <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto">
      {results.map(result => (
        <li key={`${result.type}-${result.href}`}>
          <Link
            href={result.href}
            onClick={onNavigate}
            className="block rounded-lg border border-transparent px-3 py-2 text-sm text-neutral-800 transition hover:border-neutral-200 hover:bg-neutral-50"
          >
            <span className="block font-medium text-neutral-900">{result.title}</span>
            <span className="text-xs uppercase tracking-wide text-neutral-500">{result.type}</span>
            {result.aliases?.length ? (
              <span className="mt-0.5 block text-[11px] text-neutral-500">
                Alias : {result.aliases.slice(0, 2).join(', ')}{result.aliases.length > 2 ? '…' : ''}
              </span>
            ) : null}
            <span className="mt-0.5 block text-xs text-neutral-500">
              {Math.round(result.score * 100)}% de correspondance
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CalendlyModal({ url, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Prendre rendez-vous"
      onMouseDown={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-2xl text-white shadow-lg transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          aria-label="Fermer la fenêtre Calendly"
        >
          ×
        </button>
        <div className="rounded-3xl border border-black/5 bg-white p-4 pt-16 sm:pt-20">
          <iframe
            src={url}
            className="h-[70vh] w-full rounded-2xl border-0"
            title="Calendly - JWL Marketing"
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function buildSearchText(item) {
  const segments = [];

  if (item.title) segments.push(item.title);
  if (item.keywords) segments.push(item.keywords);

  if (Array.isArray(item.aliases)) {
    segments.push(...item.aliases);
  }

  return segments
    .filter(Boolean)
    .map(segment => segment.toString().toLowerCase())
    .join(' ');
}

function computeSimilarity(query, target) {
  if (!target) return 0;
  if (!query) return 0;

  if (target.includes(query)) {
    return 1;
  }

  const words = target.split(/\s+/);
  let best = levenshteinSimilarity(query, target);

  for (const word of words) {
    best = Math.max(best, levenshteinSimilarity(query, word));
  }

  return best;
}

function levenshteinSimilarity(a, b) {
  if (!a && !b) return 1;
  if (!a || !b) return 0;

  const distance = levenshteinDistance(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  return 1 - distance / maxLen;
}

function levenshteinDistance(a, b) {
  const lenA = a.length;
  const lenB = b.length;

  const dp = Array.from({ length: lenA + 1 }, () => new Array(lenB + 1).fill(0));

  for (let i = 0; i <= lenA; i += 1) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= lenB; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= lenA; i += 1) {
    for (let j = 1; j <= lenB; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[lenA][lenB];
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm hover:underline">
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded px-2 py-2 text-neutral-900 hover:bg-neutral-100"
    >
      {children}
    </Link>
  );
}

function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      aria-label="Voir le panier"
      onClick={openCart}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/5"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6 text-neutral-900">
        <path d="M3 3h2l.4 2M7 13h9.2a2 2 0 0 0 2-1.6l1.2-6A1 1 0 0 0 18.4 4H6.2M7 13 5.4 5M7 13l-.6 3a2 2 0 0 0 2 2h8.2" />
        <circle cx="9.5" cy="19" r="1.2" />
        <circle cx="17.7" cy="19" r="1.2" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] font-medium text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

function Burger({ open = false }) {
  return (
    <span className="relative block h-4 w-5">
      <span className={`absolute left-0 top-0 block h-0.5 w-5 rounded bg-neutral-900 transition-transform duration-200 ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
      <span className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-neutral-900 transition-opacity duration-150 ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute left-0 top-3 block h-0.5 w-5 rounded bg-neutral-900 transition-transform duration-200 ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
    </span>
  );
}
