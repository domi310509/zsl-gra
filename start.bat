@echo off
:: Ustawienie katalogu, w którym znajduje się skrypt
cd /d "%~dp0"

:: Uruchomienie lokalnego serwera HTTP z folderu 'demos' na porcie 8000
echo Uruchamiam serwer na porcie 8000...
start /min python -m http.server --directory demos 8000

:: Czekanie chwilę, aby serwer się uruchomił
timeout /t 2 /nobreak >nul

:: Otworzenie strony index.html w domyślnej przeglądarce
start http://localhost:8000/dialogtesting.html
