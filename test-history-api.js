// Тест API endpoint для истории ставок
console.log('🧪 Тестирование API endpoint /api/games/history...');

async function testHistoryAPI() {
  try {
    const response = await fetch('/api/games/history?gameId=vortex&limit=5&offset=0');
    console.log('Статус:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Успешно получены данные:', data.length, 'ставок');
      console.log('Первая ставка:', data[0]);
      console.log('Последняя ставка:', data[data.length - 1]);
    } else {
      console.error('❌ Ошибка:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Ошибка запроса:', error);
  }
}

// Запускаем тест
testHistoryAPI();
