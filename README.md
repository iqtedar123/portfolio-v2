### Description

Personal portfolio built with Next.js, Emotion, TypeScript, and Contentful CMS. Deployed via Firebase Hosting (Next.js SSR).

### Setup

1. Copy `.env.local.example` to `.env.local` and fill in Contentful credentials.
2. Run `npm run setup:contentful` with `CONTENTFUL_MANAGEMENT_TOKEN` to create content types.
3. Create and publish entries for `banner`, `contactInformation`, `socialLink`, and `portfolioProject` in Contentful (or run `npm run migrate:firestore` to import Firestore projects).

### Running

`npm run dev`

### Build

`npm run build`

### Deploy

`firebase deploy --only hosting`

### GitHub Actions secrets

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT` (optional, defaults to `master`)
