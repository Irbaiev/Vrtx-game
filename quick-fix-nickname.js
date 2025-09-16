// Быстрое исправление никнейма для найденных полей
console.log('[QUICK-FIX-NICKNAME] Загружаем быстрое исправление');

function quickFixNickname() {
  console.log('[QUICK-FIX-NICKNAME] 🚀 Быстрое исправление никнейма...');
  
  const nickname = 'vortex';
  let fixedCount = 0;
  
  // 1. Ищем по точным классам из HTML
  const exactSelectors = [
    '.settingNameInput--fEvyT',
    'input[class*="settingNameInput"]',
    'input[class*="settingName"]',
    'input[class*="NameInput"]'
  ];
  
  exactSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.tagName === 'INPUT') {
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
        
        fixedCount++;
        console.log('[QUICK-FIX-NICKNAME] ✅ Исправлено поле:', element);
      }
    });
  });
  
  // 2. Ищем по label
  const labels = document.querySelectorAll('label[class*="settingNameLabel"], label[class*="NameLabel"]');
  labels.forEach(label => {
    const forId = label.getAttribute('for');
    if (forId) {
      const input = document.getElementById(forId);
      if (input && input.tagName === 'INPUT') {
        input.value = nickname;
        input.readOnly = false;
        input.disabled = false;
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        input.classList.remove('error', 'invalid', 'has-error');
        
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
        
        fixedCount++;
        console.log('[QUICK-FIX-NICKNAME] ✅ Исправлено поле по label:', input);
      }
    }
  });
  
  // 3. Ищем все input в настройках
  const settingsContainers = document.querySelectorAll('[class*="settings"], [class*="setting"], [class*="modal"]');
  settingsContainers.forEach(container => {
    const inputs = container.querySelectorAll('input[type="text"], input:not([type])');
    inputs.forEach(input => {
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet')) {
        
        input.value = nickname;
        input.readOnly = false;
        input.disabled = false;
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        input.classList.remove('error', 'invalid', 'has-error');
        
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
        
        fixedCount++;
        console.log('[QUICK-FIX-NICKNAME] ✅ Исправлено поле в настройках:', input);
      }
    });
  });
  
  console.log(`[QUICK-FIX-NICKNAME] ✅ Исправлено ${fixedCount} полей`);
  return fixedCount;
}

// Экспортируем функцию
window.quickFixNickname = quickFixNickname;

// Автоматически исправляем
setTimeout(() => {
  console.log('[QUICK-FIX-NICKNAME] 🚀 Автоматически исправляем...');
  quickFixNickname();
}, 1000);

console.log('[QUICK-FIX-NICKNAME] Скрипт загружен. Используйте quickFixNickname()');

