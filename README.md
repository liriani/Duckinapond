# Duck in a Lake - 42 Piscine Companion

This is a React-based application developed with Vite, Tailwind CSS, and Lucide React.

## How to Run Locally

To run the development server, use:
```bash
npm install
npm run dev
```
Open the link provided in the terminal (usually `http://localhost:5173/`).

**Warning:** Do NOT open `index.html` directly or via a static file server like "Live Server". This will cause a MIME type error (`text/jsx`) because the browser cannot execute JSX files without the Vite development server's transformation.

## How to Build for Production

To build for GitHub Pages:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Deploying to GitHub Pages

The project is configured to be deployed from the `dist/` folder to a repository named `DuckinaLake`.
Ensure your `vite.config.js` has the correct `base` path for your repository.
Currently, it is set to `/DuckinaLake/` for production.
