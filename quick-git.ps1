# Быстрый Git коммит для Vercel
Write-Host "🚀 Быстрый Git коммит для Vercel..." -ForegroundColor Green

# Добавляем все файлы
git add .

# Создаем коммит
git commit -m "Fix login issue - app now works like mock-service-worker.js

- Fixed app.py to match mock-service-worker.js structure
- Added vercel.json for deployment
- Added requirements.txt with dependencies
- Login now works correctly
- All API endpoints working"

# Пушим
git push

Write-Host "✅ Готово! Теперь можно развернуть на Vercel" -ForegroundColor Green
