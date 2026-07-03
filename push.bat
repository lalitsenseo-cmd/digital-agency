@echo off
REM ============================================
REM  Click Briz - Ek click me git push
REM  Kuch likhna nahi padta - date/time apne aap
REM  Isko project root me rakho (jahan package.json hai)
REM ============================================

cd /d "%~dp0"

REM Message apne aap date + time se ban jaata hai
set "msg=Update %date% %time%"

echo.
echo ========================================
echo   Live bhej rahe hain...
echo   Message: %msg%
echo ========================================
echo.

echo [1/4] Files add...
git add .

echo [2/4] Commit...
git commit -m "%msg%"

echo [3/4] Pull (latest le rahe hain)...
git pull --no-edit

echo [4/4] Push (live)...
git push

echo.
echo ========================================
echo   HO GAYA! Vercel 1-2 min me deploy karega
echo ========================================
echo.
pause
