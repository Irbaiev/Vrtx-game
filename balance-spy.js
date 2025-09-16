// balance-spy.js
(function() {
  console.log("[BALANCE-SPY] Загружаем перехватчик баланса...");

  // Сколько уровней глубины искать
  const MAX_DEPTH = 4;
  const visited = new WeakSet();

  function spyObject(obj, path = "root", depth = 0) {
    if (!obj || typeof obj !== "object" || visited.has(obj) || depth > MAX_DEPTH) return;
    visited.add(obj);

    // Если есть поле balance
    if ("balance" in obj) {
      try {
        let val = obj.balance;
        Object.defineProperty(obj, "balance", {
          get() {
            console.log(`[BALANCE-SPY] GET ${path}.balance ->`, val);
            return val;
          },
          set(v) {
            console.log(`[BALANCE-SPY] SET ${path}.balance:`, val, "=>", v);
            val = v;
          },
          configurable: true,
          enumerable: true
        });
        console.log(`[BALANCE-SPY] Подключен перехватчик: ${path}.balance (начальное = ${val})`);
      } catch(e) {
        console.warn("[BALANCE-SPY] Не удалось повесить перехват на", path, e);
      }
    }

    // Рекурсивно смотрим поля
    for (let k of Object.keys(obj)) {
      if (typeof obj[k] === "object") {
        spyObject(obj[k], path + "." + k, depth + 1);
      }
    }
  }

  // Ищем кандидатов в window
  for (let k of Object.keys(window)) {
    try {
      if (typeof window[k] === "object" && window[k] !== null) {
        spyObject(window[k], k, 0);
      }
    } catch(e){}
  }

  console.log("[BALANCE-SPY] Готово. Все обращения к balance теперь будут логироваться.");
})();
