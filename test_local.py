#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для тестирования локального сервера Vortex
"""

import requests
import json
import time
import sys

def test_server():
    """Тестирует все API endpoints локального сервера"""
    
    base_url = "http://localhost:8000"
    
    print("🧪 Тестирование локального сервера Vortex...")
    print("=" * 50)
    
    # Список тестов
    tests = [
        {
            "name": "Главная страница",
            "method": "GET",
            "url": f"{base_url}/",
            "expected_status": 200
        },
        {
            "name": "Профиль пользователя",
            "method": "POST",
            "url": f"{base_url}/api/common/profile",
            "expected_status": 200
        },
        {
            "name": "Настройки игры",
            "method": "GET",
            "url": f"{base_url}/api/common/settings",
            "expected_status": 200
        },
        {
            "name": "Создание игры",
            "method": "POST",
            "url": f"{base_url}/api/games/create",
            "expected_status": 200
        },
        {
            "name": "Размещение ставки",
            "method": "POST",
            "url": f"{base_url}/api/bets/place",
            "data": {"amount": 100, "roundId": "test-round"},
            "expected_status": 200
        },
        {
            "name": "История игр",
            "method": "GET",
            "url": f"{base_url}/api/games/history",
            "expected_status": 200
        },
        {
            "name": "Статистика игрока",
            "method": "POST",
            "url": f"{base_url}/api/player/statistics",
            "expected_status": 200
        },
        {
            "name": "Лимиты ставок",
            "method": "GET",
            "url": f"{base_url}/api/limits",
            "expected_status": 200
        },
        {
            "name": "Курсы валют",
            "method": "GET",
            "url": f"{base_url}/api/rates",
            "expected_status": 200
        },
        {
            "name": "Переводы",
            "method": "GET",
            "url": f"{base_url}/api/translates/test/latest/en",
            "expected_status": 200
        }
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            print(f"🔍 Тест: {test['name']}")
            
            if test['method'] == 'GET':
                response = requests.get(test['url'], timeout=5)
            elif test['method'] == 'POST':
                data = test.get('data', {})
                response = requests.post(test['url'], json=data, timeout=5)
            else:
                print(f"❌ Неизвестный метод: {test['method']}")
                failed += 1
                continue
            
            if response.status_code == test['expected_status']:
                print(f"✅ Успешно (статус: {response.status_code})")
                passed += 1
                
                # Показываем часть ответа для POST запросов
                if test['method'] == 'POST' and response.headers.get('content-type', '').startswith('application/json'):
                    try:
                        data = response.json()
                        if 'payload' in data:
                            print(f"   📦 Данные: {json.dumps(data['payload'], ensure_ascii=False, indent=2)[:100]}...")
                    except:
                        pass
            else:
                print(f"❌ Ошибка (ожидался: {test['expected_status']}, получен: {response.status_code})")
                failed += 1
                
        except requests.exceptions.ConnectionError:
            print(f"❌ Ошибка подключения - сервер не запущен")
            failed += 1
        except requests.exceptions.Timeout:
            print(f"❌ Таймаут запроса")
            failed += 1
        except Exception as e:
            print(f"❌ Ошибка: {e}")
            failed += 1
        
        print()
    
    print("=" * 50)
    print(f"📊 Результаты тестирования:")
    print(f"✅ Успешно: {passed}")
    print(f"❌ Ошибок: {failed}")
    print(f"📈 Успешность: {passed/(passed+failed)*100:.1f}%")
    
    if failed == 0:
        print("\n🎉 Все тесты прошли успешно!")
        print("🚀 Сервер готов к работе!")
        return True
    else:
        print(f"\n⚠️  Обнаружено {failed} ошибок")
        print("🔧 Проверьте логи сервера")
        return False

def test_external_blocking():
    """Тестирует блокировку внешних запросов"""
    
    print("\n🛡️  Тестирование блокировки внешних запросов...")
    print("=" * 50)
    
    external_urls = [
        "https://google.com",
        "https://cloudflare.com",
        "http://example.com"
    ]
    
    for url in external_urls:
        try:
            response = requests.get(url, timeout=3)
            print(f"❌ Внешний запрос к {url} НЕ заблокирован (статус: {response.status_code})")
        except requests.exceptions.ConnectionError:
            print(f"✅ Внешний запрос к {url} заблокирован")
        except requests.exceptions.Timeout:
            print(f"✅ Внешний запрос к {url} заблокирован (таймаут)")
        except Exception as e:
            print(f"✅ Внешний запрос к {url} заблокирован ({e})")

if __name__ == "__main__":
    print("🎮 Тестирование локального сервера Vortex")
    print("=" * 50)
    
    # Проверяем, запущен ли сервер
    try:
        response = requests.get("http://localhost:8000", timeout=2)
        print("✅ Сервер запущен и отвечает")
    except:
        print("❌ Сервер не запущен!")
        print("🚀 Запустите сервер командой: python app.py")
        sys.exit(1)
    
    # Запускаем тесты
    success = test_server()
    
    # Тестируем блокировку внешних запросов
    test_external_blocking()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 Тестирование завершено успешно!")
        print("🌐 Откройте http://localhost:8000 в браузере")
    else:
        print("⚠️  Обнаружены проблемы")
        print("🔧 Проверьте настройки сервера")
    
    print("\n📖 Подробная документация: README_LOCAL.md")
