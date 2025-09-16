// Скрипт для переключения в серверный режим
console.log('[SWITCH-SERVER] Переключаемся в серверный режим...');

// Функция для переключения на серверный режим
function switchToServerMode() {
  console.log('[SWITCH-SERVER] 🔄 Переключаемся на сервер app.py...');
  
  // 1. Отключаем Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        console.log('[SWITCH-SERVER] Отключаем Service Worker:', registration.scope);
        registration.unregister();
      }
    });
  }
  
  // 2. Обновляем базовый URL для API запросов
  window.API_BASE_URL = 'http://localhost:5000';
  
  // 3. Перехватываем fetch для перенаправления на сервер
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // Если это API запрос, перенаправляем на сервер
    if (typeof url === 'string' && url.startsWith('/api/')) {
      const serverUrl = `http://localhost:5000${url}`;
      console.log('[SWITCH-SERVER] Перенаправляем API запрос:', url, '->', serverUrl);
      return originalFetch(serverUrl, options);
    }
    return originalFetch(url, options);
  };
  
  // 4. Перехватываем XMLHttpRequest для перенаправления на сервер
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    // Если это API запрос, перенаправляем на сервер
    if (typeof url === 'string' && url.startsWith('/api/')) {
      const serverUrl = `http://localhost:5000${url}`;
      console.log('[SWITCH-SERVER] Перенаправляем XHR запрос:', url, '->', serverUrl);
      return originalXHROpen.call(this, method, serverUrl, ...args);
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
  
  console.log('[SWITCH-SERVER] ✅ Переключение на серверный режим завершено');
  console.log('[SWITCH-SERVER] 🎲 Все API запросы теперь идут на сервер с случайными никнеймами');
}

// Функция для переключения обратно в клиентский режим
function switchToClientMode() {
  console.log('[SWITCH-SERVER] 🔄 Переключаемся обратно в клиентский режим...');
  
  // Восстанавливаем оригинальные функции
  if (window.originalFetch) {
    window.fetch = window.originalFetch;
  }
  if (window.originalXHROpen) {
    XMLHttpRequest.prototype.open = window.originalXHROpen;
  }
  
  // Регистрируем Service Worker заново
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./mock-service-worker.js?v=16')
      .then(function(registration) {
        console.log('[SWITCH-SERVER] Service Worker зарегистрирован заново:', registration.scope);
      })
      .catch(function(err) {
        console.error('[SWITCH-SERVER] Ошибка регистрации Service Worker:', err);
      });
  }
  
  console.log('[SWITCH-SERVER] ✅ Переключение в клиентский режим завершено');
}

// Сохраняем оригинальные функции
window.originalFetch = window.fetch;
window.originalXHROpen = XMLHttpRequest.prototype.open;

// Экспортируем функции
window.switchToServerMode = switchToServerMode;
window.switchToClientMode = switchToClientMode;

// Автоматически переключаемся в серверный режим
setTimeout(() => {
  switchToServerMode();
}, 1000);

console.log('[SWITCH-SERVER] Скрипт загружен. Используйте switchToServerMode() или switchToClientMode()');

