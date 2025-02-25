# Portfolio Website

A modern, minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Apple-style dock navigation
- Smooth animations with Framer Motion
- Scientific Calculator tool
- Unit Converter tool

## Netlify Features

### Serverless Functions

This project includes a sample Netlify serverless function. After deployment, you can access it at:

```
https://your-site-name.netlify.app/.netlify/functions/hello-world
```

This function returns a JSON response with a greeting message and timestamp.

## Deployment to Netlify

### Option 1: Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Option 2: Manual Deployment

#### For macOS/Linux:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```bash
   netlify login
   ```

3. Build and deploy:
   ```bash
   # Option A: Use the deployment script
   chmod +x deploy-to-netlify.sh
   ./deploy-to-netlify.sh
   
   # Option B: Manual commands
   npm run build
   netlify deploy --prod
   ```

#### For Windows:

1. Install Netlify CLI:
   ```powershell
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```powershell
   netlify login
   ```

3. Build and deploy:
   ```powershell
   # Option A: Use the deployment batch file
   deploy-to-netlify.bat
   
   # Option B: Manual commands
   npm run build
   netlify deploy --prod
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