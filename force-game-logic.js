// Скрипт для принудительного запуска логики игры
console.log('[FORCE-GAME-LOGIC] Загружаем скрипт принудительного запуска игры');

function forceGameLogic() {
  console.log('[FORCE-GAME-LOGIC] === ПРИНУДИТЕЛЬНЫЙ ЗАПУСК ИГРЫ ===');
  
  // 1. Разблокируем кнопку
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (button) {
    button.classList.remove('_disabled', 'disabled', 'blocked', 'inactive');
    button.disabled = false;
    button.style.pointerEvents = 'auto';
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
    console.log('[FORCE-GAME-LOGIC] ✅ Кнопка разблокирована');
  }
  
  // 2. Ищем объект игры и принудительно активируем его
  let gameObject = null;
  for (let key in window) {
    if (window[key] && typeof window[key] === 'object') {
      const obj = window[key];
      if (obj.placeBet && typeof obj.placeBet === 'function') {
        gameObject = obj;
        console.log('[FORCE-GAME-LOGIC] ✅ Найден объект игры:', key);
        break;
      }
    }
  }
  
  if (!gameObject) {
    console.log('[FORCE-GAME-LOGIC] ❌ Объект игры не найден, создаем принудительную логику');
    createForcedGameLogic();
    return;
  }
  
  // 3. Принудительно устанавливаем необходимые свойства
  if (gameObject) {
    console.log('[FORCE-GAME-LOGIC] Принудительно активируем игру...');
    
    // Устанавливаем gameStarted
    if (gameObject.setGameStarted) {
      gameObject.setGameStarted(true);
    } else {
      gameObject.gameStarted = true;
    }
    
    // Устанавливаем roundId
    const roundId = `forced-round-${Date.now()}`;
    if (gameObject.setRoundId) {
      gameObject.setRoundId(roundId);
    } else {
      gameObject.roundId = roundId;
    }
    
    // Устанавливаем clientSeed и nonce
    gameObject.clientSeed = `forced-client-seed-${Math.random().toString(36).substr(2, 16)}`;
    gameObject.nonce = Math.floor(Math.random() * 1000) + 1;
    
    // Устанавливаем amount
    if (gameObject.setAmount) {
      gameObject.setAmount(100);
    } else {
      gameObject.amount = 100;
    }
    
    // Переопределяем lockedButtons getter
    if (gameObject.lockedButtons !== undefined) {
      Object.defineProperty(gameObject, 'lockedButtons', {
        get: function() {
          console.log('[FORCE-GAME-LOGIC] lockedButtons getter вызван, возвращаем false');
          return false;
        },
        configurable: true
      });
    }
    
    console.log('[FORCE-GAME-LOGIC] ✅ Игра принудительно активирована:', {
      gameStarted: gameObject.gameStarted,
      roundId: gameObject.roundId,
      clientSeed: gameObject.clientSeed,
      nonce: gameObject.nonce,
      amount: gameObject.amount
    });
  }
  
  // 4. Добавляем обработчик клика на кнопку
  if (button) {
    // Удаляем старые обработчики
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Добавляем новый обработчик
    newButton.addEventListener('click', function(event) {
      console.log('[FORCE-GAME-LOGIC] 🎮 Кнопка нажата! Запускаем игру...');
      
      event.preventDefault();
      event.stopPropagation();
      
      // Принудительно вызываем API и логику игры
      runGameSequence();
    });
    
    console.log('[FORCE-GAME-LOGIC] ✅ Обработчик клика установлен');
  }
}

function createForcedGameLogic() {
  console.log('[FORCE-GAME-LOGIC] Создаем принудительную логику игры...');
  
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (!button) return;
  
  // Удаляем старые обработчики
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);
  
  // Добавляем обработчик
  newButton.addEventListener('click', function(event) {
    console.log('[FORCE-GAME-LOGIC] 🎮 Кнопка нажата! Запускаем принудительную игру...');
    
    event.preventDefault();
    event.stopPropagation();
    
    // Запускаем последовательность игры
    runGameSequence();
  });
  
  console.log('[FORCE-GAME-LOGIC] ✅ Принудительная логика создана');
}

function runGameSequence() {
  console.log('[FORCE-GAME-LOGIC] 🚀 Запускаем последовательность игры...');
  
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (button) {
    button.style.backgroundColor = '#FF6B6B';
    button.textContent = 'ЗАПУСКАЕМ...';
  }
  
  // 1. Создаем игру
  console.log('[FORCE-GAME-LOGIC] 1. Создаем игру...');
  fetch('/api/games/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuaWNrbmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsInN1YiI6InVzZXJfMTIzNDU2IiwiZXhwIjoxNzM3NDAwMDAwLCJpYXQiOjE3Mzc0MDAwMDB9.fake-signature'
    },
    body: JSON.stringify({
      amount: 100,
      currency: 'USD'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('[FORCE-GAME-LOGIC] ✅ Игра создана:', data);
    
    if (button) {
      button.style.backgroundColor = '#4ECDC4';
      button.textContent = 'РАЗМЕЩАЕМ СТАВКУ...';
    }
    
    if (data.success && data.data) {
      // 2. Размещаем ставку
      console.log('[FORCE-GAME-LOGIC] 2. Размещаем ставку...');
      
      return fetch('/api/bets/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuaWNrbmFtZSI6IkxvY2FsVm9ydGV4IiwiYmFsYW5jZSI6OTk5OTk5MDAsInN1YiI6InVzZXJfMTIzNDU2IiwiZXhwIjoxNzM3NDAwMDAwLCJpYXQiOjE3Mzc0MDAwMDB9.fake-signature'
        },
        body: JSON.stringify({
          roundId: data.data.roundId,
          amount: 100,
          clientSeed: data.data.clientSeed,
          nonce: data.data.nonce,
          currency: 'USD'
        })
      });
    }
  })
  .then(response => response ? response.json() : null)
  .then(data => {
    if (data) {
      console.log('[FORCE-GAME-LOGIC] ✅ Ставка размещена:', data);
      
      if (button) {
        const result = data.data || data.payload;
        if (result && result.result === 'win') {
          button.style.backgroundColor = '#4CAF50';
          button.textContent = '🎉 ВЫИГРЫШ! 🎉';
        } else {
          button.style.backgroundColor = '#F44336';
          button.textContent = '💸 ПРОИГРЫШ';
        }
        
        // Возвращаем кнопку в исходное состояние через 3 секунды
        setTimeout(() => {
          button.style.backgroundColor = '';
          button.textContent = 'HOLD TO SPIN';
        }, 3000);
      }
      
      console.log('[FORCE-GAME-LOGIC] 🎮 Игра завершена успешно!');
    }
  })
  .catch(error => {
    console.error('[FORCE-GAME-LOGIC] ❌ Ошибка в игре:', error);
    
    if (button) {
      button.style.backgroundColor = '#FF9800';
      button.textContent = 'ОШИБКА';
      
      setTimeout(() => {
        button.style.backgroundColor = '';
        button.textContent = 'HOLD TO SPIN';
      }, 2000);
    }
  });
}

// Добавляем глобальные функции
window.forceGameLogic = forceGameLogic;
window.runGameSequence = runGameSequence;

// Запускаем при загрузке
window.addEventListener('load', () => {
  console.log('[FORCE-GAME-LOGIC] Страница загружена');
  
  setTimeout(() => {
    forceGameLogic();
  }, 3000);
});

// Мониторим изменения DOM
const observer = new MutationObserver(() => {
  const button = document.querySelector('[data-track="bet_1.place"]');
  if (button && button.classList.contains('_disabled')) {
    console.log('[FORCE-GAME-LOGIC] 🔄 Обнаружена заблокированная кнопка, перезапускаем логику...');
    setTimeout(forceGameLogic, 500);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});

console.log('[FORCE-GAME-LOGIC] Скрипт загружен. Вызовите forceGameLogic() в консоли для ручного запуска');
