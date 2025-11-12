"use client";
import { useEffect, useState, useRef, useMemo } from "react";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
  const frameRef = useRef(null);
  const [duplicationFactor, setDuplicationFactor] = useState(2);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/getReviews");
        const data = await res.json();
        if (data.reviews) {
          const filtered = data.reviews.filter((r) => r.rating >= 4);
          setReviews(filtered);
        }
      } catch (err) {
        console.error("Erreur de chargement des avis :", err);
      }
    }
    loadReviews();
  }, []);

  useEffect(() => {
    if (!reviews.length) return;

    const CARD_WIDTH = 384; // approx card width incl. gap for layout calc
    const computeFactor = () => {
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const baseWidth = Math.max(1, reviews.length) * CARD_WIDTH;
      const needed = Math.ceil((viewportWidth * 2) / baseWidth);
      setDuplicationFactor(Math.max(2, needed));
    };

    computeFactor();
    window.addEventListener("resize", computeFactor);
    return () => window.removeEventListener("resize", computeFactor);
  }, [reviews]);

  useEffect(() => {
    if (!sliderRef.current || !reviews.length) return;
    const slider = sliderRef.current;
    let position = 0;
    const singleLoopWidth = slider.scrollWidth / duplicationFactor;

    const animate = () => {
      position -= 0.6;
      if (Math.abs(position) >= singleLoopWidth) {
        position = 0;
      }
      slider.style.transform = `translate3d(${position}px, 0, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    slider.style.transform = "translate3d(0,0,0)";
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reviews, duplicationFactor]);

  const duplicated = useMemo(() => {
    if (!reviews.length) return [];
    return Array.from({ length: duplicationFactor })
      .map(() => reviews)
      .flat();
  }, [reviews, duplicationFactor]);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center relative">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Votre satisfaction, notre priorité !
        </h2>
        <p className="mt-2 text-neutral-500 text-sm">
          Avis vérifiés sur Google ★★★★★
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="text-neutral-500 italic text-center mt-8">
          Chargement des avis...
        </p>
      ) : (
        <div className="relative mt-12 w-full overflow-hidden px-2 sm:px-6">
          {/* fades latéraux */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* bande scrollable */}
          <div ref={sliderRef} className="flex gap-6 will-change-transform">
            {duplicated.map((r, i) => (
              <div
                key={i}
                className="min-w-[320px] max-w-[360px] flex-shrink-0 rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-neutral-100 text-left"
              >
                <p className="text-lg font-medium text-neutral-800 mb-2">
                  {r.author_name}
                </p>
                <p className="text-amber-500 mb-3 text-sm tracking-wide">
                  {"★".repeat(r.rating)}{" "}
                  <span className="text-neutral-500">({r.rating}/5)</span>
                </p>

                {r.text && r.text.trim().length > 0 ? (
                  <p className="text-neutral-600 text-sm leading-relaxed italic">
                    {r.text.length > 220 ? r.text.slice(0, 220) + "..." : r.text}
                  </p>
                ) : (
                  <p className="text-neutral-400 italic text-sm">
                    (Cet avis n’inclut pas de commentaire, mais la note parle
                    d’elle-même ✨)
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
