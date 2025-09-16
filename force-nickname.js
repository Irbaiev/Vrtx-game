// Принудительная установка никнейма через прямое обращение к API
console.log('[FORCE-NICKNAME] Загружаем принудительную установку никнейма');

// Функция для принудительной установки никнейма через API
function forceSetNicknameViaAPI() {
  console.log('[FORCE-NICKNAME] Пытаемся установить никнейм через API...');
  
  // Создаем запрос к API для обновления профиля
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', '/api/player', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage.getItem('token') || 'demo_token'));
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('[FORCE-NICKNAME] ✅ Никнейм успешно установлен через API');
        // Обновляем локальное хранилище
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.nickname) {
            localStorage.setItem('nickname', response.nickname);
            console.log('[FORCE-NICKNAME] ✅ Никнейм сохранен в localStorage:', response.nickname);
          }
        } catch (e) {
          console.log('[FORCE-NICKNAME] ⚠️ Не удалось распарсить ответ API');
        }
      } else {
        console.log('[FORCE-NICKNAME] ⚠️ Ошибка API:', xhr.status, xhr.responseText);
      }
    }
  };
  
  // Отправляем запрос с никнеймом
  xhr.send(JSON.stringify({ nickname: 'vortex' }));
}

// Функция для принудительной установки в глобальных объектах
function forceSetInGlobalObjects() {
  console.log('[FORCE-NICKNAME] Устанавливаем никнейм в глобальных объектах...');
  
  // Ищем все возможные глобальные объекты
  const globalKeys = Object.keys(window);
  
  for (const key of globalKeys) {
    try {
      const obj = window[key];
      if (obj && typeof obj === 'object') {
        // Если это объект профиля
        if (obj.profile && typeof obj.profile === 'object') {
          if (obj.profile.name !== undefined) {
            obj.profile.name = 'vortex';
            console.log('[FORCE-NICKNAME] ✅ Установлен profile.name в объекте:', key);
          }
          if (obj.profile.nickname !== undefined) {
            obj.profile.nickname = 'vortex';
            console.log('[FORCE-NICKNAME] ✅ Установлен profile.nickname в объекте:', key);
          }
        }
        
        // Если это объект с никнеймом
        if (obj.nickname !== undefined) {
          obj.nickname = 'vortex';
          console.log('[FORCE-NICKNAME] ✅ Установлен nickname в объекте:', key);
        }
        
        // Если это объект с именем
        if (obj.name !== undefined && typeof obj.name === 'string') {
          obj.name = 'vortex';
          console.log('[FORCE-NICKNAME] ✅ Установлен name в объекте:', key);
        }
      }
    } catch (e) {
      // Игнорируем ошибки доступа к объектам
    }
  }
}

// Функция для принудительного обновления UI - ОТКЛЮЧЕНА
// (удалена, чтобы не закрывать настройки)

// Основная функция
function initForceNickname() {
  console.log('[FORCE-NICKNAME] Инициализируем принудительную установку никнейма...');
  
  // 1. Устанавливаем в глобальных объектах
  forceSetInGlobalObjects();
  
  // 2. Пытаемся через API
  forceSetNicknameViaAPI();
  
  // 3. Повторяем через интервалы (без обновления UI)
  setTimeout(() => {
    forceSetInGlobalObjects();
  }, 2000);
  
  setTimeout(() => {
    forceSetInGlobalObjects();
  }, 5000);
  
  setTimeout(() => {
    forceSetInGlobalObjects();
  }, 10000);
  
  console.log('[FORCE-NICKNAME] ✅ Инициализация завершена');
}

// Запускаем сразу
initForceNickname();

// Также запускаем после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForceNickname);
} else {
  initForceNickname();
}

console.log('[FORCE-NICKNAME] Скрипт загружен');
