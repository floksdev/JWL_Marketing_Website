import Link from "next/link";

const BTN_BG = "#D6C1B0";       // plus foncé que #E3D1C2
// hover via CSS (pas de handlers) : on joue sur brightness/opacity

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Bloc légal images */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-900">
              Informations
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Toutes les images présentes sur ce site sont la propriété de JWL Marketing.
              Toute reproduction, même partielle, est interdite sans autorisation.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-900">
              Pages
            </h3>
            <ul className="space-y-2 text-sm">
              <Li href="/services">Services</Li>
              <Li href="/marketing-digital">Marketing digital</Li>
              <Li href="/seo-local">SEO Local</Li>
              <Li href="/contact">Contact</Li>
            </ul>
          </div>

          {/* Légal + Réseaux */}
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-900">
              Légal & Réseaux
            </h3>
            <ul className="mb-4 space-y-2 text-sm">
              <Li href="/mentions-legales">Mentions légales</Li>
              <Li href="/cgv">Conditions Générales de Vente (CGV)</Li>
              <Li href="/confidentialite">Politique de confidentialité</Li>
            </ul>

            <div className="flex flex-wrap gap-2">
              <IconButton href="https://www.linkedin.com/" label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com/" label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton href="/blog" label="Blog">
                <BlogIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center text-sm text-neutral-600 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} JWL Marketing — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

/* ——— Utils ——— */

function Li({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-neutral-700 hover:underline hover:text-neutral-900">
        {children}
      </Link>
    </li>
  );
}

function IconButton({ href, label, children }) {
  const base = {
    backgroundColor: BTN_BG,
  };
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-neutral-900 hover:brightness-95 hover:opacity-95"
      style={base}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <span className="h-4 w-4">{children}</span>
      <span>{label}</span>
    </Link>
  );
}

/* ——— Icons (SVG) ——— */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5s-2-.9-2-2 0-2 2-2 2 .9 2 2zM1 8h4v14H1V8zm7 0h3.8v1.9h.1c.6-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.6V22h-4v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V22H8V8z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.7V12h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7H15c-1.4 0-1.8.9-1.8 1.8V12h3.1l-.5 2.9h-2.6v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h10a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8.5a1.5 1.5 0 0 1-1.5 1.5H7a3 3 0 0 1-3-3V4zm4 5h8V6a1 1 0 0 0-1-1H7v12a1 1 0 0 0 1 1h11V10a1 1 0 0 0-1-1H8z" />
    </svg>
  );
}
