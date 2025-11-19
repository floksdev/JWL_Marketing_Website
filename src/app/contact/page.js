import Hero from "@/components/Hero";
import ContactTeaser from "@/components/contact/ContactTeaser";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contact — JWL Marketing",
  description: "Planifiez un rendez-vous ou contactez JWL Marketing pour un accompagnement marketing digital et SEO local.",
};

export default function Contact() {
  return (
    <main className="min-h-screen text-neutral-900">
        <header className="sr-only">
          <h1>Contactez JWL Marketing pour vos projets marketing digital</h1>
        </header>
        {/* HERO */}
        <Hero/>
        <ContactTeaser
        title="On travaille ensemble ?"
        lead="Si vous voulez bosser avec quelqu’un d’authentique, efficace et complice, qui comprend votre business avant même votre pitch…"
        linkLabel="écrivez-moi !"
        linkHref="/contact"
        ctaLabel="Accéder au formulaire"
        ctaHref="/contact"
        imageSrc="https://www.dropbox.com/scl/fi/d0nnfkq044vcrhjf4cn7e/4-ia-jodie-lapaillerie-jwl-marketing.jpeg?rlkey=k2vofc5iuddfxcanbhlcmkki6&st=s6a313pn&raw=1"
        imageAlt="JWL Marketing – Aperçu"
        imageSide="right"     // ou "left"
        // taupe
        // showSeparator={false}
      />
      <ContactSection/>
    </main>
  );
}
