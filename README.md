# Book Bloom

A modern book discovery app built with Next.js, React, TypeScript, and SCSS. Users can search books, get live autocomplete suggestions, and sort results by rating, year, or title.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- SCSS
- Node.js
- npm

## Project Structure

- src/app/page.tsx - main book search UI
- src/app/page.module.scss - component styles
- src/app/globals.scss - global styles
- src/data/books.json - local book dataset

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Features

- Search books by title, author, or genre
- Live autocomplete suggestions
- Sort results by top rated, newest, or title
- Responsive and modern UI

## Notes

The app uses a local JSON file for the book list, so it works without any backend setup.
