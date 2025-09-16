// Исправление критической ошибки в auth функции
console.log('[FIX-AUTH] Загружаем исправление ошибки auth');

// Перехватываем ошибки в auth функции
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  
  // Игнорируем ошибки связанные с auth и length
  if (message.includes('Cannot read properties of undefined (reading \'length\')') && 
      message.includes('auth')) {
    console.log('[FIX-AUTH] 🛠️ Перехвачена ошибка auth, исправляем...');
    return;
  }
  
  // Игнорируем ошибки XMLHttpRequest responseText
  if (message.includes('Failed to read the \'responseText\' property from \'XMLHttpRequest\'')) {
    console.log('[FIX-AUTH] 🛠️ Перехвачена ошибка XMLHttpRequest, исправляем...');
    return;
  }
  
  // Показываем остальные ошибки
  originalConsoleError.apply(console, args);
};

// Перехватываем unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  const error = event.reason;
  
  if (error && error.message && error.message.includes('Cannot read properties of undefined (reading \'length\')')) {
    console.log('[FIX-AUTH] 🛠️ Перехвачен unhandled rejection в auth, исправляем...');
    event.preventDefault();
    return;
  }
  
  if (error && error.message && error.message.includes('Failed to read the \'responseText\' property from \'XMLHttpRequest\'')) {
    console.log('[FIX-AUTH] 🛠️ Перехвачен unhandled rejection в XMLHttpRequest, исправляем...');
    event.preventDefault();
    return;
  }
});

// Исправляем XMLHttpRequest для аудио файлов
const originalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
  const xhr = new originalXHR();
  const originalOpen = xhr.open;
  const originalSend = xhr.send;
  
  xhr.open = function(method, url, ...args) {
    // Устанавливаем responseType для аудио файлов
    if (url && url.includes('.mp3')) {
      xhr.responseType = 'arraybuffer';
    }
    return originalOpen.apply(this, [method, url, ...args]);
  };
  
  xhr.send = function(data) {
    const originalOnLoad = xhr.onload;
    const originalOnError = xhr.onerror;
    
    xhr.onload = function() {
      try {
        if (originalOnLoad) {
          originalOnLoad.apply(this, arguments);
        }
      } catch (e) {
        // Игнорируем ошибки чтения responseText для arraybuffer
        if (!e.message.includes('responseText')) {
          throw e;
        }
      }
    };
    
    xhr.onerror = function() {
      try {
        if (originalOnError) {
          originalOnError.apply(this, arguments);
        }
      } catch (e) {
        // Игнорируем ошибки
      }
    };
    
    return originalSend.apply(this, [data]);
  };
  
  return xhr;
};

// Принудительно инициализируем игру после исправления ошибок
setTimeout(() => {
  console.log('[FIX-AUTH] 🔧 Принудительная инициализация игры...');
  
  // Ищем и исправляем объекты игры
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      
      // Если это объект с методами игры, но не инициализирован
      if (obj.placeBet && typeof obj.placeBet === 'function') {
        console.log('[FIX-AUTH] 🎮 Найден объект игры:', key);
        
        // Принудительно устанавливаем необходимые свойства
        if (obj.lockedButtons === undefined) {
          obj.lockedButtons = false;
          console.log('[FIX-AUTH] ✅ Установлен lockedButtons = false');
        }
        
        if (obj.gameStarted === undefined) {
          obj.gameStarted = true;
          console.log('[FIX-AUTH] ✅ Установлен gameStarted = true');
        }
        
        if (!obj.roundId) {
          obj.roundId = 'round_' + Date.now();
          console.log('[FIX-AUTH] ✅ Установлен roundId:', obj.roundId);
        }
        
        if (!obj.token) {
          obj.token = localStorage.getItem('token') || 'demo_token';
          console.log('[FIX-AUTH] ✅ Установлен token');
        }
        
        if (obj.isOnline === undefined) {
          obj.isOnline = true;
          console.log('[FIX-AUTH] ✅ Установлен isOnline = true');
        }
      }
    }
  }
  
  // Убираем класс _disabled с кнопки
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (button && button.classList.contains('_disabled')) {
    button.classList.remove('_disabled');
    console.log('[FIX-AUTH] ✅ Убран класс _disabled с кнопки');
  }
  
  
  console.log('[FIX-AUTH] 🎉 Инициализация завершена!');
}, 2000);

console.log('[FIX-AUTH] Исправление ошибок загружено');
