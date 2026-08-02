# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Next Steps after Remixing

This is a single-page event/fest landing site. The fastest way to make it yours:

1. **Brand & event details** — edit `src/lib/site-data.ts` to change the fest name, tagline, dates, campus, email, and external links.
2. **Hero & About** — swap `FEST.name`, `FEST.tagline`, `HERO_INTRO`, and `ABOUT_PARAGRAPHS` for your own copy.
3. **Events** — replace the `EVENTS` array with your own event cards, images, and descriptions.
4. **Timeline** — update the `TIMELINE` array with your actual registration, selection, and event dates.
5. **Gallery** — replace the `GALLERY` image URLs with your own photos or upload new assets.
6. **Team** — replace the `TEAMS` array with your faculty, mentors, and team members.
7. **Sponsors** — update the `SPONSORS` array with real partner names.
8. **SEO & social preview** — update the `TITLE`, `DESC`, and `og:image` in `src/routes/index.tsx`.
9. **Publish** — run the preview, then click **Publish** to make it live.

If you want registration, ticketing, or an admin dashboard, enable Lovable Cloud and add a backend.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
