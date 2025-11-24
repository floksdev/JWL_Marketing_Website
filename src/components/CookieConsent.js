'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const STORAGE_KEY = 'cookie-consent';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PZ96DBWV';

export default function CookieConsent() {
  const [status, setStatus] = useState('unknown'); // unknown | pending | granted | denied

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      setStatus(stored);
    } else {
      setStatus('pending');
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    setStatus('granted');
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setStatus('denied');
  };

  const showBanner = status === 'pending';
  const consentGiven = status === 'granted';

  return (
    <>
      {consentGiven ? (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}'+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      ) : null}

      {showBanner ? (
        <div className="fixed inset-x-3 bottom-4 z-[60]">
          <div className="mx-auto max-w-5xl rounded-2xl border border-black/10 bg-white/95 p-4 shadow-lg shadow-black/10 backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex-1 text-sm text-neutral-800">
                <p className="font-semibold text-neutral-900">Cookies pour la mesure d&apos;audience</p>
                <p className="mt-1 leading-relaxed">
                  Nous utilisons Google Tag Manager/Analytics uniquement si vous acceptez. Vous pouvez refuser sans
                  impact sur la navigation. <a href="/confidentialite" className="font-semibold underline">En savoir plus</a>.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={reject}
                  className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={accept}
                  className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
