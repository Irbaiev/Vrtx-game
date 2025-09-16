// Исправление проблемы с никнеймом
console.log('[FIX-NICKNAME] Загружаем исправление никнейма');

// Функция для установки никнейма
function setNickname() {
  // Ищем поле ввода никнейма по разным селекторам (исключаем поля для ставок)
  const selectors = [
    'input[placeholder*="Nickname"]',
    'input[placeholder*="nickname"]', 
    'input[name*="nickname"]',
    'input[id*="nickname"]',
    'input[class*="nickname"]',
    'input[class*="Nickname"]'
  ];
  
  let nicknameInput = null;
  for (const selector of selectors) {
    const inputs = document.querySelectorAll(selector);
    for (const input of inputs) {
      // Исключаем поля для ставок и других целей
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet') &&
          input.placeholder !== 'Amount' &&
          input.placeholder !== 'Bet') {
        nicknameInput = input;
        break;
      }
    }
    if (nicknameInput) break;
  }
  
  // Если не нашли по специфичным селекторам, ищем по контексту
  if (!nicknameInput) {
    // Ищем в настройках или модальных окнах
    const settingsModal = document.querySelector('[class*="settings"], [class*="modal"], [class*="profile"]');
    if (settingsModal) {
      const inputs = settingsModal.querySelectorAll('input[type="text"]');
      for (const input of inputs) {
        if (!input.classList.contains('amount__input') && 
            !input.classList.contains('bet__input') &&
            !input.id.includes('amount') &&
            !input.id.includes('bet')) {
          nicknameInput = input;
          break;
        }
      }
    }
  }
  
  if (nicknameInput) {
    console.log('[FIX-NICKNAME] Найдено поле никнейма:', nicknameInput);
    
    // Устанавливаем значение по умолчанию
    if (!nicknameInput.value || nicknameInput.value.trim() === '') {
      nicknameInput.value = 'vortex';
      console.log('[FIX-NICKNAME] ✅ Установлен никнейм по умолчанию: vortex');
      
      // Триггерим события изменения
      nicknameInput.dispatchEvent(new Event('input', { bubbles: true }));
      nicknameInput.dispatchEvent(new Event('change', { bubbles: true }));
      nicknameInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
    
    // Убираем readonly если есть
    if (nicknameInput.readOnly) {
      nicknameInput.readOnly = false;
      console.log('[FIX-NICKNAME] ✅ Убран readonly с поля никнейма');
    }
    
    // Убираем disabled если есть
    if (nicknameInput.disabled) {
      nicknameInput.disabled = false;
      console.log('[FIX-NICKNAME] ✅ Убран disabled с поля никнейма');
    }
    
    // Убираем красную подсветку ошибки
    nicknameInput.style.borderColor = '';
    nicknameInput.style.backgroundColor = '';
    nicknameInput.classList.remove('error', 'invalid', 'has-error');
    
    return true;
  } else {
    console.log('[FIX-NICKNAME] ⚠️ Поле никнейма не найдено');
    return false;
  }
}

// Функция для принудительной установки никнейма в глобальном состоянии
function forceSetGlobalNickname() {
  // Пытаемся найти глобальные объекты игры
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      
      // Если это объект профиля
      if (obj.profile && obj.profile.name !== undefined) {
        if (!obj.profile.name || obj.profile.name.trim() === '') {
          obj.profile.name = 'vortex';
          console.log('[FIX-NICKNAME] ✅ Установлен никнейм в глобальном объекте:', key);
        }
      }
      
      // Если это объект с никнеймом
      if (obj.nickname !== undefined) {
        if (!obj.nickname || obj.nickname.trim() === '') {
          obj.nickname = 'vortex';
          console.log('[FIX-NICKNAME] ✅ Установлен никнейм в объекте:', key);
        }
      }
    }
  }
}

// Функция для принудительного открытия настроек
function openSettings() {
  // Ищем кнопку настроек
  const settingsButton = document.querySelector('[data-track="settings"], [class*="settings"], [class*="setting"]');
  if (settingsButton) {
    console.log('[FIX-NICKNAME] Найдена кнопка настроек, кликаем...');
    settingsButton.click();
    return true;
  }
  return false;
}

// Запускаем исправления
function initNicknameFix() {
  console.log('[FIX-NICKNAME] Инициализируем исправление никнейма...');
  
  // Принудительно устанавливаем в глобальном состоянии
  forceSetGlobalNickname();
  
  // Пытаемся установить никнейм в поле
  let success = setNickname();
  
  if (!success) {
    // Если не нашли поле, пытаемся открыть настройки
    console.log('[FIX-NICKNAME] Поле не найдено, пытаемся открыть настройки...');
    const settingsOpened = openSettings();
    
    if (settingsOpened) {
      // Ждем открытия настроек и пытаемся снова
      setTimeout(() => {
        forceSetGlobalNickname();
        setNickname();
      }, 500);
    }
    
    // Повторяем через интервалы
    setTimeout(() => {
      forceSetGlobalNickname();
      setNickname();
    }, 1000);
    
    setTimeout(() => {
      forceSetGlobalNickname();
      setNickname();
    }, 3000);
    
    setTimeout(() => {
      forceSetGlobalNickname();
      setNickname();
    }, 5000);
    
    // Дополнительная попытка через 10 секунд
    setTimeout(() => {
      console.log('[FIX-NICKNAME] Финальная попытка через 10 секунд...');
      openSettings();
      setTimeout(() => {
        forceSetGlobalNickname();
        setNickname();
      }, 1000);
    }, 10000);
  }
  
  // Слушаем изменения в DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Проверяем, не появилось ли поле никнейма
        const nicknameInput = document.querySelector('input[placeholder*="Nickname"], input[placeholder*="nickname"], input[type="text"]');
        if (nicknameInput && (!nicknameInput.value || nicknameInput.value.trim() === '')) {
          forceSetGlobalNickname();
          setNickname();
        }
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('[FIX-NICKNAME] ✅ Инициализация завершена');
}

// Запускаем сразу
initNicknameFix();

// Также запускаем после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNicknameFix);
} else {
  initNicknameFix();
}

console.log('[FIX-NICKNAME] Скрипт загружен');
