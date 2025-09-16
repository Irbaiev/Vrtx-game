// public/mock-service-worker.js

// 1. Импортируем библиотеку MSW
importScripts('msw.js');

// 2. Получаем доступ к API MSW из глобального объекта window (в воркере это self)
const { msw } = self;

// 3. Просто запускаем воркер. Он будет ждать инструкций от основного приложения.
msw.worker.start();