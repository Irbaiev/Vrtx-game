// Упрощенный Service Worker для перехвата API запросов
console.log('[MSW] Service Worker загружен');

// === IN-MEMORY BALANCE ===
let BALANCE = 1000; // стартовый баланс

// Белый список разрешенных хостов
const ALLOW_HOSTS = ['localhost', '127.0.0.1', 'vrtx-game-33f9.vercel.app'];

self.addEventListener('install', (event) => {
  console.log('[MSW] Service Worker: install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[MSW] Service Worker: activate');
  event.waitUntil(self.clients.claim());
});


// Мок данные для API - все ответы плоские, без обёрток
const mockResponses = {
  // === Profile endpoints ===
  '/api/common/profile': {
    method: 'POST',
    response: () => ({
      id: 123456,
      playerId: "123456",
      apiKey: "123456",
      playerName: 'vortex',
      name: 'vortex',
      nickname: 'vortex',
      currency: 'FUN',
      currencySign: '$',
      rounding: 2,
      balance: BALANCE, // динамический баланс из памяти
      sub: 'local-demo',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6InZvcnRleCIsImJhbGFuY2UiOjk5OTk5OTAwLCJjdXJyZW5jeSI6IkZVTiJ9.xxx'
    })
  },
  '/api/common/profile#get': {
    method: 'GET',
    response: () => ({
      id: 123456,
      playerId: "123456",
      apiKey: "123456",
      playerName: 'vortex',
      name: 'vortex',
      nickname: 'vortex',
      currency: 'FUN',
      currencySign: '$',
      rounding: 2,
      balance: BALANCE, // динамический баланс из памяти
      sub: 'local-demo',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6InZvcnRleCIsImJhbGFuY2UiOjk5OTk5OTAwLCJjdXJyZW5jeSI6IkZVTiJ9.xxx'
    })
  },

  // === Settings endpoints ===
  '/api/common/settings': {
    method: 'GET',
    response: {
      availableTranslations: ['en', 'ru'],
      forceDemoAvailable: true,
      red: [1, 2, 3, 4, 5, 6],
      green: [1, 2, 3, 4, 5, 6],
      blue: [1, 2, 3, 4, 5, 6]
    }
  },
  // === Settings endpoints ===
  // === Settings endpoints ===
'/api/games/settings': {
  method: 'GET',
  response: {
    // ВАЖНО: ключи именно Symbol3/Symbol2/Symbol1 - используем оригинальные данные
    Symbol3: [0, 3.9, 12.5, 28, 52, 85, 133, 200, 200],  // red
    Symbol2: [0, 2.5, 7.7, 16, 27.5, 44, 20.5], // green
    Symbol1: [0, 1.55, 4.85, 10, 7] // blue
  }
},

'/v2/api/games/settings': {
  method: 'GET',
  response: {
    // ВАЖНО: ключи именно Symbol3/Symbol2/Symbol1 - используем оригинальные данные
    Symbol3: [0, 3.9, 12.5, 28, 52, 85, 133, 200, 200],  // red
    Symbol2: [0, 2.5, 7.7, 16, 27.5, 44, 20.5], // green
    Symbol1: [0, 1.55, 4.85, 10, 7] // blue
  }
},

        '/api/games/config': {
          method: 'GET',
          response: {
            progressMax: 12,  // максимум шагов на кольцо - как в оригинале
      spineData: [
        { id: 'Symbol1',        ring: 2 },   // blue
        { id: 'Symbol2',        ring: 1 },   // green  
        { id: 'Symbol3',        ring: 0 },   // red
        { id: 'SymbolNeutral',  ring: null },
        { id: 'SymbolLoss',     ring: 'reset' }
      ]
    }
  },

        '/v2/api/games/config': {
          method: 'GET',
          response: {
            progressMax: 12,  // максимум шагов на кольцо - как в оригинале
    spineData: [
      { id: 'Symbol1',        ring: 2 },
      { id: 'Symbol2',        ring: 1 },
      { id: 'Symbol3',        ring: 0 },
      { id: 'SymbolNeutral',  ring: null },
      { id: 'SymbolLoss',     ring: 'reset' }
    ]
  }
},

  '/v2/api/games/retrieve': {
    method: 'POST',
    response: { error: 'No active games' }
  },
  '/v2/api/games/create': {
    method: 'POST',
    response: {
      roundId: 'round-1',
      state: {
        initial: true,
        collection: [0, 0, 0],
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolNeutral',
        cashable: false
      }
    }
  },
  '/v2/api/bets/place': {
    method: 'POST',
    response: {
      state: { collection: [1, 0, 0], bonusWin: 0, superBonus: false, symbol: 'Symbol3' },
      result: 'won',
      payout: 2.5,
      coefficient: 2.5,
      autocashout: false,
      roundId: 'round-2'
    }
  },
  '/v2/api/bets/cashout': {
    method: 'POST',
    response: {
      state: { collection: [1, 1, 0], bonusWin: 0, superBonus: false, symbol: 'Symbol2' },
      result: 'won',
      payout: 3.2,
      coefficient: 3.2,
      roundId: 'round-3'
    }
  },

  // === Game endpoints ===
  '/api/games/retrieve': {
    method: 'POST',
    response: { error: 'No active games' }
  },
  '/api/games/create': {
    method: 'POST',
    response: {
      roundId: 'round-1',
      state: {
        initial: true,
        collection: [0, 0, 0],
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolNeutral',
        cashable: false
      }
    }
  },

  // === Bet endpoints ===
  '/api/bets/place': {
    method: 'POST',
    response: {
      state: { collection: [1, 0, 0], bonusWin: 0, superBonus: false, symbol: 'Symbol3' },
      result: 'won',
      payout: 2.5,
      coefficient: 2.5,
      autocashout: false,
      roundId: 'round-2'
    }
  },
  '/api/bets/cashout': {
    method: 'POST',
    response: {
      state: { collection: [1, 1, 0], bonusWin: 0, superBonus: false, symbol: 'Symbol2' },
      result: 'won',
      payout: 3.2,
      coefficient: 3.2,
      roundId: 'round-3'
    }
  },

  // === Other endpoints ===
  '/api/common/tournaments/my': {
    method: 'GET',
    response: []
  },
  '/api/common/limits': {
    method: 'GET',
    response: {
      defaultBet: 1,
      currency: 'FUN',
      currencyId: 0,
      maxBet: 1000000,
      maxWin: 0,
      minBet: 1
    }
  },
  '/api/common/rates': {
    method: 'GET',
    response: {}
  },
  '/api/common/version/vortex': {
    method: 'GET',
    response: {
      server: {
        rng: '1.0.0',
        version: '1.0.0'
      }
    }
  },
  '/api/common/ping': {
    method: 'GET',
    response: { ok: true }
  },
  
  // === Profile update endpoint ===
  '/api/player': {
    method: 'PUT',
    response: (request) => {
      const body = request.body;
      console.log('[MSW] Обновление профиля:', body);
      
      // Обновляем никнейм в глобальном состоянии
      if (body.nickname) {
        console.log('[MSW] ✅ Никнейм обновлен:', body.nickname);
      }
      
      return {
        success: true,
        nickname: body.nickname || 'vortex',
        message: 'Profile updated successfully'
      };
    }
  },
  
  // === Alternative profile update endpoint ===
  '/api/common/profile/update': {
    method: 'POST',
    response: (request) => {
      const body = request.body;
      console.log('[MSW] Обновление профиля (альтернативный):', body);
      
      return {
        success: true,
        nickname: body.nickname || 'vortex',
        message: 'Profile updated successfully'
      };
    }
  },
  
  // === Rules endpoints ===
  '/api/rules': {
    method: 'GET',
    response: () => {
      // Загружаем правила из файлов
      const vortexRules = `Как играть?

• Выберите сумму ставки с помощью кнопок "+" и "-" и нажмите "Spin" для начала игры!
• Заполняйте секторы элементов Огня, Земли и Воды для достижения максимального выигрыша.
• Заберите полный выигрыш, нажав "Cash Out", или часть выигрыша, нажав "Part PayOut".

Детали игры

Размещение ставки
Выберите сумму ставки, регулируя её кнопками "+" и "-".

Спин
Нажмите "Spin" для начала вращения барабанов. Обратите внимание, что вы можете изменить ставку только после окончания игры.

Удержание для спина
Вместо нажатия кнопки перед каждым раундом, просто нажмите и удерживайте кнопку "Spin" для автоматической игры в непрерывных раундах до тех пор, пока не отпустите её.

Кешаут
Нажмите "Cash Out" для получения выигрыша. После этого вы можете начать новую игру.

Частичный кешаут
Нажмите "Part PayOut" для получения разности между последним и предпоследним сегментами в каждом заполненном круге на ваш баланс. "Part PayOut" недоступен, если заполнен только 1 сектор в любом круге. Для активации кнопки "Part PayOut" заполните как минимум 2 сектора в одном круге.

Таблица выплат
🔥 Символ Огня – заполняет 1 сегмент во внешнем (красном) кольце. Множители: x3.9, x12.5, x28, x52, x85, x133, x200, БОНУС.
Заполните все красные секторы (Огонь) для запуска бонусной игры с самым большим призом, который немедленно зачисляется на ваш баланс. В конце бонусной игры все сегменты огненного кольца сбрасываются до 0.

🌍 Символ Земли – заполняет 1 сегмент в среднем (зеленом) кольце. Множители: x2.5, x7.7, x16, x27.5, x44, + x20.5 Бесплатный кешаут.
Заполните все зеленые секторы (Земля) и мгновенно получите выплату x20.5 на ваш баланс. После этого вы отступите на один шаг назад в зеленом кольце.

💧 Символ Воды – заполняет 1 сегмент во внутреннем (синем) кольце. Множители: x1.55, x4.85, x10, + x7 Бесплатный кешаут.
Заполните все синие секторы (Вода) и мгновенно получите выплату x7.0 на ваш баланс. После этого вы отступите на один шаг назад в синем кольце.

🌪️ Символ Ветра нейтрален и не влияет на кольца. Вы проигрываете ставку, но секторы остаются заполненными.

💀 Символ Черепа – отталкивает все кольца назад на 1 сегмент.

Бонусная игра
Когда все огненные сегменты заполнены, начинается бонусная игра с премиальными множителями (×100, ×200, ×300, ×400, ×500), все с равной вероятностью появления.
В конце бонусной игры все огненные сегменты сбрасываются, и вы получаете бонусную выплату плюс сумму за все сброшенные огненные сегменты (×200).

RTP
Игра основана на коэффициенте под названием "RTP" (Возврат игроку), который является статистическим средним выплат за миллиарды раундов. Vortex имеет RTP 93.56%–97.16%.

Настройки
Для доступа к настройкам нажмите на иконку шестеренки в правом верхнем углу экрана. В настройках вы можете:
• изменить свой никнейм;
• проверить минимальные и максимальные лимиты ставок;
• просмотреть лимиты максимального выигрыша;
• включить или отключить звуковые эффекты;
• просмотреть историю ваших ставок.

Политика отключения
Мы приоритизируем безопасность и удовлетворенность наших игроков, даже в случае неожиданных отключений интернета. Вот как мы обрабатываем такие ситуации:
• Если ставка была сделана после отключения, она не будет отправлена на сервер, средства не будут списаны, и игра не продолжится.
• Если отключение происходит во время активной игры, состояние игры на сервере остается неизменным. Игроки могут возобновить игру после восстановления соединения.

Версия
Версия игры: "[[version]]"
Версия RNG: "[[rng]]"`;

      const vortexShort = `Испытайте силу природы в Vortex! Используйте силы Огня, Земли и Воды, чтобы достичь новых высот!`;

      return {
        rules: vortexRules,
        rulesShort: vortexShort
      };
    }
  },
  
  '/v2/api/rules': {
    method: 'GET',
    response: () => {
      // Загружаем правила из файлов
      const vortexRules = `Как играть?

• Выберите сумму ставки с помощью кнопок "+" и "-" и нажмите "Spin" для начала игры!
• Заполняйте секторы элементов Огня, Земли и Воды для достижения максимального выигрыша.
• Заберите полный выигрыш, нажав "Cash Out", или часть выигрыша, нажав "Part PayOut".

Детали игры

Размещение ставки
Выберите сумму ставки, регулируя её кнопками "+" и "-".

Спин
Нажмите "Spin" для начала вращения барабанов. Обратите внимание, что вы можете изменить ставку только после окончания игры.

Удержание для спина
Вместо нажатия кнопки перед каждым раундом, просто нажмите и удерживайте кнопку "Spin" для автоматической игры в непрерывных раундах до тех пор, пока не отпустите её.

Кешаут
Нажмите "Cash Out" для получения выигрыша. После этого вы можете начать новую игру.

Частичный кешаут
Нажмите "Part PayOut" для получения разности между последним и предпоследним сегментами в каждом заполненном круге на ваш баланс. "Part PayOut" недоступен, если заполнен только 1 сектор в любом круге. Для активации кнопки "Part PayOut" заполните как минимум 2 сектора в одном круге.

Таблица выплат
🔥 Символ Огня – заполняет 1 сегмент во внешнем (красном) кольце. Множители: x3.9, x12.5, x28, x52, x85, x133, x200, БОНУС.
Заполните все красные секторы (Огонь) для запуска бонусной игры с самым большим призом, который немедленно зачисляется на ваш баланс. В конце бонусной игры все сегменты огненного кольца сбрасываются до 0.

🌍 Символ Земли – заполняет 1 сегмент в среднем (зеленом) кольце. Множители: x2.5, x7.7, x16, x27.5, x44, + x20.5 Бесплатный кешаут.
Заполните все зеленые секторы (Земля) и мгновенно получите выплату x20.5 на ваш баланс. После этого вы отступите на один шаг назад в зеленом кольце.

💧 Символ Воды – заполняет 1 сегмент во внутреннем (синем) кольце. Множители: x1.55, x4.85, x10, + x7 Бесплатный кешаут.
Заполните все синие секторы (Вода) и мгновенно получите выплату x7.0 на ваш баланс. После этого вы отступите на один шаг назад в синем кольце.

🌪️ Символ Ветра нейтрален и не влияет на кольца. Вы проигрываете ставку, но секторы остаются заполненными.

💀 Символ Черепа – отталкивает все кольца назад на 1 сегмент.

Бонусная игра
Когда все огненные сегменты заполнены, начинается бонусная игра с премиальными множителями (×100, ×200, ×300, ×400, ×500), все с равной вероятностью появления.
В конце бонусной игры все огненные сегменты сбрасываются, и вы получаете бонусную выплату плюс сумму за все сброшенные огненные сегменты (×200).

RTP
Игра основана на коэффициенте под названием "RTP" (Возврат игроку), который является статистическим средним выплат за миллиарды раундов. Vortex имеет RTP 93.56%–97.16%.

Настройки
Для доступа к настройкам нажмите на иконку шестеренки в правом верхнем углу экрана. В настройках вы можете:
• изменить свой никнейм;
• проверить минимальные и максимальные лимиты ставок;
• просмотреть лимиты максимального выигрыша;
• включить или отключить звуковые эффекты;
• просмотреть историю ваших ставок.

Политика отключения
Мы приоритизируем безопасность и удовлетворенность наших игроков, даже в случае неожиданных отключений интернета. Вот как мы обрабатываем такие ситуации:
• Если ставка была сделана после отключения, она не будет отправлена на сервер, средства не будут списаны, и игра не продолжится.
• Если отключение происходит во время активной игры, состояние игры на сервере остается неизменным. Игроки могут возобновить игру после восстановления соединения.

Версия
Версия игры: "[[version]]"
Версия RNG: "[[rng]]"`;

      const vortexShort = `Испытайте силу природы в Vortex! Используйте силы Огня, Земли и Воды, чтобы достичь новых высот!`;

      return {
        rules: vortexRules,
        rulesShort: vortexShort
      };
    }
  }
};

// Функция для создания JSON ответа
function createJsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
// --- ДОБАВЬ вспомогалки выше ---
function thinArray(arr, step = 2) {
  // оставляем каждый step-й элемент: 0, step, 2*step, ...
  return Array.isArray(arr) ? arr.filter((_, i) => i % step === 0) : arr;
}
function thinSymbols(payload, density = { Symbol1: 2, Symbol2: 2, Symbol3: 2 }) {
  const out = { ...payload };
  for (const [key, val] of Object.entries(payload)) {
    if (/^Symbol[123]$/.test(key)) {
      // если это массив строк/чисел – просто режем
      if (Array.isArray(val)) out[key] = thinArray(val, density[key] || 2);
      // если в твоей схеме SymbolN — объект с полями, ищем поле с подписями
      else if (val && typeof val === 'object') {
        const clone = { ...val };
        if (Array.isArray(val.labels)) clone.labels = thinArray(val.labels, density[key] || 2);
        if (Array.isArray(val.ticks))  clone.ticks  = thinArray(val.ticks, density[key] || 2);
        out[key] = clone;
      }
    }
  }
  return out;
}

function forceTicks(payload, fixed = 12) {
  const out = { ...payload };
  for (const key of ['Symbol1','Symbol2','Symbol3']) {
    if (Array.isArray(out[key])) {
      // либо урезаем, либо заполняем до fixed
      const arr = out[key].slice(0, fixed);
      while (arr.length < fixed) arr.push(arr[arr.length-1] ?? 1);
      out[key] = arr;
    }
  }
  return out;
}

// ==== GAME STATE (глобально, чтобы сохранялось между запросами) ====
const RINGS = { red: 0, green: 1, blue: 2 };
const MAX_STEP = 5; // для Symbol1 и Symbol2
const MAX_STEP_SYMBOL3 = 8; // для Symbol3 (красное кольцо) - больше шагов
const SYMBOLS = ['Symbol1', 'Symbol2', 'Symbol3', 'SymbolNeutral', 'SymbolLoss'];

function clamp(x, lo, hi) { return Math.min(Math.max(x, lo), hi); }
function pickSymbol() { 
  // Взвешенный выбор символов для более реалистичной игры
  const weights = {
    'Symbol1': 0.20,    // 20% - синий
    'Symbol2': 0.20,    // 20% - зеленый  
    'Symbol3': 0.20,    // 20% - красный
    'SymbolNeutral': 0.15, // 15% - нейтраль (пропуск хода)
    'SymbolLoss': 0.25  // 25% - череп (проигрыш) - УВЕЛИЧИЛИ!
  };
  
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [symbol, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (rand <= cumulative) {
      return symbol;
    }
  }
  
  // Fallback на случай ошибки
  return 'SymbolNeutral';
}

let lastState = {
  initial: true,
  collection: [0,0,0],
  bonusWin: 0,
  superBonus: false,
  symbol: 'SymbolNeutral',
  cashable: false
};
let roundCounter = 1;

// 👉 НОВОЕ: стек истории реальных инкрементов (Symbol1/2/3)
let historySymbols = [];  // например: ['Symbol3','Symbol2',...]

function applySymbol(prev, sym) {
  const col = prev.collection.slice();
  let bonusAmount = 0; // сумма бонуса для немедленного начисления

  switch (sym) {
    case 'Symbol1': // BLUE -> индекс 2
      const newBlueValue = clamp(col[RINGS.blue] + 1, 0, MAX_STEP);
      col[RINGS.blue] = newBlueValue;
      
      // Проверяем, достигли ли мы бонусного значения (последний элемент = 7)
      if (newBlueValue === MAX_STEP) {
        bonusAmount = 7; // +7 бонус
        console.log('[MSW] 🎉 БОНУС! Symbol1 достиг максимального значения, начисляем +7 к балансу');
      }
      break;
      
    case 'Symbol2': // GREEN -> индекс 1
      const newGreenValue = clamp(col[RINGS.green] + 1, 0, MAX_STEP);
      col[RINGS.green] = newGreenValue;
      
      // Проверяем, достигли ли мы бонусного значения (последний элемент = 20.5)
      if (newGreenValue === MAX_STEP) {
        bonusAmount = 20.5; // +20.5 бонус
        console.log('[MSW] 🎉 БОНУС! Symbol2 достиг максимального значения, начисляем +20.5 к балансу');
      }
      break;
      
    case 'Symbol3': // RED -> индекс 0
      const newRedValue = clamp(col[RINGS.red] + 1, 0, MAX_STEP_SYMBOL3);
      col[RINGS.red] = newRedValue;
      
      // Symbol3 может доходить до 8 шагов (до 200x)
      // Проверяем, достигли ли мы максимального значения
      if (newRedValue === MAX_STEP_SYMBOL3) {
        bonusAmount = 200; // +200 бонус за достижение максимума
        console.log('[MSW] 🎉 БОНУС! Symbol3 достиг максимального значения, начисляем +200 к балансу');
      }
      break;
    case 'SymbolNeutral':
      // Нейтраль: ничего не меняем в коллекции, но и не обнуляем игру
      // Если игра уже началась (есть прогресс), то просто пропускаем ход
      console.log('⚪ [MSW] SymbolNeutral: пропуск хода, коллекция остается:', prev.collection);
      if (prev.initial && col.every(v => v === 0)) {
        // Если игра еще не началась - остаемся в начальном состоянии
        return {
          initial: true,
          collection: prev.collection.slice(),
          bonusWin: 0,
          superBonus: false,
          symbol: 'SymbolNeutral',
          cashable: false
        };
      }
      // Если игра уже началась - просто пропускаем ход без изменений
      return {
        initial: false,
        collection: prev.collection.slice(),
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolNeutral',
        cashable: prev.cashable
      };
    case 'SymbolLoss': // череп -> шаг назад на 1 для всех колец
      // Шаг назад на 1 для всех элементов (НЕ трогаем баланс)
      const before = [...col];
      col = col.map(v => typeof v === 'number' ? Math.max(0, v - 1) : v);
      
      console.log('💀 [MSW] ЧЕРЕП в applySymbol — шаг назад на 1. Было:', before, 'Стало:', col);
      
      return {
        initial: col.every(v => v === 0), // initial только если все кольца на 0
        collection: col,
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolLoss', // показываем череп
        cashable: col.some(v => v > 0) // кэшаут доступен если есть прогресс
      };
  }

  // Если есть бонус - начисляем его немедленно
  if (bonusAmount > 0) {
    BALANCE += bonusAmount;
    console.log(`[MSW] 💰 Начислен бонус ${bonusAmount}, новый баланс: ${BALANCE}`);
  }

  // Для Symbol1, Symbol2, Symbol3 - обычная логика
  const hasProgress = col.some(v => v > 0);
  return {
    initial: !hasProgress ? prev.initial : false, // если пошёл прогресс — старта уже нет
    collection: col,
    bonusWin: bonusAmount, // передаем бонус в ответе
    superBonus: false,
    symbol: sym,
    cashable: hasProgress // кэшаут только если есть хоть 1 шаг
  };
}
// ==== /GAME STATE ====

// Функция для расчета коэффициента на основе текущего состояния колец
function calculateCoefficientFromRings(collection) {
  const coeffs = {
    Symbol1: [0, 1.55, 4.85, 10, 7],      // blue (ring 2)
    Symbol2: [0, 2.5, 7.7, 16, 27.5, 44, 20.5], // green (ring 1)  
    Symbol3: [0, 3.9, 12.5, 28, 52, 85, 133, 200, 200] // red (ring 0)
  };
  
  let totalCoeff = 0;
  
  // collection[0] = red ring (Symbol3)
  // collection[1] = green ring (Symbol2) 
  // collection[2] = blue ring (Symbol1)
  
  if (collection[0] > 0 && collection[0] < coeffs.Symbol3.length) {
    totalCoeff += coeffs.Symbol3[collection[0]];
  }
  if (collection[1] > 0 && collection[1] < coeffs.Symbol2.length) {
    totalCoeff += coeffs.Symbol2[collection[1]];
  }
  if (collection[2] > 0 && collection[2] < coeffs.Symbol1.length) {
    totalCoeff += coeffs.Symbol1[collection[2]];
  }
  
  // Если нет прогресса на кольцах, возвращаем минимальный коэффициент
  return totalCoeff > 0 ? totalCoeff : 1.01;
}

// Основной обработчик fetch
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  const method = event.request.method.toUpperCase();
  

  

  // ==== DYNAMIC GAME MOCKS: мгновенное и независимое заполнение, череп = сброс ====

// CREATE — стартовое состояние
    if ((pathname === '/api/games/create' || pathname === '/v2/api/games/create') &&
        method === 'POST') {
      roundCounter = 1;
      lastState = {
        initial: true,
        collection: [0, 0, 0],
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolNeutral',
        cashable: false
      };
      event.respondWith(createJsonResponse({ roundId: `round-${roundCounter}`, state: lastState }));
      return;
    }

    // PLACE (spin) — применяем символ СРАЗУ + списываем баланс
    if ((pathname === '/api/bets/place' || pathname === '/v2/api/bets/place') &&
        method === 'POST') {
      event.respondWith((async () => {
        const body = await event.request.clone().json().catch(() => ({}));
        const amount = Number(body.amount || 0);

        if (!isNaN(amount) && amount > 0) {
          BALANCE -= amount;
          console.log('[MSW] Списание:', amount, 'Новый баланс:', BALANCE);
        }

        // крутим символ
        const sym = pickSymbol();
        console.log('[MSW] Выпал символ:', sym, 'Текущее состояние:', lastState.collection);
        
        // Логируем поведение символов
        if (sym === 'SymbolNeutral') {
          console.log('⚪ [MSW] НЕЙТРАЛЬ - пропуск хода, игра продолжается');
        } else if (sym === 'SymbolLoss') {
          console.log('💀 [MSW] ЧЕРЕП - игра обнуляется!');
        } else {
          console.log('🎯 [MSW] ЦВЕТНОЙ СИМВОЛ - прогресс по кольцам');
        }

        // ==== Если выпал ЧЕРЕП — шаг назад на 1 для всех колец ====
        if (sym === 'SymbolLoss') {
          // Череп: шаг назад на 1 для всех элементов (НЕ трогаем баланс, не даём откат)
          const before = Array.isArray(lastState.collection) ? [...lastState.collection] : [0, 0, 0];

          const newCollection = (lastState.collection || [0, 0, 0]).map(v =>
            typeof v === 'number' ? Math.max(0, v - 1) : v
          );

          // Денежные эффекты = 0
          const payout = 0;
          const coefficient = 0;

          console.log('💀 [MSW] ЧЕРЕП — шаг назад на 1. Было:', before, 'Стало:', newCollection);

          roundCounter += 1;
          lastState = {
            initial: newCollection.every(v => v === 0), // initial только если все кольца на 0
            collection: newCollection,
            bonusWin: 0,
            superBonus: false,
            symbol: 'SymbolLoss', // показываем череп как символ
            cashable: newCollection.some(v => v > 0) // кэшаут доступен если есть прогресс
          };

          return createJsonResponse({
            state: lastState,
            result: 'lose',
            payout: payout,
            coefficient: coefficient,
            autocashout: false,
            roundId: `round-${roundCounter}`
          });
        }

        // обычный символ — инкремент дорожки и разрешаем кэшаут
        roundCounter += 1;
        lastState = applySymbol(lastState, sym);

        // пишем историю только для инкрементов
        if (sym === 'Symbol1' || sym === 'Symbol2' || sym === 'Symbol3') {
          historySymbols.push(sym);
        }

        lastState = { ...lastState, cashable: true };

        return createJsonResponse({
          state: lastState,
          result: Math.random() < 0.5 ? 'won' : 'lose',
          payout: +(Math.random() * 5).toFixed(2),
          coefficient: +(1 + Math.random() * 4).toFixed(2),
          autocashout: false,
          roundId: `round-${roundCounter}`
        });
      })());
      return;
    }

            if ((pathname === '/api/bets/cashout' || pathname === '/v2/api/bets/cashout') &&
                method === 'POST') {
              event.respondWith((async () => {
                const body = await event.request.clone().json().catch(() => ({}));
                const isPartial = Boolean(body.partial);

                // === ЧАСТИЧНЫЙ КЭШАУТ (кнопка "-1") ===
                if (isPartial) {
                  // 1) Откатываем каждую непустую дорожку на -1
                  const col = (lastState?.collection || [0,0,0]).slice();
                  const before = [...col];
                  let decremented = 0;
                  for (let i = 0; i < col.length; i++) {
                    if (col[i] > 0) {
                      col[i] -= 1;
                      decremented++;
                    }
                  }

                  // Если совсем нечего откатывать — просто вернём текущее состояние без выплаты
                  if (decremented === 0) {
                    return createJsonResponse({
                      state: lastState,
                      result: 'won',
                      payout: 0,
                      coefficient: +(1 + Math.random()).toFixed(2),
                      roundId: `round-${roundCounter}`,
                      partial: true
                    });
                  }

                  // 2) Чистим стек истории (чтобы следующий -1 не "уезжал" дальше)
                  historySymbols = [];

                  // 3) Обновляем состояние — НЕ перезапускаем раунд!
                  lastState = {
                    ...(lastState || {}),
                    collection: col,
                    symbol: 'SymbolNeutral',        // нейтральный символ для UI
                    cashable: col.some(v => v > 0), // кэшаут доступен, если остались шаги
                    initial: col.every(v => v === 0) // если всё обнулили — снова initial
                  };

                  // 4) Считаем коэффициент на основе текущего состояния колец
                  const coefficient = calculateCoefficientFromRings(col);
                  
                  // 5) Считаем Payout на основе коэффициента (предполагаем ставку 1)
                  const betAmount = 1; // можно получать из запроса, но пока фиксируем
                  const payout = +(betAmount * coefficient).toFixed(2);

                  // 6) Начисляем в баланс
                  BALANCE += payout;
                  console.log('[MSW][PARTIAL CASHOUT -1] ', before, ' => ', col, ' | coefficient:', coefficient, ' payout:', payout, ' balance:', BALANCE);

                  // roundCounter НЕ увеличиваем — это тот же раунд
                  return createJsonResponse({
                    state: lastState,
                    result: 'won',
                    payout,
                    coefficient: coefficient,
                    roundId: `round-${roundCounter}`,
                    partial: true
                  });
                }

                // === ПОЛНЫЙ КЭШАУТ (обычный Cashout) ===
                // Считаем коэффициент на основе текущего состояния колец
                const coefficient = calculateCoefficientFromRings(lastState.collection);
                const betAmount = 1; // можно получать из запроса, но пока фиксируем
                const payout = +(betAmount * coefficient).toFixed(2);
                
                BALANCE += payout;
                console.log('[MSW] Зачисление (FULL CASHOUT): coefficient:', coefficient, ' payout:', payout, 'Новый баланс:', BALANCE);

                roundCounter += 1;

                // Полный рестарт раунда
                lastState = {
                  initial: true,
                  collection: [0,0,0],
                  bonusWin: 0,
                  superBonus: false,
                  symbol: 'SymbolNeutral',
                  cashable: false
                };
                historySymbols = [];

                return createJsonResponse({
                  state: lastState,
                  result: 'won',
                  payout,
                  coefficient: coefficient,
                  roundId: `round-${roundCounter}`,
                  partial: false
                });
              })());
              return;
            }


// ==== /DYNAMIC GAME MOCKS ====




  // Логируем только важные запросы
  if (pathname.includes('/api/')) {
    console.log('[MSW] API запрос:', pathname, 'Метод:', method);
  }

  // 1) Проверяем точный мок для пути и метода
  let mockData = mockResponses[pathname];

  // Проверяем виртуальный ключ для GET запросов
  if (!mockData && method === 'GET') {
    mockData = mockResponses[pathname + '#get'];
  }

  if (mockData && mockData.method === method) {
    console.log('[MSW] Возвращаем мок для:', pathname);
    let response = typeof mockData.response === 'function' ? mockData.response() : mockData.response;
    
    // Применяем фильтрацию для /api/games/settings
    if (pathname === '/api/games/settings' || pathname === '/v2/api/games/settings') {
      // Отключаем фильтрацию для правильного позиционирования элементов в кольцах
      // const step = Number(url.searchParams.get('thin') || 2);
      // response = thinSymbols(response, { 
      //   Symbol1: step, // внешний – оставляем каждый step-й элемент
      //   Symbol2: step, // средний – тоже каждый step-й элемент  
      //   Symbol3: step  // внутренний – каждый step-й элемент
      // });
      
      // Жёстко фиксируем количество делений
      const fixed = Number(url.searchParams.get('fixed') || 0);
      if (fixed > 0) {
        response = forceTicks(response, fixed);
        console.log('[MSW] Возвращаем фиксированные', fixed, 'делений');
      }
    }
    
    event.respondWith(createJsonResponse(response));
    return;
  }

  // 2) Специальная обработка для переводов
  if (pathname.includes('/api/translates/') && pathname.includes('/latest/')) {
    const translations = {
      "COMMON.PLEASE_LOGIN": "PLEASE LOGIN",
      "GAME.SPIN": "SPIN",
      "GAME.CASHOUT": "CASHOUT",
      "GAME.BET": "BET",
      "GAME.BALANCE": "BALANCE",
      "GAME.WIN": "WIN",
      "GAME.LOSE": "LOSE",
      "ELEMENTS.FIRE": "FIRE",
      "ELEMENTS.EARTH": "EARTH",
      "ELEMENTS.WATER": "WATER"
    };
    event.respondWith(createJsonResponse(translations));
    return;
  }

  // 3) Разрешаем статические файлы
  if (pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.mp3') ||
    pathname.endsWith('.wav') ||
    pathname.endsWith('.ogg') ||
    pathname.endsWith('.atlas') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.eot') ||
    pathname.includes('css2') ||
    pathname.includes('static/') ||
    pathname.includes('modules/') ||
    pathname === '/css2') {
    event.respondWith(fetch(event.request));
    return;
  }

  // 4) Блокируем внешние запросы (только если хост не в белом списке)
  if (!ALLOW_HOSTS.includes(url.hostname)) {
    console.log('[MSW] Блокируем внешний запрос:', url.hostname);
    event.respondWith(createJsonResponse({ error: 'External request blocked' }, 403));
    return;
  }

  // 5) Логируем API запросы без мока
  if (pathname.includes('/api/')) {
    console.log('[MSW] ⚠️ API запрос без мока:', pathname, 'Метод:', method);
  }

  // 6) Для всех остальных запросов - пропускаем в сеть
  event.respondWith(fetch(event.request));
});
