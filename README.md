# landing-page-SS

## Development

Run `npm install`, then `npm run dev`. Production validation: `npm run lint` and `npm run build`.

## DevDes homepage

- `app/page.tsx` renders `components/devdes-home.tsx`; styles live in `app/home.css` and use the `dd-` prefix.
- `lib/home-content.ts` contains services, project filters, illustrative feedback, contact details, and each section's `backgroundTheme: "light" | "dark"`.
- The header uses `mix-blend-mode: difference`. Section themes are fixed independently of the OS color scheme. Animations respect reduced motion; accordions support hover, click, touch, and keyboard.
- Projects link to the existing `/mau/[slug]` demos. The gallery and demo components remain available.

### Content to connect

This repository has no CMS/backend. When one is connected, add a **Background Theme** select (`light`, `dark`) to each homepage block, and map it to `homeSections`. The defaults are Hero: light, Services: dark, Projects: dark, About: light, Footer: dark. This is a local typed configuration, not an implemented CMS admin field.

The supplied Google Drive logo currently requires sign-in, so the homepage uses a temporary DevDes.click wordmark. The logo strip uses demo brands and the feedback slider is explicitly illustrative; replace both with approved partner/client content. The email retains the original homepage address (`hello@webdao.vn`) until a new contact address is confirmed.

Design reference: [FORME by One Week Wonders](https://dribbble.com/shots/27094429-FORME-Creative-Agency-Website-Animation). The Aurelia mockup uses the [Unsplash image already referenced by the template catalog](https://images.unsplash.com/photo-1566073771259-6a8506099945), stored locally in `public/images/aurelia-resort.jpg`. The chrome illustration and other mockups are SVG/CSS.
