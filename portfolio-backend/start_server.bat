@echo off
echo ========================================================
echo Starting Portfolio Chat Backend Server...
echo ========================================================

:: Check for Python Launcher (py) first, then python
where py >nul 2>&1
if %errorlevel% equ 0 (
    set PY_CMD=py -3
) else (
    set PY_CMD=python
)

%PY_CMD% --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH.
    pause
    exit /b
)

:: Install dependencies if needed
echo Checking dependencies...
%PY_CMD% -m pip install -r requirements.txt --quiet

:: Set environment variables
set OPENROUTER_API_KEY=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
set MODEL_ID=deepseek/deepseek-r1-0528:free

:: Start ngrok
where ngrok >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting ngrok tunnel on port 5000...
    start "Ngrok Tunnel" ngrok http 5000
)

:: Start the Flask server
echo Starting Flask server...
%PY_CMD% chat_server.py

pause
