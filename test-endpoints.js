// Скрипт для тестирования всех API эндпоинтов
console.log('🧪 Тестирование API эндпоинтов...');

const baseUrl = window.location.origin;

// Список эндпоинтов для тестирования
const endpoints = [
  // Profile endpoints
  { method: 'POST', path: '/api/common/profile', name: 'Profile POST' },
  { method: 'GET', path: '/api/common/profile', name: 'Profile GET' },
  
  // Settings endpoints
  { method: 'GET', path: '/api/common/settings', name: 'Common Settings' },
  { method: 'GET', path: '/api/games/settings', name: 'Games Settings' },
  { method: 'GET', path: '/v2/api/games/settings', name: 'V2 Games Settings' },
  
  // Version endpoint
  { method: 'GET', path: '/api/common/version/vortex', name: 'Version' },
  
  // Game endpoints
  { method: 'POST', path: '/api/games/retrieve', name: 'Retrieve Game' },
  { method: 'POST', path: '/v2/api/games/retrieve', name: 'V2 Retrieve Game' },
  { method: 'POST', path: '/api/games/create', name: 'Create Game' },
  { method: 'POST', path: '/v2/api/games/create', name: 'V2 Create Game' },
  
  // Bet endpoints
  { method: 'POST', path: '/api/bets/place', name: 'Place Bet' },
  { method: 'POST', path: '/v2/api/bets/place', name: 'V2 Place Bet' },
  { method: 'POST', path: '/api/bets/cashout', name: 'Cashout' },
  { method: 'POST', path: '/v2/api/bets/cashout', name: 'V2 Cashout' },
  
  // Other endpoints
  { method: 'GET', path: '/api/common/tournaments/my', name: 'Tournaments' },
  { method: 'GET', path: '/api/common/limits', name: 'Limits' },
  { method: 'GET', path: '/api/common/rates', name: 'Rates' },
  { method: 'GET', path: '/api/common/ping', name: 'Ping' },
  
  // Translations
  { method: 'GET', path: '/api/translates/5fbba1ce8c2b9e7440670d3d/latest/en/en', name: 'Translations' }
];

async function testEndpoint(endpoint) {
  try {
    const options = {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Для POST запросов добавляем тело
    if (endpoint.method === 'POST') {
      options.body = JSON.stringify({});
    }
    
    const response = await fetch(baseUrl + endpoint.path, options);
    const data = await response.json();
    
    console.log(`✅ ${endpoint.name}: ${response.status}`, data);
    
    // Проверяем, что ответ плоский (без обёрток success/payload/data)
    if (data.success !== undefined || data.payload !== undefined || data.data !== undefined) {
      console.warn(`⚠️ ${endpoint.name}: Ответ содержит обёртки!`, data);
    }
    
    return { success: true, status: response.status, data };
  } catch (error) {
    console.error(`❌ ${endpoint.name}:`, error);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Запуск тестов...');
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push({ endpoint, result });
    
    // Небольшая пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Подводим итоги
  const successful = results.filter(r => r.result.success).length;
  const failed = results.filter(r => !r.result.success).length;
  
  console.log(`\n📊 Результаты тестирования:`);
  console.log(`✅ Успешно: ${successful}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log(`📈 Всего: ${results.length}`);
  
  if (failed > 0) {
    console.log('\n❌ Проблемные эндпоинты:');
    results.filter(r => !r.result.success).forEach(r => {
      console.log(`  - ${r.endpoint.name}: ${r.result.error}`);
    });
  }
  
  return results;
}

// Запускаем тесты
runTests().then(results => {
  console.log('🏁 Тестирование завершено');
  
  // Сохраняем результаты в глобальную переменную для отладки
  window.testResults = results;
});
