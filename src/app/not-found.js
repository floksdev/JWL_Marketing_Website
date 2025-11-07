import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-24 text-center sm:py-32">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">JWL Marketing</p>
          <h1 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Oups, la page recherchée n’existe plus.
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600">
            Elle a peut-être changé d’adresse ou n’a jamais existé. Revenons vers des terres connues.
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <Image
            src="https://www.dropbox.com/scl/fi/5p066d37owcqgjzvv37be/12-google-gmb-jwl-marketing.png?rlkey=p87lw6iw7kh9q4j80wc9vtayx&st=9enu8d5j&raw=1"
            alt="Illustration JWL Marketing 404"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#D6C1B0] px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:brightness-95 hover:opacity-95"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            Contacter Jodie
          </Link>
        </div>
      </div>
    </main>
  );
}
