# Kiri Store - Trust & Privacy Center

![Kiri Store Logo](https://img.shields.io/badge/Kiri%20Store-Trust%20%26%20Privacy%20Center-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active%20%26%20Verified-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

This repository contains the official **Trust & Privacy Center** for **Kiri Store**, the open-source app store platform for GitHub. The Privacy Center is engineered to provide complete transparency, data minimization principles, robust security safeguards, and clear user privacy controls designed for alignment with Google Play Store developer requirements, GDPR, CCPA, and COPPA standards.

## 📄 Documentation Files

- **[privacy-policy.html](privacy-policy.html)** — Comprehensive interactive Privacy Center document with two-column reading layout, live search and highlight, sticky table of contents, and responsive mobile navigation.
- **[index.html](index.html)** — Mirror production entry point optimized for automatic root deployment on GitHub Pages (`https://kriss2012.github.io/Privecy-Policy/`).
- **`assets/`** — Modular architecture containing:
  - `css/variables.css` — Standardized design tokens (1440px max width, colors, spacing, shadows).
  - `css/base.css` — Accessible reset, fluid clamp typography, and container padding system.
  - `css/components.css` — Proportioned header, hero section, highlight cards, user rights grid, toolbar, FAQ, and contact cards.
  - `css/sidebar-content.css` — Two-column sticky table of contents and article layout.
  - `css/print.css` — Clean high-contrast print and PDF export stylesheet.
  - `js/privacy-center.js` — High-performance vanilla JS engine handling real-time search, scrollspy tracking, clipboard copying, and responsive drawers.

## 🏢 Organization & Privacy Contact

**Kiri Store**  
📍 Jalgon 424201, India  
📧 Privacy Contact & DPO: [202krishnapatil@gmail.com](mailto:202krishnapatil@gmail.com)  
⏱️ Response Timeframe: Within 30 calendar days

## 📋 Key Privacy Center Features

### 1. Cinematic Hero Section
- Clean, balanced SaaS presentation with official status badge.
- Main title: *"Your Privacy. Our Responsibility."*
- Proportioned SVG security shield with subtle concentric animations.
- 4 Trust Pillars: Zero Data Selling, Full Portability, At-Rest & Transit Encryption, Under-13 Protection.

### 2. Privacy Highlights (Executive Overview)
1. **Information Collection** — Direct profile inputs, device telemetry, and optional location with consent.
2. **Data Usage** — Service delivery, transaction fulfillment, security enforcement, and product improvements.
3. **Data Security** — SSL/TLS encryption in transit, sensitive data encryption at rest, role-based access.
4. **User Control** — Access, export, modify, or permanently erase personal information.
5. **Data Retention** — Defined schedules (e.g., 90 days post-deletion for accounts, 7 years for transactions).
6. **Children's Privacy** — Under-13 restriction and enhanced teen privacy settings.

### 3. User Privacy Rights Section
Dedicated visual overview highlighting 8 fundamental rights:
- Access & Portability (Art. 6.1)
- Correction & Update (Art. 6.2)
- Right to Erasure / Deletion (Art. 6.3)
- Marketing Controls & Opt-Out (Art. 6.4)
- Ad Personalization Settings (Art. 6.5)
- Cookies & Location Permissions (Art. 9.4)
- Restriction & Objection (Art. 6.7)
- Regulatory Recourse with Supervisory Authorities (Art. 12.1)

### 4. Interactive Document Tools
- 🔍 **Live Search & Highlight** — Real-time search with visual mark highlights, match counter (`X / Total`), and next/prev cycling.
- 🔗 **Anchor Deep-Linking** — One-click copy for every section heading link with toast feedback.
- 📋 **Copy Policy URL & Email** — Instant clipboard actions.
- 🖨️ **Print & PDF Export** — High-contrast paper/PDF format stripping UI chrome.
- 📑 **Mobile Quick Jump Drawer** — Instant section jumping on handheld devices.
- ❓ **Expandable FAQ** — Verified answers directly from policy terms.
- ⬆️ **Floating Scroll-To-Top** — Bottom-right floating control that appears after scrolling.

## 🔧 Local Preview & Testing

To preview the website locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

To run the automated verification test suite:
```bash
node tests/audit.test.js
node tests/features.test.js
node tests/responsive.test.js
```

## 📜 Compliance & Verification Notice

This Privacy Center outlines Kiri Store's operational practices and data governance principles. References to GDPR, CCPA, COPPA, and Google Play Store policies articulate our intended alignment with standard privacy benchmarks. As detailed in the document, periodic legal and security reviews are recommended to maintain vendor contract alignments and jurisdiction-specific statutory compliance.

## ⚖️ License & Author

- Developed and maintained by **[Krishna Patil](https://github.com/kriss2012)**.
- Licensed under the [MIT License](LICENSE).
