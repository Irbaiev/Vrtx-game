// ===================================================================
// ПРОСТОЙ, НАДЕЖНЫЙ SERVICE WORKER БЕЗ ЗАВИСИМОСТЕЙ
// ===================================================================

// ШАГ 1: Агрессивная активация воркера
self.addEventListener('install', () => {
  console.log('[SW] Service Worker: Установлен');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker: Активирован');
  event.waitUntil(self.clients.claim());
});

// ШАГ 2: Главный обработчик, который перехватывает ВСЕ сетевые запросы
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  console.log('[SW] Перехвачен запрос:', event.request.method, url.pathname);

  // --- АВТОРИЗАЦИЯ ---
  if (url.pathname === '/api/common/profile' && event.request.method === 'POST') {
    console.log('[SW] >>> Мокаем /api/common/profile');
    const responseBody = {
      success: true,
      payload: {
        id: 123456,
        nickname: 'LocalVortex',
        balance: 99999900,
        currency: { iso: 'FUN', rate: 1, min_in: 100, min_out: 100 },
        token: 'fake-jwt-token-for-local-use'
      }
    };
    event.respondWith(new Response(JSON.stringify(responseBody), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }
  
  if (url.pathname === '/api/common/settings' && event.request.method === 'GET') {
    console.log('[SW] >>> Мокаем /api/common/settings');
    const responseBody = {
      success: true,
      payload: { availableTranslations: ["en", "ru"], forceDemoAvailable: true }
    };
    event.respondWith(new Response(JSON.stringify(responseBody), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }

  // --- ИГРОВОЙ ЦИКЛ ---
  if (url.pathname === '/api/games/retrieve' && event.request.method === 'POST') {
    console.log('[SW] >>> Мокаем /api/games/retrieve (ошибка, чтобы начать новую игру)');
    event.respondWith(new Response(JSON.stringify({ success: false, error: 'No active games' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }

  if (url.pathname === '/api/games/create' && event.request.method === 'POST') {
    console.log('[SW] >>> Мокаем /api/games/create');
    const responseBody = {
      success: true,
      payload: { id: `round-${new Date().getTime()}`, state: 'created', salt: 'fake-salt' }
    };
    event.respondWith(new Response(JSON.stringify(responseBody), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }

  if (url.pathname === '/api/bets/place' && event.request.method === 'POST') {
    console.log('[SW] >>> Мокаем /api/bets/place');
    event.respondWith((async () => {
      const requestBody = await event.request.json();
      const outcomes = [
          { result: 'win', coefficient: 2.5, payout: requestBody.amount * 2.5, state: 'finished' },
          { result: 'lose', coefficient: 0, payout: 0, state: 'finished' }
      ];
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      
      // Имитируем задержку сервера
      await new Promise(res => setTimeout(res, 1000));

      return new Response(JSON.stringify({ success: true, payload: { id: requestBody.roundId, ...outcome } }), {
        headers: { 'Content-Type': 'application/json' }
      });
    })());
    return;
  }
  
  if (url.pathname === '/api/bets/cashout' && event.request.method === 'POST') {
    console.log('[SW] >>> Мокаем /api/bets/cashout');
    event.respondWith(new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }
  
  // --- ПРОЧИЕ ЗАПРОСЫ (которые мы видели в логах, но которые не так важны) ---
  if (url.pathname.startsWith('/api/games/settings') || url.pathname.startsWith('/api/translates')) {
    console.log('[SW] >>> Мокаем прочий API запрос:', url.pathname);
    event.respondWith(new Response(JSON.stringify({ success: true, payload: {} }), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }

  // Если запрос не подошел ни под одно из правил, пропускаем его в реальную сеть.
  // Это важно для загрузки картинок, шрифтов и самой игры.
  console.log('[SW] Пропускаем запрос:', url.pathname);
  event.respondWith(fetch(event.request));
});