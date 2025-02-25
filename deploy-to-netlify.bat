@echo off
echo Building Next.js application...
call npm run build

echo Checking if Netlify CLI is installed...
where netlify >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Netlify CLI not found. Installing...
    call npm install -g netlify-cli
)

echo Deploying to Netlify...
call netlify deploy --build --prod

echo Deployment complete!
pause 