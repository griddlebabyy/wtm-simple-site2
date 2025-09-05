@echo off
echo Testing build for Vercel deployment...
echo.

echo Installing dependencies...
call npm install

echo.
echo Building the project...
call npm run build

echo.
echo Build complete! Check the 'dist' folder.
echo.
echo To test the build locally, run:
echo npm run preview
echo.
echo Then open http://localhost:4173 in your browser
echo.
pause
