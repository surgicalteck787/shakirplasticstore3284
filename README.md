# Shakir Plastic Store

Responsive React + Vite storefront for Shakir Plastic Store, Band Road, Lahore.

## Pages
- `/` — Homepage
- `/products` — Full catalogue
- `/food-bags` — Food bags
- `/shopping-bags` — Shopping bags
- `/pizza-boxes` — Pizza boxes
- `/disposable-items` — Disposable items
- `/food-packaging` — Food packaging
- `/paper-products` — Paper products
- `/about` — About the store
- `/contact` — Contact details
- `/admin` — Local catalogue manager

Category URLs intentionally do not contain a `/category/` segment.

## Run locally
```bash
npm install
npm run dev
npm run build
```

## Notes
The storefront is a frontend catalogue and WhatsApp enquiry website. The admin screen stores edits in the current browser's local storage only; it is not protected by authentication and does not sync across devices or visitors. A production admin system requires server-side authentication, a shared database and an API/backend. Online payments and order management also require backend integration.
