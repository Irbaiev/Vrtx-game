// Глубокий диагностический скрипт для понимания логики активации кнопки
console.log('[DEEP-DIAGNOSIS] Загружаем глубокий диагностический скрипт');

function deepDiagnosis() {
  console.log('[DEEP-DIAGNOSIS] === ГЛУБОКАЯ ДИАГНОСТИКА ЛОГИКИ ИГРЫ ===');
  
  // 1. Ищем кнопку
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (!button) {
    console.log('[DEEP-DIAGNOSIS] ❌ Кнопка не найдена');
    return;
  }
  
  console.log('[DEEP-DIAGNOSIS] ✅ Кнопка найдена:', button);
  
  // 2. Ищем все объекты игры
  console.log('[DEEP-DIAGNOSIS] === ПОИСК ОБЪЕКТОВ ИГРЫ ===');
  const gameObjects = [];
  
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      const gameMethods = ['placeBet', 'createGame', 'retrieveGame', 'cashout', 'setGameStarted', 'setRoundId'];
      const gameProperties = ['gameStarted', 'roundId', 'clientSeed', 'nonce', 'amount', 'lockedButtons'];
      
      const hasGameMethods = gameMethods.some(method => obj[method] && typeof obj[method] === 'function');
      const hasGameProperties = gameProperties.some(prop => obj[prop] !== undefined);
      
      if (hasGameMethods || hasGameProperties) {
        gameObjects.push({
          name: key,
          methods: gameMethods.filter(method => obj[method] && typeof obj[method] === 'function'),
          properties: gameProperties.filter(prop => obj[prop] !== undefined).reduce((acc, prop) => {
            acc[prop] = obj[prop];
            return acc;
          }, {})
        });
      }
    }
  }
  
  console.log('[DEEP-DIAGNOSIS] Найдены объекты игры:', gameObjects);
  
  // 3. Анализируем каждый объект игры
  gameObjects.forEach((gameObj, index) => {
    console.log(`[DEEP-DIAGNOSIS] === ОБЪЕКТ ИГРЫ ${index + 1}: ${gameObj.name} ===`);
    console.log('[DEEP-DIAGNOSIS] Методы:', gameObj.methods);
    console.log('[DEEP-DIAGNOSIS] Свойства:', gameObj.properties);
    
    // Проверяем условия активации
    const obj = window[gameObj.name];
    
    // Проверяем lockedButtons
    if (obj.lockedButtons !== undefined) {
      console.log('[DEEP-DIAGNOSIS] lockedButtons:', obj.lockedButtons);
      
      // Если это getter, пытаемся понять логику
      try {
        const descriptor = Object.getOwnPropertyDescriptor(obj, 'lockedButtons');
        if (descriptor && descriptor.get) {
          console.log('[DEEP-DIAGNOSIS] lockedButtons - это getter, логика:', descriptor.get.toString());
        }
      } catch (e) {
        console.log('[DEEP-DIAGNOSIS] Не удалось получить descriptor для lockedButtons');
      }
    }
    
    // Проверяем gameStarted
    if (obj.gameStarted !== undefined) {
      console.log('[DEEP-DIAGNOSIS] gameStarted:', obj.gameStarted);
    }
    
    // Проверяем roundId
    if (obj.roundId !== undefined) {
      console.log('[DEEP-DIAGNOSIS] roundId:', obj.roundId);
    }
    
    // Проверяем token
    if (obj.token !== undefined) {
      console.log('[DEEP-DIAGNOSIS] token:', obj.token ? 'Есть' : 'Нет');
    }
    
    // Проверяем isOnline
    if (obj.isOnline !== undefined) {
      console.log('[DEEP-DIAGNOSIS] isOnline:', obj.isOnline);
    }
  });
  
  // 4. Ищем логику активации кнопки в коде
  console.log('[DEEP-DIAGNOSIS] === ПОИСК ЛОГИКИ АКТИВАЦИИ КНОПКИ ===');
  
  // Ищем функции, которые могут влиять на состояние кнопки
  const activationFunctions = [];
  for (let key in window) {
    if (window[key] && typeof window[key] === 'function') {
      const func = window[key];
      const funcStr = func.toString();
      if (funcStr.includes('_disabled') || funcStr.includes('lockedButtons') || funcStr.includes('gameStarted')) {
        activationFunctions.push({
          name: key,
          function: func
        });
      }
    }
  }
  
  console.log('[DEEP-DIAGNOSIS] Найдены функции активации:', activationFunctions.map(f => f.name));
  
  // 5. Проверяем API запросы
  console.log('[DEEP-DIAGNOSIS] === ПРОВЕРКА API ЗАПРОСОВ ===');
  
  // Проверяем, какие API запросы должны быть выполнены для активации
  const requiredAPIs = [
    '/api/common/profile',
    '/api/common/settings', 
    '/api/games/settings',
    '/api/games/create',
    '/api/games/retrieve'
  ];
  
  requiredAPIs.forEach(api => {
    console.log(`[DEEP-DIAGNOSIS] Проверяем API: ${api}`);
    // Здесь можно добавить проверку, был ли выполнен запрос
  });
  
  // 6. Проверяем WebSocket соединение
  console.log('[DEEP-DIAGNOSIS] === ПРОВЕРКА WEBSOCKET ===');
  
  // Ищем WebSocket объекты
  for (let key in window) {
    if (window[key] && window[key].constructor && window[key].constructor.name === 'WebSocket') {
      console.log(`[DEEP-DIAGNOSIS] WebSocket найден: ${key}`, {
        readyState: window[key].readyState,
        url: window[key].url
      });
    }
  }
  
  // 7. Проверяем состояние кнопки в реальном времени
  console.log('[DEEP-DIAGNOSIS] === СОСТОЯНИЕ КНОПКИ В РЕАЛЬНОМ ВРЕМЕНИ ===');
  
  const checkButtonState = () => {
    const currentButton = document.querySelector('[data-track="bet_1.place"]');
    if (currentButton) {
      console.log('[DEEP-DIAGNOSIS] Текущее состояние кнопки:', {
        classes: currentButton.className,
        disabled: currentButton.disabled,
        pointerEvents: getComputedStyle(currentButton).pointerEvents,
        opacity: getComputedStyle(currentButton).opacity,
        cursor: getComputedStyle(currentButton).cursor
      });
    }
  };
  
  checkButtonState();
  
  // 8. Мониторим изменения состояния кнопки
  const buttonObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        console.log('[DEEP-DIAGNOSIS] 🔄 Изменение классов кнопки:', {
          oldValue: mutation.oldValue,
          newValue: mutation.target.className
        });
        checkButtonState();
      }
    });
  });
  
  buttonObserver.observe(button, {
    attributes: true,
    attributeFilter: ['class', 'disabled']
  });
  
  // 9. Ищем условия активации в коде
  console.log('[DEEP-DIAGNOSIS] === ПОИСК УСЛОВИЙ АКТИВАЦИИ В КОДЕ ===');
  
  // Ищем в глобальных переменных условия активации
  const activationConditions = [];
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      if (obj.lockedButtons !== undefined || obj.gameStarted !== undefined) {
        activationConditions.push({
          name: key,
          lockedButtons: obj.lockedButtons,
          gameStarted: obj.gameStarted,
          roundId: obj.roundId,
          token: obj.token ? 'Есть' : 'Нет',
          isOnline: obj.isOnline
        });
      }
    }
  }
  
  console.log('[DEEP-DIAGNOSIS] Условия активации:', activationConditions);
  
  // 10. Выводим рекомендации
  console.log('[DEEP-DIAGNOSIS] === РЕКОМЕНДАЦИИ ===');
  
  const recommendations = [];
  
  // Проверяем основные условия
  const mainGameObj = gameObjects.find(obj => obj.methods.includes('placeBet'));
  if (mainGameObj) {
    const obj = window[mainGameObj.name];
    
    if (obj.lockedButtons === true) {
      recommendations.push('❌ lockedButtons = true - нужно установить false');
    }
    
    if (obj.gameStarted === false) {
      recommendations.push('❌ gameStarted = false - нужно установить true');
    }
    
    if (!obj.roundId) {
      recommendations.push('❌ roundId отсутствует - нужно создать');
    }
    
    if (!obj.token) {
      recommendations.push('❌ token отсутствует - нужно установить');
    }
    
    if (obj.isOnline === false) {
      recommendations.push('❌ isOnline = false - нужно установить true');
    }
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ Все основные условия выполнены');
  }
  
  console.log('[DEEP-DIAGNOSIS] Рекомендации:', recommendations);
  
  console.log('[DEEP-DIAGNOSIS] === КОНЕЦ ДИАГНОСТИКИ ===');
  
  return {
    gameObjects,
    activationConditions,
    recommendations
  };
}

// Добавляем глобальную функцию
window.deepDiagnosis = deepDiagnosis;

// Запускаем при загрузке
window.addEventListener('load', () => {
  console.log('[DEEP-DIAGNOSIS] Страница загружена');
  
  setTimeout(() => {
    deepDiagnosis();
  }, 5000);
});

console.log('[DEEP-DIAGNOSIS] Скрипт загружен. Вызовите deepDiagnosis() в консоли для глубокой диагностики');
