@echo off
echo ===================================================
echo   AAFiends - Automated Firebase Deployment Script
echo ===================================================
echo.
echo Requesting Administrator privileges to bypass Windows symlink restrictions...
powershell -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -Command \"cd ''%~dp0''; echo Deploying AAFiends...; firebase deploy; echo.; echo Deployment complete. Press any key to exit...; pause\"' -Verb RunAs"
