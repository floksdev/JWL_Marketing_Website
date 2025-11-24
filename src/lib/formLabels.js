const FORM_LABELS = {
  'project-name': 'Nom du projet',
  'project-goal': 'Objectif principal',
  'project-url': 'Site Internet / URL',
  'project-date': 'Date de livraison souhaitée',
  'project-budget': 'Budget estimé',
  'project-description': 'Bref descriptif du projet',
  'client-company': "Nom de l'entreprise",
  'client-activity': 'Activité / Secteur',
  'client-audience': 'Cible / Audience',
  'client-location': 'Localisation',
  'client-contact': 'Personne de contact (Nom / Prénom / Fonction / Service)',
  'client-contact-details': 'Email / Téléphone',
  'client-reference': 'Référence interne / collaboration précédente',

  'audit-seo-packs': 'Sous-packs Audit SEO',
  'audit-seo-objectifs': 'Objectifs principaux (Audit SEO)',
  'audit-seo-priorites': 'Priorités spécifiques (Audit SEO)',
  'audit-seo-actions': 'Actions SEO déjà mises en place',
  'audit-seo-outils': 'Outils utilisés',
  'audit-seo-cms': 'CMS utilisé',
  'audit-seo-keywords': 'Mots-clés stratégiques ciblés',
  'audit-seo-pages': 'Pages optimisées / contenus existants',
  'audit-seo-competitors': 'Analyse de la concurrence',
  'audit-seo-kpi': 'Indicateurs de performance actuels',
  'audit-seo-gmb': 'Optimisation Google My Business déjà réalisée ?',
  'audit-seo-audience': 'Cible et audience du site',
  'audit-seo-problems': 'Problématiques clients à résoudre',
  'audit-seo-contraintes': 'Contraintes techniques / juridiques / budgétaires',
  'audit-seo-ressources': 'Ressources internes disponibles',
  'audit-seo-collaboration': 'Attentes de la collaboration',
  'audit-seo-contact': 'Fréquence et mode de contact souhaités',

  'refonte-site-type': 'Type de site actuel',
  'refonte-objectifs': 'Objectifs principaux (Refonte web)',
  'refonte-fonctionnalites': 'Fonctionnalités spécifiques souhaitées',
  'refonte-inspirations': 'Sites de référence inspirants',
  'refonte-contraintes': 'Contraintes techniques et budget',
  'refonte-ressources': 'Ressources internes disponibles (Refonte web)',

  'branding-charte': 'Charte graphique existante',
  'branding-style': 'Style graphique recherché',
  'branding-colors': 'Couleurs préférées / à éviter',
  'branding-inspirations': 'Inspirations visuelles',
  'branding-message': 'Message ou image à transmettre',
  'branding-supports': 'Supports à créer',

  'social-reseaux': 'Réseaux utilisés',
  'social-objectifs': 'Objectifs Social Media',
  'social-ton': 'Ton et style de communication',
  'social-thematiques': 'Thématiques prioritaires',
  'social-contenus': 'Contenus existants à valoriser',
  'social-kpi': 'Indicateurs de performance souhaités',

  'biz-client-type': 'Type de client cible',
  'biz-objectifs': 'Objectifs Développement commercial',
  'biz-organisation': 'Organisation / modalités souhaitées',
  'biz-duree': 'Durée et déroulé des actions',
  'biz-niveau': 'Niveau actuel de développement commercial',
  'biz-kpi': 'Indicateurs de succès / KPI',
  'biz-contraintes': 'Contraintes et particularités',
  'biz-besoins': 'Besoins spécifiques liés aux activités',

  'formation-thematiques': 'Thématiques de formation souhaitées',
  'formation-public': 'Public visé',
  'formation-format': 'Format de la formation',
  'formation-objectifs': 'Objectifs précis et indicateurs de progression',
  'formation-contraintes': 'Contraintes organisationnelles',

  'gmb-objectifs': 'Objectifs Google My Business',
  'gmb-gestion': 'Souhaitez-vous un prestataire pour la fiche ?',
  'gmb-interne': 'Gestion interne / mise à jour ponctuelle ?',
  'gmb-informations': 'Informations complémentaires / remarques',
  'gmb-services': 'Services ou produits à mettre en avant',
  'gmb-promotions': 'Promotions ou événements à intégrer',
};

export function getFormFieldLabel(key = '') {
  if (!key) return '';
  if (FORM_LABELS[key]) return FORM_LABELS[key];
  if (key.endsWith('-autre')) {
    const base = key.replace(/-autre$/, '');
    if (FORM_LABELS[base]) {
      return `${FORM_LABELS[base]} (Autre)`;
    }
  }
  return key
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
