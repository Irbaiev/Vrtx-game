// ШАГ 1: Агрессивная активация, чтобы воркер начал работать немедленно.
self.addEventListener('install', (event) => {
  console.log('[MSW] Service Worker: install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[MSW] Service Worker: activate');
  event.waitUntil(self.clients.claim());
});

// ШАГ 2: Импортируем библиотеку MSW.
// Она создает глобальный объект "MockServiceWorker".
importScripts('/msw.js');

// ШАГ 3: Получаем нужные нам инструменты из библиотеки.
const { handleRequest, http, HttpResponse } = MockServiceWorker;

// ШАГ 4: Определяем наши фейковые ответы (хендлеры).
const handlers = [
    http.post('/api/common/profile', () => {
        console.log('[MSW] Intercepted POST /api/common/profile');
        return HttpResponse.json({
            success: true,
            payload: {
                id: 123456,
                nickname: 'LocalVortex',
                balance: 99999900,
                currency: { iso: 'FUN', rate: 1, min_in: 100, min_out: 100 },
                token: 'fake-jwt-token-for-local-use'
            }
        });
    }),
    http.get('/api/common/settings', () => {
        console.log('[MSW] Intercepted GET /api/common/settings');
        return HttpResponse.json({
            success: true,
            payload: { availableTranslations: ["en", "ru"], forceDemoAvailable: true }
        });
    }),
    // Дополнительные хендлеры для запросов, которые мы видели в логах
    http.get('/api/games/settings', () => {
        console.log('[MSW] Intercepted GET /api/games/settings');
        return HttpResponse.json({ success: true, payload: {} });
    }),
    http.get('/api/translates/:id/latest/en', () => {
        console.log('[MSW] Intercepted GET /api/translates');
        return HttpResponse.json({ "COMMON.PLEASE_LOGIN": "PLEASE LOGIN" }); // Возвращаем хоть что-то
    }),
    http.post('/api/games/retrieve', () => {
        console.log('[MSW] Intercepted POST /api/games/retrieve');
        return HttpResponse.json({ success: false, error: 'No active games' }, { status: 404 });
    }),
    http.post('/api/games/create', () => {
        console.log('[MSW] Intercepted POST /api/games/create');
        return HttpResponse.json({
            success: true,
            payload: { id: `round-${new Date().getTime()}`, state: 'created', salt: 'fake-salt' }
        });
    }),
    http.post('/api/bets/place', async ({ request }) => {
        console.log('[MSW] Intercepted POST /api/bets/place');
        const body = await request.json();
        const outcomes = [
            { result: 'win', coefficient: 2.5, payout: body.amount * 2.5, state: 'finished' },
            { result: 'lose', coefficient: 0, payout: 0, state: 'finished' }
        ];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        await new Promise(res => setTimeout(res, 1000));
        return HttpResponse.json({ success: true, payload: { id: body.roundId, ...outcome } });
    }),
    http.post('/api/bets/cashout', () => {
        console.log('[MSW] Intercepted POST /api/bets/cashout');
        return HttpResponse.json({ success: true });
    })
];

// ШАГ 5: Это главный обработчик. Он будет срабатывать на КАЖДЫЙ сетевой запрос.
self.addEventListener('fetch', (event) => {
  // Мы просим MSW обработать запрос, используя наши хендлеры.
  // Если ни один хендлер не подойдет, запрос пройдет в реальную сеть (onUnhandledRequest: 'bypass').
  event.respondWith(
    handleRequest(
      event,
      handlers,
      {
        onUnhandledRequest: 'bypass',
      }
    )
  );
});