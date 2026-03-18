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

## Deploying to GitHub Pages (MANDATORY STEPS)

To fix the `main.jsx:1 Failed to load module script` error, you MUST ensure you are serving the built files, not the source code.

1. **Build and Push to `gh-pages` branch:**
   Run:
   ```bash
   npm run deploy
   ```
   This will build the project and push only the `dist/` folder to a branch called `gh-pages` in your repository.

2. **Configure GitHub Pages Settings:**
   - Go to your repository on GitHub.
   - Click on **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Branch**, select `gh-pages` and `/ (root)`.
   - Click **Save**.

### Why the MIME type error happens:
Browsers cannot execute `.jsx` files. If you see an error about `main.jsx`, it means your GitHub Pages site is serving the root folder of your project (which contains the source `index.html` pointing to `main.jsx`). Following the steps above ensures you serve the *transformed* files from the `dist` folder.

The project is now repository-name agnostic, so it will work regardless of whether your repo is named `DuckinaLake`, `Duckinapond`, or anything else.
