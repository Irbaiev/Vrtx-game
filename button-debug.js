// Скрипт для диагностики блокировки кнопки
console.log('[BUTTON-DEBUG] Загружаем скрипт диагностики кнопки');

function debugButton() {
  console.log('[BUTTON-DEBUG] === ДИАГНОСТИКА КНОПКИ ===');
  
  // Ищем кнопку
  const buttonSelectors = [
    '[data-track="bet_1.place"]',
    '.button._big._play._purple._placebet',
    '.holdtospin',
    'div[class*="holdtospin"]',
    'div[class*="placebet"]'
  ];
  
  let button = null;
  for (const selector of buttonSelectors) {
    button = document.querySelector(selector);
    if (button) {
      console.log('[BUTTON-DEBUG] Найдена кнопка:', selector);
      break;
    }
  }
  
  if (!button) {
    console.log('[BUTTON-DEBUG] ❌ Кнопка не найдена!');
    return;
  }
  
  console.log('[BUTTON-DEBUG] ✅ Кнопка найдена:', button);
  
  // Проверяем состояние кнопки
  console.log('[BUTTON-DEBUG] === СОСТОЯНИЕ КНОПКИ ===');
  console.log('[BUTTON-DEBUG] Классы:', button.className);
  console.log('[BUTTON-DEBUG] Disabled:', button.disabled);
  console.log('[BUTTON-DEBUG] Style pointer-events:', button.style.pointerEvents);
  console.log('[BUTTON-DEBUG] Computed pointer-events:', getComputedStyle(button).pointerEvents);
  console.log('[BUTTON-DEBUG] Computed opacity:', getComputedStyle(button).opacity);
  console.log('[BUTTON-DEBUG] Computed cursor:', getComputedStyle(button).cursor);
  
  // Проверяем, есть ли блокирующие классы
  const blockingClasses = ['_disabled', 'disabled', 'blocked', 'inactive'];
  const hasBlockingClass = blockingClasses.some(cls => button.classList.contains(cls));
  console.log('[BUTTON-DEBUG] Есть блокирующие классы:', hasBlockingClass);
  
  // Проверяем родительские элементы
  console.log('[BUTTON-DEBUG] === РОДИТЕЛЬСКИЕ ЭЛЕМЕНТЫ ===');
  let parent = button.parentElement;
  let level = 1;
  while (parent && level <= 3) {
    console.log(`[BUTTON-DEBUG] Родитель ${level}:`, parent.tagName, parent.className);
    console.log(`[BUTTON-DEBUG] - pointer-events:`, getComputedStyle(parent).pointerEvents);
    console.log(`[BUTTON-DEBUG] - opacity:`, getComputedStyle(parent).opacity);
    parent = parent.parentElement;
    level++;
  }
  
  // Ищем объекты игры
  console.log('[BUTTON-DEBUG] === ПОИСК ОБЪЕКТОВ ИГРЫ ===');
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      if (obj.roundId !== undefined || obj.gameStarted !== undefined || obj.placeBet) {
        console.log('[BUTTON-DEBUG] Найден объект игры:', key, {
          roundId: obj.roundId,
          gameStarted: obj.gameStarted,
          hasPlaceBet: !!obj.placeBet,
          amount: obj.amount,
          clientSeed: obj.clientSeed,
          nonce: obj.nonce
        });
      }
    }
  }
  
  // Проверяем API запросы
  console.log('[BUTTON-DEBUG] === ПРОВЕРКА API ===');
  console.log('[BUTTON-DEBUG] Токен в localStorage:', localStorage.getItem('token') ? 'Есть' : 'Нет');
  console.log('[BUTTON-DEBUG] Токен в sessionStorage:', sessionStorage.getItem('token') ? 'Есть' : 'Нет');
  
  // Тестируем API
  fetch('/api/common/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuaWNrbmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsInN1YiI6InVzZXJfMTIzNDU2IiwiZXhwIjoxNzM3NDAwMDAwLCJpYXQiOjE3Mzc0MDAwMDB9.fake-signature'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('[BUTTON-DEBUG] API Profile работает:', data);
  })
  .catch(error => {
    console.error('[BUTTON-DEBUG] API Profile ошибка:', error);
  });
  
  console.log('[BUTTON-DEBUG] === КОНЕЦ ДИАГНОСТИКИ ===');
}

// Добавляем глобальную функцию
window.debugButton = debugButton;

// Запускаем при загрузке
window.addEventListener('load', () => {
  setTimeout(() => {
    debugButton();
  }, 3000);
});

console.log('[BUTTON-DEBUG] Скрипт загружен. Вызовите debugButton() в консоли для диагностики');
