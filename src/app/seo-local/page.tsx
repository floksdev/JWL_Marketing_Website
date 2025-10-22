import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/seo-local/Hero";


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

export default function Home() {
  return (
    <main className="min-h-screen text-neutral-900">
      {/* HERO */}
      <Header/>
      <Hero/>

      <Footer/>
    </main>
  );
}
