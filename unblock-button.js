// Скрипт для разблокировки кнопки
console.log('[UNBLOCK-BUTTON] Загружаем скрипт разблокировки кнопки');

function unblockButton() {
  console.log('[UNBLOCK-BUTTON] Ищем и разблокируем кнопку...');
  
  // Ищем кнопку
  const button = document.querySelector('[data-track="bet_1.place"]');
  
  if (!button) {
    console.log('[UNBLOCK-BUTTON] ❌ Кнопка не найдена');
    return false;
  }
  
  console.log('[UNBLOCK-BUTTON] ✅ Кнопка найдена');
  
  // Удаляем блокирующие классы
  const blockingClasses = ['_disabled', 'disabled', 'blocked', 'inactive'];
  let removedClasses = [];
  
  blockingClasses.forEach(cls => {
    if (button.classList.contains(cls)) {
      button.classList.remove(cls);
      removedClasses.push(cls);
    }
  });
  
  if (removedClasses.length > 0) {
    console.log('[UNBLOCK-BUTTON] ✅ Удалены блокирующие классы:', removedClasses);
  } else {
    console.log('[UNBLOCK-BUTTON] ℹ️ Блокирующие классы не найдены');
  }
  
  // Убираем disabled атрибут
  if (button.disabled) {
    button.disabled = false;
    console.log('[UNBLOCK-BUTTON] ✅ Убран disabled атрибут');
  }
  
  // Устанавливаем правильные стили
  button.style.pointerEvents = 'auto';
  button.style.opacity = '1';
  button.style.cursor = 'pointer';
  
  console.log('[UNBLOCK-BUTTON] ✅ Установлены правильные стили');
  
  // Проверяем результат
  const isBlocked = button.classList.contains('_disabled') || 
                   button.classList.contains('disabled') || 
                   button.disabled ||
                   getComputedStyle(button).pointerEvents === 'none';
  
  if (isBlocked) {
    console.log('[UNBLOCK-BUTTON] ❌ Кнопка все еще заблокирована');
    return false;
  } else {
    console.log('[UNBLOCK-BUTTON] ✅ Кнопка разблокирована!');
    return true;
  }
}

// Функция для постоянного мониторинга и разблокировки
function monitorAndUnblock() {
  const button = document.querySelector('[data-track="bet_1.place"]');
  
  if (button && (button.classList.contains('_disabled') || button.classList.contains('disabled'))) {
    console.log('[UNBLOCK-BUTTON] 🔄 Обнаружена заблокированная кнопка, разблокируем...');
    unblockButton();
  }
}

// Добавляем глобальную функцию
window.unblockButton = unblockButton;

// Запускаем при загрузке
window.addEventListener('load', () => {
  console.log('[UNBLOCK-BUTTON] Страница загружена');
  
  // Запускаем с задержкой
  setTimeout(() => {
    unblockButton();
  }, 2000);
  
  // Запускаем мониторинг каждые 2 секунды
  setInterval(monitorAndUnblock, 2000);
});

// Также мониторим изменения DOM
const observer = new MutationObserver(() => {
  monitorAndUnblock();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class', 'disabled']
});

console.log('[UNBLOCK-BUTTON] Скрипт загружен. Вызовите unblockButton() в консоли для ручной разблокировки');
