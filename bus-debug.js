// bus-debug.js
(function() {
  console.log("[BUS-DEBUG] Загружаем скрипт диагностики invoke/trigger");

  // Попробуем перехватить все шины (b.V и v.x) из глобальных импортов
  let vortexBus, canvasBus;

  try {
    vortexBus = __webpack_require__(1091).V;
    canvasBus = __webpack_require__(2908).x;
  } catch (err) {
    console.warn("[BUS-DEBUG] Не удалось достать bus из webpack", err);
  }

  function wrapBus(bus, name) {
    if (!bus) return;

    const originalInvoke = bus.invoke.bind(bus);
    const originalTrigger = bus.trigger.bind(bus);

    bus.invoke = (id, ...args) => {
      const hasCb = bus.listCallbacks().includes(id);
      console.log(
        `[BUS-DEBUG] invoke(${name}):`,
        id,
        { args, hasCallback: hasCb }
      );
      if (!hasCb) {
        console.warn(`[BUS-DEBUG] ❌ Нет зарегистрированного callback для id "${id}"`);
      }
      return originalInvoke(id, ...args);
    };

    bus.trigger = (id, ...args) => {
      const hasEv = bus.listEvents().includes(id);
      console.log(
        `[BUS-DEBUG] trigger(${name}):`,
        id,
        { args, hasEvent: hasEv }
      );
      if (!hasEv) {
        console.warn(`[BUS-DEBUG] ⚠️ Нет слушателей события "${id}"`);
      }
      return originalTrigger(id, ...args);
    };

    console.log(`[BUS-DEBUG] Обернули invoke/trigger для ${name}`);
  }

  wrapBus(vortexBus, "vortexBus");
  wrapBus(canvasBus, "canvasBus");

  // Экспортируем для ручной проверки
  window.__BUS_DEBUG__ = { vortexBus, canvasBus };
})();
