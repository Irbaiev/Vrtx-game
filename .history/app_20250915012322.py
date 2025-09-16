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
        "playerName": "LocalVortex",
        "currency": "FUN",
        "currencySign": "$",
        "rounding": 2,
        "balance": BALANCE,  # динамический баланс
        "sub": "local-demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsImN1cnJlbmN5IjoiRlVOIn0.xxx"
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
                "collection": [0, 0, 0],  # будет обновлено фронтом
                "bonusWin": 0,
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
        # 1) Зачисляем деньги
        payout = round(random.uniform(1, 4), 2)
        BALANCE += payout
        print(f'[APP] Зачисление: {payout}, Новый баланс: {BALANCE}')
        
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
            "coefficient": round(1 + random.uniform(0, 2), 2),
            "roundId": f"round-{roundCounter}"
        })
        
    except Exception as e:
        print(f'[APP] Ошибка в cashout: {e}')
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