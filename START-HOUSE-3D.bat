@echo off
setlocal
cd /d "%~dp0"
where python >nul 2>nul
if not errorlevel 1 (
  python -c "import sys; assert sys.version_info.major == 3" >nul 2>nul
  if not errorlevel 1 (
    python "%~dp0serve.py"
    goto :finished
  )
)
where py >nul 2>nul
if not errorlevel 1 (
  py -3 "%~dp0serve.py"
  goto :finished
)
echo Install Python 3 from https://www.python.org/downloads/ and enable Add Python to PATH.
:finished
if errorlevel 1 echo House 3D could not start. Please read the error above.
pause
endlocal
