// lib/catalogue.js

export const CATEGORIES = [
  { key: 'Tests & Démo', label: 'Tests & Démo', icon: '🧪' },
  { key: 'Identité visuelle & Branding', label: 'Identité visuelle & Branding', icon: '🎨' },
  { key: 'Rédaction sur les réseaux', label: 'Rédaction sur les réseaux', icon: '✍️' },
  // ... tes catégories existantes
  { key: 'Refonte Web', label: 'Refonte Web', icon: '🌐' },        // solo
  { key: 'Audit & Analyse SEO', label: 'Audit & Analyse SEO', icon: '🚀' }, // Starter/Booster/Local
  { key: 'Google GMB', label: 'Google GMB', icon: '📍' },          // solo
  { key: 'Prospection B2B', label: 'Prospection B2B', icon: '📞' }, // Prospection + Salon + Formation
];

const TVA_NOTE = 'TVA non applicable (art. 293 B du CGI)';

/* =========================================
 * IDENTITÉ VISUELLE & BRANDING (Logo)
 * =======================================*/

const LOGO_MATRIX_ROWS = [
  {
    label: 'Essentiel',
    href: '/boutique/logo-essentiel',
    price: 'À partir de 250 €',
    badge: 'Starter',
    items: [
      'Audit vidéo (20 min)',
      'Jusqu’à <strong>3 propositions</strong> de logos',
      '<strong>1 série</strong> de retouches sur le logo choisi',
      'Livraison <strong>PNG, JPG, SVG vectorisé</strong>',
      'Mini charte graphique (codes couleurs)',
      '<strong>Cession complète des droits</strong> sur le logo final',
    ],
  },
  {
    label: 'Pro',
    href: '/boutique/logo-pro',
    price: 'À partir de 360 €',
    badge: 'Best seller',
    highlight: true,
    items: [
      'Audit vidéo (30 min)',
      'Jusqu’à <strong>5 propositions</strong> de logos',
      '<strong>2 séries</strong> de retouches',
      'Livraison <strong>PNG, JPG, PDF HD, SVG vectorisé</strong>',
      'Charte graphique complète (palette étendue, police secondaire, usages)',
      'Déclinaisons sur maquettes (ex. carte de visite)',
      '<strong>Cession complète des droits</strong> sur le logo final',
    ],
  },
  {
    label: 'Premium',
    href: '/boutique/logo-premium',
    price: 'À partir de 480 €',
    items: [
      'Audit vidéo (30 min)',
      'Jusqu’à <strong>8 propositions</strong> de logos',
      '<strong>3 séries</strong> de retouches',
      'Livraison <strong>PNG, JPG, PDF HD, SVG vectoriel</strong>',
      'Déclinaisons incluses (noir & blanc, horizontal, vertical, icône seule)',
      'Charte graphique complète avec cession des droits',
    ],
    cta: { label: 'Voir le pack', href: '/boutique/logo-premium' },
  },
];

export const PRODUCTS = [
  /* ------------ LOGO : Essentiel ------------ */
  {
    slug: 'logo-essentiel',
    title: 'Pack Essentiel',
    category: 'Identité visuelle & Branding',
    image: 'https://www.dropbox.com/scl/fi/918t4ai9k57cank4xquqx/1.png?rlkey=3k4c7fykbmkz13p1mzrsck8pc&st=54qs3n2f&raw=1',
    price: 250,
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '250 € – Tarif dégressif selon la taille de l’entreprise. Accès immédiat au cahier des charges.',
    badges: ['Démarrage rapide'],
    highlights: [
      'Accès immédiat au cahier des charges',
      'Rendez-vous visio inclus',
      'Cession complète des droits sur le logo final',
    ],
    includes: [
      'Entretien visio après la remise du cahier des charges (20 min)',
      'Jusqu’à 3 propositions de logo',
      '1 série de retouches sur le logo choisi',
      'Livraison en PNG, JPG + fichier vectorisé (SVG)',
      'Mini charte graphique : codes couleurs (CMJN, RVB, HEX) + nom(s) de police(s)',
      'Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">➕ Tarifs dégressifs selon la taille de l’entreprise</h3>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-neutral-800">
          <li>Indépendants / Auto-entrepreneurs / Freelances : prix affiché</li>
          <li>Petite entreprise (≤ 10 salariés) : +20&nbsp;%</li>
          <li>PME, SARL, EURL, SA : +35&nbsp;%</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">📎 Inclus</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Accès immédiat au cahier des charges en ligne</li>
          <li>Accès au rendez-vous visio pour valider votre brief</li>
          <li>Entretien visio après la remise du cahier des charges (avant modifications)</li>
          <li>Jusqu’à 3 propositions de logo + 1 série de retouches sur le logo choisi</li>
          <li>Livraison en PNG, JPG + fichier vectorisé (SVG)</li>
          <li>Mini charte graphique incluse : codes couleurs (CMJN, RVB, HEX) + nom(s) de police(s)</li>
          <li>Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
          Il me permettra de préparer l’audit et de créer un logo parfaitement aligné à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Identité visuelle & Branding',
    matrixNote:
      '⚡ À savoir : Vous choisissez votre pack et passez commande. Vous recevez immédiatement un cahier des charges interactif. Vous le complétez puis programmez votre visio pour lancer la création.',
    tableRows: LOGO_MATRIX_ROWS,
  },

  /* ------------ LOGO : Pro ------------ */
  {
    slug: 'logo-pro',
    title: 'Pack Pro',
    category: 'Identité visuelle & Branding',
    image: 'https://www.dropbox.com/scl/fi/aaw9ncadrota3nb8pd9b4/2.png?rlkey=3vlmamvjc7hz1frv91azf2n3l&st=7teiqp4y&raw=1',
    price: 360,
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '360 € – Tarif dégressif selon la taille de l’entreprise. Formule best seller pour aller plus loin.',
    badges: ['Best seller'],
    highlights: [
      'Accès immédiat au cahier des charges',
      'Rendez-vous visio inclus',
      'Cession complète des droits sur le logo final',
    ],
    includes: [
      'Entretien visio après la remise du cahier des charges (30 min)',
      'Jusqu’à 5 propositions de logo',
      '2 séries de retouches sur le logo choisi',
      'Livraison PNG, JPG, PDF HD + fichier vectorisé (SVG)',
      'Charte graphique complète : déclinaisons, palette étendue, polices secondaires, usages recommandés',
      'Intégration sur maquettes (carte de visite, réseaux sociaux, papeterie, etc.)',
      'Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">➕ Tarifs dégressifs selon la taille de l’entreprise</h3>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-neutral-800">
          <li>Indépendants / Auto-entrepreneurs / Freelances : prix affiché</li>
          <li>Petite entreprise (≤ 10 salariés) : +20&nbsp;%</li>
          <li>PME, SARL, EURL, SA : +35&nbsp;%</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">📎 Inclus</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Accès immédiat au cahier des charges en ligne</li>
          <li>Accès au rendez-vous visio pour cadrer votre identité</li>
          <li>Entretien visio après la remise du cahier des charges (avant modifications)</li>
          <li>Jusqu’à 5 propositions de logo et 2 séries de retouches sur le logo choisi</li>
          <li>Livraison en PNG, JPEG, PDF HD + fichier vectorisé (SVG)</li>
          <li>Charte graphique complète : déclinaisons, palette étendue, polices secondaires, usages recommandés</li>
          <li>Intégration sur maquettes (carte de visite, réseaux sociaux, papeterie, etc.)</li>
          <li>Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
          Il me permettra de préparer l’audit et de créer un logo parfaitement aligné à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Identité visuelle & Branding',
    matrixNote:
      '⚡ À savoir : Vous choisissez votre pack et passez commande. Vous recevez immédiatement un cahier des charges interactif. Vous le complétez puis programmez votre visio pour lancer la création.',
    tableRows: LOGO_MATRIX_ROWS,
  },

  /* ------------ LOGO : Premium ------------ */
  {
    slug: 'logo-premium',
    title: 'Pack Premium',
    category: 'Identité visuelle & Branding',
    image: 'https://www.dropbox.com/scl/fi/z1gqqujjqnv5tz4ldwfay/3.png?rlkey=rm3m002yxet5b9j836cox31o0&st=g9clcl04&raw=1',
    price: 480,
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '480 € – Tarif dégressif selon la taille de l’entreprise. Le plus complet pour une identité aboutie.',
    badges: ['Le plus complet'],
    highlights: [
      'Accès immédiat au cahier des charges',
      'Rendez-vous visio inclus',
      'Cession complète des droits sur le logo final',
    ],
    includes: [
      'Entretien visio après la remise du cahier des charges (30 min)',
      'Jusqu’à 8 propositions de logo',
      '3 séries de retouches sur le logo choisi',
      'Livraison PNG, JPG, PDF HD, SVG vectoriel',
      'Déclinaisons incluses : noir & blanc, horizontal, vertical, icône seule',
      'Charte graphique complète : déclinaisons, palette étendue, polices secondaires, usages recommandés',
      'Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">➕ Tarifs dégressifs selon la taille de l’entreprise</h3>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-neutral-800">
          <li>Indépendants / Auto-entrepreneurs / Freelances : prix affiché</li>
          <li>Petite entreprise (≤ 10 salariés) : +20&nbsp;%</li>
          <li>PME, SARL, EURL, SA : +35&nbsp;%</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">📎 Inclus</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Accès immédiat au cahier des charges en ligne</li>
          <li>Accès au rendez-vous visio pour valider votre brief</li>
          <li>Entretien visio après la remise du cahier des charges (avant modifications)</li>
          <li>Jusqu’à 8 propositions de logo et 3 séries de retouches sur le logo choisi</li>
          <li>Livraison en PNG, JPEG, PDF HD, SVG vectoriel</li>
          <li>Déclinaisons incluses : noir &amp; blanc, horizontal, vertical, icône seule</li>
          <li>Charte graphique : déclinaisons, palette étendue, polices secondaires, usages recommandés, intégration sur maquettes</li>
          <li>Cession complète des droits sur le logo final validé (tous supports, monde, durée légale)</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
          Il me permettra de préparer l’audit et de créer un logo parfaitement aligné à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Identité visuelle & Branding',
    matrixNote:
      '⚡ À savoir : Vous choisissez votre pack et passez commande. Vous recevez immédiatement un cahier des charges interactif. Vous le complétez puis programmez votre visio pour lancer la création.',
    tableRows: LOGO_MATRIX_ROWS,
  },

  /* =========================================
   * RÉDACTION SUR LES RÉSEAUX (Social)
   * =======================================*/

  // Matrice commune pour afficher la comparaison sur chacune des pages Social
  {
    slug: 'redaction-visible',
    title: 'Pack Visible',
    category: 'Rédaction sur les réseaux',
    image: 'https://www.dropbox.com/scl/fi/moepbts83tv98qrxrn96h/1-redaction-web-jwl-marketing.png?rlkey=1k3ltwx29w1srsttrqpx3htez&st=b3abw5db&raw=1',
    price: 150, // base = SANS SEO
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '150 € (sans SEO) – 4 posts/mois + 1 révision/post. Options SEO et visuels au choix.',
    badges: ['Express'],
    highlights: [
      '4 posts par mois (texte)',
      '1 révision par post',
      'Accès immédiat au cahier des charges',
    ],
    options: {
      pricingMode: 'options',
      seoDelta: 70,
      visualDelta: 70,
    },
    includes: [
      'Entretien visio après la remise du cahier des charges',
      'Textes punchy adaptés à vos réseaux (sans SEO)',
      'Vous fournissez les photos / visuels',
      'Mention de la marque JWL Marketing sur les hashtags',
      '1 révision texte incluse par post',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">✏ Rédaction posts (sans SEO)</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>4 posts / mois (texte seul) + 1 révision par post</li>
          <li>Accès immédiat au cahier des charges et au rendez-vous visio</li>
          <li>Livraison en PDF avec rédaction des posts pour validation avant mise en ligne</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">➕ Options</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Création de visuel : +70&nbsp;€ (1 modification incluse)</li>
          <li>Formule avec SEO : 220&nbsp;€ (textes optimisés avec mots-clés + hashtags stratégiques)</li>
          <li>Posts supplémentaires (sur devis) : +35&nbsp;€/post (texte seul) ou +50&nbsp;€/post avec création visuel</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">🚀 Formule rédaction posts (avec SEO)</h3>
        <p class="mt-2 text-neutral-800">
          Inclus la formule de base + optimisation des textes avec mots-clés &amp; hashtags SEO adaptés à vos réseaux.
        </p>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Posts supplémentaires (sur devis) : +45&nbsp;€/post (texte seul) ou +50&nbsp;€/post avec visuel</li>
          <li>Modifications supplémentaires sur les visuels : +15&nbsp;€/visuel</li>
          <li>Réécriture complète d’un texte : +30&nbsp;€/post</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio. Il me permettra de préparer l’audit et de créer des posts parfaitement alignés à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Rédaction sur les réseaux',
    matrixNote: '⚡ À savoir : Vous choisissez votre formule, recevez un cahier des charges interactif, complétez votre brief puis planifiez votre visio avant lancement.',
    tableRows: [
      {
        label: 'Visible “Express”',
        href: '/boutique/redaction-visible',
        price: 'Sans SEO : 150 € • SEO : 220 €',
        badge: 'Starter',
        items: [
          '4 posts / mois (1 post / semaine)',
          '1 révision par post',
          'Création visuelle : +70 €',
        ],
      },
      {
        label: 'Connecté “Standard”',
        href: '/boutique/redaction-connecte',
        price: 'Sans SEO : 320 € • SEO : 420 €',
        highlight: true,
        badge: 'Best seller',
        items: [
          '8 posts / mois (2 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +140 €',
        ],
      },
      {
        label: 'Influence “Premium”',
        href: '/boutique/redaction-influence',
        price: 'Sans SEO : 540 € • SEO : 640 €',
        items: [
          '12 posts / mois (3 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +210 €',
        ],
      },
    ],
  },

  // --- Connecté ---
  {
    slug: 'redaction-connecte',
    title: 'Pack Connecté',
    category: 'Rédaction sur les réseaux',
    image: 'https://www.dropbox.com/scl/fi/zdthb76kdh0yu4cqu64fq/2-communication-marketing-jwl.png?rlkey=xlvwn8qvpos3aeh5s0gd44tkx&st=dshmd723&raw=1',
    price: 320,
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '320 € (sans SEO) – 8 posts/mois + 1 révision/post. Formule régulière pour PME.',
    badges: ['Best seller'],
    highlights: [
      '8 posts par mois (texte)',
      '1 révision par post',
      'Accès immédiat au cahier des charges',
    ],
    options: {
      pricingMode: 'options',
      seoDelta: 100,
      visualDelta: 140,
    },
    includes: [
      'Entretien visio après la remise du cahier des charges',
      'Textes punchy adaptés à vos réseaux (sans SEO)',
      'Vous fournissez les photos / visuels',
      'Mention de la marque JWL Marketing sur les hashtags',
      '1 révision texte incluse par post',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">✏ Rédaction posts (sans SEO)</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>8 posts / mois (texte seul) + 1 révision par post</li>
          <li>Accès immédiat au cahier des charges et au rendez-vous visio</li>
          <li>Livraison en PDF avec rédaction des posts pour validation avant mise en ligne</li>
          <li>Idéal pour les PME ou entrepreneurs qui veulent de la régularité</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">➕ Options</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Création de visuel : +140&nbsp;€ (1 modification incluse)</li>
          <li>Formule avec SEO : 420&nbsp;€ (textes optimisés avec mots-clés + hashtags stratégiques)</li>
          <li>Posts supplémentaires (sur devis) : +40&nbsp;€/post (texte seul) ou +50&nbsp;€/post avec visuel</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">🚀 Formule rédaction posts (avec SEO)</h3>
        <p class="mt-2 text-neutral-800">
          Inclus la formule de base + optimisation SEO complète des textes (mots-clés + hashtags).
        </p>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Posts supplémentaires (sur devis) : +50&nbsp;€/post (texte seul) ou +60&nbsp;€/post avec visuel</li>
          <li>Modifications supplémentaires sur les visuels : +15&nbsp;€/visuel</li>
          <li>Réécriture complète d’un texte : +30&nbsp;€/post</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio. Il me permettra de préparer l’audit et de créer des posts parfaitement alignés à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Rédaction sur les réseaux',
    matrixNote: '⚡ À savoir : Vous choisissez votre formule, recevez un cahier des charges interactif, complétez votre brief puis planifiez votre visio avant lancement.',
    tableRows: [
      {
        label: 'Visible “Express”',
        href: '/boutique/redaction-visible',
        price: 'Sans SEO : 150 € • SEO : 220 €',
        items: [
          '4 posts / mois (1 post / semaine)',
          '1 révision par post',
          'Création visuelle : +70 €',
        ],
      },
      {
        label: 'Connecté “Standard”',
        href: '/boutique/redaction-connecte',
        price: 'Sans SEO : 320 € • SEO : 420 €',
        highlight: true,
        badge: 'Best seller',
        items: [
          '8 posts / mois (2 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +140 €',
        ],
      },
      {
        label: 'Influence “Premium”',
        href: '/boutique/redaction-influence',
        price: 'Sans SEO : 540 € • SEO : 640 €',
        items: [
          '12 posts / mois (3 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +210 €',
        ],
      },
    ],
  },

  // --- Influence ---
  {
    slug: 'redaction-influence',
    title: 'Pack Influence',
    category: 'Rédaction sur les réseaux',
    image: 'https://www.dropbox.com/scl/fi/33fuj2d7b1o3pse9ozusz/3-social-media-jwl-marketing.png?rlkey=5ylntlrvhi26tdwb00bqu2rbb&st=mhppwcro&raw=1',
    price: 540,
    rating: 0,
    reviewsCount: 0,
    tvaNote: TVA_NOTE,
    excerpt: '540 € (sans SEO) – 12 posts/mois + 1 révision/post. Pour une cohérence réseaux maximale.',
    badges: ['Le plus complet'],
    highlights: [
      '12 posts par mois (texte)',
      '1 révision par post',
      'Accès immédiat au cahier des charges',
    ],
    options: {
      pricingMode: 'options',
      seoDelta: 100,
      visualDelta: 210,
    },
    includes: [
      'Entretien visio après la remise du cahier des charges',
      'Textes punchy adaptés à vos réseaux (sans SEO)',
      'Vous fournissez les photos / visuels',
      'Mention de la marque JWL Marketing sur les hashtags',
      '1 révision texte incluse par post',
    ],
    richContent: `
      <section>
        <h3 class="text-lg font-semibold text-neutral-900">✏ Rédaction posts (sans SEO)</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>12 posts / mois (texte seul) + 1 révision par post</li>
          <li>Accès immédiat au cahier des charges et au rendez-vous visio</li>
          <li>Livraison en PDF avec rédaction des posts pour validation avant mise en ligne</li>
          <li>Cas où vous fournissez vos propres photos : le client garantit détenir les droits nécessaires</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">🤖 Droits sur les images IA</h3>
        <p class="mt-2 text-neutral-800">
          Avec DALL·E, Midjourney ou la plupart des IA commerciales, l’usage est libre une fois la génération payée.
          Les visuels IA générés sont libres de droits pour un usage commercial et cédés au client après règlement complet.
        </p>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">➕ Options</h3>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Création de visuel : +210&nbsp;€ (1 modification incluse)</li>
          <li>Formule avec SEO : 640&nbsp;€ (textes optimisés avec mots-clés + hashtags stratégiques)</li>
          <li>Posts supplémentaires (sur devis) : +45&nbsp;€/post (texte seul) ou +50&nbsp;€/post avec visuel</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">🚀 Formule rédaction posts (avec SEO)</h3>
        <p class="mt-2 text-neutral-800">
          Inclus la formule de base + optimisation complète SEO des textes et hashtags.
        </p>
        <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
          <li>Posts supplémentaires (sur devis) : +55&nbsp;€/post (texte seul) ou +60&nbsp;€/post avec visuel</li>
          <li>Modifications supplémentaires sur les visuels : +20&nbsp;€/visuel</li>
          <li>Réécriture complète d’un texte : +30&nbsp;€/post</li>
        </ul>
      </section>
      <section class="mt-6">
        <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
        <p class="mt-2 text-neutral-800">
          Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
          Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
          Il me permettra de préparer l’audit et de créer des posts parfaitement alignés à votre univers.
        </p>
      </section>
    `,
    matrixTitle: 'Rédaction sur les réseaux',
    matrixNote: '⚡ À savoir : Vous choisissez votre formule, recevez un cahier des charges interactif, complétez votre brief puis planifiez votre visio avant lancement.',
    tableRows: [
      {
        label: 'Visible “Express”',
        href: '/boutique/redaction-visible',
        price: 'Sans SEO : 150 € • SEO : 220 €',
        items: [
          '4 posts / mois (1 post / semaine)',
          '1 révision par post',
          'Création visuelle : +70 €',
        ],
      },
      {
        label: 'Connecté “Standard”',
        href: '/boutique/redaction-connecte',
        price: 'Sans SEO : 320 € • SEO : 420 €',
        items: [
          '8 posts / mois (2 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +140 €',
        ],
      },
      {
        label: 'Influence “Premium”',
        href: '/boutique/redaction-influence',
        price: 'Sans SEO : 540 € • SEO : 640 €',
        highlight: true,
        badge: 'Le plus complet',
        items: [
          '12 posts / mois (3 posts / semaine)',
          '1 révision par post',
          'Création visuelle : +210 €',
        ],
      },
    ],
  },
];

/* ============================
 *  REfonte Web (solo category)
 * ========================== */
PRODUCTS.push({
  slug: 'refonte-web',
  title: 'Pack Refonte Web',
  category: 'Refonte Web',
  image: 'https://www.dropbox.com/scl/fi/33fuj2d7b1o3pse9ozusz/3-social-media-jwl-marketing.png?rlkey=5ylntlrvhi26tdwb00bqu2rbb&st=mhppwcro&raw=1',
  price: 450, // base sans SEO
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '450 € (sans SEO) – Refonte de site jusqu’à 5 pages principales. Options SEO et visuels IA.',
  badges: ['Refonte'],
  highlights: [
    'Accès immédiat au cahier des charges',
    'Jusqu’à 5 pages principales incluses',
    'Livraison PDF avec corrections prêtes à intégrer',
  ],
  pricingMode: 'advanced',
  advanced: {
    fields: [
      {
        type: 'select',
        key: 'seoMode',
        label: 'Optimisation',
        display: 'segmented',
        default: 'sans',
        options: [
          { label: 'Sans SEO (450 €)', value: 'sans', pricing: { absolute: 450 } },
          { label: 'Avec SEO (950 €)', value: 'seo', pricing: { absolute: 950 } },
        ],
      },
      {
        type: 'select',
        key: 'siteType',
        label: 'Type de site',
        options: [
          { label: 'Site vitrine', value: 'vitrine' },
          { label: 'Site e-commerce', value: 'ecommerce' },
          { label: 'Blog / site contenu', value: 'blog' },
        ],
      },
      {
        type: 'slider',
        key: 'pagesPlus',
        label: 'Pages additionnelles',
        helper: 'Base : 5 pages principales incluses. +85 € par page supplémentaire.',
        min: 0,
        max: 10,
        default: 0,
        unit: 'page',
        unitPlural: 'pages',
        pricing: { deltaPerUnit: 85 },
      },
      {
        type: 'slider',
        key: 'productsPlus',
        label: 'Fiches produit supplémentaires',
        helper: 'Base : 5 fiches produit incluses pour l’e-commerce. +25 € par fiche supplémentaire.',
        min: 0,
        max: 20,
        default: 0,
        unit: 'fiche',
        unitPlural: 'fiches',
        pricing: { deltaPerUnit: 25 },
      },
      {
        type: 'slider',
        key: 'articlesPlus',
        label: 'Articles ou paragraphes supplémentaires',
        helper: '+45 € par article (250 à 300 mots).',
        min: 0,
        max: 10,
        default: 0,
        unit: 'article',
        unitPlural: 'articles',
        pricing: { deltaPerUnit: 45 },
      },
      {
        type: 'slider',
        key: 'iaVisuals',
        label: 'Visuels IA personnalisés',
        helper: '+25 € par visuel (droits inclus).',
        min: 0,
        max: 10,
        default: 0,
        unit: 'visuel',
        unitPlural: 'visuels',
        pricing: { deltaPerUnit: 25 },
      },
      {
        type: 'checkbox',
        key: 'integration',
        label: 'Accompagnement intégration CMS (+150 €)',
        pricing: { delta: 150 },
      },
      {
        type: 'checkbox',
        key: 'fullSupport',
        label: 'Forfait accompagnement complet 1 semaine (+350 €)',
        pricing: { delta: 350 },
      },
      {
        type: 'checkbox',
        key: 'domain',
        label: 'Nom de domaine & hébergement (inclus)',
        default: true,
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Notes & précisions',
        placeholder: 'Indiquez vos pages, CMS, inspirations…',
      },
    ],
  },
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Schéma complet du site (PDF / Figma) : pages, sous-pages, menus, contenus, visuels',
    'Rédaction web des textes principaux (≈250 à 300 mots par page)',
    'Visio de suivi pour valider l’arborescence',
    'Envoi du PDF et de l’arborescence complète',
    'Une révision principale après envoi',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">➕ Options principales</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Type de site : vitrine, e-commerce ou blog (à préciser)</li>
        <li>Sans SEO (450 €) ou avec SEO complet (950 €)</li>
        <li>Création de visuels IA : +25 € / image (droits inclus)</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pack sans SEO</h3>
      <p class="mt-2 text-neutral-800">
        Site vitrine : jusqu’à 5 pages principales (Accueil, À propos, Services, Contact, Témoignages).<br/>
        Site e-commerce : jusqu’à 5 pages principales + 5 fiches produits.<br/>
        Blog / site contenu : jusqu’à 5 pages principales + 5 articles rédigés.
      </p>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Entretien visio après la remise du cahier des charges</li>
        <li>Schéma complet du site (PDF / Figma) : pages, sous-pages, menus, emplacement des contenus et visuels (photos fournies par le client)</li>
        <li>2ᵉ visio conférence sur la mise en place de l’arborescence et de la structure</li>
        <li>Rédaction web des textes principaux pour chaque page (≈250 à 300 mots par page)</li>
        <li>Envoi du PDF + 3ᵉ visio de restitution</li>
        <li>1 révision principale après envoi</li>
      </ul>
      <p class="mt-2 text-neutral-800">
        ❌ Non inclus : optimisation SEO / recherche de mots-clés, audit technique ou concurrentiel, création de visuels (option), intégration CMS.
      </p>
      <p class="mt-2 text-neutral-800">
        Options : page additionnelle +85 €, fiche produit supplémentaire +25 €, article supplémentaire +45 €, accompagnement intégration CMS +150 € (2h), forfait accompagnement 1 semaine +350 € (4h de visio), réajustements supplémentaires après la 1re révision : 80 €/h.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pack arborescence + rédaction web avec SEO</h3>
      <p class="mt-2 text-neutral-800">
        Pages principales optimisées SEO (maillage, titres, rédaction alignée sur vos mots-clés).<br/>
        Site e-commerce : 5 pages principales + 5 fiches produits optimisées.<br/>
        Blog : 5 pages principales + 5 articles SEO.
      </p>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>1 visio conférence pour le cahier des charges</li>
        <li>Schéma complet du site (PDF / Figma) avec maillage SEO</li>
        <li>2ᵉ visio sur la structure et l’optimisation</li>
        <li>Rédaction web optimisée SEO (≈1300 à 1600 mots au total)</li>
        <li>Envoi du PDF final + 3ᵉ visio SEO</li>
        <li>1 révision principale après envoi</li>
      </ul>
      <p class="mt-2 text-neutral-800">
        Options : page additionnelle optimisée SEO +145 €, page optimisée avec rédaction complète +275 €, fiche produit supplémentaire +25 €, article supplémentaire +75 €, accompagnement intégration CMS +150 €, forfait accompagnement complet +350 €, réajustements après la 1ʳᵉ révision : 80 €/h.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">📷 Vos visuels &amp; droits IA</h3>
      <p class="mt-2 text-neutral-800">
        Le client garantit détenir les droits ou autorisations nécessaires sur les fichiers fournis et dégage JWL Marketing de toute responsabilité en cas de réclamation de tiers.<br/>
        Les visuels IA générés sont libres de droits pour un usage commercial et cédés au client après règlement complet.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer la refonte de votre site, parfaitement alignée à votre univers.
      </p>
    </section>
  `,
});

/* =================================
 *  SEO : Starter / Booster / Local
 * ================================= */
PRODUCTS.push({
  slug: 'seo-starter',
  title: 'Starter SEO',
  category: 'Audit & Analyse SEO',
  image: 'https://www.dropbox.com/scl/fi/rxxni233t3aol4rqdk9bq/1-referencement-naturel-starter-seo-jwl-marketing.png?rlkey=eazg44zo7n6xv103s2ba1856q&st=rbymr4bs&raw=1',
  price: 290,
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '290 € – Audit SEO Starter avec plan éditorial de 3 contenus. Prix ajusté selon le nombre total de contenus.',
  badges: ['Découverte'],
  highlights: [
    'Audit SEO rapide (technique + contenu)',
    'Plan éditorial de 3 contenus inclus',
    'Accès immédiat au cahier des charges & visio',
  ],
  pricingMode: 'advanced',
  advanced: {
    fields: [
      {
        type: 'slider',
        key: 'contentCount',
        label: 'Nombre total de contenus',
        helper: 'Base : 3 contenus (290 €). +40 € par contenu supplémentaire.',
        min: 3,
        max: 10,
        default: 3,
        unit: 'contenu',
        unitPlural: 'contenus',
        pricing: { baseUnits: 3, deltaPerUnit: 40 },
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Secteur / mots-clés',
        placeholder: 'Parlez-moi de votre secteur, de vos mots-clés cibles, du CMS…',
      },
    ],
  },
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Audit SEO rapide (technique + contenu)',
    'Recherche exhaustive de mots-clés',
    'Évaluation de la structure de votre site web',
    'Plan de 3 contenus optimisés (articles ou pages)',
    'Conclusion livrée en PDF',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">➕ Options : ajouter des contenus</h3>
      <p class="mt-2 text-neutral-800">
        Ajustez le nombre total de contenus via le menu déroulant : chaque contenu supplémentaire ajoute 40&nbsp;€ (jusqu’à 10 contenus).
      </p>
      <table class="mt-4 w-full text-sm text-neutral-800">
        <thead class="bg-neutral-100 text-neutral-700">
          <tr>
            <th class="px-3 py-2 text-left font-semibold">Contenus</th>
            <th class="px-3 py-2 text-left font-semibold">Prix TTC</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200">
          <tr><td class="px-3 py-2">3 contenus (base)</td><td class="px-3 py-2">290 €</td></tr>
          <tr><td class="px-3 py-2">4 contenus</td><td class="px-3 py-2">330 €</td></tr>
          <tr><td class="px-3 py-2">5 contenus</td><td class="px-3 py-2">370 €</td></tr>
          <tr><td class="px-3 py-2">6 contenus</td><td class="px-3 py-2">410 €</td></tr>
          <tr><td class="px-3 py-2">7 contenus</td><td class="px-3 py-2">450 €</td></tr>
          <tr><td class="px-3 py-2">8 contenus</td><td class="px-3 py-2">490 €</td></tr>
          <tr><td class="px-3 py-2">9 contenus</td><td class="px-3 py-2">530 €</td></tr>
          <tr><td class="px-3 py-2">10 contenus</td><td class="px-3 py-2">570 €</td></tr>
        </tbody>
      </table>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Ce que je vais analyser</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Arborescence et structure de votre site</li>
        <li>Balises H1 / H2, URLs et images</li>
        <li>Vitesse de chargement et rédaction SEO actuelle</li>
        <li>Activité Google My Business et optimisation des pages clés</li>
        <li>Mini structure proposée pour vos pages (H1, H2, mots-clés associés)</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pourquoi choisir le Starter SEO ?</h3>
      <p class="mt-2 text-neutral-800">
        Le Starter SEO est la formule idéale pour lancer votre marketing digital et optimiser votre visibilité en ligne rapidement.
        Pensé pour les entrepreneurs et PME, il pose des fondations solides : audit ciblé, optimisation des pages clés, recommandations concrètes et actions mesurables.
      </p>
      <p class="mt-2 text-neutral-800">
        🎯 En bref : vous gagnez en trafic qualifié, attirez de nouveaux clients et renforcez votre image de marque, tout en respectant votre budget.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer l’audit SEO parfaitement aligné à votre univers.
      </p>
    </section>
  `,
  // matrice SEO (liens cliquables vers les 3)
  matrixTitle: 'Measuring SEO Success',
  tableRows: [
    {
      label: 'Starter',
      href: '/boutique/seo-starter',
      price: 'À partir de 290€',
      badge: 'Découverte',
      items: [
        'Audit rapide + recommandations mots-clés',
        'Plan éditorial dès 3 contenus',
      ],
    },
    {
      label: 'Booster',
      href: '/boutique/seo-booster',
      price: 'À partir de 450€',
      highlight: true,
      badge: 'Best seller',
      items: [
        'Audit complet + stratégie SEO avancée',
        'Analyse concurrentielle + calendrier éditorial',
      ],
    },
    {
      label: 'Local',
      href: '/boutique/seo-local',
      price: 'À partir de 540€',
      items: [
        'Analyse multi-canaux + audit GMB',
        'Contenus stratégiques & harmonisation NAP',
      ],
    },
  ],
});

PRODUCTS.push({
  slug: 'seo-booster',
  title: 'Booster SEO',
  category: 'Audit & Analyse SEO',
  image: 'https://www.dropbox.com/scl/fi/zkps5p9zzda2ufvovfqk2/2-referencement-naturel-booster-seo-jwl-marketing.png?rlkey=o1lx9lms4kxrevxrpmr8b4en1&st=967v2ic2&raw=1',
  price: 450,
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '450 € – Audit complet + stratégie + contenus. Ajustez le nombre de pages analysées.',
  badges: ['Best seller'],
  highlights: [
    'Analyse concurrentielle poussée (3 concurrents)',
    'Stratégie éditoriale sur 3 mois',
    'Contrôle de vos corrections après mise à jour',
  ],
  pricingMode: 'advanced',
  advanced: {
    fields: [
      {
        type: 'slider',
        key: 'pagesCount',
        label: 'Nombre total de pages analysées',
        helper: 'Base : 3 pages (450 €). +50 € par page supplémentaire.',
        min: 3,
        max: 10,
        default: 3,
        unit: 'page',
        unitPlural: 'pages',
        pricing: { baseUnits: 3, deltaPerUnit: 50 },
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Détails projet',
        placeholder: 'Objectifs SEO, concurrents, pages prioritaires…',
      },
    ],
  },
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Toutes les optimisations du Starter SEO',
    'Rédaction de la conclusion PDF',
    'Contrôle de vos corrections sur 3 pages après ajustements',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">➕ Options : nombre de pages</h3>
      <p class="mt-2 text-neutral-800">
        Ajustez le nombre total de pages analysées. Chaque page supplémentaire ajoute 50&nbsp;€ (jusqu’à 10 pages).
      </p>
      <table class="mt-4 w-full text-sm text-neutral-800">
        <thead class="bg-neutral-100 text-neutral-700">
          <tr>
            <th class="px-3 py-2 text-left font-semibold">Pages</th>
            <th class="px-3 py-2 text-left font-semibold">Prix TTC</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200">
          <tr><td class="px-3 py-2">3 pages (base)</td><td class="px-3 py-2">450 €</td></tr>
          <tr><td class="px-3 py-2">4 pages</td><td class="px-3 py-2">500 €</td></tr>
          <tr><td class="px-3 py-2">5 pages</td><td class="px-3 py-2">550 €</td></tr>
          <tr><td class="px-3 py-2">6 pages</td><td class="px-3 py-2">600 €</td></tr>
          <tr><td class="px-3 py-2">7 pages</td><td class="px-3 py-2">650 €</td></tr>
          <tr><td class="px-3 py-2">8 pages</td><td class="px-3 py-2">700 €</td></tr>
          <tr><td class="px-3 py-2">9 pages</td><td class="px-3 py-2">750 €</td></tr>
          <tr><td class="px-3 py-2">10 pages</td><td class="px-3 py-2">800 €</td></tr>
        </tbody>
      </table>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Ce que je vais analyser en plus</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Rédaction web SEO de 3 concurrents et leur positionnement</li>
        <li>Stratégie de contenu à long terme (calendrier éditorial sur 3 mois)</li>
        <li>Optimisation poussée du maillage interne et des CTA</li>
        <li>Analyse sémantique approfondie (mots-clés, champ lexical, structure)</li>
        <li>Analyse des commentaires et annotations de votre fiche Google Business Profile</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">🚀 Pourquoi choisir le Booster SEO ?</h3>
      <p class="mt-2 text-neutral-800">
        Pensé pour passer à la vitesse supérieure : grimper dans Google, attirer plus de visiteurs qualifiés et transformer vos prospects en clients fidèles.
      </p>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Analyse concurrentielle poussée</li>
        <li>Stratégie de contenu durable</li>
        <li>Optimisations techniques et marketing avancées</li>
        <li>Optimisation sémantique complète</li>
        <li>Suivi concret et vérification des résultats</li>
      </ul>
      <p class="mt-2 text-neutral-800">
        🎯 En bref : plus de trafic qualifié, plus de conversions, un positionnement solide et une stratégie claire.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer l’audit SEO parfaitement aligné à votre univers.
      </p>
    </section>
  `,
  matrixTitle: 'Measuring SEO Success',
  tableRows: [
    { label: 'Starter', href: '/boutique/seo-starter', price: 'À partir de 290€',
      items: ['Audit rapide', 'Reco mots-clés'] },
    { label: 'Booster', href: '/boutique/seo-booster', price: 'À partir de 450€', highlight: true, badge: 'Best seller',
      items: ['Audit complet', 'Stratégie SEO', '2 contenus'] },
    { label: 'Local', href: '/boutique/seo-local', price: 'À partir de 540€',
      items: ['Audit multi-canaux', 'Audit GMB', '3 contenus'] },
  ],
});

PRODUCTS.push({
  slug: 'seo-local',
  title: 'SEO Local',
  category: 'Audit & Analyse SEO',
  image: 'https://www.dropbox.com/scl/fi/jzc4sljb09pctrwqx0bxn/3-referencement-seo-local-jwl-marketing.png?rlkey=7ofl3rw1f47ghmvs3czvzbfjl&st=jjv3le7n&raw=1',
  price: 540,
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '540 € – SEO Local complet avec audit multi-canaux et contenus stratégiques.',
  badges: ['Local'],
  highlights: [
    'Analyse multi-canaux + audit Google Business Profile',
    '3 contenus stratégiques inclus',
    'Harmonisation web-to-store (NAP)',
  ],
  pricingMode: 'advanced',
  advanced: {
    fields: [
      {
        type: 'select',
        key: 'pagesPack',
        label: 'Nombre de pages / contenus locaux',
        helper: 'Choisissez le volume souhaité. Le prix s’ajuste automatiquement.',
        options: [
          { label: '3 contenus (540 €)', value: '3', pricing: { absolute: 540 } },
          { label: '4 contenus (650 €)', value: '4', pricing: { absolute: 650 } },
          { label: '5 contenus (750 €)', value: '5', pricing: { absolute: 750 } },
          { label: '6 contenus (850 €)', value: '6', pricing: { absolute: 850 } },
          { label: '7 contenus (950 €)', value: '7', pricing: { absolute: 950 } },
          { label: '8 contenus (1 050 €)', value: '8', pricing: { absolute: 1050 } },
          { label: '9 contenus (1 150 €)', value: '9', pricing: { absolute: 1150 } },
          { label: '10 contenus (1 250 €)', value: '10', pricing: { absolute: 1250 } },
        ],
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Zones prioritaires',
        placeholder: 'Indiquez vos villes, agences, services phares…',
      },
    ],
  },
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Analyse concurrentielle de vos 3 principaux concurrents locaux',
    'Analyse de votre présence multi-canaux (site, réseaux sociaux, annuaires, etc.)',
    'Audit complet de votre fiche Google Business Profile',
    'Analyse SEO complète de votre site web',
    '3 contenus stratégiques (articles, pages ou posts) pour générer du trafic local qualifié',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">Ce que j’analyse chez la concurrence locale</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Indexation et présence sur les réseaux sociaux</li>
        <li>Positionnement Google et efficacité de la rédaction SEO</li>
        <li>Qualité et gestion des avis clients</li>
        <li>Pertinence et optimisation de leur fiche Google Business Profile</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Sur votre entreprise</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Arborescence, structure, balises H1 / H2 et URLs</li>
        <li>Images, vitesse de chargement et rédaction SEO actuelle</li>
        <li>Activité Google Business Profile : informations, catégories, description, images, posts, avis</li>
        <li>Proposition de contenus stratégiques pour générer du trafic local qualifié</li>
        <li>Cohérence web-to-store : harmonisation des informations NAP (Nom, Adresse, Téléphone)</li>
        <li>Recommandations réseaux sociaux ciblées pour booster votre visibilité locale</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">🌍 Boostez votre visibilité locale</h3>
      <p class="mt-2 text-neutral-800">
        Le SEO Local met votre entreprise sur la carte : audit complet de votre présence locale, optimisation stratégique de votre profil et de votre site, recommandations concrètes et harmonisation web-to-store.
      </p>
      <p class="mt-2 text-neutral-800">
        🎯 En bref : attirez vos clients de proximité, augmentez votre trafic qualifié et renforcez votre présence locale avec un budget maîtrisé.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer l’audit SEO Local parfaitement aligné à votre univers.
      </p>
    </section>
  `,
  matrixTitle: 'Measuring SEO Success',
  tableRows: [
    {
      label: 'Starter',
      href: '/boutique/seo-starter',
      price: 'À partir de 290€',
      items: [
        'Audit rapide + recommandations mots-clés',
        'Plan éditorial dès 3 contenus',
      ],
    },
    {
      label: 'Booster',
      href: '/boutique/seo-booster',
      price: 'À partir de 450€',
      items: [
        'Audit complet + stratégie SEO avancée',
        'Analyse concurrentielle + calendrier éditorial',
      ],
    },
    {
      label: 'Local',
      href: '/boutique/seo-local',
      price: 'À partir de 540€',
      highlight: true,
      badge: 'Local',
      items: [
        'Analyse multi-canaux + audit GMB',
        'Contenus stratégiques & harmonisation NAP',
      ],
    },
  ],
});

/* ==================
 *  Google GMB (solo)
 * =================*/
PRODUCTS.push({
  slug: 'google-gmb',
  title: 'Google GMB',
  category: 'Google GMB',
  image: 'https://www.dropbox.com/scl/fi/stfodx4qcsckkukq1vsjs/google-gmb-jwl-marketing.png?rlkey=ubp54db8skqsl1z999kwjyr4a&st=80dxfat9&raw=1',
  price: 0,
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: 'Boostez votre visibilité locale : gestion complète de votre fiche Google Business Profile sur devis.',
  badges: ['Devis'],
  highlights: [
    'Gestion des avis clients',
    'Mise à jour régulière des informations',
    'Création de contenus dédiés GMB',
  ],
  pricingMode: 'advanced',
  advanced: { perDay: false, hidePrice: true },
  checkoutHref: '/contact?subject=google-gmb',
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">Ce que je propose pour votre fiche Google Business Profile</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Gestion complète des avis clients : réponse, valorisation et encouragement des retours positifs</li>
        <li>Mise à jour régulière des informations : horaires, photos, services, promotions, événements</li>
        <li>Création de contenu dédié : publications, annonces, nouveautés et actualités locales</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Outils pour faciliter votre visibilité</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>QR codes personnalisés pour vos flyers, cartes de visite ou vitrines</li>
        <li>Supports visuels sur-mesure (affiches, flyers, stickers) pour vos promotions et événements</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pourquoi ça marche ?</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Vos clients vous trouvent plus facilement sur Google et Maps</li>
        <li>Vous améliorez votre réputation en ligne grâce à des avis bien gérés</li>
        <li>Vous créez du lien avec vos clients actuels et attirez de nouveaux clients</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Comment ça se passe ?</h3>
      <ol class="mt-2 list-decimal space-y-2 pl-5 text-neutral-800">
        <li>On fait le point sur votre activité et vos besoins</li>
        <li>Je mets en place une stratégie de visibilité adaptée</li>
        <li>Vous suivez l’évolution et profitez des retours clients pendant que je gère le reste</li>
      </ol>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre demande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer l’accompagnement Google Business Profile parfaitement aligné à votre univers.
      </p>
    </section>
  `,
});

/* ============================
 *  Prospection / Salon / Form
 * ===========================*/
PRODUCTS.push({
  slug: 'prospection-b2b',
  title: 'Pack Prospection',
  category: 'Prospection B2B',
  image: 'https://www.dropbox.com/scl/fi/my2zbmc79scfo3x7e5903/developpement-commercial-b2b-wl-marketing-paca.png?rlkey=km38m7antng4wreah3yr83da7&st=e9l9h758&raw=1',
  price: 500, // tarif journalier TPE indicatif
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '500 € / jour – Externalisez votre prospection B2B avec une experte. Tarif ajusté selon la taille d’entreprise.',
  badges: ['Jour'],
  highlights: [
    'TJM indicatif : 500 € (TPE)',
    'Jusqu’à 21 jours de mission',
    'Option prospection qualifiée (+30 %)',
  ],
  pricingMode: 'advanced',
  advanced: {
    ctaLabel: 'Demander un devis',
    fields: [
      {
        type: 'slider',
        key: 'days',
        label: 'Nombre de jours',
        min: 1,
        max: 21,
        step: 1,
        default: 1,
        unit: 'jour',
        unitPlural: 'jours',
        helper: 'Sélectionnez la durée (1 à 21 jours). Tarif journalier indicatif 500 € pour TPE.',
        pricing: { baseUnits: 1, deltaPerUnit: 500 },
      },
      {
        type: 'select',
        key: 'companySize',
        label: 'Taille d’entreprise',
        display: 'segmented',
        default: 'tpe',
        options: [
          { label: 'TPE (0-9)', value: 'tpe', pricing: { factor: 1 } },
          { label: 'PME (10-49)', value: 'pme', pricing: { factor: 1.4 } },
          { label: 'Grande entreprise (250+)', value: 'ge', pricing: { factor: 1.8 } },
        ],
      },
      {
        type: 'checkbox',
        key: 'leadbuild',
        label: 'Prospection qualifiée (+30%)',
        helper: 'Construction de la base contacts + scripts personnalisés.',
        pricing: { percent: 0.3 },
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Précisions ou contexte',
        placeholder: 'Objectifs, secteur, outils CRM…',
      },
    ],
  },
  checkoutHref: '/contact?subject=prospection-b2b',
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Prospection téléphonique & digitale (LinkedIn, email)',
    'Prise de rendez-vous qualifiés',
    'Campagnes d’emailing B2B ciblées',
    'Suivi et relance prospects jusqu’à la signature',
    'Mise en place d’outils de suivi (CRM ou fichier simple)',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">Tarifs indicatifs par taille d’entreprise</h3>
      <table class="mt-3 w-full text-sm text-neutral-800">
        <thead class="bg-neutral-100 text-neutral-700">
          <tr>
            <th class="px-3 py-2 text-left font-semibold">Type d’entreprise</th>
            <th class="px-3 py-2 text-left font-semibold">TJM indicatif</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200">
          <tr><td class="px-3 py-2">Micro-entreprise (TPE)</td><td class="px-3 py-2">500 €</td></tr>
          <tr><td class="px-3 py-2">Petite entreprise (PE)</td><td class="px-3 py-2">≈ 700 €</td></tr>
          <tr><td class="px-3 py-2">Grande entreprise</td><td class="px-3 py-2">≈ 900 €</td></tr>
        </tbody>
      </table>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Fonctionnement</h3>
      <p class="mt-2 text-neutral-800">
        JWL Marketing est mandaté pour réaliser la mission : appels, prises de contact, mise à jour des fiches prospects. La qualification dépend de la disponibilité des prospects et n’influence pas le montant facturé.
      </p>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Tarif journalier fixe selon la taille de votre entreprise</li>
        <li>Nombre d’appels variable selon la qualité de la base fournie</li>
        <li>Option “Prospection qualifiée” : +30 % pour la construction d’une base ciblée</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pourquoi externaliser votre prospection ?</h3>
      <p class="mt-2 text-neutral-800">
        Vous payez pour une action commerciale concrète, sans charges fixes ni perte de temps.
        Plus de 10 ans d’expérience en développement commercial B2B pour ouvrir de nouveaux marchés, décrocher des rendez-vous qualifiés et transformer vos prospects en clients.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer la mission de prospection parfaitement alignée à votre univers.
      </p>
      <p class="mt-2 text-neutral-800">
        👉 Besoin d’échanger ? Contactez-moi depuis la page contact.
      </p>
    </section>
  `,
});

PRODUCTS.push({
  slug: 'pack-salon',
  title: 'Pack Salon',
  category: 'Prospection B2B',
  image: 'https://www.dropbox.com/scl/fi/0jb1mw1pfrlaeyxd4r0ny/developpement-commercial-b2b-salon-aix-marseille.png?rlkey=lou022c3z3x16606atpn4oa06&st=dwji9foe&raw=1',
  price: 450, // tarif journalier
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '450 € / jour – Représentation commerciale sur vos salons professionnels en région PACA.',
  badges: ['Jour'],
  highlights: [
    'Collecte et qualification de contacts',
    'Compte rendu détaillé après salon',
    'Option préparation stand & scripts',
  ],
  pricingMode: 'advanced',
  advanced: {
    ctaLabel: 'Demander un devis',
    fields: [
      {
        type: 'slider',
        key: 'days',
        label: 'Nombre de jours sur place',
        min: 1,
        max: 5,
        default: 1,
        unit: 'jour',
        unitPlural: 'jours',
        helper: 'Sélectionnez la durée (1 à 5 jours). +450 € par jour supplémentaire.',
        pricing: { baseUnits: 1, deltaPerUnit: 450 },
      },
      {
        type: 'checkbox',
        key: 'prep',
        label: 'Préparation stand & scripts (+120 €)',
        pricing: { delta: 120 },
      },
      {
        type: 'checkbox',
        key: 'reporting',
        label: 'Reporting détaillé (inclus)',
        helper: 'Compte-rendu et fiche contacts fournis sous 48h.',
        default: true,
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Infos logistiques',
        placeholder: 'Lieu, horaires, briefing, accès badge…',
      },
    ],
  },
  checkoutHref: '/contact?subject=pack-salon',
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Présence physique sur votre salon (région PACA)',
    'Prospection active des visiteurs',
    'Collecte de contacts et informations clés',
    'Reporting détaillé et fiche contacts sous 48h',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">Description</h3>
      <p class="mt-2 text-neutral-800">
        Soyez présents sur vos salons professionnels sans lever le petit doigt !
        Je représente votre entreprise, prospecte, collecte des contacts et identifie de nouvelles opportunités.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Options & frais sur devis</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Préparation avant salon (supports, brief, organisation)</li>
        <li>Frais de 5 € / contact qualifié collecté sur le salon</li>
        <li>Frais de déplacement, hébergement, restauration, parking ou essence</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Pourquoi choisir ce pack ?</h3>
      <p class="mt-2 text-neutral-800">
        Gagnez du temps, maximisez vos contacts et assurez-vous une représentation professionnelle sur vos salons.
      </p>
      <p class="mt-2 text-neutral-800">
        👉 Besoin d’échanger ? Contactez-moi depuis la page contact.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer votre présence salon, parfaitement alignée à votre univers.
      </p>
    </section>
  `,
});

PRODUCTS.push({
  slug: 'pack-formation',
  title: 'Pack Formation',
  category: 'Prospection B2B',
  image: 'https://www.dropbox.com/scl/fi/2wxfncx73hvrhxsntns2f/formation-aix-marseille-adulte-jwl-marketing.png?rlkey=ji4o40c53cfqbz4e8wdwgqpgj&st=s6wzmf0n&raw=1',
  price: 550, // tarif journalier
  rating: 0,
  reviewsCount: 0,
  tvaNote: TVA_NOTE,
  excerpt: '550 € / jour – Formation & coaching commercial sur-mesure. Tarif ajusté selon la taille et le nombre de participants.',
  badges: ['Jour'],
  highlights: [
    'Modules personnalisés (prospection, négociation, LinkedIn…)',
    'Tarif à la journée, flexible de 1 à 5 jours',
    'Option groupe supplémentaire : +30% par tranche de 10 personnes',
  ],
  pricingMode: 'advanced',
  advanced: {
    ctaLabel: 'Demander un devis',
    fields: [
      {
        type: 'slider',
        key: 'days',
        label: 'Nombre de jours',
        min: 1,
        max: 5,
        default: 1,
        unit: 'jour',
        unitPlural: 'jours',
        helper: 'Sélectionnez la durée (1 à 5 jours). +550 € par jour supplémentaire.',
        pricing: { baseUnits: 1, deltaPerUnit: 550 },
      },
      {
        type: 'select',
        key: 'companySize',
        label: 'Taille d’entreprise',
        display: 'segmented',
        default: 'tpe',
        options: [
          { label: 'TPE (0–9)', value: 'tpe', pricing: { factor: 1 } },
          { label: 'PME (10–49)', value: 'pme', pricing: { factor: 1.2 } },
          { label: 'PME+ (50–249)', value: 'pme2', pricing: { factor: 1.35 } },
          { label: 'GE (250+)', value: 'ge', pricing: { factor: 1.5 } },
        ],
      },
      {
        type: 'number',
        key: 'participants',
        label: 'Nombre de participants',
        min: 1,
        default: 10,
        helper: 'Au-delà de 10 participants, +30 % par tranche de 10 personnes supplémentaires.',
        pricing: { percentSteps: { threshold: 10, step: 10, percent: 0.3 } },
      },
      {
        type: 'checkbox',
        key: 'support',
        label: 'Support pédagogique personnalisé (+90 €)',
        pricing: { delta: 90 },
      },
      {
        type: 'textarea',
        key: 'notes',
        label: 'Notes & objectifs',
        placeholder: 'Modules souhaités, niveau du groupe, contraintes…',
      },
    ],
  },
  checkoutHref: '/contact?subject=pack-formation',
  includes: [
    'Entretien visio après la remise du cahier des charges',
    'Ateliers pratiques : prospection, relances, pitch commercial',
    'Techniques de négociation & closing',
    'Formation à la gestion d’un portefeuille clients',
    'Coaching LinkedIn B2B pour générer des leads',
    'Mise en place de méthodes simples pour suivre les actions commerciales',
  ],
  richContent: `
    <section>
      <h3 class="text-lg font-semibold text-neutral-900">Mon expérience</h3>
      <p class="mt-2 text-neutral-800">
        Plus de 10 ans d’expérience en développement commercial B2B, un BTS NDRC (ex NRC) et une Licence Responsable Marketing & Commercial.
        Bientôt complété par une formation RNCP pour adultes afin d’aller encore plus loin dans l’accompagnement des entreprises.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Modules proposés</h3>
      <ul class="mt-2 list-disc space-y-2 pl-5 text-neutral-800">
        <li>Prospection, relances & pitch commercial</li>
        <li>Techniques de négociation et de closing</li>
        <li>Gestion de portefeuille clients</li>
        <li>Coaching LinkedIn B2B</li>
        <li>Mise en place de méthodes de suivi simples et actionnables</li>
      </ul>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">Fonctionnement</h3>
      <ol class="mt-2 list-decimal space-y-2 pl-5 text-neutral-800">
        <li>Vous choisissez la formule (atelier, formation, coaching).</li>
        <li>J’interviens en présentiel ou à distance.</li>
        <li>Tarif à la journée : identique pour 1 ou 10 participants.</li>
        <li>Nous calons ensemble la date et adaptons le contenu à vos objectifs.</li>
      </ol>
      <p class="mt-2 text-neutral-800">
        Résultat : une formation sur-mesure, 100&nbsp;% action, prête à booster vos performances commerciales.
      </p>
    </section>
    <section class="mt-6">
      <h3 class="text-lg font-semibold text-neutral-900">⚡ À savoir</h3>
      <p class="mt-2 text-neutral-800">
        Après votre commande, vous recevez automatiquement un cahier des charges en ligne.
        Merci de le compléter puis de me le renvoyer par mail, avant notre rendez-vous visio.
        Il me permettra de préparer la formation, parfaitement alignée à votre univers.
      </p>
    </section>
  `,
});
