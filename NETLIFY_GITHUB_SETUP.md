# Setting Up GitHub Integration with Netlify

Follow these steps to connect your GitHub repository to Netlify for continuous deployment:

## Step 1: Log in to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Log in with your account

## Step 2: Create a New Site from Git

1. Click on the "New site from Git" button
2. Select "GitHub" as your Git provider
3. Authorize Netlify to access your GitHub account if prompted

## Step 3: Select Your Repository

1. Search for and select your repository: `sanjanabonagiri16/sanjanabonagiri`
2. Configure the build settings:
   - Branch to deploy: `main`
   - Base directory: (leave blank)
   - Build command: `npm run build`
   - Publish directory: `.next`

## Step 4: Deploy Your Site

1. Click "Deploy site"
2. Wait for the initial build to complete

## Step 5: Configure Domain Settings (Optional)

1. Go to "Site settings" > "Domain management"
2. Click "Add custom domain" to set up your own domain

## Step 6: Enable Continuous Deployment

Netlify will automatically deploy your site whenever you push changes to the main branch of your GitHub repository.

## Troubleshooting

If you encounter build errors:

1. Check the build logs in Netlify
2. Make sure your repository has the correct `netlify.toml` configuration
3. Verify that your Next.js project is properly configured for Netlify deployment 