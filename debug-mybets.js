// Скрипт для отладки MyBets API
console.log('🔍 Запуск отладки MyBets API...');

// Перехватываем все fetch запросы
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  console.log('🌐 Fetch запрос:', url);
  
  return originalFetch.apply(this, args)
    .then(response => {
      if (url.includes('/api/common/bets/my')) {
        console.log('✅ MyBets API ответ:', response.status, response.statusText);
        response.clone().json().then(data => {
          console.log('📊 MyBets данные:', data);
        }).catch(e => {
          console.log('❌ Ошибка парсинга MyBets данных:', e);
        });
      }
      return response;
    })
    .catch(error => {
      if (url.includes('/api/common/bets/my')) {
        console.log('❌ MyBets API ошибка:', error);
      }
      throw error;
    });
};

// Функция для тестирования MyBets API
window.testMyBetsAPI = async function() {
  console.log('🧪 Тестируем MyBets API...');
  
  try {
    const response = await fetch('/api/common/bets/my?gameId=vortex&limit=10&offset=0');
    console.log('📡 Статус ответа:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Данные получены:', data.length, 'ставок');
      console.log('📋 Первая ставка:', data[0]);
      return data;
    } else {
      console.log('❌ Ошибка HTTP:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('📄 Текст ошибки:', errorText);
    }
  } catch (error) {
    console.log('💥 Исключение:', error);
  }
};

// Функция для проверки Service Worker
window.checkServiceWorker = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log('🔧 Зарегистрированные Service Workers:', registrations.length);
      registrations.forEach((registration, index) => {
        console.log(`SW ${index + 1}:`, registration.scope);
      });
    });
  } else {
    console.log('❌ Service Worker не поддерживается');
  }
};

// Функция для принудительного обновления Service Worker
window.updateServiceWorker = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.update().then(() => {
          console.log('🔄 Service Worker обновлен');
        });
      });
    });
  }
};

console.log('✅ Отладка MyBets API готова!');
console.log('📝 Доступные функции:');
console.log('  - testMyBetsAPI() - тест API');
console.log('  - checkServiceWorker() - проверка SW');
console.log('  - updateServiceWorker() - обновление SW');
