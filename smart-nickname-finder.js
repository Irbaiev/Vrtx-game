// Умный поиск полей никнейма
console.log('[SMART-NICKNAME-FINDER] Загружаем умный поиск полей никнейма');

function findNicknameFields() {
  console.log('[SMART-NICKNAME-FINDER] 🔍 Ищем поля никнейма...');
  
  const foundFields = [];
  
  // 1. Ищем по всем возможным селекторам
  const selectors = [
    'input[placeholder*="Nickname"]',
    'input[placeholder*="nickname"]',
    'input[placeholder*="Name"]',
    'input[placeholder*="name"]',
    'input[name*="nickname"]',
    'input[name*="name"]',
    'input[id*="nickname"]',
    'input[id*="name"]',
    'input[class*="nickname"]',
    'input[class*="name"]',
    'input[type="text"]',
    'input[type="email"]',
    'textarea',
    '[contenteditable="true"]'
  ];
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      // Исключаем поля для ставок и других целей
      if (!element.classList.contains('amount__input') && 
          !element.classList.contains('bet__input') &&
          !element.id.includes('amount') &&
          !element.id.includes('bet') &&
          !element.id.includes('email') &&
          !element.id.includes('password') &&
          element.placeholder !== 'Amount' &&
          element.placeholder !== 'Bet' &&
          element.placeholder !== 'Email' &&
          element.placeholder !== 'Password') {
        
        foundFields.push({
          element: element,
          selector: selector,
          value: element.value,
          placeholder: element.placeholder,
          className: element.className,
          id: element.id,
          tagName: element.tagName
        });
      }
    });
  });
  
  // 2. Ищем в модальных окнах и настройках
  const modals = document.querySelectorAll('[class*="modal"], [class*="settings"], [class*="profile"], [class*="popup"]');
  modals.forEach(modal => {
    const inputs = modal.querySelectorAll('input, textarea, [contenteditable="true"]');
    inputs.forEach(input => {
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet')) {
        
        foundFields.push({
          element: input,
          selector: 'modal input',
          value: input.value,
          placeholder: input.placeholder,
          className: input.className,
          id: input.id,
          tagName: input.tagName,
          parent: modal.className
        });
      }
    });
  });
  
  // 3. Ищем по тексту рядом с полем
  const allInputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
  allInputs.forEach(input => {
    const parent = input.parentElement;
    const parentText = parent ? parent.textContent.toLowerCase() : '';
    
    if (parentText.includes('nickname') || 
        parentText.includes('name') || 
        parentText.includes('username') ||
        parentText.includes('player')) {
      
      if (!input.classList.contains('amount__input') && 
          !input.classList.contains('bet__input') &&
          !input.id.includes('amount') &&
          !input.id.includes('bet')) {
        
        foundFields.push({
          element: input,
          selector: 'context search',
          value: input.value,
          placeholder: input.placeholder,
          className: input.className,
          id: input.id,
          tagName: input.tagName,
          context: parentText.substring(0, 100)
        });
      }
    }
  });
  
  console.log(`[SMART-NICKNAME-FINDER] Найдено ${foundFields.length} потенциальных полей:`);
  foundFields.forEach((field, index) => {
    console.log(`  ${index + 1}. ${field.tagName}`, {
      selector: field.selector,
      value: field.value,
      placeholder: field.placeholder,
      className: field.className,
      id: field.id,
      parent: field.parent,
      context: field.context
    });
  });
  
  return foundFields;
}

function fillNicknameFields(nickname = 'vortex') {
  console.log(`[SMART-NICKNAME-FINDER] 📝 Заполняем поля никнеймом: ${nickname}`);
  
  const fields = findNicknameFields();
  let filledCount = 0;
  
  fields.forEach(field => {
    const element = field.element;
    
    // Заполняем поле
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = nickname;
    } else if (element.contentEditable === 'true') {
      element.textContent = nickname;
    }
    
    // Убираем ограничения
    element.readOnly = false;
    element.disabled = false;
    
    // Убираем стили ошибок
    element.style.borderColor = '';
    element.style.backgroundColor = '';
    element.classList.remove('error', 'invalid', 'has-error');
    
    // Триггерим события
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
    
    filledCount++;
    console.log(`[SMART-NICKNAME-FINDER] ✅ Заполнено поле:`, field.selector);
  });
  
  console.log(`[SMART-NICKNAME-FINDER] ✅ Заполнено ${filledCount} полей`);
  return filledCount;
}

// Экспортируем функции
window.findNicknameFields = findNicknameFields;
window.fillNicknameFields = fillNicknameFields;

// Автоматически ищем и заполняем поля
setTimeout(() => {
  console.log('[SMART-NICKNAME-FINDER] 🚀 Автоматически ищем и заполняем поля...');
  fillNicknameFields('vortex');
}, 2000);

// Повторяем через интервалы
setTimeout(() => fillNicknameFields('vortex'), 5000);
setTimeout(() => fillNicknameFields('vortex'), 10000);

console.log('[SMART-NICKNAME-FINDER] Скрипт загружен. Используйте findNicknameFields() или fillNicknameFields()');

