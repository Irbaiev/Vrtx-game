// Мок WebSocket для автономной работы игры
(function() {
    'use strict';
    
    console.log('[WebSocket Mock] Инициализация мок WebSocket...');
    console.log('[WebSocket Mock] Текущий URL:', window.location.href);
    
    // Автоматически устанавливаем токен при загрузке
    const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuaWNrbmFtZSI6InZvcnRleCIsImJhbGFuY2UiOjk5OTk5OTAwLCJzdWIiOiJ1c2VyXzEyMzQ1NiIsImV4cCI6MTczNzQwMDAwMCwiaWF0IjoxNzM3NDAwMDAwfQ.fake-signature';
    
    // Проверяем, есть ли уже токен
    const existingToken = localStorage.getItem('token');
    if (!existingToken || existingToken !== FAKE_JWT) {
        console.log('[WebSocket Mock] Устанавливаем токен в localStorage...');
        localStorage.setItem('token', FAKE_JWT);
        console.log('[WebSocket Mock] Токен установлен:', FAKE_JWT);
    } else {
        console.log('[WebSocket Mock] Токен уже установлен:', existingToken);
    }
    
    // Добавляем глобальную функцию для отладки токена
    window.debugToken = function(token) {
        if (!token) {
            console.log('[WebSocket Mock] Токен не передан или undefined');
            return;
        }
        try {
            const parts = token.split('.');
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            console.log('[WebSocket Mock] Токен декодирован успешно:', { header, payload });
        } catch (error) {
            console.log('[WebSocket Mock] Ошибка декодирования токена:', error);
        }
    };
    
    // Сохраняем оригинальный WebSocket
    const OriginalWebSocket = window.WebSocket;
    
    // Создаем мок WebSocket
    class MockWebSocket {
        constructor(url, protocols) {
            this.url = url;
            this.protocols = protocols;
            this.readyState = WebSocket.CONNECTING;
            this.bufferedAmount = 0;
            this.extensions = '';
            this.protocol = '';
            
            // События
            this.onopen = null;
            this.onclose = null;
            this.onmessage = null;
            this.onerror = null;
            
            console.log('[WebSocket Mock] Создание WebSocket для:', url);
            
            // Имитируем успешное подключение
            setTimeout(() => {
                this.readyState = WebSocket.OPEN;
                if (this.onopen) {
                    this.onopen(new Event('open'));
                }
                console.log('[WebSocket Mock] WebSocket подключен:', url);
            }, 100);
        }
        
        send(data) {
            console.log('[WebSocket Mock] Отправка данных:', data);
            
            // Имитируем получение ответа
            setTimeout(() => {
                if (this.onmessage) {
                    const mockResponse = {
                        type: 'message',
                        data: JSON.stringify({
                            type: 'ping',
                            timestamp: Date.now()
                        })
                    };
                    this.onmessage(mockResponse);
                }
            }, 50);
            
            // Имитируем обновление баланса
            setTimeout(() => {
                if (this.onmessage) {
                    const balanceUpdate = {
                        type: 'message',
                        data: JSON.stringify({
                            type: 'balance_update',
                            balance: 99999900,
                            currency: 'FUN',
                            timestamp: Date.now()
                        })
                    };
                    this.onmessage(balanceUpdate);
                }
            }, 200);
        }
        
        close(code, reason) {
            console.log('[WebSocket Mock] Закрытие WebSocket:', code, reason);
            this.readyState = WebSocket.CLOSED;
            if (this.onclose) {
                this.onclose(new CloseEvent('close', { code, reason }));
            }
        }
        
        addEventListener(type, listener) {
            console.log('[WebSocket Mock] Добавление слушателя:', type);
            switch(type) {
                case 'open':
                    this.onopen = listener;
                    break;
                case 'close':
                    this.onclose = listener;
                    break;
                case 'message':
                    this.onmessage = listener;
                    break;
                case 'error':
                    this.onerror = listener;
                    break;
            }
        }
        
        removeEventListener(type, listener) {
            console.log('[WebSocket Mock] Удаление слушателя:', type);
            switch(type) {
                case 'open':
                    this.onopen = null;
                    break;
                case 'close':
                    this.onclose = null;
                    break;
                case 'message':
                    this.onmessage = null;
                    break;
                case 'error':
                    this.onerror = null;
                    break;
            }
        }
    }
    
    // Добавляем константы WebSocket
    MockWebSocket.CONNECTING = 0;
    MockWebSocket.OPEN = 1;
    MockWebSocket.CLOSING = 2;
    MockWebSocket.CLOSED = 3;
    
    // Заменяем WebSocket на мок
    window.WebSocket = MockWebSocket;
    
    console.log('[WebSocket Mock] WebSocket заменен на мок версию');
    
    // Мок для Centrifuge (если используется)
    if (window.Centrifuge) {
        console.log('[WebSocket Mock] Найден Centrifuge, создаем мок...');
        
        const OriginalCentrifuge = window.Centrifuge;
        
        class MockCentrifuge {
            constructor(url, options) {
                this.url = url;
                this.options = options;
                this.state = 'disconnected';
                this.subscriptions = new Map();
                
                console.log('[WebSocket Mock] Создание Centrifuge для:', url);
                
                // Имитируем подключение
                setTimeout(() => {
                    this.state = 'connected';
                    if (this.onConnect) {
                        this.onConnect({});
                    }
                    console.log('[WebSocket Mock] Centrifuge подключен');
                }, 200);
            }
            
            connect() {
                console.log('[WebSocket Mock] Centrifuge connect() вызван');
                this.state = 'connecting';
                
                setTimeout(() => {
                    this.state = 'connected';
                    if (this.onConnect) {
                        this.onConnect({});
                    }
                }, 100);
            }
            
            disconnect() {
                console.log('[WebSocket Mock] Centrifuge disconnect() вызван');
                this.state = 'disconnected';
                if (this.onDisconnect) {
                    this.onDisconnect({});
                }
            }
            
            subscribe(channel, callbacks) {
                console.log('[WebSocket Mock] Centrifuge subscribe к каналу:', channel);
                
                const subscription = {
                    channel: channel,
                    callbacks: callbacks,
                    state: 'subscribed',
                    publish: (data) => {
                        if (callbacks.onMessage) {
                            callbacks.onMessage({ data: data });
                        }
                    }
                };
                
                this.subscriptions.set(channel, subscription);
                
                // Имитируем успешную подписку
                setTimeout(() => {
                    if (callbacks.onSubscribe) {
                        callbacks.onSubscribe({});
                    }
                }, 50);
                
                // Если это подписка на баланс, отправляем данные о балансе
                if (channel.includes('balance_ticket')) {
                    setTimeout(() => {
                        if (callbacks.onMessage) {
                            callbacks.onMessage({
                                data: {
                                    balance: 99999900,
                                    currency: 'FUN',
                                    logout: false
                                }
                            });
                        }
                    }, 100);
                }
                
                return subscription;
            }
            
            unsubscribe(channel) {
                console.log('[WebSocket Mock] Centrifuge unsubscribe от канала:', channel);
                this.subscriptions.delete(channel);
            }
            
            publish(channel, data) {
                console.log('[WebSocket Mock] Centrifuge publish в канал:', channel, data);
                const subscription = this.subscriptions.get(channel);
                if (subscription) {
                    subscription.publish(data);
                }
            }
        }
        
        window.Centrifuge = MockCentrifuge;
        console.log('[WebSocket Mock] Centrifuge заменен на мок версию');
    }
    
})();
