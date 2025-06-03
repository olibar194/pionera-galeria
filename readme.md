# Pionera Galería - Web Platform v1.0.0

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity.io](https://img.shields.io/badge/Sanity.io-CMS-ef4728?logo=sanity)](https://www.sanity.io/)
[![next-intl](https://img.shields.io/badge/next--intl-i18n-blue)](https://next-intl-docs.vercel.app/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.x-purple?logo=framer)](https://www.framer.com/motion/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-latest-black)](https://ui.shadcn.com/)

Repository: [https://github.com/olibar194/pionera-galeria](https://github.com/olibar194/pionera-galeria)

Digital platform for Pionera Galería, a contemporary art gallery. Showcasing artists, exhibitions, fairs, and news with a minimalist, elegant, and modern design. This v1.0.0 integrates real data from Sanity.io and features i18n routing with `next-intl`.

## Tech Stack

- **Framework:** Next.js (v14+ with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animations:** Framer Motion
- **CMS:** Sanity.io
- **Internationalization (i18n):** `next-intl` (with i18n routing)
- **Typography:** Roboto Condensed (Google Fonts)

## Key Features (v1.0.0)

- **Home (`/`, `/es`, `/en`):** Full-screen carousel (current/recent exhibitions & fairs).
- **Artists:** List & detail pages (with expanded artworks).
- **Exhibitions & Fairs:** List (current/upcoming/past by year) & detail pages (with expanded artworks).
- **News:** List & detail pages (supporting internal/external links).
- **Shared "Expanded Artwork" Component:** Detailed artwork display within other sections (no dedicated artwork pages).
- **Internationalization:** Full ES/EN content localization and routing via `next-intl`.
- **CMS Integration:** Content dynamically fetched from a Sanity.io backend.
- **Responsive Design & Subtle Animations.**

## AI-Assisted Development Process

This project leveraged AI tools throughout its development lifecycle:

1.  **Stage 1: Conception & Prompt Engineering**

    - **AI Tool:** Google AI Studio (Gemini) / LLMs.
    - **Activity:** Defined UI/UX concepts, data schemas (initially for dummy data), and detailed, sequential prompts for v0.dev. _Initial prompts specified dummy data and simulated i18n for the v0.dev scaffolding phase._

2.  **Stage 2: Initial Scaffolding with v0.dev**

    - **AI Tool:** [v0.dev](https://v0.dev/)
    - **Activity:** Generated the initial Next.js/React/Tailwind/Shadcn UI codebase from the prepared prompts, providing a structural baseline using dummy data and simulated i18n.

3.  **Stage 3: Full Development, Integration & Refinement**
    - **AI Tools:** VS Code AI Agents (e.g., GitHub Copilot, Gemini Code Assist).
    - **Activity:**
      - Refined UI components and layouts.
      - Implemented core application logic.
      - **Integrated real Sanity.io data:** Replaced dummy data structures with live Sanity client fetching.
      - **Implemented robust i18n:** Migrated from simulated i18n to `next-intl` for full localization and i18n routing.
      - Added Framer Motion animations for enhanced UX.
      - Debugged and iteratively improved the codebase.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm, yarn, or pnpm
- Sanity.io project ID, dataset, and API token (read-only token is sufficient for frontend).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/olibar194/pionera-galeria.git
    cd pionera-galeria
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```
3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your Sanity project details. You can copy `.env.example` (if one exists) or use the following template:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_SANITY_DATASET="YOUR_DATASET"
    NEXT_PUBLIC_SANITY_API_VERSION="2023-05-03" # Or your preferred API version
    # Optional: If you have a CDN-level API token for frontend queries
    # NEXT_PUBLIC_SANITY_API_TOKEN="YOUR_READ_ONLY_TOKEN"
    ```

### Running the Development Server

```bash
npm run dev
# or yarn dev / pnpm dev
```
