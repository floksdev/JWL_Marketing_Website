import Link from "next/link";
import GoogleReviews from "@/components/reusable/GoogleReviews";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";


const BTN_BG = "#D6C1B0";       // plus foncé que #E3D1C2
// hover via CSS (pas de handlers) : on joue sur brightness/opacity

export default function Footer() {
  return (
    <>
    <GoogleReviews/>
      <footer className="border-t bg-[#E3D1C2]">
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
                <Li href="/">Accueil</Li>
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
                <IconButton href="https://www.linkedin.com/company/jwl-marketing" label="LinkedIn">
                  <FaLinkedinIn />
                </IconButton>
                <IconButton href="https://www.facebook.com/profile.php?id=61578345536283&locale=fr_FR" label="Facebook">
                  <FaFacebook />
                </IconButton>
                <IconButton href="https://www.instagram.com/jwlmarketing13/" label="Instagram">
                  <FaInstagram />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center text-sm text-neutral-600 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} JWL Marketing — Tous droits réservés.</p>
            <p className="text-neutral-700">
              Site web conçu par{" "}
              <Link
                href="https://webdifference.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-900 hover:underline"
              >
                WebDifference
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </>
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
