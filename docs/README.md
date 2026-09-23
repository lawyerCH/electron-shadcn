# docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

## Overview

This project is a documentation site built with Next.js and Fumadocs, designed to provide a seamless experience for managing and displaying documentation content. It leverages modern web technologies to deliver a fast, responsive, and user-friendly documentation portal.

## Tech Stack

- **Framework**: Next.js 16.2.9
- **Documentation**: Fumadocs (Core, MDX, UI)
- **Styling**: Tailwind CSS
- **Type Checking**: TypeScript
- **Linting & Formatting**: Biome
- **Environment Management**: Varlock
- **UI Components**: Radix UI, Lucide React
- **Animations**: Motion, OGL
- **Analytics**: PostHog

## Quick Start

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd docs
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open http://localhost:3000 with your browser to see the result.

### Available Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the production application
- `pnpm start`: Start the production server
- `pnpm types:check`: Run type checking
- `pnpm check`: Run code quality checks
- `pnpm fix`: Automatically fix code quality issues

## Project Structure

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
