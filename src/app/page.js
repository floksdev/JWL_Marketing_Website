import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import AlliesSection from "@/components/AlliesSection";
import AboutSection from "@/components/AboutSection";
import ServicesHubSection from "@/components/ServicesHubSection";
import AboutGuideSection from "@/components/AboutGuideSection";
import ValuesSection from "@/components/ValuesSection";
import SiteMapPitchSection from "@/components/SiteMapPitchSection";
import PersonalBrandSection from "@/components/PersonalBrandSection";
import StorytellingSection from "@/components/StorytellingSection";
import TrainingTeaser from "@/components/TrainingTeaser";
import QuiSuisJeTeaser from "@/components/QuiSuisJeTeaser";

function ServiceCard({ title, text, img }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <Image src={img} alt={title} width={240} height={160} className="mx-auto h-40 w-auto object-contain" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600">{text}</p>
    </div>
  );
}

function Review({ text, author }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="italic">“{text}”</p>
      <p className="mt-2 text-sm text-neutral-500">— {author}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-neutral-900">
      {/* HERO */}
      <Hero/>
      <AlliesSection/>
      <QuiSuisJeTeaser
        // title="Qui suis-je ?"       // tu peux l’omettre si tu veux un teaser ultra sobre
        // excerpt="…"                 // idem : met ton pitch court ici
        href="/qui-suis-je"
        ctaLabel="Lire la suite"
        imageSrc="https://www.dropbox.com/scl/fi/6ou8js3ovfnkv5t49u5ps/Jodie-lapaillerie-portrait-jwl-marketing-aix.png?rlkey=1xamn3ibfd0u7h2zvbvjguf0m&st=w265w3eo&raw=1"
        imageAlt="Portrait de Jodie"
        imageSide="left"              // ou "left"
      />
      <AboutSection/>
      <ServicesHubSection/>
      <AboutGuideSection/>
      <ValuesSection/>
      <SiteMapPitchSection/>
      <PersonalBrandSection/>
      <StorytellingSection/>
      <TrainingTeaser/>
    </main>
  );
}
