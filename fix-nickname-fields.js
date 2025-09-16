// Исправление полей никнейма с правильными селекторами
console.log('[FIX-NICKNAME-FIELDS] Загружаем исправление полей никнейма');

function findAndFixNicknameFields() {
  console.log('[FIX-NICKNAME-FIELDS] 🔍 Ищем поля никнейма с правильными селекторами...');
  
  const nickname = 'vortex';
  let foundFields = 0;
  
  // 1. Ищем по классам, которые мы нашли в HTML
  const specificSelectors = [
    '.settingNameInput--fEvyT',           // Точный класс из HTML
    'input[class*="settingNameInput"]',   // По части класса
    'input[class*="settingName"]',        // По части класса
    'input[class*="NameInput"]',          // По части класса
    'input[class*="Name"]',               // По части класса
    'input[id*="1dcdbcb2"]',              // По ID из HTML
    'input[id*="b0b3"]',                  // По части ID
  ];
  
  // 2. Ищем по label рядом с input
  const labels = document.querySelectorAll('label[class*="settingNameLabel"], label[class*="NameLabel"]');
  labels.forEach(label => {
    const forId = label.getAttribute('for');
    if (forId) {
      const input = document.getElementById(forId);
      if (input && input.tagName === 'INPUT') {
        console.log('[FIX-NICKNAME-FIELDS] ✅ Найдено поле по label:', input);
        fillNicknameField(input, nickname);
        foundFields++;
      }
    }
  });
  
  // 3. Ищем по селекторам
  specificSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.tagName === 'INPUT') {
        console.log('[FIX-NICKNAME-FIELDS] ✅ Найдено поле по селектору:', selector, element);
        fillNicknameField(element, nickname);
        foundFields++;
      }
    });
  });
  
  // 4. Ищем все input в настройках
  const settingsContainers = document.querySelectorAll('[class*="settings"], [class*="setting"], [class*="modal"], [class*="popup"]');
  settingsContainers.forEach(container => {
    const inputs = container.querySelectorAll('input[type="text"], input:not([type])');
    inputs.forEach(input => {
      // Исключаем поля для ставок
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet') &&
          !input.id.includes('email') &&
          !input.id.includes('password')) {
        
        console.log('[FIX-NICKNAME-FIELDS] ✅ Найдено поле в настройках:', input);
        fillNicknameField(input, nickname);
        foundFields++;
      }
    });
  });
  
  // 5. Ищем по контексту (текст рядом с полем)
  const allInputs = document.querySelectorAll('input[type="text"], input:not([type])');
  allInputs.forEach(input => {
    const parent = input.parentElement;
    const parentText = parent ? parent.textContent.toLowerCase() : '';
    const grandParent = parent ? parent.parentElement : null;
    const grandParentText = grandParent ? grandParent.textContent.toLowerCase() : '';
    
    if (parentText.includes('nickname') || 
        parentText.includes('name') || 
        parentText.includes('username') ||
        parentText.includes('player') ||
        grandParentText.includes('nickname') ||
        grandParentText.includes('name')) {
      
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet')) {
        
        console.log('[FIX-NICKNAME-FIELDS] ✅ Найдено поле по контексту:', input);
        fillNicknameField(input, nickname);
        foundFields++;
      }
    }
  });
  
  console.log(`[FIX-NICKNAME-FIELDS] ✅ Найдено и заполнено ${foundFields} полей`);
  return foundFields;
}

function fillNicknameField(input, nickname) {
  console.log('[FIX-NICKNAME-FIELDS] 📝 Заполняем поле:', input);
  
  // Заполняем поле
  input.value = nickname;
  
  // Убираем ограничения
  input.readOnly = false;
  input.disabled = false;
  
  // Убираем стили ошибок
  input.style.borderColor = '';
  input.style.backgroundColor = '';
  input.classList.remove('error', 'invalid', 'has-error');
  
  // Триггерим события
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  input.dispatchEvent(new Event('blur', { bubbles: true }));
  
  // Фокусируемся на поле для активации
  input.focus();
  input.blur();
  
  console.log('[FIX-NICKNAME-FIELDS] ✅ Поле заполнено:', input.value);
}

function openSettingsAndFix() {
  console.log('[FIX-NICKNAME-FIELDS] 🔧 Открываем настройки и исправляем...');
  
  // Ищем кнопку настроек
  const settingsButtons = document.querySelectorAll(
    '[data-track="settings"], [class*="settings"], [class*="setting"], button[aria-label*="settings"], button[title*="settings"]'
  );
  
  let settingsOpened = false;
  settingsButtons.forEach(button => {
    if (button && !settingsOpened) {
      console.log('[FIX-NICKNAME-FIELDS] 🎯 Найдена кнопка настроек, кликаем...');
      button.click();
      settingsOpened = true;
      
      // Ждем открытия настроек и исправляем
      setTimeout(() => {
        console.log('[FIX-NICKNAME-FIELDS] ⏰ Настройки открыты, исправляем поля...');
        findAndFixNicknameFields();
      }, 500);
    }
  });
  
  if (!settingsOpened) {
    console.log('[FIX-NICKNAME-FIELDS] ⚠️ Кнопка настроек не найдена');
  }
  
  return settingsOpened;
}

// Экспортируем функции
window.findAndFixNicknameFields = findAndFixNicknameFields;
window.fillNicknameField = fillNicknameField;
window.openSettingsAndFix = openSettingsAndFix;

// Автоматически исправляем поля
setTimeout(() => {
  console.log('[FIX-NICKNAME-FIELDS] 🚀 Автоматически исправляем поля...');
  findAndFixNicknameFields();
}, 1000);

// Пытаемся открыть настройки и исправить
setTimeout(() => {
  console.log('[FIX-NICKNAME-FIELDS] 🚀 Пытаемся открыть настройки...');
  openSettingsAndFix();
}, 2000);

// Повторяем через интервалы
setTimeout(() => findAndFixNicknameFields(), 3000);
setTimeout(() => findAndFixNicknameFields(), 5000);
setTimeout(() => findAndFixNicknameFields(), 10000);

// Слушаем изменения в DOM
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      // Проверяем, не появились ли новые поля
      const newInputs = document.querySelectorAll('.settingNameInput--fEvyT, input[class*="settingNameInput"]');
      if (newInputs.length > 0) {
        console.log('[FIX-NICKNAME-FIELDS] 🆕 Найдены новые поля, исправляем...');
        findAndFixNicknameFields();
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('[FIX-NICKNAME-FIELDS] Скрипт загружен. Используйте findAndFixNicknameFields() или openSettingsAndFix()');

