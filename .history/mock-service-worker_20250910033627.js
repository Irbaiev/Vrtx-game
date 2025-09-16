// ===================================================================
// АГРЕССИВНАЯ АКТИВАЦИЯ ВОРКЕРА
// ===================================================================
self.addEventListener('install', (event) => {
  console.log('[MSW] Service Worker installed, skipping waiting...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[MSW] Service Worker activated, claiming clients...');
  event.waitUntil(self.clients.claim());
});
// ===================================================================


// ================= НАЧАЛО ЗАГЛУШКИ LOCALSTORAGE =================
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
self.localStorage = mockLocalStorage;
// ================= КОНЕЦ ЗАГЛУШКИ LOCALSTORAGE =================


// 1. Импортируем библиотеку MSW
importScripts('/msw.js');

// 2. Получаем доступ к API MSW из правильного глобального объекта
const { setupWorker, http, HttpResponse } = MockServiceWorker;

// 3. Определяем "ручки" (хендлеры) для наших API-запросов.
const handlers = [
    // Запрос профиля
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

    // Запрос настроек
    http.get('/api/common/settings', () => {
        console.log('[MSW] Intercepted GET /api/common/settings');
        return HttpResponse.json({
            success: true,
            payload: { availableTranslations: ["en", "ru"], forceDemoAvailable: true }
        });
    }),

    // Дополнительный хендлер для запроса переводов, который мы видим в логе
    http.get('/api/translates/:id/latest/en', () => {
        console.log('[MSW] Intercepted GET /api/translates');
        return HttpResponse.json({ "COMMON.PLEASE_LOGIN": "PLEASE LOGIN" }); // Возвращаем хоть что-то
    }),

    // Запрос на восстановление игры
    http.post('/api/games/retrieve', () => {
        console.log('[MSW] Intercepted POST /api/games/retrieve');
        return HttpResponse.json({ success: false, error: 'No active games' }, { status: 404 });
    }),

    // Запрос на создание новой игры
    http.post('/api/games/create', () => {
        console.log('[MSW] Intercepted POST /api/games/create');
        return HttpResponse.json({
            success: true,
            payload: { id: `round-${new Date().getTime()}`, state: 'created', salt: 'fake-salt' }
        });
    }),

    // Запрос на совершение ставки
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
    
    // Запрос на завершение раунда (cashout)
    http.post('/api/bets/cashout', () => {
        console.log('[MSW] Intercepted POST /api/bets/cashout');
        return HttpResponse.json({ success: true });
    })
];

// 4. Настраиваем и запускаем воркер
const worker = setupWorker(...handlers);
worker.start({ onUnhandledRequest: 'bypass' });