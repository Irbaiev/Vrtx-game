# Скрипт для развертывания на Vercel
Write-Host "🚀 Развертывание на Vercel..." -ForegroundColor Green

# 1. Проверяем Git статус
Write-Host "📋 Проверяем Git статус..." -ForegroundColor Yellow
git status

# 2. Добавляем все файлы
Write-Host "📁 Добавляем все файлы в Git..." -ForegroundColor Yellow
git add .

# 3. Создаем коммит
Write-Host "💾 Создаем коммит..." -ForegroundColor Yellow
git commit -m "Add Vercel deployment support

- Created index-vercel.html without Service Worker
- Added /vercel route in app.py
- Fixed external request blocking issue
- Ready for Vercel deployment"

# 4. Отправляем в репозиторий
Write-Host "⬆️ Отправляем в репозиторий..." -ForegroundColor Yellow
git push

Write-Host "✅ Готово! Теперь можно развернуть на Vercel:" -ForegroundColor Green
Write-Host "1. Зайдите на vercel.com" -ForegroundColor Cyan
Write-Host "2. Подключите ваш GitHub репозиторий" -ForegroundColor Cyan
Write-Host "3. Vercel автоматически развернет приложение" -ForegroundColor Cyan
Write-Host "4. Игра будет доступна по URL от Vercel" -ForegroundColor Cyan
Write-Host "5. Для доступа без Service Worker используйте: /vercel" -ForegroundColor Cyan
