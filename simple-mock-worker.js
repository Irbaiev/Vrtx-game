// Упрощенный Service Worker для перехвата API запросов
console.log('[MSW] Service Worker загружен');

self.addEventListener('install', (event) => {
  console.log('[MSW] Service Worker: install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[MSW] Service Worker: activate');
  event.waitUntil(self.clients.claim());
});

// Мок данные для API
const mockResponses = {
  '/api/common/profile': {
    method: 'POST',
    response: {
      id: 123456,
      playerName: 'LocalVortex',          // важно: именно playerName, не nickname
      balance: 99999900,
      currency: 'FUN',                    // игра ждёт строку валюты
      currencySign: 'F',
      rounding: 2,
      freebetsVerified: true,
      sub: 'local-demo',
      token: 'fake-jwt-token-for-local-use'
    }
  },
  '/api/common/settings': {
    method: 'GET',
    response: {
      success: true,
      payload: {
        availableTranslations: ["en", "ru"],
        forceDemoAvailable: true
      }
    }
  },
  '/api/games/settings': {
    method: 'GET',
    response: {
      success: true,
      payload: {
        gameId: "vortex",
        version: "1.0",
        minBet: 100,
        maxBet: 1000000
      }
    }
  },
  '/api/games/create': {
    method: 'POST',
    response: {
      success: true,
      payload: {
        id: `round-${Date.now()}`,
        state: "created",
        salt: `fake-salt-${Math.random().toString(36).substr(2, 16)}`
      }
    }
  },
  '/api/bets/place': {
    method: 'POST',
    response: {
      success: true,
      payload: {
        id: `round-${Date.now()}`,
        result: Math.random() > 0.3 ? 'win' : 'lose',
        coefficient: Math.random() > 0.3 ? Math.random() * 5 : 0,
        payout: Math.random() > 0.3 ? Math.floor(Math.random() * 1000) : 0,
        state: 'finished'
      }
    }
  },
  '/api/bets/cashout': {
    method: 'POST',
    response: {
      success: true,
      payload: { message: "Cashout successful" }
    }
  },
  '/api/games/retrieve': {
    method: 'POST',
    response: {
      success: false,
      error: 'No active games'
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

// Основной обработчик fetch
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  console.log('[MSW] Перехвачен запрос:', pathname);

  // Проверяем, есть ли мок для этого пути
  const mockData = mockResponses[pathname];

  if (mockData && event.request.method === mockData.method) {
    console.log('[MSW] Возвращаем мок данные для:', pathname);
    event.respondWith(createJsonResponse(mockData.response));
    return;
  }

  // Специальная обработка для переводов
  if (pathname.includes('/api/translates/') && pathname.includes('/latest/')) {
    console.log('[MSW] Возвращаем мок переводы для:', pathname);
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

  // Разрешаем статические файлы (CSS, JS, изображения, шрифты)
  if (pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.eot') ||
    pathname.endsWith('.mp3') ||
    pathname.endsWith('.wav') ||
    pathname.endsWith('.ogg') ||
    pathname.endsWith('.atlas') ||
    pathname.endsWith('.json') ||
    pathname.includes('css2') ||
    pathname.includes('static/') ||
    pathname.includes('modules/') ||
    pathname === '/css2') {
    console.log('[MSW] Разрешаем статический файл:', pathname);
    event.respondWith(fetch(event.request));
    return;
  }

  // Блокируем только внешние запросы (не localhost)
  if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
    console.log('[MSW] Блокируем внешний запрос:', url.hostname);
    event.respondWith(createJsonResponse({ error: 'External request blocked' }, 403));
    return;
  }

  // Для всех остальных запросов - пропускаем
  console.log('[MSW] Пропускаем запрос:', pathname);
  event.respondWith(fetch(event.request));
});