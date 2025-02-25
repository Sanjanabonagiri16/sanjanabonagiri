# Portfolio Website

A modern, minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Apple-style dock navigation
- Smooth animations with Framer Motion
- Scientific Calculator tool
- Unit Converter tool

## Deployment to Vercel

### Option 1: Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
6. Click "Deploy"

### Option 2: Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   # Development deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

No environment variables are required for basic functionality.

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion 