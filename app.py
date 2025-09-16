from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import random
import json
import os

app = Flask(__name__)
CORS(app, origins=['*'])

# Настройки для Vercel
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

# === IN-MEMORY BALANCE (как в MSW) ===
BALANCE = 1000  # стартовый баланс
roundCounter = 0

# === MOCK DATA (точно как в MSW) ===
def get_profile_data():
    return {
        "id": 123456,
        "playerId": "123456", 
        "apiKey": "123456",
        "playerName": "vortex",
        "name": "vortex",
        "nickname": "vortex",
        "currency": "FUN",
        "currencySign": "$",
        "rounding": 2,
        "balance": BALANCE,  # динамический баланс
        "sub": "local-demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6InZvcnRleCIsImJhbGFuY2UiOjk5OTk5OTAwLCJjdXJyZW5jeSI6IkZVTiJ9.xxx"
    }

def get_settings_data():
    return {
        "availableTranslations": ["en", "ru"],
        "forceDemoAvailable": True,
        "red": [1, 2, 3, 4, 5, 6],
        "green": [1, 2, 3, 4, 5, 6], 
        "blue": [1, 2, 3, 4, 5, 6]
    }

def get_game_settings_data():
    return {
        # ВАЖНО: ключи именно Symbol3/Symbol2/Symbol1 (как в MSW)
        "Symbol3": [1.1,1.3,1.55,2.0,3.0,5.0,7.0,10.0,12.5,15,20,25],  # red
        "Symbol2": [1.2,1.6,2.1,3.2,4.85,7.0,9.0,12.0,16.0,20.0,24.0,30.0], # green
        "Symbol1": [3.9,5.2,7.7,12.5,18.0,24.0,32.0,44.0,60.0,80.0,110.0,150.0] # blue
    }

def get_game_config_data():
    return {
        "progressMax": 12,  # максимум шагов на кольцо
        "spineData": [
            {"id": "Symbol1", "ring": 2},   # blue
            {"id": "Symbol2", "ring": 1},   # green  
            {"id": "Symbol3", "ring": 0},   # red
            {"id": "SymbolNeutral", "ring": None},
            {"id": "SymbolLoss", "ring": "reset"}
        ]
    }

# === STATIC FILES ===
@app.route('/')
def serve_index():
    """Отдаем главную страницу"""
    return send_from_directory('.', 'index.html')

@app.route('/vercel')
def vercel_index():
    """Версия для Vercel без Service Worker"""
    return send_from_directory('.', 'index-vercel.html')

@app.route('/no-sw')
def serve_index_no_sw():
    """Отдаем главную страницу без Service Worker"""
    return send_from_directory('.', 'index_no_sw.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Отдаем статические файлы"""
    try:
        return send_from_directory('.', filename)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404

# === API ENDPOINTS (точно как в MSW) ===

# Profile endpoints
@app.route('/api/common/profile', methods=['GET', 'POST'])
@app.route('/v2/api/common/profile', methods=['GET', 'POST'])
def profile():
    """Профиль пользователя"""
    return jsonify(get_profile_data())

# Settings endpoints  
@app.route('/api/common/settings', methods=['GET'])
@app.route('/v2/api/common/settings', methods=['GET'])
def common_settings():
    """Общие настройки"""
    return jsonify(get_settings_data())

@app.route('/api/games/settings', methods=['GET'])
@app.route('/v2/api/games/settings', methods=['GET'])
def game_settings():
    """Настройки игры"""
    return jsonify(get_game_settings_data())

@app.route('/api/games/config', methods=['GET'])
@app.route('/v2/api/games/config', methods=['GET'])
def game_config():
    """Конфигурация игры"""
    return jsonify(get_game_config_data())

# Game endpoints
@app.route('/api/games/create', methods=['POST'])
@app.route('/v2/api/games/create', methods=['POST'])
def create_game():
    """Создание новой игры"""
    global roundCounter
    roundCounter += 1
    
    # Возвращаем обнуленное состояние (как в MSW)
    return jsonify({
        "roundId": f"round-{roundCounter}",
        "state": {
            "initial": True,
            "collection": [0, 0, 0],
            "bonusWin": 0,
            "superBonus": False,
            "symbol": "SymbolNeutral",
            "cashable": False
        }
    })

def calculate_coefficient_from_rings(collection):
    """Функция для расчета коэффициента на основе текущего состояния колец"""
    coeffs = {
        'Symbol1': [0, 1.55, 4.85, 10, 7],      # blue (ring 2)
        'Symbol2': [0, 2.5, 7.7, 16, 27.5, 44, 20.5], # green (ring 1)  
        'Symbol3': [0, 3.9, 12.5, 28, 52, 85, 133, 200, 200] # red (ring 0)
    }
    
    total_coeff = 0
    
    # collection[0] = red ring (Symbol3)
    # collection[1] = green ring (Symbol2) 
    # collection[2] = blue ring (Symbol1)
    
    if collection[0] > 0 and collection[0] < len(coeffs['Symbol3']):
        total_coeff += coeffs['Symbol3'][collection[0]]
    if collection[1] > 0 and collection[1] < len(coeffs['Symbol2']):
        total_coeff += coeffs['Symbol2'][collection[1]]
    if collection[2] > 0 and collection[2] < len(coeffs['Symbol1']):
        total_coeff += coeffs['Symbol1'][collection[2]]
    
    # Если нет прогресса на кольцах, возвращаем минимальный коэффициент
    return total_coeff if total_coeff > 0 else 1.01

def apply_symbol_with_bonus(prev_collection, symbol):
    """Функция для обработки символа с проверкой бонусов"""
    global BALANCE
    
    col = prev_collection.copy()
    bonus_amount = 0
    MAX_STEP = 5  # максимальное количество шагов на кольцо для Symbol1 и Symbol2
    MAX_STEP_SYMBOL3 = 8  # максимальное количество шагов для Symbol3 (красное кольцо)
    
    if symbol == 'Symbol1':  # BLUE -> индекс 2
        new_value = min(col[2] + 1, MAX_STEP)
        col[2] = new_value
        
        # Проверяем, достигли ли мы бонусного значения (последний элемент = 7)
        if new_value == MAX_STEP:
            bonus_amount = 7  # +7 бонус
            print(f'[APP] 🎉 БОНУС! Symbol1 достиг максимального значения, начисляем +7 к балансу')
            
    elif symbol == 'Symbol2':  # GREEN -> индекс 1
        new_value = min(col[1] + 1, MAX_STEP)
        col[1] = new_value
        
        # Проверяем, достигли ли мы бонусного значения (последний элемент = 20.5)
        if new_value == MAX_STEP:
            bonus_amount = 20.5  # +20.5 бонус
            print(f'[APP] 🎉 БОНУС! Symbol2 достиг максимального значения, начисляем +20.5 к балансу')
            
    elif symbol == 'Symbol3':  # RED -> индекс 0
        new_value = min(col[0] + 1, MAX_STEP_SYMBOL3)
        col[0] = new_value
        
        # Проверяем, достигли ли мы максимального значения (последний элемент = 200)
        if new_value == MAX_STEP_SYMBOL3:
            bonus_amount = 200  # +200 бонус
            print(f'[APP] 🎉 БОНУС! Symbol3 достиг максимального значения, начисляем +200 к балансу')
        
    elif symbol == 'SymbolLoss':  # череп -> полный рестарт
        col = [0, 0, 0]
        
        # При выпадении черепа начисляем небольшой бонус к балансу
        bonus_amount = 0.5  # +0.5 за выпадение черепа
        print(f'[APP] 💀 ЧЕРЕП! Начисляем утешительный бонус {bonus_amount} к балансу')
        
    # Если есть бонус - начисляем его немедленно
    if bonus_amount > 0:
        BALANCE += bonus_amount
        print(f'[APP] 💰 Начислен бонус {bonus_amount}, новый баланс: {BALANCE}')
    
    return col, bonus_amount

@app.route('/api/bets/place', methods=['POST'])
@app.route('/v2/api/bets/place', methods=['POST'])
def place_bet():
    """Размещение ставки"""
    global BALANCE
    
    try:
        data = request.get_json() or {}
        stake = float(data.get('stake', 1.0))
        
        # Списываем ставку с баланса
        BALANCE -= stake
        print(f'[APP] Списали ставку: {stake}, Новый баланс: {BALANCE}')
        
        # Генерируем результат (как в MSW)
        symbols = ['Symbol1', 'Symbol2', 'Symbol3']
        symbol = random.choice(symbols)
        
        # Получаем текущее состояние колец из запроса
        data = request.get_json() or {}
        current_collection = data.get('collection', [0, 0, 0])
        
        # Применяем символ с проверкой бонусов
        new_collection, bonus_amount = apply_symbol_with_bonus(current_collection, symbol)
        
        # Получаем коэффициенты
        game_settings = get_game_settings_data()
        coefficients = game_settings[symbol]
        coefficient = random.choice(coefficients)
        
        # Вычисляем выигрыш
        payout = stake * coefficient
        
        # 30% шанс автокешаута
        autocashout = random.random() < 0.3
        
        # Возвращаем состояние игры
        return jsonify({
            "state": {
                "initial": False,
                "collection": new_collection,  # обновленная коллекция с бонусами
                "bonusWin": bonus_amount,  # сумма бонуса
                "superBonus": False,
                "symbol": symbol,
                "cashable": True
            },
            "result": "won" if payout > 0 else "lost",
            "payout": payout,
            "coefficient": coefficient,
            "autocashout": autocashout,
            "roundId": f"round-{roundCounter}"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в place_bet: {e}')
        return jsonify({"error": str(e)}), 500

@app.route('/api/bets/cashout', methods=['POST'])
@app.route('/v2/api/bets/cashout', methods=['POST'])
def cashout():
    """Кешаут (точно как в MSW)"""
    global BALANCE, roundCounter
    
    try:
        # Получаем текущее состояние из запроса (если есть)
        data = request.get_json() or {}
        current_collection = data.get('collection', [0, 0, 0])
        
        # 1) Считаем коэффициент на основе текущего состояния колец
        coefficient = calculate_coefficient_from_rings(current_collection)
        bet_amount = 1  # можно получать из запроса, но пока фиксируем
        payout = round(bet_amount * coefficient, 2)
        
        BALANCE += payout
        print(f'[APP] Зачисление: coefficient={coefficient}, payout={payout}, Новый баланс: {BALANCE}')
        
        # 2) Отключаем кэшаут у текущего и ГОТОВИМ новый раунд
        roundCounter += 1
        
        # ВАЖНО: возвращаем в ответе уже «обнулённое» состояние,
        # чтобы фронт сам перерисовал стартовое состояние.
        reset_state = {
            "initial": True,
            "collection": [0, 0, 0],
            "bonusWin": 0,
            "superBonus": False,
            "symbol": "SymbolNeutral",
            "cashable": False
        }
        
        # 3) Отдаём ответ: баланс уже начислили, а состояние — чистое
        return jsonify({
            "state": reset_state,
            "result": "won",
            "payout": payout,
            "coefficient": coefficient,
            "roundId": f"round-{roundCounter}"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в cashout: {e}')
        return jsonify({"error": str(e)}), 500

# === Profile update endpoints ===
@app.route('/api/player', methods=['PUT'])
@app.route('/api/common/player', methods=['PUT'])
@app.route('/v2/api/player', methods=['PUT'])
@app.route('/v2/api/common/player', methods=['PUT'])
def update_player():
    """Обновление данных игрока (включая никнейм)"""
    try:
        data = request.get_json() or {}
        nickname = data.get('nickname', 'vortex')
        
        print(f'[APP] Обновление профиля: nickname={nickname}')
        
        # Валидация отключена - принимаем любой никнейм
        if not nickname:
            nickname = "vortex"  # значение по умолчанию
        
        return jsonify({
            "success": True,
            "nickname": nickname,
            "message": "Profile updated successfully"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в update_player: {e}')
        return jsonify({"error": str(e)}), 500

@app.route('/api/common/profile/update', methods=['POST'])
@app.route('/v2/api/common/profile/update', methods=['POST'])
def update_profile():
    """Альтернативный эндпоинт для обновления профиля"""
    try:
        data = request.get_json() or {}
        nickname = data.get('nickname', 'vortex')
        
        print(f'[APP] Обновление профиля (альтернативный): nickname={nickname}')
        
        return jsonify({
            "success": True,
            "nickname": nickname,
            "message": "Profile updated successfully"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в update_profile: {e}')
        return jsonify({"error": str(e)}), 500

# === MyBets endpoints ===
@app.route('/api/common/bets/my', methods=['GET'])
@app.route('/v2/api/common/bets/my', methods=['GET'])
def my_bets():
    """История ставок пользователя"""
    try:
        # Получаем параметры запроса
        game_id = request.args.get('gameId', 'vortex')
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
        
        print(f'[APP] Запрос истории ставок: gameId={game_id}, limit={limit}, offset={offset}')
        
        # Статичные данные для истории ставок (как в MSW)
        static_bets_history = [
            {
                "id": "bet-001",
                "gameId": "vortex",
                "roundId": "round-001",
                "amount": 500,
                "payout": 1250,
                "coefficient": 2.5,
                "payoutCoefficient": 2.5,
                "result": "won",
                "updatedAt": "2025-01-15T23:08:00.000Z",
                "state": {"collection": [1, 1, 0], "bonusWin": 0, "superBonus": False, "symbol": "Symbol2"}
            },
            {
                "id": "bet-002",
                "gameId": "vortex",
                "roundId": "round-002",
                "amount": 200,
                "payout": 0,
                "coefficient": 0,
                "payoutCoefficient": 0,
                "result": "lose",
                "updatedAt": "2025-01-15T23:05:00.000Z",
                "state": {"collection": [0, 0, 0], "bonusWin": 0, "superBonus": False, "symbol": "SymbolLoss"}
            },
            {
                "id": "bet-003",
                "gameId": "vortex",
                "roundId": "round-003",
                "amount": 1000,
                "payout": 0,
                "coefficient": 0,
                "payoutCoefficient": 0,
                "result": "pending",
                "updatedAt": "2025-01-15T23:10:00.000Z",
                "state": {"collection": [1, 0, 0], "bonusWin": 0, "superBonus": False, "symbol": "Symbol3"}
            },
            {
                "id": "bet-004",
                "gameId": "vortex",
                "roundId": "round-004",
                "amount": 750,
                "payout": 1350,
                "coefficient": 1.8,
                "payoutCoefficient": 1.8,
                "result": "won",
                "updatedAt": "2025-01-15T23:00:00.000Z",
                "state": {"collection": [1, 1, 0], "bonusWin": 0, "superBonus": False, "symbol": "Symbol2"}
            },
            {
                "id": "bet-005",
                "gameId": "vortex",
                "roundId": "round-005",
                "amount": 300,
                "payout": 0,
                "coefficient": 0,
                "payoutCoefficient": 0,
                "result": "lose",
                "updatedAt": "2025-01-15T22:55:00.000Z",
                "state": {"collection": [0, 0, 0], "bonusWin": 0, "superBonus": False, "symbol": "SymbolLoss"}
            }
        ]
        
        # Применяем пагинацию
        paginated_bets = static_bets_history[offset:offset + limit]
        
        print(f'[APP] Возвращаем {len(paginated_bets)} ставок из {len(static_bets_history)}')
        return jsonify(paginated_bets)
        
    except Exception as e:
        print(f'[APP] Ошибка в my_bets: {e}')
        return jsonify({"error": str(e)}), 500

# === UNDO ONE STEP (кнопка "-1") ===
@app.route('/api/bets/cashoutPart', methods=['POST'])
@app.route('/api/bets/cashout/part', methods=['POST'])
@app.route('/api/bets/undo', methods=['POST'])
@app.route('/api/game/undo', methods=['POST'])
@app.route('/v2/api/bets/cashoutPart', methods=['POST'])
@app.route('/v2/api/bets/cashout/part', methods=['POST'])
@app.route('/v2/api/bets/undo', methods=['POST'])
@app.route('/v2/api/game/undo', methods=['POST'])
def undo_step():
    """Откат на один шаг (кнопка "-1")"""
    try:
        # Здесь должна быть логика отката одного шага
        # Пока возвращаем заглушку
        return jsonify({
            "state": {
                "initial": False,
                "collection": [0, 0, 0],  # будет обновлено фронтом
                "bonusWin": 0,
                "superBonus": False,
                "symbol": "SymbolNeutral",
                "cashable": False
            },
            "undone": True,
            "roundId": f"round-{roundCounter}"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в undo_step: {e}')
        return jsonify({"error": str(e)}), 500

# === CORS для всех методов ===
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Max-Age', '86400')
    return response

# === OPTIONS handler для CORS ===
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization,X-Requested-With")
        response.headers.add('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS")
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

# === Vercel handler ===
def handler(request):
    """Handler для Vercel"""
    return app(request.environ, lambda *args: None)

if __name__ == '__main__':
    print('[APP] Запуск сервера...')
    print(f'[APP] Стартовый баланс: {BALANCE}')
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)