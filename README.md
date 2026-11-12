# Shakir Plastic Store

A modern, responsive React + Vite storefront for Shakir Plastic Store, Band Road, Lahore.

## Features
- Responsive homepage and product catalogue
- Category filters and live product search
- Product enquiry shortlist/cart
- WhatsApp enquiry handoff with selected products
- Wholesale-focused calls to action and contact details
- SEO title and meta description
- Admin catalogue screen at `/admin` with add, edit, delete, stock and price-note fields
- Local catalogue export/import (JSON)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes
This is a frontend catalogue and enquiry website. The `/admin` screen currently stores catalogue edits in the current browser's local storage only; it is not protected by authentication and does not sync to other devices or visitors. WhatsApp enquiries go directly to the store phone and are not recorded in the dashboard. Do not use this local preview as a secure production admin system. A production admin system needs server-side authentication, a shared database, and an API/backend. Online payments and order management also require backend integration.
