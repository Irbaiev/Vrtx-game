// Принудительная установка никнейма в localStorage и sessionStorage
console.log('[SET-NICKNAME-STORAGE] Устанавливаем никнейм в хранилище...');

// Устанавливаем никнейм в localStorage
localStorage.setItem('nickname', 'vortex');
localStorage.setItem('playerName', 'vortex');
localStorage.setItem('name', 'vortex');

// Устанавливаем никнейм в sessionStorage
sessionStorage.setItem('nickname', 'vortex');
sessionStorage.setItem('playerName', 'vortex');
sessionStorage.setItem('name', 'vortex');

// Обновляем токен с правильным никнеймом
const currentToken = localStorage.getItem('token');
if (currentToken) {
  try {
    // Декодируем JWT токен
    const payload = JSON.parse(atob(currentToken.split('.')[1]));
    payload.nickname = 'vortex';
    payload.playerName = 'vortex';
    
    // Создаем новый токен (без подписи, но с правильными данными)
    const newToken = btoa(JSON.stringify(payload)) + '.fake-signature';
    localStorage.setItem('token', newToken);
    
    console.log('[SET-NICKNAME-STORAGE] ✅ Токен обновлен с никнеймом vortex');
  } catch (e) {
    console.log('[SET-NICKNAME-STORAGE] ⚠️ Не удалось обновить токен:', e);
  }
}

console.log('[SET-NICKNAME-STORAGE] ✅ Никнейм установлен в хранилище');
