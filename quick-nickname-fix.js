// Быстрое исправление проблемы с никнеймом
console.log('[QUICK-NICKNAME-FIX] Загружаем быстрое исправление');

function quickFixNickname() {
  console.log('[QUICK-NICKNAME-FIX] 🔧 Начинаем быстрое исправление...');
  
  const nickname = 'vortex';
  
  // 1. Устанавливаем в localStorage
  console.log('[QUICK-NICKNAME-FIX] 📦 Устанавливаем в localStorage...');
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('playerName', nickname);
  localStorage.setItem('name', nickname);
  localStorage.setItem('player_name', nickname);
  localStorage.setItem('user_name', nickname);
  
  // 2. Устанавливаем в sessionStorage
  console.log('[QUICK-NICKNAME-FIX] 📦 Устанавливаем в sessionStorage...');
  sessionStorage.setItem('nickname', nickname);
  sessionStorage.setItem('playerName', nickname);
  sessionStorage.setItem('name', nickname);
  sessionStorage.setItem('player_name', nickname);
  sessionStorage.setItem('user_name', nickname);
  
  // 3. Обновляем JWT токен
  console.log('[QUICK-NICKNAME-FIX] 🔑 Обновляем JWT токен...');
  const currentToken = localStorage.getItem('token');
  if (currentToken) {
    try {
      const parts = currentToken.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        
        // Добавляем все поля никнейма
        payload.nickname = nickname;
        payload.name = nickname;
        payload.playerName = nickname;
        payload.player_name = nickname;
        payload.user_name = nickname;
        
        // Создаем новый токен
        const newToken = parts[0] + '.' + btoa(JSON.stringify(payload)) + '.' + parts[2];
        localStorage.setItem('token', newToken);
        
        console.log('[QUICK-NICKNAME-FIX] ✅ JWT токен обновлен');
      }
    } catch (e) {
      console.log('[QUICK-NICKNAME-FIX] ⚠️ Ошибка обновления JWT токена:', e);
    }
  }
  
  // 4. Устанавливаем в глобальных объектах
  console.log('[QUICK-NICKNAME-FIX] 🌐 Устанавливаем в глобальных объектах...');
  const globalKeys = Object.keys(window);
  for (const key of globalKeys) {
    try {
      const obj = window[key];
      if (obj && typeof obj === 'object') {
        if (obj.profile && typeof obj.profile === 'object') {
          if (obj.profile.name !== undefined) {
            obj.profile.name = nickname;
          }
          if (obj.profile.nickname !== undefined) {
            obj.profile.nickname = nickname;
          }
        }
        if (obj.nickname !== undefined) {
          obj.nickname = nickname;
        }
        if (obj.name !== undefined && typeof obj.name === 'string') {
          obj.name = nickname;
        }
      }
    } catch (e) {
      // Игнорируем ошибки доступа
    }
  }
  
  // 5. Ищем и заполняем UI элементы
  console.log('[QUICK-NICKNAME-FIX] 🎨 Ищем и заполняем UI элементы...');
  const uiSelectors = [
    'input[placeholder*="Nickname"]',
    'input[placeholder*="nickname"]', 
    'input[name*="nickname"]',
    'input[id*="nickname"]',
    'input[class*="nickname"]',
    'input[type="text"]'
  ];
  
  let foundUIElements = 0;
  uiSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      // Исключаем поля для ставок
      if (!element.classList.contains('amount__input') && 
          !element.classList.contains('bet__input') &&
          !element.id.includes('amount') &&
          !element.id.includes('bet') &&
          element.placeholder !== 'Amount' &&
          element.placeholder !== 'Bet') {
        
        element.value = nickname;
        element.readOnly = false;
        element.disabled = false;
        element.style.borderColor = '';
        element.style.backgroundColor = '';
        element.classList.remove('error', 'invalid', 'has-error');
        
        // Триггерим события
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        element.dispatchEvent(new Event('blur', { bubbles: true }));
        
        foundUIElements++;
        console.log('[QUICK-NICKNAME-FIX] ✅ Заполнен UI элемент:', element);
      }
    });
  });
  
  if (foundUIElements === 0) {
    console.log('[QUICK-NICKNAME-FIX] ⚠️ UI элементы не найдены');
  }
  
  // 6. Отправляем API запрос
  console.log('[QUICK-NICKNAME-FIX] 🌐 Отправляем API запрос...');
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', '/api/player', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage.getItem('token') || 'demo_token'));
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('[QUICK-NICKNAME-FIX] ✅ API запрос успешен');
      } else {
        console.log('[QUICK-NICKNAME-FIX] ⚠️ Ошибка API:', xhr.status, xhr.responseText);
      }
    }
  };
  
  xhr.send(JSON.stringify({ nickname: nickname }));
  
  console.log('[QUICK-NICKNAME-FIX] ✅ Быстрое исправление завершено');
}

// Экспортируем функцию
window.quickFixNickname = quickFixNickname;

// Автоматически запускаем через 1 секунду
setTimeout(() => {
  console.log('[QUICK-NICKNAME-FIX] 🚀 Автоматически запускаем исправление...');
  quickFixNickname();
}, 1000);

console.log('[QUICK-NICKNAME-FIX] Скрипт загружен. Используйте quickFixNickname() для исправления.');

