# Wavo Homepage

Interactive Next.js homepage for Wavo, including financing simulations, eligibility guidance, responsive layouts, dark mode, and Three.js product visuals.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
npm run build:pages
```

`npm run build` generates a local static export in `out/`. `npm run build:pages` generates the GitHub Pages artifact in `docs/` with the required `/wavo-home` base path.

## Deployment

GitHub Pages publishes the tracked `docs/` artifact from `main`. The published site is available at [https://rsm23.github.io/wavo-home/](https://rsm23.github.io/wavo-home/).

A manual GitHub Actions deployment workflow is also included for use when Actions runners are available on the repository.
