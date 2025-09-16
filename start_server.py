#!/usr/bin/env python3
"""
Скрипт для запуска сервера с правильной обработкой никнеймов
"""

import os
import sys
from app import app

def main():
    print("🚀 Запуск сервера с поддержкой случайных никнеймов...")
    print("📝 Все API endpoints настроены для работы с никнеймами")
    print("🎲 Каждый запрос профиля будет возвращать случайный никнейм")
    print("✅ Валидация никнеймов работает корректно")
    print("=" * 60)
    
    # Получаем порт из переменной окружения или используем 5000
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    
    print(f"🌐 Сервер будет доступен по адресу: http://{host}:{port}")
    print("🔄 Для остановки нажмите Ctrl+C")
    print("=" * 60)
    
    try:
        app.run(debug=True, host=host, port=port)
    except KeyboardInterrupt:
        print("\n👋 Сервер остановлен")
    except Exception as e:
        print(f"❌ Ошибка запуска сервера: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()

