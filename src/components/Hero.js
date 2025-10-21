export default function Hero() {
  return (
    <section className="relative">
      {/* Image de fond */}
      <img
        src="/assets/hero_wallpaper_5.png"
        alt="JWL Marketing - Hero"
        className="h-full w-full object-cover object-center"
      />

      {/* Barre d'infos (mobile-first) */}
      <div
        className="
          flex flex-col items-center justify-center
          bg-[#E3D1C2]
          px-4 py-3
          divide-y divide-[#CEA99D]
          md:flex-row md:divide-y-0 md:divide-x
          md:px-10 md:py-4
        "
      >
        <span className="w-full text-center px-4 py-2 md:w-auto md:px-8 md:py-4">
          Consultante Marketing Digital
        </span>
        <span className="w-full text-center px-4 py-2 md:w-auto md:px-8 md:py-4">
          Achat immédiat
        </span>
        <span className="w-full text-center px-4 py-2 md:w-auto md:px-8 md:py-4">
          Service client réactif
        </span>
      </div>
    </section>
  );
}
