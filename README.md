# Profile Web

Personal portfolio of **Anish Chandak** — Senior Frontend Engineer and Tech Lead with 6+ years building production-grade React and Next.js systems at scale. A single-page site built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and tsParticles.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, dark mode via `class`
- **Framer Motion** for animations (shared variants in `src/components/animations/variants.ts`)
- **tsParticles** for the animated background
- **lucide-react** for icons
- **@emailjs/browser** for the contact form

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview built app
npm run lint     # run ESLint
```

## Project Structure

```
src/
  components/      # UI sections (Hero, About, Portfolio, Experience, Contact, Navbar)
    animations/    # Shared Framer Motion variants
    background/    # Animated + decorative backgrounds
    projects/      # ProjectCard
    skills/        # Frontend + Web3 skill cards
    contact/       # ContactSection + ContactForm
  data/            # projects, experience, navItems (content lives here)
  hooks/           # useTheme, useScrollAnimation
  types/           # shared TS types
  utils/           # email + constants
```

Update content by editing files under `src/data/`.

## Environment / EmailJS

The contact form uses EmailJS. Replace the placeholders in `src/utils/constants.ts` with your own credentials (or move them to Vite env vars prefixed with `VITE_`):

```ts
export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
```

Then create a `.env` (not committed) at the project root:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Deployment

Works out of the box on **Vercel** or **Netlify** as a static Vite app:

- Build command: `npm run build`
- Output directory: `dist`
- Set the EmailJS env vars in the hosting dashboard.

## Customization Notes

- Projects live in `src/data/projects.ts`. `github` and `demo` are optional — buttons only render when a URL is provided.
- Experience list lives in `src/data/experience.ts`.
- Theme defaults to system preference on first load and is persisted in `localStorage`. The `dark` class is applied synchronously in `index.html` to prevent FOUC.
- Respects `prefers-reduced-motion` (particles disabled, transitions reduced).

## Contact

- **GitHub**: [AnishChandak18](https://github.com/AnishChandak18)
- **Email**: chandakanish0018@gmail.com
