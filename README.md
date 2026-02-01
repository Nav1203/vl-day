# Valentine's Day Landing Page

A beautiful animated landing page for Valentine's Day built with React and Framer Motion.

## Features

- Animated question flow
- Interactive Valentine's Day proposal
- Beautiful animations and transitions
- Responsive design

## Development

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your site when you push to the main branch.

1. Make sure GitHub Pages is enabled in your repository settings
2. Go to Settings > Pages
3. Set Source to "GitHub Actions"
4. Push your code to the main branch
5. The workflow will automatically build and deploy

### Option 2: Manual Deployment

1. Build the project: `npm run build`
2. Copy the contents of the `dist` folder
3. Push to the `gh-pages` branch or your repository's root (for user pages)

**Important:** Make sure you're deploying the `dist` folder contents, not the source files!

