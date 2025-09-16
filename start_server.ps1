# Скрипт запуска локального сервера Vortex
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ЗАПУСК ЛОКАЛЬНОГО СЕРВЕРА VORTEX" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка Python
Write-Host "Проверка Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Найден: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ОШИБКА: Python не найден! Установите Python 3.7+" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Проверка pip
Write-Host "Проверка pip..." -ForegroundColor Yellow
try {
    $pipVersion = pip --version 2>&1
    Write-Host "Найден: $pipVersion" -ForegroundColor Green
} catch {
    Write-Host "ОШИБКА: pip не найден!" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Установка зависимостей
Write-Host "Установка зависимостей..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host ""
Write-Host "Запуск сервера..." -ForegroundColor Green
Write-Host "Игра будет доступна по адресу: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Для остановки нажмите Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Запуск сервера
python app.py

Read-Host "Нажмите Enter для выхода"
