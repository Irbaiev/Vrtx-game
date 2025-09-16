// Упрощенный Service Worker для перехвата API запросов
console.log('[MSW] Service Worker загружен');

// === IN-MEMORY BALANCE ===
let BALANCE = 1000; // стартовый баланс

// Белый список разрешенных хостов
const ALLOW_HOSTS = ['localhost', '127.0.0.1', 'vortex-clone-final-verson.vercel.app'];

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
      playerName: 'LocalVortex',
      currency: 'FUN',
      currencySign: '$',
      rounding: 2,
      balance: BALANCE, // динамический баланс из памяти
      sub: 'local-demo',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsImN1cnJlbmN5IjoiRlVOIn0.xxx'
    })
  },
  '/api/common/profile#get': {
    method: 'GET',
    response: () => ({
      id: 123456,
      playerId: "123456",
      apiKey: "123456",
      playerName: 'LocalVortex',
      currency: 'FUN',
      currencySign: '$',
      rounding: 2,
      balance: BALANCE, // динамический баланс из памяти
      sub: 'local-demo',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbC1kZW1vIiwicGxheWVyTmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsImN1cnJlbmN5IjoiRlVOIn0.xxx'
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
    // ВАЖНО: ключи именно Symbol3/Symbol2/Symbol1
    Symbol3: [1.1,1.3,1.55,2.0,3.0,5.0,7.0,10.0,12.5,15,20,25],  // red
    Symbol2: [1.2,1.6,2.1,3.2,4.85,7.0,9.0,12.0,16.0,20.0,24.0,30.0], // green
    Symbol1: [3.9,5.2,7.7,12.5,18.0,24.0,32.0,44.0,60.0,80.0,110.0,150.0] // blue
  }
},

'/v2/api/games/settings': {
  method: 'GET',
  response: {
    Symbol3: [1.1,1.3,1.55,2.0,3.0,5.0,7.0,10.0,12.5,15,20,25],  // red
    Symbol2: [1.2,1.6,2.1,3.2,4.85,7.0,9.0,12.0,16.0,20.0,24.0,30.0], // green
    Symbol1: [3.9,5.2,7.7,12.5,18.0,24.0,32.0,44.0,60.0,80.0,110.0,150.0] // blue
  }
},

        '/api/games/config': {
          method: 'GET',
          response: {
            progressMax: 5,
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
            progressMax: 5,
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
const MAX_STEP = 5;
const SYMBOLS = ['Symbol1', 'Symbol2', 'Symbol3', 'SymbolNeutral', 'SymbolLoss'];

function clamp(x, lo, hi) { return Math.min(Math.max(x, lo), hi); }
function pickSymbol() { return SYMBOLS[(Math.random() * SYMBOLS.length) | 0]; }

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

  // Флаг: нейтраль до старта — раунд не начался
  const neutralBeforeStart = (sym === 'SymbolNeutral' && prev.initial === true);

  switch (sym) {
    case 'Symbol1': // BLUE -> индекс 2
      col[RINGS.blue]  = clamp(col[RINGS.blue]  + 1, 0, MAX_STEP);
      break;
    case 'Symbol2': // GREEN -> индекс 1
      col[RINGS.green] = clamp(col[RINGS.green] + 1, 0, MAX_STEP);
      break;
    case 'Symbol3': // RED -> индекс 0
      col[RINGS.red]   = clamp(col[RINGS.red]   + 1, 0, MAX_STEP);
      break;
    case 'SymbolNeutral':
      // ничего не меняем в колекции
      break;
    case 'SymbolLoss': // череп -> полный рестарт
      col[0] = col[1] = col[2] = 0;
      historySymbols = [];
      return {
        initial: true,
        collection: [0, 0, 0],
        bonusWin: 0,
        superBonus: false,
        symbol: 'SymbolNeutral',
        cashable: false
      };
  }

  // Если нейтраль выпала до старта — старт "не начался"
  if (neutralBeforeStart) {
    return {
      initial: true,
      collection: prev.collection.slice(), // без изменений
      bonusWin: 0,
      superBonus: false,
      symbol: 'SymbolNeutral',
      cashable: false
    };
  }

  // Иначе — обычная логика
  const hasProgress = col.some(v => v > 0);
  return {
    initial: !hasProgress ? prev.initial : false, // если пошёл прогресс — старта уже нет
    collection: col,
    bonusWin: 0,
    superBonus: false,
    symbol: sym,
    cashable: hasProgress // кэшаут только если есть хоть 1 шаг
  };
}
// ==== /GAME STATE ====


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

        // ==== Если выпал ЧЕРЕП — мгновенный полный рестарт ====
        if (sym === 'SymbolLoss') {
          roundCounter += 1;
          lastState = {
            initial: true,
            collection: [0,0,0],
            bonusWin: 0,
            superBonus: false,
            symbol: 'SymbolNeutral', // нейтральный стартовый
            cashable: false
          };
          historySymbols = [];

          return createJsonResponse({
            state: lastState,
            result: 'lose',
            payout: 0,
            coefficient: 0,
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

                  // 4) Считаем Payout для частичного кэшаута.
                  //    Тут нет точной формулы — сделаем простую, но всегда > 0:
                  //    базово 0.3..0.8 на каждую откатанную дорожку.
                  const payout = +(decremented * (0.3 + Math.random() * 0.5)).toFixed(2);

                  // 5) Начисляем в баланс
                  BALANCE += payout;
                  console.log('[MSW][PARTIAL CASHOUT -1] ', before, ' => ', col, ' | payout:', payout, ' balance:', BALANCE);

                  // roundCounter НЕ увеличиваем — это тот же раунд
                  return createJsonResponse({
                    state: lastState,
                    result: 'won',
                    payout,
                    coefficient: +(1 + Math.random()).toFixed(2),
                    roundId: `round-${roundCounter}`,
                    partial: true
                  });
                }

                // === ПОЛНЫЙ КЭШАУТ (обычный Cashout) ===
                const payout = +(Math.random() * 3 + 1).toFixed(2);
                BALANCE += payout;
                console.log('[MSW] Зачисление (FULL CASHOUT):', payout, 'Новый баланс:', BALANCE);

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
                  coefficient: +(1 + Math.random() * 2).toFixed(2),
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
      const step = Number(url.searchParams.get('thin') || 2);
      response = thinSymbols(response, { 
        Symbol1: step, // внешний – оставляем каждый step-й элемент
        Symbol2: step, // средний – тоже каждый step-й элемент  
        Symbol3: step  // внутренний – каждый step-й элемент
      });
      
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