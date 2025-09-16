// Скрипт для обновления баланса в реальном времени
console.log('[BALANCE-UPDATER] Загружен');

// Функция для обновления баланса в интерфейсе
function updateBalanceInUI(newBalance) {
  console.log(`[BALANCE-UPDATER] 🔄 Обновляем баланс в UI: ${newBalance}`);
  
  // Ищем элементы баланса в DOM
  const balanceSelectors = [
    '.balance',
    '.game-balance', 
    '.user-balance',
    '[data-balance]',
    '.balance-amount',
    '.balance-value',
    '.profile-balance',
    '.header-balance'
  ];
  
  let updated = false;
  
  balanceSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element) {
        element.textContent = newBalance.toFixed(2);
        element.setAttribute('data-balance', newBalance);
        updated = true;
        console.log(`[BALANCE-UPDATER] ✅ Обновлен элемент: ${selector}`);
      }
    });
  });
  
  // Также обновляем глобальную переменную
  window.__currentBalance = newBalance;
  
  if (!updated) {
    console.log('[BALANCE-UPDATER] ⚠️ Не найдены элементы баланса для обновления');
  }
}

// Слушаем события обновления баланса
window.addEventListener('balance:update', (event) => {
  const newBalance = event.detail.balance;
  console.log(`[BALANCE-UPDATER] 📡 Получено событие обновления баланса: ${newBalance}`);
  updateBalanceInUI(newBalance);
});

// Периодически проверяем глобальную переменную баланса
setInterval(() => {
  if (window.__balance && window.__balance !== window.__currentBalance) {
    console.log(`[BALANCE-UPDATER] 🔍 Обнаружено изменение баланса: ${window.__currentBalance} → ${window.__balance}`);
    updateBalanceInUI(window.__balance);
  }
}, 1000);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  console.log('[BALANCE-UPDATER] 🚀 Инициализация завершена');
  
  // Устанавливаем начальный баланс
  if (window.__balance) {
    updateBalanceInUI(window.__balance);
  }
});

console.log('[BALANCE-UPDATER] ✅ Готов к работе');

