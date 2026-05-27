# CloudFix Trust Center

Static trust center website for CloudFix — security, compliance, and privacy documentation.

## Site Structure

```
trust-cloudfix/
├── index.html              # Overview / Home
├── security.html           # Security architecture & IAM details
├── privacy.html            # Privacy practices & data handling
├── compliance.html         # SOC 2, AWS partner certifications
├── data-processing.html    # DPA & sub-processor information
├── status.html             # Service status & incident history
├── contact.html            # Contact form & vulnerability reporting
├── css/
│   └── style.css           # All styles (responsive, mobile-first)
├── js/
│   └── main.js             # Navigation, accordion, form handling
├── assets/
│   ├── cloudfix-logo.svg
│   ├── soc2-badge.svg
│   ├── aws-partner-badge.svg
│   └── pgp-key.asc         # Placeholder
├── documents/
│   ├── CloudFix-DPA.pdf    # Placeholder
│   ├── CloudFix-Privacy-Policy.pdf
│   └── CloudFix-Terms.pdf
└── README.md
```

## Tech Stack

- **HTML5** — Semantic markup, no framework
- **CSS3** — Custom properties, flexbox, grid, mobile-first responsive
- **Vanilla JS** — Sidebar toggle, accordions, modal, form handling
- **No build step required** — deploy as-is

## Development

Just open `index.html` in a browser, or serve with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

## Deployment on Cloudflare Pages

### Option 1: Connect to GitHub

1. Push this directory to a GitHub repository (e.g., `cloudfix/trust-center`)
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select your repository
5. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)
6. Click **Save and Deploy**

### Option 2: Direct Upload

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Upload assets**
3. Upload the entire `trust-cloudfix/` directory
4. Name your project (e.g., `trust-cloudfix`)

### Custom Domain Setup

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Add `trust.cloudfix.com`
3. Cloudflare will automatically create the CNAME record in your DNS
4. SSL is automatically provisioned by Cloudflare

### DNS (if managing DNS separately)

Add a CNAME record:

```
trust.cloudfix.com  CNAME  trust-cloudfix.pages.dev
```

## Form Handling

The request access form and contact form currently show a success message on submit without actually sending data. To enable real submissions:

### Option A: Formspree

1. Create a form at [formspree.io](https://formspree.io)
2. Update the form `action` attribute:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

3. Update `js/main.js` to use actual form submission instead of the placeholder.

### Option B: Cloudflare Workers

1. Create a Cloudflare Worker that forwards submissions to email
2. Update the form `action` to point to your Worker URL

### Option C: AWS (SES + Lambda)

1. Create an API Gateway + Lambda function that sends email via SES
2. Update the form `action` to the API Gateway endpoint

## Customization

### Colors

Edit CSS custom properties in `css/style.css`:

```css
:root {
  --cf-navy: #0B1F3F;
  --cf-blue: #1B3A5C;
  --cf-green: #28A745;
  /* etc. */
}
```

### Content

All content is in the HTML files — no CMS or data layer. Edit directly.

### Adding Pages

1. Copy an existing page (e.g., `security.html`) as a template
2. Update the `<title>`, `<meta description>`, and active nav link
3. Add content to the `page-wrapper` section

## Post-Launch Checklist

- [ ] Replace placeholder PDFs in `documents/` with real documents
- [ ] Replace placeholder PGP key in `assets/pgp-key.asc`
- [ ] Set up form backend (Formspree, Workers, or Lambda)
- [ ] Add real AWS Marketplace partner link on compliance page
- [ ] Set up monitoring/alerting for the status page
- [ ] Consider adding a statuspage.io integration for real-time status
- [ ] Add Google Analytics or Plausible for traffic monitoring
- [ ] Submit sitemap to Google Search Console
- [ ] Test on all target browsers (Chrome, Firefox, Safari, Edge)
- [ ] Run Lighthouse audit (target: 95+ on all categories)

## License

Internal CloudFix property. All rights reserved.
