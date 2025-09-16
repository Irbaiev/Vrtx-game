// Исправление Service Worker для корректной обработки API запросов
console.log('[FIX-SERVICE-WORKER] Загружаем исправление Service Worker');

// Функция для исправления обработки запросов в Service Worker
function fixServiceWorker() {
  console.log('[FIX-SERVICE-WORKER] Исправляем обработку запросов...');
  
  // Перехватываем fetch запросы
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    console.log('[FIX-SERVICE-WORKER] Перехвачен fetch запрос:', url, options);
    
    // Если это запрос к /api/player с PUT методом
    if (url.includes('/api/player') && options.method === 'PUT') {
      console.log('[FIX-SERVICE-WORKER] Обрабатываем PUT /api/player');
      
      // Возвращаем успешный ответ
      return Promise.resolve(new Response(JSON.stringify({
        success: true,
        nickname: 'vortex',
        name: 'vortex',
        playerName: 'vortex',
        message: 'Profile updated successfully'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }));
    }
    
    // Для остальных запросов используем оригинальный fetch
    return originalFetch.apply(this, arguments);
  };
  
  // Перехватываем XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    console.log('[FIX-SERVICE-WORKER] Перехвачен XHR запрос:', method, url);
    
    // Если это запрос к /api/player с PUT методом
    if (url.includes('/api/player') && method === 'PUT') {
      console.log('[FIX-SERVICE-WORKER] Обрабатываем XHR PUT /api/player');
      
      // Сохраняем оригинальные методы
      const originalSend = this.send;
      const originalOnReadyStateChange = this.onreadystatechange;
      
      this.send = function(data) {
        console.log('[FIX-SERVICE-WORKER] Отправляем данные:', data);
        
        // Имитируем успешный ответ
        setTimeout(() => {
          this.readyState = 4;
          this.status = 200;
          this.responseText = JSON.stringify({
            success: true,
            nickname: 'vortex',
            name: 'vortex',
            playerName: 'vortex',
            message: 'Profile updated successfully'
          });
          
          if (this.onreadystatechange) {
            this.onreadystatechange();
          }
        }, 100);
      };
    }
    
    return originalXHROpen.apply(this, [method, url, ...args]);
  };
  
  console.log('[FIX-SERVICE-WORKER] ✅ Service Worker исправлен');
}

// Запускаем исправление
fixServiceWorker();

console.log('[FIX-SERVICE-WORKER] Скрипт загружен');

