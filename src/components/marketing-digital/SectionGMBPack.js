// components/SectionGMBPack.jsx
import Link from "next/link";
import Image from "next/image";

export default function SectionGMBPack({
  title = "GOOGLE MY BUSINESS",
  href = "/produits/google-my-business",
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-0">
      <div className="mt-8 rounded-md bg-[rgb(186,151,134)]/80 px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            {title}
          </h2>

          <Link
            href={href}
            className="mx-auto mt-6 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-lg"
          >
            {/* Polaroid */}
              <div className="m-4 overflow-hidden rounded-sm bg-white">
                <Image
                  src="/assets/notfound.jpg"
                  alt={title}
                  width={800}
                  height={800}
                  className="h-[240px] w-full object-cover"
                  priority
                />
              </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
