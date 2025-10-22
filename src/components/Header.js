'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const BG = '#E3D1C2';

export default function Header({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close  = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: BG }}>
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

          <div className="ml-auto">
            <CartButton count={cartCount} />
          </div>
        </div>

        {/* ===== DESKTOP BAR (grid 3 colonnes pour centrer le logo) ===== */}
        <div className="hidden md:grid h-20 grid-cols-3 items-center">
          {/* Colonne gauche : nav gauche */}
          <nav className="flex items-center gap-6 text-neutral-900 justify-start">
            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/marketing-digital">Marketing digital</NavLink>
            <NavLink href="/seo-local">SEO Local</NavLink>
          </nav>

          {/* Colonne centre : logo CENTRÉ */}
          <div className="flex justify-center">
            <Link href="/" className="block">
              <img src="/assets/logo_medium.png" alt="JWL Marketing" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Colonne droite : nav droite + CTA + panier */}
          <div className="flex items-center gap-6 text-neutral-900 justify-end">
            <NavLink href="/boutique">Boutique</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link
              href="/contact"
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
            >
              Prendre RDV
            </Link>
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
                className="mt-2 mb-3 rounded-xl border border-black/10 bg-white shadow-sm"
              >
                <ul className="flex flex-col gap-1 px-3 py-3 text-sm">
                  <li><MobileLink href="/" onClick={close}>Accueil</MobileLink></li>
                  <li><MobileLink href="/boutique" onClick={close}>Boutique</MobileLink></li>
                  <li><MobileLink href="/marketing-digital" onClick={close}>Marketing digital</MobileLink></li>
                  <li><MobileLink href="/seo-local" onClick={close}>SEO Local</MobileLink></li>
                  <li><MobileLink href="/contact" onClick={close}>Contact</MobileLink></li>
                  <li className="mt-2">
                    <Link
                      href="/contact"
                      onClick={close}
                      className="block rounded-full bg-neutral-900 px-4 py-2 text-center text-white hover:bg-neutral-800"
                    >
                      Prendre RDV
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

/* sub components */

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm hover:underline">
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="block rounded px-2 py-2 hover:bg-neutral-50">
      {children}
    </Link>
  );
}

function CartButton({ count = 0 }) {
  return (
    <Link
      href="/cart"
      aria-label="Voir le panier"
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
    </Link>
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
