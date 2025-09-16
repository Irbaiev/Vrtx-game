// Простая диагностика проблем с никнеймом
console.log('[NICKNAME-DEBUG] Загружаем диагностику никнейма');

function debugNickname() {
  console.log('[NICKNAME-DEBUG] 🔍 Начинаем диагностику...');
  
  // 1. Проверяем localStorage
  console.log('[NICKNAME-DEBUG] 📦 localStorage:');
  const storageKeys = ['nickname', 'playerName', 'name', 'player_name', 'user_name', 'token'];
  storageKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      console.log(`  ✅ ${key}:`, value);
    } else {
      console.log(`  ❌ ${key}: не найден`);
    }
  });
  
  // 2. Проверяем sessionStorage
  console.log('[NICKNAME-DEBUG] 📦 sessionStorage:');
  storageKeys.forEach(key => {
    const value = sessionStorage.getItem(key);
    if (value) {
      console.log(`  ✅ ${key}:`, value);
    } else {
      console.log(`  ❌ ${key}: не найден`);
    }
  });
  
  // 3. Проверяем JWT токен
  console.log('[NICKNAME-DEBUG] 🔑 JWT токен:');
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('  Payload:', payload);
        
        const nicknameFields = ['nickname', 'name', 'playerName', 'player_name'];
        nicknameFields.forEach(field => {
          if (payload[field]) {
            console.log(`  ✅ JWT.${field}:`, payload[field]);
          } else {
            console.log(`  ❌ JWT.${field}: отсутствует`);
          }
        });
      }
    } catch (e) {
      console.log('  ❌ Ошибка декодирования JWT:', e);
    }
  } else {
    console.log('  ❌ JWT токен не найден');
  }
  
  // 4. Проверяем UI элементы
  console.log('[NICKNAME-DEBUG] 🎨 UI элементы:');
  const uiSelectors = [
    'input[placeholder*="Nickname"]',
    'input[placeholder*="nickname"]', 
    'input[name*="nickname"]',
    'input[id*="nickname"]',
    'input[class*="nickname"]'
  ];
  
  let foundElements = 0;
  uiSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      foundElements++;
      console.log(`  ✅ Найден элемент:`, {
        selector: selector,
        value: element.value,
        placeholder: element.placeholder,
        className: element.className,
        id: element.id
      });
    });
  });
  
  if (foundElements === 0) {
    console.log('  ❌ Поля никнейма не найдены');
  }
  
  // 5. Проверяем глобальные объекты
  console.log('[NICKNAME-DEBUG] 🌐 Глобальные объекты:');
  let foundObjects = 0;
  const globalKeys = Object.keys(window);
  for (const key of globalKeys) {
    try {
      const obj = window[key];
      if (obj && typeof obj === 'object') {
        if (obj.profile && (obj.profile.name || obj.profile.nickname)) {
          foundObjects++;
          console.log(`  ✅ ${key}.profile:`, {
            name: obj.profile.name,
            nickname: obj.profile.nickname
          });
        }
        if (obj.nickname) {
          foundObjects++;
          console.log(`  ✅ ${key}.nickname:`, obj.nickname);
        }
        if (obj.name && typeof obj.name === 'string') {
          foundObjects++;
          console.log(`  ✅ ${key}.name:`, obj.name);
        }
      }
    } catch (e) {
      // Игнорируем ошибки доступа
    }
  }
  
  if (foundObjects === 0) {
    console.log('  ❌ Глобальные объекты с никнеймом не найдены');
  }
  
  console.log('[NICKNAME-DEBUG] ✅ Диагностика завершена');
}

// Экспортируем функцию
window.debugNickname = debugNickname;

// Автоматически запускаем через 2 секунды
setTimeout(() => {
  console.log('[NICKNAME-DEBUG] 🚀 Автоматически запускаем диагностику...');
  debugNickname();
}, 2000);

console.log('[NICKNAME-DEBUG] Скрипт загружен. Используйте debugNickname() для диагностики.');

