// Блокировка функции mybetsinfo
console.log('🚫 Блокируем функцию mybetsinfo...');

// Перехватываем глобальные функции
(function() {
    // Сохраняем оригинальные функции
    const originalConsoleLog = console.log;
    
    // Блокируем функцию переключения страниц
    const originalSetPage = window.setPage;
    if (originalSetPage) {
        window.setPage = function(page) {
            if (page === 'mybetsinfo') {
                console.log('🚫 Блокируем переключение на mybetsinfo');
                return false;
            }
            return originalSetPage.apply(this, arguments);
        };
    }
    
    // Блокируем любые функции, которые могут переключать на mybetsinfo
    const originalPageSwitch = window.pageSwitch;
    if (originalPageSwitch) {
        window.pageSwitch = function(page) {
            if (page === 'mybetsinfo') {
                console.log('🚫 Блокируем pageSwitch на mybetsinfo');
                return false;
            }
            return originalPageSwitch.apply(this, arguments);
        };
    }
    
    // Блокируем функцию t (которая используется в коде как setPage)
    const originalT = window.t;
    if (originalT) {
        window.t = function(page) {
            if (page === 'mybetsinfo') {
                console.log('🚫 Блокируем функцию t("mybetsinfo")');
                return false;
            }
            return originalT.apply(this, arguments);
        };
    }
    
    // Блокируем все возможные функции переключения страниц
    const functionsToBlock = ['setPage', 'pageSwitch', 'switchPage', 'navigateTo'];
    functionsToBlock.forEach(funcName => {
        const originalFunc = window[funcName];
        if (originalFunc) {
            window[funcName] = function(page) {
                if (page === 'mybetsinfo') {
                    console.log(`🚫 Блокируем функцию ${funcName}("mybetsinfo")`);
                    return false;
                }
                return originalFunc.apply(this, arguments);
            };
        }
    });
    
    console.log('✅ Функции mybetsinfo заблокированы');
})();

// Дополнительная блокировка через перехват событий
document.addEventListener('DOMContentLoaded', function() {
    // Блокируем клики по кнопкам Info
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Проверяем, является ли клик по кнопке Info
        if (target.closest('[class*="Info"]') || 
            target.closest('[class*="info"]') ||
            target.closest('[class*="details"]') ||
            target.closest('[class*="more"]')) {
            
            // Проверяем, находится ли кнопка в контексте MyBets
            const mybetsContainer = target.closest('[class*="mybets"]') || 
                                  target.closest('[class*="mybetsRow"]') ||
                                  target.closest('[data-page="mybets"]');
            
            if (mybetsContainer) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                console.log('🚫 Блокируем клик по кнопке Info в MyBets');
                return false;
            }
        }
    }, true);
    
    console.log('✅ Обработчики событий для mybetsinfo заблокированы');
});

// Блокируем iframe загрузку
const originalCreateElement = document.createElement;
document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'iframe') {
        const originalSrc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src') || 
                           Object.getOwnPropertyDescriptor(Element.prototype, 'src');
        
        Object.defineProperty(element, 'src', {
            get: function() {
                return originalSrc ? originalSrc.get.call(this) : '';
            },
            set: function(value) {
                // Блокируем загрузку iframe для mybetsinfo
                if (value && (value.includes('mybetsinfo') || value.includes('bet') || value.includes('info'))) {
                    console.log('🚫 Блокируем загрузку iframe:', value);
                    return;
                }
                if (originalSrc) {
                    originalSrc.set.call(this, value);
                }
            }
        });
    }
    
    return element;
};

console.log('🚫 Блокировка mybetsinfo инициализирована');
