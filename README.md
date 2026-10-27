# MoPDF — Premium PDF Toolkit

![License](https://img.shields.io/badge/license-MIT-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)

> **Every PDF tool. One beautiful workspace.**
> Everything you need to edit, convert, and organize PDFs in one seamless experience. Completely free, private, and powered by your browser.

MoPDF is a modern, open-source, client-side PDF utility suite designed with a **Red Liquid Glass** aesthetic. All document processing takes place directly inside your web browser using HTML5 Canvas, Web Workers, and WebAssembly APIs. Your sensitive documents never leave your device and are never transmitted to any external server.

Official Repository: [https://github.com/dimasmong/MoPDF](https://github.com/dimasmong/MoPDF)

---

## Key Features

- **100% Client-Side Privacy**: All processing runs locally in memory. Zero documents are uploaded to third-party services or remote servers.
- **14 Comprehensive PDF Tools**: Full professional suite of essential PDF manipulation utilities categorized for effortless workflow.
- **5 Professional Categories**: Filter and navigate tools via Organize, Optimize, Convert, Edit & Sign, and Information tabs.
- **Liquid Glass Design System**: Frosted glass surfaces, subtle red accent gradients, refined typography, and soft ambient glows.
- **Light & Dark Mode**: Seamless appearance switching with persistent preferences via `localStorage`. Defaults strictly to Light Mode.
- **Bilingual Localization**: Instant switching between English (EN) and Bahasa Indonesia (ID) with complete translation coverage. Defaults to English.
- **Offline Capable**: Bundled npm dependencies and local Web Worker assets ensure full functionality without active internet access after initial page load.
- **Built-In Sample Generator**: One-click instant multi-page sample PDF and image generator for immediate testing without personal files.
- **Responsive Layout**: Tailored for desktops, tablets, and smartphones (iOS & Android).

---

## PDF Toolkit — 14 Tools Across 5 Categories

### 1. Organize
| Tool | Description | Capabilities |
| :--- | :--- | :--- |
| **Merge PDF** | Combine multiple PDFs | Drag-and-drop reordering, arrow controls, file deletion, unified multi-page export. |
| **Split PDF** | Extract pages or ranges | Custom ranges (e.g. `1-3, 5`), quick filters (All/Odd/Even), clickable visual thumbnails, single PDF or multi-file ZIP export. |
| **Organize PDF** | Reorder & manage pages | Visual card grid, page duplication, deletion, rotation, and drag-and-drop sequencing. |
| **Rotate PDF** | Batch & individual rotation | Rotate all pages at once (90°, 180°, 270°) or fine-tune individual page orientations. |

### 2. Optimize
| Tool | Description | Capabilities |
| :--- | :--- | :--- |
| **Compress PDF** | Reduce document size | Genuine browser-side structural optimization using object streams and stream recompression. Displays original size, compressed size, reduction %, and integrity check. Honest fallback if already optimized. |
| **Crop PDF** | Visual page cropping | Live PDF page preview with interactive crop presets (10pt, 20pt, 40pt) or numeric pt margins. Adjusts PDF CropBox and MediaBox per page or document-wide with non-destructive disclaimer. |
| **Resize PDF** | Page size & scale adjustment | Standards-compliant page resizing (A4, A3, A5, US Letter, US Legal, Custom dimensions). Orientation controls (Portrait/Landscape/Auto) and vector content preservation (`scale-fit` or `canvas-only`). |

### 3. Convert
| Tool | Description | Capabilities |
| :--- | :--- | :--- |
| **Images to PDF** | Image conversion | Convert JPG, PNG, and WebP images to PDF with custom page sizes (A4, Letter, Fit), orientation, and margins. |
| **PDF to Images** | High-resolution rendering | Render pages to PNG (lossless) or JPEG (compact), 1x/2x/3x DPI scales, export as individual image or ZIP. |

### 4. Edit & Sign
| Tool | Description | Capabilities |
| :--- | :--- | :--- |
| **Add Page Numbers** | Customizable numbering | Page numbering with custom starting numbers, formats (`Page X of Y`, `X / Y`, `X`), position presets (6 presets), fonts, colors, margins, and page range filtering. |
| **Add Watermark** | Text watermarking | Real-time live visual preview, customizable font size, opacity, rotation angle, color palette, position presets (center, tiled grid, corners). |
| **Edit Metadata** | Document properties editor | Inspect and modify Title, Author, Subject, Keywords, Creator, and Producer. Includes quick field clearing and reset capabilities. |
| **Sign PDF** | Electronic signature | Visual electronic signature overlay. Draw via mouse/touch canvas, type with signature fonts, or upload transparent PNGs. Precise positioning, scaling, and page targeting. |

### 5. Information
| Tool | Description | Capabilities |
| :--- | :--- | :--- |
| **PDF Information** | Metadata & page inspector | Authentic document properties (title, author, creator, creation date), exact file size, and per-page dimensions table (pt, mm, in). |

---

## Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Manipulation Engine**: [pdf-lib](https://pdf-lib.js.org/)
- **PDF Page Renderer**: [PDF.js (pdfjs-dist)](https://mozilla.github.io/pdf.js/)
- **Archive Packaging**: [JSZip](https://stuk.github.io/jszip/)

---

## Privacy Architecture

MoPDF was engineered from the ground up to respect document privacy:

1. **Zero Server Uploads**: Documents are loaded into the browser's volatile memory via standard HTML5 `FileReader` and `ArrayBuffer` APIs.
2. **Local Cryptographic Isolation**: PDF parsing, page copying, and rasterization execute locally in the browser's execution context.
3. **No Content Persistence**: Document bytes are never cached in `localStorage`, `sessionStorage`, or cookies. Closing or resetting the workspace immediately releases all document memory.
4. **Offline Compatibility**: All dependencies (including PDF.js worker scripts) are bundled into static assets, eliminating runtime external CDN dependencies.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` or any compatible package manager (`pnpm`, `yarn`)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/dimasmong/MoPDF.git
cd MoPDF
npm install
```

### Local Development

Run the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173` to view the application.

### Automated Test Suite

Run the 14-tool programmatic validation suite:

```bash
npm test
```

### Type Checking

Verify TypeScript compilation without emitting files:

```bash
npm run typecheck
```

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

The compiled assets will be generated in the `dist/` directory.

### Production Preview

Preview the production build locally:

```bash
npm run preview
```

---

## Deploying to Vercel

Deploying MoPDF to Vercel is straightforward:

### Option 1: Via Vercel Web Dashboard (Recommended)

1. Push your repository to GitHub: `https://github.com/dimasmong/MoPDF`.
2. Log into the [Vercel Dashboard](https://vercel.com).
3. Click **"Add New..."** → **"Project"**.
4. Import your **MoPDF** repository.
5. In **Build and Output Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**.

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## Project Structure

```
MoPDF/
├── public/
│   └── favicon.svg             # Application SVG icon
├── src/
│   ├── utils/
│   │   └── pdf.ts              # Data types, paper sizes, and PDF utility functions
│   ├── App.tsx                 # Main application component & 14 tools UI
│   ├── index.css               # Tailwind directives & Liquid Glass classes
│   ├── main.tsx                # React root mount entry point
│   ├── translations.ts         # Complete EN & ID translation dictionaries (14 tools)
│   └── vite-env.d.ts           # Vite client & asset module declarations
├── index.html                  # Main HTML entry point
├── package.json                # Project dependencies, scripts, and v1.1.0 metadata
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS styling configuration
├── test-14-tools.cjs           # Programmatic 14-tool automated test suite
├── tsconfig.json               # TypeScript compiler configuration
├── tsconfig.node.json          # TypeScript Node compiler configuration
├── vite.config.ts              # Vite bundler configuration & chunk splitting
├── LICENSE                     # Genuine MIT License
├── .gitignore                  # Git ignore rules
└── README.md                   # Comprehensive project documentation
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for complete details.

**Copyright (c) 2026 Dimas Mong.**
