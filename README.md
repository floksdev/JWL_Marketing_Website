## Configuration

Create a `.env.local` file (see the existing example) and set the following variables for core services:

| Purpose | Key | Notes |
| --- | --- | --- |
| Stripe checkout | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL` | Redirect URLs must match the deployed domain. |
| Supabase | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Required for catalogue/orders storage. |
| Google Maps | `GOOGLE_MAPS_API_KEY` | Optional, only used where the map component is displayed. |
| Base site URL | `SITE_BASE_URL` | Used to resolve absolute links/images in transactional emails (`https://www.jwl-marketing.fr`). |
| Transactional email (SMTP) | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Point these at your Zimbra SMTP instance. Set `ORDERS_NOTIFICATION_EMAIL` if you want a BCC copy for admins. |
| Contact routing | `CONTACT_NOTIFICATION_EMAIL` | (Optional) Override the recipient for contact form submissions (defaults to SMTP/Orders email). |
| Calendrier RDV | `CALENDLY_URL` | URL du bouton “Prendre RDV” affiché dans les emails (ex. `https://calendly.com/...`). |
| Email branding | `EMAIL_LOGO_URL`, `EMAIL_HERO_IMAGE_URL` | Optional overrides for the logo/hero visuels utilisés dans les confirmations de commande. |
| Order link override | `MERCI_PAGE_URL` | (Optional) Absolute URL to the `/merci` page, used inside confirmation emails. Defaults to `STRIPE_SUCCESS_URL`. |

### SMTP / Zimbra quick start

1. Connect to the Zimbra admin console and create (or reuse) an account.  
2. Generate a password d’application if MFA/SAML is enabled, otherwise reuse the mailbox password.  
3. Gather the SMTP host (`smtp.votre-domaine.com`), port (587 TLS or 465 SSL) and credentials, then drop them into `.env.local`.  
4. Redeploy (or restart `npm run dev`). Every successful Stripe checkout now triggers an email to the buyer, plus a BCC to `ORDERS_NOTIFICATION_EMAIL` if set.

## Development

```bash
npm install
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000). Update files under `src/app` for pages or `src/components` for UI blocks; hot reloading is enabled.
