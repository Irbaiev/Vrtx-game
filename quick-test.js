// Быстрая проверка ключевых эндпоинтов
console.log('🚀 Быстрая проверка API эндпоинтов...');

const endpoints = [
  { method: 'GET', path: '/api/common/version/vortex', name: 'Version' },
  { method: 'GET', path: '/v2/api/games/settings', name: 'V2 Settings' },
  { method: 'POST', path: '/v2/api/games/retrieve', name: 'V2 Retrieve' },
  { method: 'POST', path: '/v2/api/games/create', name: 'V2 Create' },
  { method: 'GET', path: '/api/common/settings', name: 'Common Settings' },
  { method: 'GET', path: '/api/games/settings', name: 'Games Settings' },
  { method: 'GET', path: '/api/common/profile', name: 'Profile GET' },
  { method: 'POST', path: '/api/common/profile', name: 'Profile POST' }
];

async function quickTest() {
  for (const endpoint of endpoints) {
    try {
      const options = {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (endpoint.method === 'POST') {
        options.body = JSON.stringify({});
      }
      
      const response = await fetch(endpoint.path, options);
      const data = await response.json();
      
      console.log(`✅ ${endpoint.name}: ${response.status}`);
      console.log(`   Ответ:`, data);
      
      // Проверяем на обёртки
      if (data.success !== undefined || data.payload !== undefined || data.data !== undefined) {
        console.warn(`⚠️ ${endpoint.name}: Есть обёртки!`, Object.keys(data));
      } else {
        console.log(`✅ ${endpoint.name}: Плоский JSON`);
      }
      
    } catch (error) {
      console.error(`❌ ${endpoint.name}:`, error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('🏁 Проверка завершена');
}

quickTest();
