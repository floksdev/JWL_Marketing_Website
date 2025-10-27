import Image from 'next/image';

function normalizeDropbox(src = '/assets/notfound.jpg') {
  if (!src) return '/assets/notfound.jpg';
  try {
    const url = new URL(src);
    if (url.hostname.includes('dropbox.com')) {
      url.hostname = 'dl.dropboxusercontent.com';
      url.searchParams.set('raw', '1');
    }
    return url.toString();
  } catch (error) {
    return src;
  }
}

export default function PolaroidImage({
  src,
  alt,
  className = '',
  aspectRatio = '4 / 5',
}) {
  const safeSrc = normalizeDropbox(src);

  return (
    <div className={`relative inline-block -rotate-1 transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-0 ${className}`}>
      <span aria-hidden className="absolute -top-3 -left-3 h-6 w-16 rotate-[-8deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <span aria-hidden className="absolute -top-2 -right-4 h-6 w-14 rotate-[10deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <div className="relative overflow-hidden rounded-sm bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
        <div className="m-4 overflow-hidden rounded-[3px] bg-neutral-50">
          <div className="relative w-full" style={{ aspectRatio }}>
            <Image
              src={safeSrc || '/assets/notfound.jpg'}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
              priority
            />
          </div>
        </div>
        <div className="px-4 pb-5 pt-1">
          <div className="h-5" />
        </div>
      </div>
    </div>
  );
}
