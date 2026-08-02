# Avinya 26 Event Landing Site

A standalone React + TanStack Start event landing site for Avinya 26.

## Development

You need Node.js and npm installed locally.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Project structure

This is a single-page event/fest landing site. The fastest way to make it yours:

1. **Brand & event details** — edit `src/lib/site-data.ts` to change the fest name, tagline, dates, campus, email, and external links.
2. **Hero & About** — swap `FEST.name`, `FEST.tagline`, `HERO_INTRO`, and `ABOUT_PARAGRAPHS` for your own copy.
3. **Events** — replace the `EVENTS` array with your own event cards, images, and descriptions.
4. **Timeline** — update the `TIMELINE` array with your actual registration, selection, and event dates.
5. **Gallery** — replace the `GALLERY` image URLs with your own photos or upload new assets.
6. **Team** — replace the `TEAMS` array with your faculty, mentors, and team members.
7. **Sponsors** — update the `SPONSORS` array with real partner names.
8. **SEO & social preview** — update the `TITLE`, `DESC`, and `og:image` in `src/routes/index.tsx`.
9. **Publish** — run the preview and deploy the static build to your preferred hosting provider.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
