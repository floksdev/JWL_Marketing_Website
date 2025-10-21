import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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


export default function MarketingDigital() {
  return (
    <main className="min-h-screen text-neutral-900">
      {/* HERO */}
      <Header/>
      <Hero/>

      <Footer/>
    </main>
  );
}
