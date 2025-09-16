"use strict";
(self.webpackChunkfederation_modules =
  self.webpackChunkfederation_modules || []).push([
  [7056, 4340],
  {
    4340: (t, e, o) => {
      (o.r(e), o.d(e, { default: () => i }));
      class i {
        constructor() {
          ((this.callbacks = {}), (this.events = {}));
        }
        register(t, e) {
          this.callbacks[t] = e;
        }
        unregister(t) {
          delete this.callbacks[t];
        }
        invoke(t, ...e) {
          const o = this.callbacks[t];
          o
            ? o(...e)
            : console.warn(`Callback with id "${String(t)}" not found.`);
        }
        listCallbacks() {
          return Object.keys(this.callbacks);
        }
        on(t, e) {
          (this.events[t] || (this.events[t] = []), this.events[t].push(e));
        }
        off(t, e) {
          this.events[t] &&
            (this.events[t] = this.events[t].filter((t) => t !== e));
        }
        trigger(t, e) {
          this.events[t]?.forEach((t) => t(e));
        }
        listEvents() {
          return Object.keys(this.events);
        }
      }
    },
    1946: (t, e, o) => {
      o.d(e, { v: () => s });
      var i = o(4474);
      const s = () => ({
        api: (0, i.HQ)().host,
        core: `${document.location.origin}/public/api`,
        centrifuge: `wss://${(0, i.HQ)().host}/connection/websocket`,
      });
    },
    5125: (t, e, o) => {
      o.d(e, {
        $h: () => m,
        Gr: () => l,
        RE: () => u,
        T0: () => a,
        xC: () => c,
        zV: () => h,
      });
      var i = o(529),
        s = o.n(i),
        n = o(1946);
      const r = (t = "") => {
          const e = (0, n.v)().api.includes("localhost") ? "http" : "https",
            o = t ? `${t}/api` : "api";
          return s().create({ baseURL: `${e}://${(0, n.v)().api}/${o}` });
        },
        a = ({ headers: t, version: e = "", ...o }) =>
          r(e).post("/bets/place", o, { headers: t }),
        l = ({ headers: t, version: e = "", ...o }) =>
          r(e).post("/games/create", o, { headers: t }),
        u = ({ version: t = "", ...e }) => r(t).get("/games/settings", e),
        h = ({ headers: t, version: e = "", ...o }) =>
          r(e).post("/bets/cashout", o, { headers: t }),
        c = ({ headers: t, version: e = "", ...o }) =>
          r(e).post("/games/retrieve", o, { headers: t }),
        m = ({ headers: t, version: e = "", ...o }) =>
          r(e).post("/games/freebets/interrupt", o, { headers: t });
    },
    2908: (t, e, o) => {
      o.d(e, { x: () => n });
      var i = o(4340);
      class s extends i.default {}
      const n = new s();
    },
    1091: (t, e, o) => {
      o.d(e, { V: () => n });
      var i = o(4340);
      class s extends i.default {}
      const n = new s();
    },
    543: (t, e) => {
      e.Z = function (t) {
        return JSON.parse(JSON.stringify(t));
      };
    },
    7056: (t, e, o) => {
      o.r(e);
      var i = o(5125),
        s = o(1299),
        n = o(5103),
        r = o(6444),
        a = o.n(r),
        l = o(3868),
        u = o.n(l),
        h = o(1946),
        c = o(2009),
        m = o(5669),
        d = o(543),
        p = o(8596),
        f = o(8743),
        b = o(1091),
        v = o(2908),
        g = function (t, e, o, i) {
          var s,
            n = arguments.length,
            r =
              n < 3
                ? e
                : null === i
                  ? (i = Object.getOwnPropertyDescriptor(e, o))
                  : i;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            r = Reflect.decorate(t, e, o, i);
          else
            for (var a = t.length - 1; a >= 0; a--)
              (s = t[a]) &&
                (r = (n < 3 ? s(r) : n > 3 ? s(e, o, r) : s(e, o)) || r);
          return (n > 3 && r && Object.defineProperty(e, o, r), r);
        };
      (0, s.configure)({ enforceActions: "always" });
      class y {
        constructor(t, e) {
          ((this.version = ""),
            (this.messagesList = []),
            (this.placeBetIsHeld = !1),
            (this.settings = null),
            (this.settingsLoaded = !1),
            (this.placebetProcessing = !1),
            (this.placebetClicked = !1),
            (this.cashoutProcessing = !1),
            (this.roundId = c.Z.get("roundId") || ""),
            (this.prevRoundId = ""),
            (this.roundSeed = ""),
            (this.clientSeed = (0, n.v4)()),
            (this.serverSeed = void 0),
            (this.nonce = 1),
            (this.amount = "1.00"),
            (this.gameResult = null),
            (this.result = "initial"),
            (this.payout = 0),
            (this.coefficient = 0),
            (this.multiplier = 0),
            (this.showBonusGame = !1),
            (this.skipAnimation = !1),
            (this.gameState = {
              multiplier: 0,
              bonusWin: 0,
              superBonus: !1,
              collection: [0, 0, 0],
              symbol: "Symbol3",
              cashable: !1,
              initial: !0,
            }),
            (this.olympusBonusResult = null),
            (this.cashoutTimeout = null),
            (this.autoCashoutTimeout = null),
            (this.hold2pinTimeout = null),
            (this.winScreen = !1),
            (this.winLevelList = [0]),
            (this.splitTest = {}),
            (this.superBonusState = null),
            (this.gameStarted = !1),
            (this.betIndex = 0),
            (this.currentCoefficient = 0),
            (this.currentCoefficientTimeout = null),
            (this.partialCoefficient = 0),
            (this.partialCoefficientTimeout = null),
            (this.currentAmountId = 0),
            (this.amountsMap = [1, 2, 3, 5, 10, 20, 50, 100]),
            (this.setPlacebetProcessing = (t) => {
              this.placebetProcessing = t;
            }),
            (this.setPlacebetClicked = (t) => {
              this.placebetClicked = t;
            }),
            (this.setSkipAnimation = (t) => {
              this.skipAnimation = t;
            }),
            (this.setCurrentAmountId = (t) => {
              this.currentAmountId = t;
            }),
            (this.setAmountsMap = (t, e) => {
              const o = this.gameConfig.amountsMapValues;
              if (!t || !o || !e) return null;
              const i = o.map((e) => (0, m.Z)(e * t));
              (i.push(e), (this.amountsMap = i));
            }),
            (this.setMessagesList = (t) => {
              this.messagesList = [...this.messagesList, t];
            }),
            (this.updateMessagesList = (t) => {
              this.messagesList = t;
            }),
            (this.setPlaceBetIsHeld = (t) => {
              this.placeBetIsHeld = t;
            }),
            (this.setShowBonusGame = (t) => {
              this.showBonusGame = t;
            }),
            (this.setCurrentCoefficient = (t) => {
              this.currentCoefficient = t;
            }),
            (this.updateCurrentCoefficient = () => {
              if (!this.settingsLoaded) return 0;
              (this.currentCoefficientTimeout &&
                clearTimeout(this.currentCoefficientTimeout),
                (this.currentCoefficientTimeout = setTimeout(() => {
                  const t = this.gameState.collection.reduce((t, e, o) => {
                    const i = Object.keys(this.settings)[o];
                    return t + this.settings[i][e];
                  }, 0);
                  this.setCurrentCoefficient(t);
                }, this.gameConfig.game.duration * this.durationMultiplier)));
            }),
            (this.setPartialCoefficient = (t) => {
              this.partialCoefficient = t;
            }),
            (this.updatePartialCoefficient = () => {
              if (!this.settingsLoaded) return 0;
              (this.partialCoefficientTimeout &&
                clearTimeout(this.partialCoefficientTimeout),
                (this.partialCoefficientTimeout = setTimeout(() => {
                  const t = this.gameState.collection.reduce((t, e, o) => {
                    const i = Object.keys(this.settings)[o],
                      s = e ? e - 1 : 0;
                    return t + this.settings[i][s];
                  }, 0);
                  this.setPartialCoefficient(this.currentCoefficient - t);
                }, this.gameConfig.game.duration * this.durationMultiplier)));
            }),
            (this.setWinScreen = (t) => {
              this.winScreen = t;
            }),
            (this.showWinScreen = (t = 0) => {
              setTimeout(() => {
                (this.setWinScreen(!0),
                  setTimeout(() => {
                    this.setWinScreen(!1);
                  }, this.gameConfig.winDuration));
              }, t);
            }),
            (this.fetchSettings = async () => {
              const {
                profile: { token: t, playerId: e },
              } = this.root.profileCommon;
              try {
                const { data: o } = await (0, i.RE)({
                  headers: { authorization: t, apikey: e },
                  version: this.version,
                });
                ((this.settings = o), (this.settingsLoaded = !0));
              } catch (t) {
                return (console.log("fetchSettings error:", t), t);
              }
            }),
            (this.setRoundId = (t) => {
              this.roundId = t;
            }),
            (this.interrupGame = async () => {
              const {
                profile: { token: t, apiKey: e },
              } = this.root.profileCommon;
              try {
                const { data: o } = await (0, i.$h)({
                  headers: { authorization: t, apikey: e },
                  roundId: this.roundId,
                  version: this.version,
                });
                (0, s.runInAction)(() => {
                  (this.setRoundId(o.roundId),
                    (this.gameStarted = !0),
                    this.setGameState(o.state),
                    this.mockGame());
                });
              } catch (t) {
                return (
                  console.log("fetchGame error:", t),
                  this.setRoundId(),
                  (this.gameStarted = !1),
                  t
                );
              }
            }),
            (this.createGame = async () => {
              const t = new URLSearchParams(window.location.search).get(
                  "collection"
                ),
                {
                  profile: { token: e, apiKey: o, splitTest: n },
                } = this.root.profileCommon;
              this.nonce = 1;
              try {
                const { data: n } = await (0, i.Gr)({
                  headers: { authorization: e, apikey: o },
                  theme: this.gameServerTheme,
                  nonce: this.nonce,
                  clientSeed: this.clientSeed,
                  serverSeed: this.serverSeed,
                  ...(t && { collection: t }),
                  version: this.version,
                });
                (0, s.runInAction)(() => {
                  (this.setRoundId(n.roundId),
                    (this.gameStarted = !0),
                    this.setGameState(n.state),
                    this.mockGame());
                });
              } catch (t) {
                return (
                  console.log("fetchGame error:", t),
                  this.setRoundId(),
                  (this.gameStarted = !1),
                  t
                );
              }
            }),
            (this.retrieveGame = async () => {
              const {
                profileCommon: {
                  profile: { token: t, apiKey: e, splitTest: o },
                },
                uiCommon: { setAlertList: n },
                freebetsCommon: {
                  setForcedDisabledFreebets: r,
                  freebetActive: a,
                },
              } = this.root;
              b.V.on("CenterRouletteReady", () => {
                b.V.invoke("showIcons");
              });
              try {
                const { data: o } = await (0, i.xC)({
                    headers: { authorization: t, apikey: e },
                    theme: this.gameServerTheme,
                    version: this.version,
                  }),
                  {
                    clientSeed: l,
                    hash: h,
                    nonce: c,
                    state: m,
                    freebetsId: d,
                  } = o;
                if (!l || !c) throw { clientSeed: l, hash: h, nonce: c };
                if (d === a?.id && "expired" === a?.status) throw 1;
                ((0, s.runInAction)(() => {
                  (this.setRoundId(o.roundId),
                    this.setGameState(o.state),
                    (this.gameStarted = !0),
                    (this.clientSeed = l),
                    (this.nonce = c),
                    m.collection.find((t) => t > 0) && !d && r(!0),
                    m.amount && this.setAmount(m.amount),
                    this.mockGame(),
                    n({
                      title: u().t("NOTIF.CONTINUE_ROUND"),
                      type: "success",
                    }));
                }),
                  "ringsofolympus" === this.gameServerTheme &&
                    v.x.on("CanvasLoaded", () => {
                      v.x.invoke("setStep", o.state.collection);
                    }));
              } catch (t) {
                await this.createGame();
              }
            }),
            (this.mockGame = () => {
              const { location: t } = window,
                { search: e } = t,
                o = new URLSearchParams(e);
              o.has("serverSeed") &&
                (0, s.runInAction)(() => {
                  ((this.serverSeed = o.get("serverSeed") || void 0),
                    (this.nonce = Number(o.get("nonce")) || void 0),
                    (this.clientSeed = o.get("clientSeed") || void 0));
                });
            }),
            (this.setGameState = (t) => {
              if (
                ((this.gameState = { ...this.gameState, ...t }),
                this.updateCurrentCoefficient(),
                this.updatePartialCoefficient(),
                "ringsofolympus" === this.gameServerTheme && !t.superBonus)
              ) {
                if (t.exCollection) {
                  v.x.invoke("setStep", t.exCollection);
                  this.cashoutTimeout && clearTimeout(this.cashoutTimeout);
                  this.cashoutTimeout = setTimeout(() => {
                    // Устанавливаем финальное состояние с правильной анимацией
                    const finalState = t.bonusWin && t.symbol
                      ? t.collection.map((e, o) => {
                          const shouldAdd = ("Symbol1" === t.symbol && 2 === o) ||
                                          ("Symbol2" === t.symbol && 1 === o) ||
                                          ("Symbol3" === t.symbol && 0 === o);
                          
                          if (shouldAdd) {
                            // Показываем анимацию даже когда кольцо уже на MAX или на предпоследней линии или на предпоследней линии
                            if (t.symbol === "Symbol1") return e + 1;
                            if (t.symbol === "Symbol2") return e + 1;
                            if (t.symbol === "Symbol3") return e + 1;
                          }
                          return e;
                        })
                      : t.collection;
                    v.x.invoke("setStep", finalState);
                  }, 600);
                  return null;
                }
                const e =
                  t.bonusWin && t.symbol
                    ? t.collection.map((e, o) => {
                        // Проверяем, нужно ли добавлять +1 для анимации
                        const shouldAdd = ("Symbol1" === t.symbol && 2 === o) ||
                                        ("Symbol2" === t.symbol && 1 === o) ||
                                        ("Symbol3" === t.symbol && 0 === o);
                        
                        if (shouldAdd) {
                          // Показываем анимацию даже когда кольцо уже на MAX или на предпоследней линии
                          if (t.symbol === "Symbol1") return e + 1;
                          if (t.symbol === "Symbol2") return e + 1;
                          if (t.symbol === "Symbol3") return e + 1;
                        }
                        return e;
                      })
                    : t.collection;
                this.cashoutProcessing
                  ? (this.cashoutTimeout && clearTimeout(this.cashoutTimeout),
                    (this.cashoutTimeout = setTimeout(() => {
                      v.x.invoke("setStep", e);
                    }, 600)))
                  : v.x.invoke("setStep", e);
              }
            }),
            (this.setResult = (t) => {
              ("won" === t && this.root.trackingCommon.addWin(),
                (this.result = t));
            }),
            (this.setCoefficent = (t) => {
              this.coefficient = t;
            }),
            (this.setSuperBonusState = (t) => {
              this.superBonusState = t;
            }),
            (this.setMultiplier = (t) => {
              this.multiplier = t;
            }),
            (this.setPayout = (t) => {
              this.payout = t;
            }),
            (this.cashout = async (t = !1) => {
              if (!this.roundId) return;
              const {
                profile: { token: e, playerId: o },
              } = this.root.profileCommon;
              try {
                this.cashoutProcessing = !0;
                const { data: s } = await (0, i.zV)({
                  headers: { authorization: e, apikey: o },
                  partial: t,
                  roundId: this.roundId,
                  version: this.version,
                });
                (this.setGameState(s.state),
                  this.setResult(s.result),
                  this.setCoefficent(s.coefficient),
                  this.setPayout(s.payout),
                  this.setRoundId(s.roundId),
                  // Обновляем баланс из response.balance (уже обновлен в MSW)
                  !this.isFreebetEnabled && s?.balance && (() => {
                    const newBalance = Number(s.balance);
                    this.root.balanceCommon.setBalanceData([newBalance, this.prevRoundId, s.result || "won"]);
                    this.root.profileCommon.setBalance(newBalance);
                    window.__balance = newBalance;
                    window.dispatchEvent(new CustomEvent('balance:update', { detail: { balance: newBalance }}));
                    this.safeRefreshProfile();
                  })(),
                  (this.cashoutProcessing = !1),
                  this.showWinScreen(),
                  "won" === s.result &&
                    this.isFreebetEnabled &&
                    this.root.freebetsCommon.updateFreebetsPayout({
                      index: 0,
                      coefficient: s.coefficient,
                    }),
                  this.isFreebetEnabled &&
                    this.root.freebetsCommon.listRemoveByIndex(0),
                  (0, f.Z)({
                    action: "bet_closed",
                    parameters: {
                      id: this.roundId,
                      round_id: this.roundId,
                      method: this.placeBetIsHeld
                        ? "hold"
                        : this.root.autobetCommon.autoBetEnabled
                          ? "auto"
                          : "manual",
                      object: "won" === this.gameResult ? "cashout" : "lost",
                      value: this.amount,
                      currency: this.root.profileCommon.profile.currency,
                      wins: "won" === this.gameResult ? 1 : 0,
                      multiplier: this.coefficient,
                    },
                  }));
              } catch (t) {
                return (
                  console.log("fetchGame error:", t),
                  (this.cashoutProcessing = !1),
                  v.x.invoke("stopSpin", null, null, 2),
                  this.root.uiCommon.errorCodeResolver(t.response),
                  t
                );
              }
            }),
            (this.placeBet = async (t) => {
              const {
                profileCommon: {
                  profile: {
                    token: e,
                    subPartnerId: o,
                    currency: s,
                    balance: n,
                    apiKey: r,
                    splitTest: a,
                  },
                },
                uiCommon: { isMobile: l, setAlertList: h },
                freebetsCommon: {
                  freebetActive: c,
                  listRemoveByIndex: m,
                  freebetId: p,
                  updateFreebetsPayout: g,
                },
                quickModeCommon: { enabled: y },
              } = this.root;
              if (!this.placebetProcessing) {
                if (!this.roundId) throw new Error("no gameId");
                if (
                  ((this.olympusBonusResult = null),
                  this.isFreebetEnabled ||
                    null === n ||
                    !(n <= 0 || n < Number(this.amount)))
                )
                  try {
                    (this.setPlacebetProcessing(!0),
                      b.V.invoke("startSpinNew"),
                      v.x.invoke("startSpinNew"),
                      this.setPlacebetClicked(!0));
                    
                    // до запроса:
                    const amountNum = Number(this.amount);
                    const balNow = Number(this.root.profileCommon.profile.balance || 0);
                    const rollback = () => {
                      // вернуть если что-то пошло не так
                      const back = +(balNow).toFixed(2);
                      this.root.balanceCommon.setBalanceData([back, this.prevRoundId, 'rollback']);
                      this.root.profileCommon.setBalance(back);
                      window.__balance = back;
                      window.dispatchEvent(new CustomEvent('balance:update', { detail: { balance: back }}));
                    };

                    // мгновенно уменьшаем визуальный баланс
                    const afterBet = +(balNow - amountNum).toFixed(2);
                    this.root.balanceCommon.setBalanceData([afterBet, this.prevRoundId, 'place']);
                    this.root.profileCommon.setBalance(afterBet);
                    window.__balance = afterBet;
                    window.dispatchEvent(new CustomEvent('balance:update', { detail: { balance: afterBet }}));

                    try {
                      const { data: n } = await (0, i.T0)({
                        headers: (0, d.Z)({
                          authorization: e,
                          apikey: r,
                          subpartnerid: o,
                          metadata: JSON.stringify({
                            device: l ? "mobile" : "desktop",
                            manual: !0,
                          }),
                        }),
                        theme: this.gameServerTheme,
                        roundId: this.roundId,
                        clientSeed: this.clientSeed,
                        nonce: this.nonce,
                        currency: s,
                        amount: Number(this.amount),
                        ...(t && { symbol: t }),
                        ...(this.isFreebetEnabled && p && { freebetsId: p }),
                        ...(this.isFreebetEnabled && {
                          minCoefficient:
                            this.gameConfig.freebets?.minCoeffToCashout ?? 1.01,
                          freebetsLeft: c.left - 1,
                        }),
                        version: this.version,
                      }),
                      {
                        state: a,
                        result: u,
                        payout: h,
                        coefficient: C,
                        superBonusState: S,
                        autocashout: I,
                      } = n;
                    ((this.nonce = this.nonce + 1),
                      b.V.invoke(
                        "stopSpin",
                        a.symbol,
                        a.bonusWin,
                        y || this.skipAnimation ? 2 : 3
                      ),
                      v.x.invoke(
                        "stopSpin",
                        a.symbol,
                        a.bonusWin,
                        y || this.skipAnimation ? 2 : 3
                      ),
                      this.root.trackingCommon.startSession(this.roundId),
                      this.root.trackingCommon.addBet(
                        { amount: Number(this.amount), id: this.roundId },
                        !1
                      ),
                      this.isFreebetEnabled &&
                        this.root.freebetsCommon.listAdd({
                          index: 0,
                          freebet: this.isFreebetEnabled,
                        }),
                      0 == c?.left &&
                        !I &&
                        setTimeout(() => {
                          m(0);
                        }, this.gameConfig.game.duration * this.durationMultiplier),
                      (0, f.Z)({
                        action: "bet_placed",
                        sid: this.root.profileCommon.profile.sid,
                        parameters: {
                          value: this.amount,
                          currency: this.root.profileCommon.profile.currency,
                          method: this.placeBetIsHeld
                            ? "hold"
                            : this.root.autobetCommon.autoBetEnabled
                              ? "auto"
                              : "manual",
                          multiplier: this.coefficient,
                          object: "bet_1.place",
                          round_id: this.roundId,
                          id: this.roundId,
                        },
                      }));
                    let k = null;
                    (h && this.setPayout(h),
                      C && this.setCoefficent(C),
                      u && this.setResult(u),
                      I &&
                        (a.exCollection.find((t) => t > 0)
                          ? (setTimeout(
                              () => {
                                this.setGameState({ ...a, exCollection: null });
                              },
                              this.gameConfig.game.duration *
                                this.durationMultiplier -
                                1e3
                            ),
                            setTimeout(
                              () => {
                                (g({ index: 0, coefficient: n.coefficient }),
                                  m(0));
                              },
                              this.gameConfig.game.duration *
                                this.durationMultiplier +
                                1e3
                            ))
                          : (g({ index: 0, coefficient: n.coefficient }),
                            m(0))),
                      S
                        ? (setTimeout(() => {
                            (this.setSuperBonusState(S),
                              (0, f.Z)({
                                action: "bonus_game",
                                parameters: {
                                  id: this.roundId,
                                  round_id: this.roundId,
                                  state: "wheel",
                                  bonus_multiplier: S.multiplier,
                                  value: S?.multiplier * Number(this.amount),
                                  currency:
                                    this.root.profileCommon.profile.currency,
                                },
                              }),
                              (0, f.Z)({
                                action: "bet_closed",
                                parameters: {
                                  id: this.roundId,
                                  round_id: this.roundId,
                                  method: this.placeBetIsHeld
                                    ? "hold"
                                    : this.root.autobetCommon.autoBetEnabled
                                      ? "auto"
                                      : "manual",
                                  object: "cashout",
                                  value: this.amount,
                                  currency:
                                    this.root.profileCommon.profile.currency,
                                  wins: 1,
                                  multiplier: this.coefficient,
                                  bonus_multiplier: S.multiplier,
                                  state: "wheel",
                                },
                              }));
                          }, this.gameConfig.game.duration),
                          this.setGameState({
                            ...a,
                            collection: this.gameState.collection,
                          }),
                          (k = setTimeout(() => {
                            (this.setGameState({ ...a, bonusWin: 0 }),
                              this.setSuperBonusState(null),
                              this.setPlacebetProcessing(!1),
                              (k = null),
                              this.placeBetIsHeld && this.placeBet());
                          }, this.gameConfig.superBonusDuration)))
                        : this.setGameState(a),
                      // проверяем delta для предотвращения ложной анимации
                      Array.isArray(n.delta) && (() => {
                        const moved = n.delta.some(d => d !== 0);
                        if (!moved) {
                          console.log('[FRONTEND] Кольца не сдвигались (например, попадание в MAX), но показываем анимацию через exCollection');
                          // ничего не делаем: кольца не сдвигались, но анимация будет через exCollection
                        } else {
                          console.log('[FRONTEND] Кольца сдвинулись, можно запускать анимацию');
                          // обычная анимация шага
                        }
                      })(),
                      // Обновляем баланс из response.balance (уже обновлен в MSW)
                      !this.isFreebetEnabled && n?.balance && (() => {
                        const newBalance = Number(n.balance);
                        console.log('[FRONTEND] 💰 Обновляем баланс из ответа:', n.balance, '→', newBalance);
                        this.root.balanceCommon.setBalanceData([newBalance, this.prevRoundId, u || "won"]);
                        this.root.profileCommon.setBalance(newBalance);
                        window.__balance = newBalance;
                        window.dispatchEvent(new CustomEvent("balance:update", { detail: { balance: newBalance }}));
                        this.safeRefreshProfile();
                      })(),
                      a.bonusWin &&
                        !I &&
                        setTimeout(() => {
                          this.setGameState({ ...a, bonusWin: 0 });
                        }, this.gameConfig.game.duration * this.durationMultiplier),
                      n.roundId &&
                        ((this.prevRoundId = this.roundId),
                        this.setRoundId(n.roundId)),
                      this.betIndex++,
                      k ||
                        setTimeout(
                          () => {
                            (this.setPlacebetProcessing(!1),
                              this.placeBetIsHeld && this.placeBet());
                          },
                          this.gameConfig.game.duration *
                            this.durationMultiplier +
                            300
                        ),
                      this.setPlacebetClicked(!1));
                    } catch (err) {
                      rollback();
                      throw err;
                    }
                  } catch (t) {
                    return (
                      console.log(t),
                      this.setPlacebetProcessing(!1),
                      this.setPlacebetClicked(!1),
                      v.x.invoke("stopSpin", null, null, 2),
                      this.root.uiCommon.errorCodeResolver(t.response),
                      this.root.freebetsCommon.listRemoveByIndex(0),
                      this.retrieveGame(),
                      t
                    );
                  }
                else
                  h({ title: u().t("COMMON.PLACEBET.ERROR.3"), type: "error" });
              }
            }),
            (this.retrieveAmount = () => {
              const {
                  limit: { minBet: t, defaultBet: e },
                  profile: { currency: o },
                } = this.root.profileCommon,
                i = c.Z.get(`saved_amount:${o}`);
              i && !isNaN(Number(i))
                ? (this.amount = i)
                : (this.amount = String(e || 10 * t));
            }),
            (this.setAmount = (t) => {
              const {
                profile: { currency: e },
              } = this.root.profileCommon;
              (c.Z.set(`saved_amount:${e}`, String(t)),
                (this.amount = String(t)));
            }),
            (0, s.makeObservable)(this),
            (this.root = t),
            (this.spinVersion = "v2.0"),
            console.log({ spinVersion: this.spinVersion }),
            (this.centrifuge = new (a())((0, h.v)().centrifuge || "", {})),
            this.root.profileCommon.auth(e.gameServerId).then(async () => {
              this.root.trackingCommon.initGtmDataLayer();
              const { splitTest: t } = this.root.profileCommon.profile;
              ("vortex_abc_new_math" === t?.variantValue &&
                ("test" === t?.variantType && (this.version = "v2"),
                "test2" === t?.variantType && (this.version = "v3")),
                this.retrieveAmount(),
                await this.fetchSettings(),
                await this.retrieveGame(),
                (this.userLoading = !0));
            }),
            (this.symbolAliases = {
              Symbol3: "red",
              Symbol2: "green",
              Symbol1: "blue",
              SymbolNeutral: "neutral",
              SymbolLoss: "loss",
            }),
            (this.timers = []),
            (this.gameConfig = e),
            (this.gameServerId = e.gameServerId),
            (this.gameServerTheme = e.gameServerTheme),
            (this.userLoading = !1),
            (this.currentAmountId = e.defaultAmountId || 0),
            this.mockGame(),
            this.root.freebetsCommon.connectToFreebetCommon(
              () => [{ amount: this.amount }],
              (t, { amount: e }) => {
                this.gameState.initial && this.setAmount(Number(e));
              }
            ),
            (0, s.reaction)(
              () => this.currentAmountId,
              () => {
                this.setAmount(
                  this.amountsMap[this.currentAmountId] >
                    this.root.profileCommon.profile.balance
                    ? this.root.profileCommon.profile.balance
                    : this.amountsMap[this.currentAmountId]
                );
              }
            ),
            (0, s.reaction)(
              () => [this.root.balanceCommon.balanceTimestamp],
              () => {
                (this.autoCashoutTimeout &&
                  clearTimeout(this.autoCashoutTimeout),
                  this.gameState.superBonus ||
                    "ringsofolympus" !== this.gameServerTheme ||
                    (this.gameState.bonusWin
                      ? (this.autoCashoutTimeout = setTimeout(() => {
                          this.root.balanceCommon.updateBalanceFromTicketId(
                            this.prevRoundId
                          );
                        }, 3e3))
                      : this.root.balanceCommon.updateBalanceFromTicketId(
                          this.prevRoundId
                        )));
              }
            ),
            (0, s.reaction)(
              () => this.superBonusState,
              () => {
                this.superBonusState &&
                  "ringsofolympus" === this.gameServerTheme &&
                  (this.olympusBonusResult = {
                    superBonusState: this.superBonusState,
                    gameState: this.gameState,
                  });
              }
            ),
            (0, s.reaction)(
              () => this.root.quickModeCommon.enabled,
              () => {
                (b.V.trigger("QuickModeEnabled", {
                  quickMode: this.root.quickModeCommon.enabled,
                }),
                  v.x.trigger("QuickModeEnabled", {
                    quickMode: this.root.quickModeCommon.enabled,
                  }));
              }
            ),
            (0, s.reaction)(
              () => this.root.profileCommon?.limit?.minBet,
              () =>
                this.setAmountsMap(
                  this.root.profileCommon?.limit?.minBet,
                  this.root.profileCommon?.limit?.maxBet
                )
            ),
            (0, s.reaction)(
              () => [this.gameState.initial],
              () => {
                (this.gameState.initial &&
                !this.gameState.collection.find((t) => t > 0)
                  ? this.root.freebetsCommon.setForcedDisabledFreebets(null)
                  : this.gameState.initial ||
                    this.root.freebetsCommon.freebetEnabled ||
                    this.root.freebetsCommon.setForcedDisabledFreebets(!0),
                  this.root.freebetsCommon.setIsGameInProgress(
                    !this.gameState.initial
                  ),
                  this.root.freebetsCommon.freebetEnabled &&
                    this.root.freebetsCommon.setOnFreebetChange({
                      callback: this.interrupGame,
                      showConfirm: !0,
                      additionalText:
                        !this.gameState.initial &&
                        (0, l.t)("FREEBETS.LOSE_PROGRESS"),
                    }));
              }
            ),
            (0, s.reaction)(
              () => [this.root.freebetsCommon.freebetEnabled],
              () => {
                !this.root.freebetsCommon.freebetEnabled &&
                  this.gameState.collection.find((t) => t > 0) &&
                  this.interrupGame();
              }
            ),
            (0, s.reaction)(
              () => [this.gameState],
              () => {
                (this.updateCurrentCoefficient(),
                  this.updatePartialCoefficient());
              }
            ));
        }
        get winLevel() {
          if (!this.coefficient) return -1;
          let t = -1;
          for (let e = 0; e < this.winLevelList.length; e++)
            this.coefficient >= this.winLevelList[e] && (t = e);
          return t;
        }
        get currentPayout() {
          return (0, p.Z)(
            (0, m.Z)(Number(this.amount) * this.currentCoefficient) >
              this.root.profileCommon.limit.maxWin
              ? (0, m.Z)(
                  Number(this.amount) + this.root.profileCommon.limit.maxWin
                )
              : (0, m.Z)(Number(this.amount) * this.currentCoefficient),
            this.root.profileCommon.profile.rounding
          );
        }
        get partialPayout() {
          return (0, p.Z)(
            (0, m.Z)(Number(this.amount) * this.partialCoefficient) >
              this.root.profileCommon.limit.maxWin
              ? (0, m.Z)(
                  Number(this.amount) + this.root.profileCommon.limit.maxWin
                )
              : (0, m.Z)(Number(this.amount) * this.partialCoefficient),
            this.root.profileCommon.profile.rounding
          );
        }
        get resultUpdater() {
          return `${this.gameState.symbol}${this.betIndex}`;
        }
        get lockedUi() {
          return !this.gameState.initial;
        }
        get lockedButtons() {
          const {
            uiCommon: { isOnline: t },
            profileCommon: {
              profile: { token: e },
            },
          } = this.root;
          return !(e && this.roundId && t && this.gameStarted);
        }
        get durationMultiplier() {
          const { fast: t, normal: e } =
            this.gameConfig.animationSpeedMultiplier;
          return this.root.quickModeCommon.enabled || this.skipAnimation
            ? t
            : e;
        }
        get isFreebetEnabled() {
          const {
            freebetsCommon: { freebetEnabled: t, forcedDisabledFreebets: e },
          } = this.root;
          return t && !e;
        }
        // --- add: refresh profile from API or store method
        safeRefreshProfile = async () => {
          try {
            // 1) если в сторе есть готовый метод
            if (this.root?.profileCommon?.loadProfile) {
              await this.root.profileCommon.loadProfile();
              return;
            }
          } catch (e) {
            console.warn("[PROFILE] loadProfile() error:", e);
          }
          // 2) fallback: прямой запрос к API + ручное обновление стора
          try {
            const res = await fetch("/api/common/profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data && this.root?.profileCommon) {
              const pc = this.root.profileCommon;
              if (typeof pc.setProfile === "function") {
                pc.setProfile(data);
              } else if (pc.profile) {
                pc.profile = { ...pc.profile, ...data }; // обновим ссылку для перерендера
              }
            }
          } catch (e) {
            console.warn("[PROFILE] fetch /api/common/profile error:", e);
          }
        };
      }
      (g([s.observable], y.prototype, "version", void 0),
        g([s.observable], y.prototype, "messagesList", void 0),
        g([s.observable], y.prototype, "placeBetIsHeld", void 0),
        g([s.observable], y.prototype, "settings", void 0),
        g([s.observable], y.prototype, "settingsLoaded", void 0),
        g([s.observable], y.prototype, "placebetProcessing", void 0),
        g([s.observable], y.prototype, "placebetClicked", void 0),
        g([s.observable], y.prototype, "cashoutProcessing", void 0),
        g([s.observable], y.prototype, "roundId", void 0),
        g([s.observable], y.prototype, "prevRoundId", void 0),
        g([s.observable], y.prototype, "roundSeed", void 0),
        g([s.observable], y.prototype, "clientSeed", void 0),
        g([s.observable], y.prototype, "serverSeed", void 0),
        g([s.observable], y.prototype, "nonce", void 0),
        g([s.observable], y.prototype, "amount", void 0),
        g([s.observable], y.prototype, "gameResult", void 0),
        g([s.observable], y.prototype, "result", void 0),
        g([s.observable], y.prototype, "payout", void 0),
        g([s.observable], y.prototype, "coefficient", void 0),
        g([s.observable], y.prototype, "multiplier", void 0),
        g([s.observable], y.prototype, "showBonusGame", void 0),
        g([s.observable], y.prototype, "skipAnimation", void 0),
        g([s.observable], y.prototype, "gameState", void 0),
        g([s.observable], y.prototype, "olympusBonusResult", void 0),
        g([s.observable], y.prototype, "cashoutTimeout", void 0),
        g([s.observable], y.prototype, "autoCashoutTimeout", void 0),
        g([s.observable], y.prototype, "hold2pinTimeout", void 0),
        g([s.observable], y.prototype, "winScreen", void 0),
        g([s.observable], y.prototype, "winLevelList", void 0),
        g([s.observable], y.prototype, "splitTest", void 0),
        g([s.computed], y.prototype, "winLevel", null),
        g([s.observable], y.prototype, "superBonusState", void 0),
        g([s.observable], y.prototype, "gameStarted", void 0),
        g([s.observable], y.prototype, "betIndex", void 0),
        g([s.observable], y.prototype, "currentCoefficient", void 0),
        g([s.observable], y.prototype, "currentCoefficientTimeout", void 0),
        g([s.observable], y.prototype, "partialCoefficient", void 0),
        g([s.observable], y.prototype, "partialCoefficientTimeout", void 0),
        g([s.observable], y.prototype, "currentAmountId", void 0),
        g([s.observable], y.prototype, "amountsMap", void 0),
        g([s.computed], y.prototype, "currentPayout", null),
        g([s.computed], y.prototype, "partialPayout", null),
        g([s.computed], y.prototype, "resultUpdater", null),
        g([s.computed], y.prototype, "lockedUi", null),
        g([s.computed], y.prototype, "lockedButtons", null),
        g([s.computed], y.prototype, "durationMultiplier", null),
        g([s.computed], y.prototype, "isFreebetEnabled", null),
        g([s.action], y.prototype, "setPlacebetProcessing", void 0),
        g([s.action], y.prototype, "setPlacebetClicked", void 0),
        g([s.action], y.prototype, "setSkipAnimation", void 0),
        g([s.action], y.prototype, "setCurrentAmountId", void 0),
        g([s.action], y.prototype, "setAmountsMap", void 0),
        g([s.action], y.prototype, "setMessagesList", void 0),
        g([s.action], y.prototype, "updateMessagesList", void 0),
        g([s.action], y.prototype, "setPlaceBetIsHeld", void 0),
        g([s.action], y.prototype, "setShowBonusGame", void 0),
        g([s.action], y.prototype, "setCurrentCoefficient", void 0),
        g([s.action], y.prototype, "updateCurrentCoefficient", void 0),
        g([s.action], y.prototype, "setPartialCoefficient", void 0),
        g([s.action], y.prototype, "updatePartialCoefficient", void 0),
        g([s.action], y.prototype, "setWinScreen", void 0),
        g([s.action], y.prototype, "showWinScreen", void 0),
        g([s.action], y.prototype, "fetchSettings", void 0),
        g([s.action], y.prototype, "setRoundId", void 0),
        g([s.action], y.prototype, "interrupGame", void 0),
        g([s.action], y.prototype, "createGame", void 0),
        g([s.action], y.prototype, "retrieveGame", void 0),
        g([s.action], y.prototype, "mockGame", void 0),
        g([s.action], y.prototype, "setGameState", void 0),
        g([s.action], y.prototype, "setResult", void 0),
        g([s.action], y.prototype, "setCoefficent", void 0),
        g([s.action], y.prototype, "setSuperBonusState", void 0),
        g([s.action], y.prototype, "setMultiplier", void 0),
        g([s.action], y.prototype, "setPayout", void 0),
        g([s.action], y.prototype, "cashout", void 0),
        g([s.action], y.prototype, "placeBet", void 0),
        g([s.action], y.prototype, "retrieveAmount", void 0),
        g([s.action], y.prototype, "setAmount", void 0),
        g([s.action], y.prototype, "safeRefreshProfile", void 0),
        (e.default = y));
    },
  },
]);
