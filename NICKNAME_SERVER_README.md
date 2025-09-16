# Сервер с поддержкой случайных никнеймов

## 🎯 **Что добавлено в app.py:**

### 1. **Генератор случайных никнеймов**
- Функция `generate_random_nickname()` создает уникальные никнеймы
- 20 префиксов: Vortex, Storm, Fire, Ice, Wind, Thunder, Lightning, Shadow, Phoenix, Dragon, Tiger, Eagle, Wolf, Bear, Lion, Shark, Falcon, Hawk, Raven, Cobra
- 20 суффиксов: Master, Lord, King, Queen, Warrior, Hunter, Rider, Walker, Runner, Fighter, Guardian, Protector, Destroyer, Creator, Builder, Explorer, Adventurer, Seeker, Finder, Chaser
- 5 форматов: `PrefixSuffix`, `Prefix123`, `PrefixSuffix123`, `prefixsuffix`, `prefix123`
- Ограничение длины: до 20 символов

### 2. **API Endpoints для никнеймов**

#### **Профиль пользователя:**
- `GET/POST /api/common/profile` - возвращает профиль со случайным никнеймом
- `GET/POST /v2/api/common/profile` - версия 2

#### **Обновление профиля:**
- `PUT /api/player` - обновляет никнейм или генерирует случайный
- `PUT /v2/api/player` - версия 2
- `POST /api/common/profile/update` - альтернативный endpoint
- `POST /v2/api/common/profile/update` - версия 2

#### **Валидация никнейма:**
- `POST /api/nickname/validate` - проверяет валидность никнейма
- `POST /v2/api/nickname/validate` - версия 2

### 3. **Дополнительные endpoints:**
- `/api/rules` - правила игры
- `/api/common/limits` - лимиты ставок
- `/api/common/tournaments/my` - мои турниры
- `/api/common/rates` - курсы валют
- `/api/common/version/vortex` - версия игры
- `/api/common/ping` - проверка соединения

## 🚀 **Как запустить:**

### **Вариант 1: Через start_server.py**
```bash
python start_server.py
```

### **Вариант 2: Напрямую через app.py**
```bash
python app.py
```

### **Вариант 3: С указанием порта**
```bash
PORT=8080 python app.py
```

## 🎲 **Примеры случайных никнеймов:**
- `VortexMaster`
- `Storm1234`
- `FireKing5678`
- `dragonwarrior`
- `thunder123`
- `LightningProtector`
- `ShadowHunter9999`

## 📡 **API Примеры:**

### **Получение профиля:**
```bash
curl http://localhost:5000/api/common/profile
```

**Ответ:**
```json
{
  "id": 123456,
  "playerId": "123456",
  "apiKey": "123456",
  "playerName": "VortexMaster",
  "name": "VortexMaster",
  "nickname": "VortexMaster",
  "player_name": "VortexMaster",
  "user_name": "VortexMaster",
  "currency": "FUN",
  "currencySign": "$",
  "rounding": 2,
  "balance": 1000,
  "sub": "local-demo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Обновление никнейма:**
```bash
curl -X PUT http://localhost:5000/api/player \
  -H "Content-Type: application/json" \
  -d '{"nickname": "MyCustomNickname"}'
```

**Ответ:**
```json
{
  "success": true,
  "nickname": "MyCustomNickname",
  "message": "Profile updated successfully"
}
```

### **Валидация никнейма:**
```bash
curl -X POST http://localhost:5000/api/nickname/validate \
  -H "Content-Type: application/json" \
  -d '{"nickname": "TestNickname"}'
```

**Ответ:**
```json
{
  "valid": true,
  "message": "Nickname is valid",
  "nickname": "TestNickname"
}
```

## 🔧 **Преимущества серверного решения:**

1. **Надежность** - никнеймы генерируются на сервере, а не в клиенте
2. **Консистентность** - все API endpoints возвращают одинаковые данные
3. **Валидация** - правильная проверка никнеймов на сервере
4. **Логирование** - все операции с никнеймами логируются
5. **Масштабируемость** - легко добавить базу данных для хранения никнеймов

## 🎮 **Интеграция с игрой:**

Сервер полностью совместим с существующей игрой:
- Все endpoints соответствуют ожиданиям клиента
- CORS настроен для всех доменов
- Поддерживаются как v1, так и v2 API
- Статические файлы отдаются корректно

## 📝 **Логирование:**

Сервер выводит подробные логи:
```
[APP] 🎲 Генерируем случайный никнейм для профиля: VortexMaster
[APP] ✅ Обновление никнейма: MyCustomNickname
[APP] Валидация никнейма: TestNickname
```

## 🚨 **Важные замечания:**

1. **Порт по умолчанию:** 5000
2. **Хост по умолчанию:** 0.0.0.0 (доступен извне)
3. **Режим отладки:** включен по умолчанию
4. **CORS:** настроен для всех доменов
5. **Баланс:** хранится в памяти (сбрасывается при перезапуске)

## 🎉 **Результат:**

Теперь никнеймы будут:
- ✅ Генерироваться случайно на сервере
- ✅ Работать стабильно без клиентских хаков
- ✅ Валидироваться правильно
- ✅ Логироваться для отладки
- ✅ Поддерживать все форматы API

**Проблема с никнеймами решена на серверном уровне!** 🚀

