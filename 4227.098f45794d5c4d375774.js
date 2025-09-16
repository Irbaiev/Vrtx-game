"use strict";
(self.webpackChunkfederation_modules =
  self.webpackChunkfederation_modules || []).push([
  [4227],
  {
    6872: (e, t, n) => {
      n.d(t, { b: () => m, _: () => d });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(2734),
        o = n(8661),
        r = n(4977),
        c = n(286);
      const d = (0, l.createContext)({}),
        m = Object.assign(
          (0, r.observer)(function ({
            children: e,
            time: t = 3e3,
            delayOpen: n = 0,
            delayClose: l = 0,
          }) {
            const {
                uiCommon: {
                  alertList: r,
                  removeFirstItemAlertList: m,
                  postMessage: u,
                  setAlertList: Z,
                },
              } = (0, a.GET_STORE)(),
              { t: h } = (0, c.useTranslation)(),
              [f, g] = (0, s.useState)(),
              v = document.getElementById("modal");
            return (
              (0, s.useEffect)(() => {
                "setAlertList" === u?.data?.type && Z(u.data?.data);
              }, [u]),
              (0, s.useEffect)(() => {
                if (0 === r.length && f?.sticky)
                  return (
                    g({ ...f, sticky: !1, open: !1, close: !0 }),
                    void setTimeout(() => {
                      (f?.callback && f.callback(),
                        g(void 0),
                        v.classList.remove("layout-alert"));
                    }, l)
                  );
                if (f) return;
                if (0 === r.length) return;
                const e = r.filter((e) => e.sticky);
                if (e.length > 0) {
                  const t = {
                    ...e[0],
                    title: h(e[0].title || ""),
                    text: h(e[0].text || ""),
                    open: !1,
                    close: !1,
                  };
                  return (
                    g(t),
                    void setTimeout(() => {
                      (g({ ...t, open: !0 }), v.classList.add("layout-alert"));
                    }, n)
                  );
                }
                const i = r[0],
                  a = {
                    ...i,
                    title: h(i?.title || ""),
                    text: h(i?.text || ""),
                    open: !1,
                    close: !1,
                  },
                  s = i?.duration || t;
                (g(a),
                  setTimeout(() => {
                    (g({ ...a, open: !0 }), v.classList.add("layout-alert"));
                  }, n),
                  setTimeout(() => {
                    (g({ ...a, open: !1, close: !0 }),
                      v.classList.remove("layout-alert"));
                  }, s + n),
                  setTimeout(
                    () => {
                      (a?.callback && a.callback(),
                        m(),
                        g(void 0),
                        v.classList.remove("layout-alert"));
                    },
                    s + n + l
                  ));
              }, [r, f]),
              (0, o.createPortal)(
                (0, i.tZ)(d.Provider, {
                  value: { message: f },
                  children: (0, i.tZ)(i.HY, { children: e }),
                }),
                v
              )
            );
          }),
          {
            Message: function ({ children: e }) {
              const { message: t } = (0, s.useContext)(d);
              return t ? (0, i.tZ)(i.HY, { children: e(t) }) : null;
            },
          }
        );
    },
    7884: (e, t, n) => {
      n.d(t, { $: () => s });
      var i = n(6584),
        a = n(286),
        l = n(5160);
      const s = Object.assign(
        function ({ children: e }) {
          const { t } = (0, a.useTranslation)();
          return (0, i.tZ)(i.HY, {
            children: e({
              title: t("Exit Game"),
              titleYes: t("COMMON.YES"),
              titleNo: t("COMMON.NO"),
              description: t("Exit the game and go back to the home screen"),
            }),
          });
        },
        {
          Exit: function ({ children: e, onClick: t = () => {} }) {
            const { t: n } = (0, a.useTranslation)(),
              s = new URLSearchParams(window.location.search),
              o = s.get("returnUrl") || s.get("iframeReturnUrl"),
              r = () => {
                if (
                  (t(),
                  o &&
                    (function (e) {
                      try {
                        return (new URL(e), !0);
                      } catch (e) {
                        return !1;
                      }
                    })(o))
                ) {
                  const e = document.createElement("a");
                  return (
                    (e.href = o),
                    s.get("returnUrl") && (e.target = "_top"),
                    document.body.appendChild(e),
                    void e.click()
                  );
                }
                window.history.back();
              };
            return o && "hidden" === o
              ? null
              : (0, i.tZ)(i.HY, {
                  children: (0, l.toChildArray)(
                    e({ title: n("Exit Game") })
                  ).map((e) => (0, l.cloneElement)(e, { onClick: r })),
                });
          },
        }
      );
    },
    2642: (e, t, n) => {
      n.d(t, { p: () => p });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(4977),
        o = n(2734),
        r = n(286);
      const c = (0, s.observer)(function ({
          children: e,
          index: t,
          onClick: n = () => {},
        }) {
          const {
              uiCommon: { setModal: s },
              freebetsCommon: {
                updateFreebetsData: o,
                freebetsActive: r,
                forcedDisabledFreebets: c,
                onFreebetChange: d,
              },
            } = (0, a.GET_STORE)(),
            m = () => {
              const e = r[t]?.id;
              e &&
                (d?.showConfirm
                  ? s({
                      modalName: "freebetsChangeConfirm",
                      render: !0,
                      delayOpen: 0,
                      delayClose: 200,
                      data: d.additionalText,
                      callbackOnSubmit: () => {
                        (d.callback(), o({ enabled: !0, id: e, time: void 0 }));
                      },
                    })
                  : o({ enabled: !0, id: e, time: void 0 }),
                n());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(e({ disabled: c })).map((e) =>
              (0, l.cloneElement)(e, { onClick: m })
            ),
          });
        }),
        d = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          style: o,
        }) {
          const {
              freebetsCommon: { freebetActive: c },
              uiCommon: { setModal: d },
            } = (0, a.GET_STORE)(),
            { t: m } = (0, r.useTranslation)();
          if (!c) return null;
          const u = () => {
            (d({
              modalName: "freebets",
              render: !0,
              delayOpen: n,
              delayClose: s,
            }),
              t());
          };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({
                title: "FREE BETS",
                left: c?.left,
                description: m("FREEBETS.NOTIF"),
              })
            ).map((e) => (0, l.cloneElement)(e, { onClick: u, style: o })),
          });
        }),
        m = (0, s.observer)(function ({
          children: e,
          confirmation: t = !0,
          delayOpen: n,
          delayClose: l,
        }) {
          const {
              uiCommon: { setModal: s },
              freebetsCommon: {
                freebetsData: c,
                updateFreebetsData: d,
                freebetsActive: m,
                forcedDisabledFreebets: u,
                isGameInProgress: Z,
              },
            } = (0, a.GET_STORE)(),
            [h, f] = (0, o.useState)(!1),
            { t: g } = (0, r.useTranslation)();
          return m.length
            ? (0, i.tZ)(i.HY, {
                children: e({
                  title: g("FREEBETS.REAL_MONEY"),
                  tooltipText: g("FREEBETS.FINISH_ROUND"),
                  titleConfirmation: g("FREEBETS.CANCEL"),
                  titleLoseProgress: Z ? g("FREEBETS.LOSE_PROGRESS") : null,
                  titleConfirmationYes: g("COMMON.YES"),
                  titleConfirmationNo: g("COMMON.NO"),
                  defaultValue: !u && c.enabled,
                  onChange: (e) => {
                    if (u) return null;
                    !t || e
                      ? d(
                          t || e
                            ? { enabled: !0, id: m[0]?.id, time: void 0 }
                            : {
                                enabled: !1,
                                id: void 0,
                                time: Date.now() + 864e5,
                              }
                        )
                      : s({
                          modalName: "freebetsConfirmation",
                          render: !0,
                          delayOpen: n,
                          delayClose: l,
                          callbackOnSubmit: () => {
                            d({
                              enabled: !1,
                              id: void 0,
                              time: Date.now() + 864e5,
                            });
                          },
                        });
                  },
                  onMouseEnter: () => u && f(!0),
                  onMouseLeave: () => f(!1),
                  disabled: u,
                  showTooltip: h,
                }),
              })
            : null;
        });
      var u = n(2464);
      const Z = (0, s.observer)(function ({ children: e }) {
          const {
              freebetsCommon: { freebetCompleted: t },
              profileCommon: {
                profile: { currencySign: n, rounding: l },
              },
            } = (0, a.GET_STORE)(),
            { t: s } = (0, r.useTranslation)();
          return t && t?.payout[0]?.payout
            ? (0, i.tZ)(i.HY, {
                children: e({
                  titleCongratulations: s("COMMON.CONGRATULATIONS"),
                  titlePayout: s("FREEBETS.TOTAL_GAIN"),
                  titleTotal: s("FREEBETS.PLAYED"),
                  total: t?.total - t?.left || 0,
                  currency: n,
                  payout: (0, u.Z)(t?.payout[0]?.payout || 0, l),
                }),
              })
            : null;
        }),
        h = (0, s.observer)(function ({ children: e }) {
          const {
            profileCommon: {
              profile: { freebetsVerified: t },
            },
            freebetsCommon: { freebetActive: n },
          } = (0, a.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({ isActive: t, hasActiveFreebets: Boolean(n) }),
          });
        });
      var f = n(5301);
      function g(e, t, n) {
        return e.reduce(
          (e, i) => (
            i.currency === t
              ? (e += i.payout)
              : (e += (0, f.Z)(n, i.currency, t, i.payout)),
            e
          ),
          0
        );
      }
      const v = (0, l.createContext)({}),
        p = Object.assign(
          (0, s.observer)(function ({ children: e }) {
            const {
                profileCommon: {
                  rates: t,
                  profile: { currencySign: n, currency: l, rounding: s },
                },
                freebetsCommon: {
                  loading: c,
                  freebets: d,
                  freebetsData: m,
                  freebetsActive: Z,
                  freebetsArchived: h,
                  updateFreebetsArchiveEndTime: f,
                },
              } = (0, a.GET_STORE)(),
              { t: p } = (0, r.useTranslation)(),
              [C, N] = (0, o.useState)([]),
              [y, b] = (0, o.useState)([]);
            return (
              (0, o.useEffect)(() => {
                const e = (e) => ({
                    title: p("FREE BETS"),
                    titleAmount: p("COMMON.BET_AMOUNT"),
                    titlePayout: p("FREEBETS.TOTAL_GAIN"),
                    titleArchived: p("COMMON.ARCHIVE"),
                    titleExpires: p("COMMON.EXPIRES_IN"),
                    isActive: e.id === (m.id || 0),
                    isFinished: e.archived,
                    currency: n,
                    amount: (0, u.Z)(e.offer.configuration[0].betAmount, s),
                    payout: (0, u.Z)(g(e.payout, l, t), s),
                    timer: {
                      countdownDate: e.offer.endAt,
                      step: 1e3,
                      callback: () => {
                        f(e.id);
                      },
                    },
                    total: e.total,
                    left: e.left,
                    leftAndTotal: (() => {
                      let t = `${e.left}/${e.total}`;
                      return (
                        e.archived && 0 === e.left && (t = `${e.total}`),
                        e.archived && e.left === e.total && (t = `${e.total}`),
                        t
                      );
                    })(),
                  }),
                  i = Z.map(e),
                  a = h.map(e);
                (N(i), b(a));
              }, [d, m]),
              (0, i.tZ)(v.Provider, {
                value: { listActive: C, listArchived: y },
                children: e({
                  title: p("FREE BETS"),
                  titleNotFound: p("There is nothing here yet"),
                  titleFreebetsFinished: p("COMMON.ARCHIVE"),
                  notFound: 0 === d.length,
                  loading: c,
                  listActive: C,
                  listArchived: y,
                  activeTotal: C.length > 0 ? C.length : null,
                }),
              })
            );
          }),
          { Status: h, Label: d, Enabled: m, Item: c, Completed: Z }
        );
    },
    7974: (e, t, n) => {
      n.d(t, { Y: () => l });
      var i = n(6584),
        a = n(286);
      const l = function ({ children: e }) {
        const { t } = (0, a.useTranslation)();
        return (0, i.tZ)(i.HY, {
          children: e({
            title: t("COMMON.GAME_DISABLED.TITLE"),
            titleRefresh: t("COMMON.REFRESH"),
            titleBack: t("Back"),
            description: t("COMMON.GAME_DISABLED.TEXT"),
          }),
        });
      };
    },
    5740: (e, t, n) => {
      n.d(t, { _: () => d, f: () => m });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(4977),
        o = n(2734),
        r = n(286),
        c = n(5103);
      const d = (0, l.createContext)({}),
        m = Object.assign(
          (0, s.observer)(function ({
            children: e,
            min: t = 3,
            max: n = 32,
            readonly: l = !1,
            isFocus: s = !1,
          }) {
            const {
                profileCommon: {
                  profile: { name: m },
                },
              } = (0, a.GET_STORE)(),
              { t: u } = (0, r.useTranslation)(),
              [Z] = (0, o.useState)((0, c.v4)()),
              [h, f] = (0, o.useState)(m || "vortex"),
              [g, v] = (0, o.useState)(m || "vortex"),
              [p, C] = (0, o.useState)(!1),
              [N, y] = (0, o.useState)(!1);
            ((0, o.useEffect)(() => {
              f(m || "vortex");
            }, [m]),
              (0, o.useEffect)(() => {
                // Валидатор удален - разрешаем любой ввод
                (m !== b() ? y(!0) : y(!1), v(""));
              }, [h]));
            const b = () => Array.isArray(h) ? h.slice(0, n) : h;
            return (0, i.tZ)(d.Provider, {
              value: {
                setValue: f,
                setFocus: C,
                setSave: y,
                getValue: b,
                save: N,
                readonly: l,
                isFocus: s,
                id: Z,
              },
              children: (0, i.tZ)(i.HY, {
                children: e({
                  title: u("Nickname"),
                  error: g,
                  focus: p,
                  save: N,
                  value: b(),
                }),
              }),
            });
          }),
          {
            Input: function ({
              children: e,
              onChange: t = () => {},
              onClick: n = () => {},
              onFocus: a = () => {},
              onBlur: s = () => {},
            }) {
              const {
                  setValue: r,
                  setFocus: c,
                  readonly: m,
                  getValue: u,
                  isFocus: Z,
                  id: h,
                } = (0, o.useContext)(d),
                f = (0, o.useRef)(),
                g = (e) => {
                  (c(!0), a());
                },
                v = (e) => {
                  (c(!1), s());
                },
                p = (e) => {
                  (e.target instanceof HTMLInputElement && r(e.target.value),
                    t());
                };
              return (
                (0, o.useEffect)(() => {
                  (Z && f.current && (f.current.click(), f.current.focus()),
                    !Z && f.current && f.current.blur());
                }, [Z]),
                (0, i.tZ)(i.HY, {
                  children: (0, l.toChildArray)(e).map((e) =>
                    (0, l.cloneElement)(e, {
                      onClick: n,
                      onFocus: g,
                      onChange: p,
                      onBlur: v,
                      readonly: m,
                      value: u(),
                      id: h,
                      ref: (e) => {
                        e instanceof HTMLElement && (f.current = e);
                      },
                    })
                  ),
                })
              );
            },
            Label: function ({ children: e }) {
              const { id: t } = (0, o.useContext)(d);
              return (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(e).map((e) =>
                  (0, l.cloneElement)(e, { for: t })
                ),
              });
            },
            Save: function ({ children: e, onClick: t = () => {} }) {
              const {
                  profileCommon: { setPlayerName: n },
                } = (0, a.GET_STORE)(),
                {
                  save: s,
                  setSave: r,
                  getValue: c,
                  readonly: m,
                } = (0, o.useContext)(d),
                u = async () => {
                  if (!m)
                    try {
                      (await n(c()), r(!1));
                    } catch (e) {
                      console.log(e);
                    } finally {
                      t();
                    }
                };
              return (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(e).map((e) =>
                  (0, l.cloneElement)(e, { onClick: u })
                ),
              });
            },
          }
        );
    },
    2092: (e, t, n) => {
      n.d(t, { _: () => u, O: () => Z });
      var i = n(6584),
        a = n(5160),
        l = n(2734),
        s = n(5103);
      const o = (0, a.createContext)({});
      var r = n(3922),
        c = n(4977);
      const d = (0, c.observer)(function ({
          children: e,
          min: t = 0,
          max: n = 1,
          step: a = 0.1,
          onChange: l = () => {},
        }) {
          const {
            audioCommon: {
              allMuted: s,
              musicMuted: o,
              musicVolume: c,
              setMusicVolume: d,
              setMusicMuted: m,
            },
          } = (0, r.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({
              min: t,
              max: n,
              step: a,
              onChange: (e) => {
                (e > 0 && m(!1), d(e), l(e));
              },
              defaultValue: s || o ? 0 : c,
              disabled: 0 === c || o,
            }),
          });
        }),
        m = (0, c.observer)(function ({
          children: e,
          min: t = 0,
          max: n = 1,
          step: a = 0.1,
          onChange: l = () => {},
        }) {
          const {
            audioCommon: {
              allMuted: s,
              soundMuted: o,
              soundVolume: c,
              setSoundVolume: d,
              setSoundMuted: m,
            },
          } = (0, r.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({
              min: t,
              max: n,
              step: a,
              onChange: (e) => {
                (e > 0 && m(!1), d(e), l(e));
              },
              defaultValue: s || o ? 0 : c,
              disabled: 0 === c || o,
            }),
          });
        }),
        u = (0, a.createContext)({}),
        Z = Object.assign(
          function ({
            children: e,
            defaultValue: t = 0,
            min: n = 0,
            max: r = 100,
            step: c = 1,
            stepButton: d = 0.1,
            minStatic: m,
            maxStatic: Z,
            onChange: h = () => {},
            onBlur: f = () => {},
            vertical: g = !1,
          }) {
            const [v] = (0, l.useState)((0, s.v4)()),
              { setButtons: p } = (0, l.useContext)(o),
              [C, N] = (0, l.useState)({ width: 30, height: 30 }),
              [y, b] = (0, l.useState)({ width: 0, height: 0 }),
              M = (0, l.useRef)(null),
              O = { position: "relative", display: "flex" };
            ((0, l.useEffect)(() => {
              "function" == typeof p &&
                p({
                  min: n,
                  max: r,
                  minStatic: m,
                  maxStatic: Z,
                  stepButton: d,
                  value: t,
                  onChange: h,
                });
            }, [t, n, r, m, Z, d, h]),
              (0, l.useEffect)(
                () => (
                  E(),
                  window.addEventListener("resize", E),
                  () => {
                    window.removeEventListener("resize", E);
                  }
                ),
                []
              ));
            const E = () => {
                b(T(document.getElementById(v)));
              },
              T = (e) => {
                var t = getComputedStyle(e);
                let n = e.clientWidth,
                  i = e.clientHeight;
                return (
                  (i -= parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)),
                  (n -= parseFloat(t.paddingLeft) + parseFloat(t.paddingRight)),
                  { height: i, width: n }
                );
              };
            return (0, i.tZ)(u.Provider, {
              value: {
                value: t,
                min: n,
                max: r,
                step: c,
                minStatic: m,
                maxStatic: Z,
                onChangeContext: h,
                onBlurContext: f,
                rangeSize: y,
                setCenterSize: N,
                centerSize: C,
                vertical: g,
              },
              children: (0, i.tZ)(i.HY, {
                children: (0, a.toChildArray)(e).map((e) =>
                  (0, a.cloneElement)(e, {
                    id: v,
                    style: O,
                    ref: (e) => {
                      e instanceof HTMLElement && (M.current = e);
                    },
                  })
                ),
              }),
            });
          },
          {
            Input: function ({
              children: e,
              onChange: t = () => {},
              onClick: n = () => {},
              onFocus: o = () => {},
              onBlur: r = () => {},
            }) {
              const [c] = (0, l.useState)("a" + (0, s.v4)()),
                {
                  value: d,
                  onChangeContext: m,
                  onBlurContext: Z,
                  min: h,
                  max: f,
                  step: g,
                  minStatic: v,
                  maxStatic: p,
                  centerSize: C,
                  vertical: N,
                  rangeSize: y,
                } = (0, l.useContext)(u),
                b = (e) => {
                  n(e);
                },
                M = (e) => {
                  o(e);
                },
                O = (e) => {
                  if (e.target instanceof HTMLInputElement) {
                    let t = Number(e.target.value);
                    ("number" == typeof v &&
                      t <= v &&
                      ((t = v), (e.target.value = String(v))),
                      "number" == typeof p &&
                        t >= p &&
                        ((t = p), (e.target.value = String(p))),
                      Z(Number(t)),
                      r(e));
                  }
                },
                E = (e) => {
                  if (e.target instanceof HTMLInputElement) {
                    let n = Number(e.target.value),
                      i = !0;
                    ("number" == typeof v &&
                      n <= v &&
                      ((n = v), (e.target.value = String(v)), (i = !1)),
                      "number" == typeof p &&
                        n >= p &&
                        ((n = p), (e.target.value = String(p)), (i = !1)),
                      m(Number(n)),
                      i && t(e));
                  }
                },
                T = {
                  webkitAppearance: "none",
                  appearance: "none",
                  position: "absolute",
                  width: `${y.width}px`,
                  height: `${y.height}px`,
                  opacity: 0,
                  cursor: "pointer",
                  overflow: "hidden",
                  ...(N && {
                    transform: "rotate(-90deg)",
                    width: `${y.height}px`,
                    height: `${y.width}px`,
                  }),
                };
              return (0, i.BX)(i.HY, {
                children: [
                  (0, i.tZ)("style", {
                    children: `#${c}::-webkit-slider-thumb {\n                    -webkit-appearance: none;\n                    height: 1000px;\n                    width: ${N ? C.height : C.width}px;\n                    background: red;\n                }\n                #${c}::-moz-range-thumb {\n                    height: 1000px;\n                    width: ${N ? C.height : C.width}px;\n                    background: red;\n                }\n                #${c}::-ms-thumb {\n                    height: 1000px;\n                    width: ${N ? C.height : C.width}px;\n                    background: red;\n                }\n                #${c} {\n                    background: yellow;\n                }`,
                  }),
                  (0, a.toChildArray)(e).map((e) =>
                    (0, a.cloneElement)(e, {
                      onClick: b,
                      onFocus: M,
                      onChange: E,
                      onBlur: O,
                      min: h,
                      max: f,
                      step: g,
                      value: d,
                      style: T,
                      type: "range",
                      id: c,
                    })
                  ),
                ],
              });
            },
            Left: function ({ children: e }) {
              const {
                  value: t,
                  max: n,
                  min: s,
                  vertical: o,
                } = (0, l.useContext)(u),
                r = `${Math.min(100, ((t - s) / (n - s)) * 100)}%`,
                c = {
                  pointerEvents: "none",
                  ...(o ? { height: r } : { width: r }),
                };
              return (0, i.tZ)(i.HY, {
                children: (0, a.toChildArray)(e).map((e) =>
                  (0, a.cloneElement)(e, { style: c })
                ),
              });
            },
            Center: function ({ children: e }) {
              const { setCenterSize: t } = (0, l.useContext)(u),
                n = (0, l.useRef)(),
                s = { pointerEvents: "none" };
              return (
                (0, l.useEffect)(() => {
                  if (n.current) {
                    const e = () => {
                      n.current &&
                        t({
                          width: n.current.offsetWidth,
                          height: n.current.offsetHeight,
                        });
                    };
                    return (
                      e(),
                      window.addEventListener("resize", e),
                      () => {
                        window.removeEventListener("resize", e);
                      }
                    );
                  }
                }, [n.current]),
                (0, i.tZ)(i.HY, {
                  children: (0, a.toChildArray)(e).map((e) =>
                    (0, a.cloneElement)(e, {
                      style: s,
                      ref: (e) => {
                        e instanceof HTMLElement && (n.current = e);
                      },
                    })
                  ),
                })
              );
            },
            Right: function ({ children: e }) {
              const {
                  value: t,
                  max: n,
                  min: s,
                  vertical: o,
                } = (0, l.useContext)(u),
                r = `${Math.min(100, 100 - ((t - s) / (n - s)) * 100)}%`,
                c = {
                  pointerEvents: "none",
                  ...(o ? { height: r } : { width: r }),
                };
              return (0, i.tZ)(i.HY, {
                children: (0, a.toChildArray)(e).map((e) =>
                  (0, a.cloneElement)(e, { style: c })
                ),
              });
            },
            Buttons: Object.assign(
              function ({ children: e }) {
                const [t, n] = (0, l.useState)({});
                return (0, i.tZ)(o.Provider, {
                  value: { buttons: t, setButtons: n },
                  children: (0, i.tZ)(i.HY, { children: e }),
                });
              },
              {
                Minus: function ({ children: e, onClick: t = () => {} }) {
                  const { buttons: n } = (0, l.useContext)(o),
                    {
                      min: s,
                      minStatic: r,
                      stepButton: c,
                      value: d,
                      onChange: m,
                    } = n,
                    u = (e) => {
                      let n = d - c;
                      ("number" == typeof r && n <= r && (n = r),
                        n >= s && m(n),
                        t(e));
                    };
                  return (0, i.tZ)(i.HY, {
                    children: (0, a.toChildArray)(
                      e({ disabled: "number" == typeof r ? d <= r : d <= s })
                    ).map((e) => (0, a.cloneElement)(e, { onClick: u })),
                  });
                },
                Plus: function ({ children: e, onClick: t = () => {} }) {
                  const { buttons: n } = (0, l.useContext)(o),
                    {
                      max: s,
                      maxStatic: r,
                      stepButton: c,
                      value: d,
                      onChange: m,
                    } = n,
                    u = (e) => {
                      let n = d + c;
                      ("number" == typeof r && n >= r && (n = r),
                        n <= s && m(n),
                        t(e));
                    };
                  return (0, i.tZ)(i.HY, {
                    children: (0, a.toChildArray)(
                      e({ disabled: "number" == typeof r ? d >= r : d >= s })
                    ).map((e) => (0, a.cloneElement)(e, { onClick: u })),
                  });
                },
              }
            ),
            Music: d,
            Sound: m,
          }
        );
    },
    417: (e, t, n) => {
      n.d(t, { D: () => l });
      var i = n(6584),
        a = n(5160);
      const l = function ({
        children: e,
        defaultValue: t = !1,
        onChange: n = () => {},
        onClick: l = () => {},
        onMouseEnter: s = () => {},
        onMouseLeave: o = () => {},
      }) {
        const r = () => {
          (n(!t), l(!t));
        };
        return (0, i.tZ)(i.HY, {
          children: (0, a.toChildArray)(e({ value: t })).map((e) =>
            (0, a.cloneElement)(e, {
              onClick: r,
              onMouseEnter: s,
              onMouseLeave: o,
            })
          ),
        });
      };
    },
    8257: (e, t, n) => {
      n.d(t, { c: () => o });
      var i = n(6584),
        a = n(3922),
        l = n(4977),
        s = n(286);
      const o = (0, l.observer)(function ({ children: e }) {
        const {
            profileCommon: {
              limit: { minBet: t, maxBet: n, maxWin: l },
              profile: { currencySign: o },
            },
          } = (0, a.GET_STORE)(),
          { t: r } = (0, s.useTranslation)();
        return (0, i.tZ)(i.HY, {
          children: e({
            title: r("Limits"),
            min: { name: r("Min bet"), value: o + " " + t },
            max: { name: r("Max bet"), value: o + " " + n },
            win: { name: r("Max profit"), value: o + " " + l },
          }),
        });
      });
    },
    4227: (e, t, n) => {
      n.d(t, { _: () => h, Q: () => f });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(2734),
        o = n(4977),
        r = n(286),
        c = n(4474),
        d = n(4195),
        m = n(2464),
        u = n(8596),
        Z = n(8513);
      const h = (0, l.createContext)({}),
        f = Object.assign(
          (0, o.observer)(function ({
            children: e,
            columns: t = ["updatedAt", "amount", "coefficient", "payout"],
            limit: n = 10,
            offset: o = 0,
          }) {
            const {
              profileCommon: {
                language: d,
                profile: { token: f, apiKey: g, currencySign: v, rounding: p },
              },
              uiCommon: { errorCodeResolver: C },
              game: { gameServerId: N, mybets: y },
            } = (0, a.GET_STORE)();
            if (!f || !g) return null;
            const { t: b } = (0, r.useTranslation)(),
              [M, O] = (0, s.useState)([]),
              [E, T] = (0, s.useState)([]),
              [B, I] = (0, s.useState)([]),
              [S, A] = (0, s.useState)([]),
              [x, H] = (0, s.useState)(!1),
              R = {
                updatedAt: b("COMMON.TIME"),
                amount: b("COMMON.BET_AMOUNT"),
                coefficient: b("COMMON.MULTIPLIER"),
                payout: b("COMMON.PAYOUT"),
                prefixAmount: b("COMMON.BET_AMOUNT"),
                prefixCoefficient: b("COMMON.MULTIPLIER"),
                prefixPayout: b("COMMON.PAYOUT"),
                amountSufix: b("COMMON.BET_AMOUNT"),
                coefficientSufix: b("COMMON.MULTIPLIER"),
                payoutSufix: b("COMMON.PAYOUT"),
              },
              { config: k } = (0, s.useContext)(Z._);
            return (
              (0, s.useEffect)(() => {
                (async () => {
                  try {
                    const { data: e } = await (0, c.tN)({
                      headers: { authorization: f, apiKey: g },
                      gameId: N,
                      limit: n,
                      offset: o,
                    });
                    (I(e), A(e), H(!0));
                  } catch (e) {
                    (console.log("getMyBetsError", e), C(e));
                  }
                })();
              }, []),
              (0, s.useEffect)(() => {
                if (!x && !y) return;
                const e = [...y, ...B].slice(0, n);
                A(e);
              }, [y, n]),
              (0, s.useEffect)(() => {
                let e = [],
                  n = [];
                for (let i = 0; i < S.length; i++) {
                  const a = S[i];
                  a.freebets && n.push(i);
                  const l = {},
                    s =
                      a.payoutCoefficient || 0 === a.payoutCoefficient
                        ? a.payoutCoefficient
                        : a.coefficient;
                  for (let e of t)
                    ("updatedAt" === e &&
                      (l.updatedAt = new Intl.DateTimeFormat(
                        d ? d.slice(0, 2) : "en",
                        { hour: "numeric", minute: "numeric" }
                      ).format(new Date(a.updatedAt))),
                      "amount" === e &&
                        (l.amount = a.freebets
                          ? "FREE BET"
                          : (0, m.Z)(a.amount, p)),
                      "payout" === e &&
                        (l.payout = k?.module?.moduleSetting
                          ?.truncateDecimalsMybetsPayout
                          ? (0, u.Z)(a.payout, p)
                          : (0, m.Z)(a.payout, p)),
                      "coefficient" === e &&
                        (l.coefficient = s ? s.toFixed(2) : "-"),
                      "prefixAmount" === e &&
                        (l.prefixAmount = a.freebets
                          ? "FREE BET"
                          : `${v} ${(0, m.Z)(a.amount, p)}`),
                      "prefixPayout" === e &&
                        (l.prefixPayout = `${v} ${(0, m.Z)(a.payout, p)}`),
                      "prefixCoefficient" === e &&
                        (l.prefixCoefficient = s ? "x" + s.toFixed(2) : "-"),
                      "amountSufix" === e &&
                        (l.amountSufix = a.freebets
                          ? "FREE BET"
                          : `${(0, m.Z)(a.amount, p)} ${v}`),
                      "payoutSufix" === e &&
                        (l.payoutSufix = `${(0, m.Z)(a.payout, p)} ${v}`),
                      "coefficientSufix" === e &&
                        (l.coefficientSufix = s ? s.toFixed(2) + "x" : "-"));
                  e.push(l);
                }
                (O(e.map((e) => t.map((t) => e[t]))), T(n));
              }, [S]),
              (0, i.tZ)(h.Provider, {
                value: { data: S },
                children: (0, i.tZ)(i.HY, {
                  children: (0, l.toChildArray)(
                    e({
                      title: b("My bets"),
                      bets: M,
                      betsFreebet: E,
                      columns: t.map((e) => R[e]),
                      loading: x,
                      data: S,
                    })
                  ).map((e) => (0, l.cloneElement)(e)),
                }),
              })
            );
          }),
          { Info: d.E }
        );
    },
    4195: (e, t, n) => {
      n.d(t, { E: () => c });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(2734),
        o = n(4977),
        r = n(4227);
      const c = (0, o.observer)(function ({
        children: e,
        index: t,
        onClick: n = () => {},
        delayOpen: o,
        delayClose: c,
      }) {
        const { data: d } = (0, s.useContext)(r._),
          {
            uiCommon: { setBetInfoGameId: m, setBetInfoId: u, setModal: Z },
          } = (0, a.GET_STORE)(),
          h = (e) => {
            (m(d[t].gameId),
              u(d[t].id),
              Z({
                modalName: "mybetsInfo",
                render: !0,
                delayOpen: o,
                delayClose: c,
              }),
              n(e));
          };
        return (0, i.tZ)(i.HY, {
          children: (0, l.toChildArray)(e).map((e) =>
            (0, l.cloneElement)(e, { onClick: h })
          ),
        });
      });
    },
    5695: (e, t, n) => {
      n.d(t, { _: () => c, i: () => d });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(2734),
        o = n(4977),
        r = n(286);
      const c = (0, l.createContext)({}),
        d = Object.assign(
          (0, o.observer)(function ({ children: e, defaultHeight: t }) {
            const {
                profileCommon: { language: n, fetchRules: o },
              } = (0, a.GET_STORE)(),
              [d, m] = (0, s.useState)(""),
              [u, Z] = (0, s.useState)(""),
              [h, f] = (0, s.useState)([]),
              [g, v] = (0, s.useState)((0, i.tZ)("div", {})),
              [p, C] = (0, s.useState)(!1);
            (0, s.useEffect)(() => {
              (async () => {
                const e = await o();
                try {
                  const { rules: t, rulesShort: n } = e;
                  (m(
                    t
                      .replaceAll(
                        "<blockquote>",
                        '<div class="block" data-rules-item ><div class="block-inner">'
                      )
                      .replaceAll("</blockquote>", "</div></div>")
                  ),
                    Z(n));
                } catch (e) {
                  console.log("Error convert html or htmlShort");
                }
                try {
                  const { rules: t, rulesShort: n } = e,
                    i = [];
                  (new DOMParser()
                    .parseFromString(t, "text/html")
                    .querySelectorAll("blockquote")
                    .forEach((e) => {
                      const t = e.querySelector("h2");
                      i.push({
                        title: t.textContent,
                        content: (0, l.createElement)("div", {
                          dangerouslySetInnerHTML: { __html: e.innerHTML },
                        }),
                      });
                    }),
                    f(i),
                    v(
                      (0, l.createElement)("div", {
                        dangerouslySetInnerHTML: { __html: n },
                      })
                    ));
                } catch (e) {
                  console.log("Error convert rules to list", e);
                }
                C(!0);
              })();
            }, [n]);
            const { t: N } = (0, r.useTranslation)();
            return (
              (0, s.useEffect)(() => {
                d &&
                  setTimeout(() => {
                    ((e) => {
                      const t = document.getElementById("rules-modal");
                      t &&
                        t.querySelectorAll("h2").forEach((t) => {
                          t.addEventListener(
                            "click",
                            () =>
                              ((e, t) => {
                                const n = e.parentElement?.parentElement,
                                  i = e?.parentElement;
                                n &&
                                  i &&
                                  (n.classList.contains("_open")
                                    ? (n.classList.remove("_open"),
                                      (n.style.maxHeight =
                                        (t ?? 40) / 16 + "rem"))
                                    : (document
                                        .querySelectorAll("[data-rules-item]")
                                        .forEach((e) => {
                                          (e.classList.remove("_open"),
                                            (e.style.maxHeight =
                                              (t ?? 40) / 16 + "rem"));
                                        }),
                                      n.classList.add("_open"),
                                      (n.style.maxHeight = `${i.clientHeight}px`)));
                              })(t, e),
                            !1
                          );
                          const n = t.parentElement?.parentElement;
                          n && (n.style.maxHeight = (e ?? 40) / 16 + "rem");
                        });
                    })(t);
                  }, 0);
              }, [d]),
              (0, i.tZ)(c.Provider, {
                value: { html: d, htmlShort: u },
                children: e({
                  title: N("Rules"),
                  short: g,
                  list: h,
                  loading: p,
                }),
              })
            );
          }),
          {
            RenderShort: function ({ children: e }) {
              const { htmlShort: t } = (0, s.useContext)(c);
              return (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(e).map((e) =>
                  (0, l.cloneElement)(e, {
                    dangerouslySetInnerHTML: { __html: t },
                  })
                ),
              });
            },
            Render: function ({ children: e }) {
              const { html: t } = (0, s.useContext)(c);
              return (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(e).map((e) =>
                  (0, l.cloneElement)(e, {
                    dangerouslySetInnerHTML: { __html: t },
                  })
                ),
              });
            },
          }
        );
    },
    707: (e, t, n) => {
      n.d(t, { p: () => T });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(4977),
        o = n(2734);
      const r = (0, s.observer)(function ({
        children: e,
        onClick: t = () => {},
      }) {
        const {
            uiCommon: { setModal: n },
          } = (0, a.GET_STORE)(),
          s = () => {
            (n({ modalName: "setting", render: !1 }), t());
          };
        return (0, i.tZ)(i.HY, {
          children: (0, l.toChildArray)(e).map((e) =>
            (0, l.cloneElement)(e, { onClick: s })
          ),
        });
      });
      var c = n(286);
      const d = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              uiCommon: { setModal: r },
            } = (0, a.GET_STORE)(),
            { t: d } = (0, c.useTranslation)(),
            m = () => {
              (r({
                modalName: "limits",
                render: !0,
                delayOpen: n,
                delayClose: s,
              }),
                o &&
                  r({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(e({ title: d("Limits") })).map(
              (e) => (0, l.cloneElement)(e, { onClick: m })
            ),
          });
        }),
        m = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
          modalName: r = "mybets",
        }) {
          const {
              uiCommon: { setModal: d },
            } = (0, a.GET_STORE)(),
            { t: m } = (0, c.useTranslation)(),
            u = () => {
              (d({ modalName: r, render: !0, delayOpen: n, delayClose: s }),
                o &&
                  d({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: m("COMMON.MY_BETS") })
            ).map((e) => (0, l.cloneElement)(e, { onClick: u })),
          });
        }),
        u = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              uiCommon: { setModal: r },
            } = (0, a.GET_STORE)(),
            { t: d } = (0, c.useTranslation)(),
            m = () => {
              (r({
                modalName: "rules",
                render: !0,
                delayOpen: n,
                delayClose: s,
              }),
                o &&
                  r({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(e({ title: d("COMMON.RULES") })).map(
              (e) => (0, l.cloneElement)(e, { onClick: m })
            ),
          });
        }),
        Z = (0, s.observer)(function ({ children: e, onClick: t = () => {} }) {
          const {
              audioCommon: { musicMuted: n, setMusicMuted: s },
            } = (0, a.GET_STORE)(),
            { t: o } = (0, c.useTranslation)(),
            r = () => {
              (s(!n), t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(e({ title: o("Music") })).map(
              (e) => (0, l.cloneElement)(e, { onClick: r })
            ),
          });
        }),
        h = (0, s.observer)(function ({ children: e, onClick: t = () => {} }) {
          const {
              audioCommon: { soundMuted: n, setSoundMuted: s },
            } = (0, a.GET_STORE)(),
            { t: o } = (0, c.useTranslation)(),
            r = () => {
              (s(!n), t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(e({ title: o("Sound") })).map(
              (e) => (0, l.cloneElement)(e, { onClick: r })
            ),
          });
        }),
        f = (0, s.observer)(function ({ children: e }) {
          const { t } = (0, c.useTranslation)();
          return (0, i.tZ)(i.HY, {
            children: e({ title: t("COMMON.SETTINGS") }),
          });
        }),
        g = (0, s.observer)(function ({ children: e }) {
          const {
            uiCommon: { modal: t, setModal: n },
          } = (0, a.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({
              show: t.setting?.render,
              onClose: () => {
                n({
                  modalName: "setting",
                  render: !1,
                  delayOpen: 0,
                  delayClose: 0,
                });
              },
            }),
          });
        }),
        v = (0, s.observer)(function ({ children: e, onClick: t }) {
          const {
              uiCommon: { noAnimation: n, setNoAnimation: s },
            } = (0, a.GET_STORE)(),
            o = () => {
              (s(!n), t && t());
            },
            { t: r } = (0, c.useTranslation)();
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: r("CRASH.ANIMATION") })
            ).map((e) => (0, l.cloneElement)(e, { onClick: o })),
          });
        }),
        p = (0, s.observer)(({ children: e }) => {
          const {
            uiCommon: { noAnimation: t, setNoAnimation: n },
          } = (0, a.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({ defaultValue: t, onChange: n }),
          });
        }),
        C = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              uiCommon: { setModal: r },
            } = (0, a.GET_STORE)(),
            { t: d } = (0, c.useTranslation)(),
            m = new URLSearchParams(window.location.search),
            u = m.get("returnUrl") || m.get("iframeReturnUrl"),
            Z = () => {
              (r({
                modalName: "exitGame",
                render: !0,
                delayOpen: n,
                delayClose: s,
              }),
                o &&
                  r({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return u && "hidden" === u
            ? null
            : (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(
                  e({ title: d("COMMON.EXITGAME") })
                ).map((e) => (0, l.cloneElement)(e, { onClick: Z })),
              });
        }),
        N = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              tournamentsCommon: { tournaments: r, setActiveTournamentId: d },
              uiCommon: { setModal: m },
            } = (0, a.GET_STORE)(),
            { t: u } = (0, c.useTranslation)(),
            Z = () => {
              (1 === r.length &&
                (d(r[0].id),
                m({
                  modalName: "tournamentsInfo",
                  render: !0,
                  delayOpen: n,
                  delayClose: s,
                })),
                r.length > 1 &&
                  m({
                    modalName: "tournamentsList",
                    render: !0,
                    delayOpen: n,
                    delayClose: s,
                  }),
                o &&
                  m({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return r.length
            ? (0, i.tZ)(i.HY, {
                children: (0, l.toChildArray)(
                  e({ title: u("COMMON.TOURNAMENTS") })
                ).map((e) => (0, l.cloneElement)(e, { onClick: Z })),
              })
            : null;
        }),
        y = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              profileCommon: {
                profile: { freebetsVerified: r },
              },
              uiCommon: { setModal: d },
              freebetsCommon: { freebetsActive: m },
            } = (0, a.GET_STORE)(),
            { t: u } = (0, c.useTranslation)(),
            Z = () => {
              (d({
                modalName: "freebets",
                render: !0,
                delayOpen: n,
                delayClose: s,
              }),
                o &&
                  d({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: u("FREE BETS"), count: m.length })
            ).map((e) => (0, l.cloneElement)(e, { onClick: Z })),
          });
        }),
        b = (0, s.observer)(function ({ children: e, onClick: t = () => {} }) {
          const {
              quickModeCommon: { enabled: n, setEnabled: s },
            } = (0, a.GET_STORE)(),
            o = () => {
              (s(!n), t());
            },
            { t: r } = (0, c.useTranslation)();
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: r("Quick Play") })
            ).map((e) => (0, l.cloneElement)(e, { onClick: o })),
          });
        }),
        M = (0, s.observer)(function ({ children: e }) {
          const {
            quickModeCommon: { enabled: t, setEnabled: n },
          } = (0, a.GET_STORE)();
          return (0, i.tZ)(i.HY, {
            children: e({ defaultValue: t, onChange: n }),
          });
        }),
        O = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              uiCommon: { setModal: r },
            } = (0, a.GET_STORE)(),
            { t: d } = (0, c.useTranslation)(),
            m = () => {};
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: d("Turbo Universe") })
            ).map((e) => (0, l.cloneElement)(e, { onClick: m })),
          });
        }),
        E = (0, s.observer)(function ({
          children: e,
          onClick: t = () => {},
          delayOpen: n,
          delayClose: s,
          closeSettings: o = !0,
        }) {
          const {
              uiCommon: { setModal: r },
            } = (0, a.GET_STORE)(),
            { t: d } = (0, c.useTranslation)(),
            m = () => {
              (r({
                modalName: "guide",
                render: !0,
                delayOpen: n,
                delayClose: s,
              }),
                o &&
                  r({
                    modalName: "setting",
                    render: !1,
                    delayOpen: 0,
                    delayClose: 0,
                  }),
                t());
            };
          return (0, i.tZ)(i.HY, {
            children: (0, l.toChildArray)(
              e({ title: d("COMMON.HOW_TO_PLAY") })
            ).map((e) => (0, l.cloneElement)(e, { onClick: m })),
          });
        }),
        T = Object.assign(
          (0, s.observer)(function ({ children: e }) {
            const {
                uiCommon: { modal: t, setModal: n },
              } = (0, a.GET_STORE)(),
              s = (0, o.useRef)(),
              r = (e) => {
                s.current instanceof HTMLElement &&
                  e.target instanceof HTMLElement &&
                  !s.current.contains(e.target) &&
                  n({ modalName: "setting", render: !1 });
              };
            return (
              (0, o.useEffect)(
                () => (
                  document.addEventListener("click", r),
                  () => document.removeEventListener("click", r)
                ),
                []
              ),
              t?.setting?.render
                ? (0, i.tZ)(i.HY, {
                    children: (0, l.toChildArray)(e).map((e) =>
                      (0, l.cloneElement)(e, {
                        ref: (e) => {
                          e instanceof HTMLElement && (s.current = e);
                        },
                      })
                    ),
                  })
                : null
            );
          }),
          {
            Button: Object.assign(
              function ({ children: e, onClick: t = () => {} }) {
                return (0, i.tZ)(i.HY, {
                  children: (0, l.toChildArray)(e).map((e) =>
                    (0, l.cloneElement)(e, { onClick: t })
                  ),
                });
              },
              {
                Close: r,
                Limit: d,
                Guide: E,
                MyBets: m,
                Rule: u,
                Sound: h,
                Music: Z,
                Animation: Object.assign(v, { Toggle: p }),
                ExitGame: C,
                Tournaments: N,
                Freebets: y,
                QuickMode: Object.assign(b, { Toggle: M }),
                Universe: O,
              }
            ),
            Title: f,
            Modal: g,
          }
        );
    },
    8879: (e, t, n) => {
      n.d(t, { q: () => l });
      var i = n(6584),
        a = n(2734);
      const l = function ({ children: e, step: t = 1e3 }) {
        const [n, l] = (0, a.useState)({
          years: "",
          months: "",
          days: "",
          hours: "",
          minutes: "",
          seconds: "",
        });
        return (
          (0, a.useEffect)(() => {
            const e = setInterval(() => {
              const e = new Date(),
                t = {};
              ((t.days = e.getDate().toString().padStart(2, "0")),
                (t.years = e.getFullYear().toString()));
              const n = e.getMonth();
              ((t.months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][n]),
                (t.hours = e.getHours().toString().padStart(2, "0")),
                (t.minutes = e.getMinutes().toString().padStart(2, "0")),
                (t.seconds = e.getSeconds().toString().padStart(2, "0")),
                l(t));
            }, t);
            return () => clearInterval(e);
          }, []),
          (0, i.tZ)(i.HY, { children: e(n) })
        );
      };
    },
    8513: (e, t, n) => {
      n.d(t, { _: () => le, e: () => se });
      var i = n(6584),
        a = n(3922),
        l = n(5160),
        s = n(7101),
        o = n.n(s),
        r = n(4977),
        c = n(2734),
        d = n(7477),
        m = n(7387),
        u = n(286),
        Z = n(9758),
        h = n(5740),
        f = n(707),
        g = n(2092),
        v = n(417),
        p = n(8879);
      const C = (0, r.observer)(function () {
          const { config: e } = (0, c.useContext)(le);
          let t = "";
          return (
            e.module &&
              e.module.moduleLayout &&
              (t = e.module.moduleLayout.find((e) => "GameName" === e.id)
                ?.setting?.text),
            (0, i.BX)("div", {
              className: d.Z.tmpFooter,
              children: [
                (0, i.BX)("div", { children: ["Turbo Games •", t] }), // Games • 
                (0, i.tZ)(p.q, {
                  children: ({
                    years: e,
                    months: t,
                    days: n,
                    hours: a,
                    minutes: l,
                    seconds: s,
                  }) =>
                    (0, i.tZ)("div", {
                      children: `${n} ${t}, ${e} | ${a}:${l}:${s}`,
                    }),
                }),
              ],
            })
          );
        }),
        N = (0, r.observer)(function ({ page: e, setPage: t }) {
          const { t: n } = (0, u.useTranslation)(),
            { settings: l } = (0, c.useContext)(le),
            {
              tournamentsCommon: { tournaments: s },
              profileCommon: {
                version: r,
                settings: { options: p },
              },
            } = (0, a.GET_STORE)();
          return (0, i.BX)("div", {
            className: o()(d.Z.tmpInner, d.Z.tmpInnerBg),
            children: [
              (0, i.tZ)("div", {
                className: d.Z.tmpHeader,
                children: (0, i.BX)("div", {
                  className: d.Z.settingHeader,
                  children: [
                    l.timer &&
                      (0, i.BX)("div", {
                        className: d.Z.settingHeaderTimer,
                        children: [
                          (0, i.BX)("span", {
                            className: d.Z.settingHeaderTimerTitle,
                            children: [n("Play Time"), ":"],
                          }),
                          (0, i.tZ)(Z.B, {
                            step: 1e3,
                            useInitDate: !0,
                            children: ({ hours: e, minutes: t, seconds: n }) =>
                              (0, i.BX)(i.HY, {
                                children: [
                                  (0, i.tZ)("span", { children: e }),
                                  (0, i.tZ)("span", { children: ":" }),
                                  (0, i.tZ)("span", { children: t }),
                                  (0, i.tZ)("span", { children: ":" }),
                                  (0, i.tZ)("span", { children: n }),
                                ],
                              }),
                          }),
                        ],
                      }),
                    l.version &&
                      (0, i.BX)("div", {
                        className: d.Z.settingHeaderVersion,
                        children: [
                          n("RNG Version"),
                          ": “",
                          r.rng,
                          "”",
                          (0, i.tZ)("br", {}),
                          n("Game version"),
                          ": “",
                          r.game,
                          "”",
                        ],
                      }),
                    (0, i.tZ)(m.u.Close.All, {
                      children: (0, i.tZ)("div", {
                        className: d.Z.settingHeaderClose,
                        children: (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-close",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)("div", {
                className: d.Z.tmpContent,
                children: (0, i.BX)("div", {
                  className: d.Z.settingContent,
                  children: [
                    (0, i.tZ)("div", {
                      className: d.Z.settingContentTop,
                      children: (0, i.BX)("div", {
                        className: d.Z.box,
                        children: [
                          l.username &&
                            (0, i.tZ)(h.f, {
                              min: 3,
                              max: 32,
                              readonly: !!l.usernameReadonly,
                              isFocus: !1,
                              children: ({
                                title: e,
                                error: t,
                                focus: n,
                                save: a,
                                value: l,
                              }) =>
                                (0, i.BX)("div", {
                                  className: o()(d.Z.settingName, {
                                    [d.Z.settingNameError]: t,
                                  }),
                                  children: [
                                    (0, i.BX)("div", {
                                      className: d.Z.settingNameContent,
                                      children: [
                                        (0, i.BX)("div", {
                                          className: d.Z.settingNameHeader,
                                          children: [
                                            (0, i.tZ)("div", {
                                              className: d.Z.settingNameTitle,
                                              children: t || e,
                                            }),
                                            (a || l.length < 3) &&
                                              (0, i.BX)("div", {
                                                className: d.Z.settingNameCount,
                                                children: [l.length, "/32"],
                                              }),
                                          ],
                                        }),
                                        (0, i.tZ)(h.f.Label, {
                                          children: (0, i.tZ)("label", {
                                            className: d.Z.settingNameLabel,
                                          }),
                                        }),
                                        (0, i.tZ)(h.f.Input, {
                                          children: (0, i.tZ)("input", {
                                            className: d.Z.settingNameInput,
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, i.tZ)(h.f.Save, {
                                      children: (0, i.BX)("div", {
                                        className: o()(d.Z.settingNameButton, {
                                          [d.Z.settingNameButtonActive]: a,
                                        }),
                                        children: [
                                          !a &&
                                            (0, i.tZ)("i", {
                                              class:
                                                "fm-iconFont fm-iconFont-ios-edit",
                                            }),
                                          a &&
                                            (0, i.tZ)("i", {
                                              class:
                                                "fm-iconFont fm-iconFont-ios-checkmark",
                                            }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                            }),
                          (0, i.BX)("div", {
                            className: d.Z.boxAudio,
                            children: [
                              l.sound &&
                                (0, i.BX)("div", {
                                  className: d.Z.settingAudio,
                                  children: [
                                    (0, i.tZ)(f.p.Button.Sound, {
                                      children: ({ title: e }) =>
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingAudioTitle,
                                          children: e,
                                        }),
                                    }),
                                    (0, i.BX)("div", {
                                      className: d.Z.settingAudioContent,
                                      children: [
                                        (0, i.tZ)(f.p.Button.Sound, {
                                          children: () =>
                                            (0, i.tZ)("div", {
                                              className: d.Z.settingAudioIcon,
                                              children: (0, i.tZ)("i", {
                                                class:
                                                  "fm-iconFont fm-iconFont-ios-music-off",
                                              }),
                                            }),
                                        }),
                                        (0, i.tZ)(g.O.Sound, {
                                          children: ({ disabled: e, ...t }) =>
                                            (0, i.tZ)(g.O, {
                                              ...t,
                                              children: (0, i.BX)("div", {
                                                className:
                                                  d.Z.settingAudioRange,
                                                children: [
                                                  (0, i.tZ)(g.O.Input, {
                                                    children: (0, i.tZ)(
                                                      "input",
                                                      {}
                                                    ),
                                                  }),
                                                  (0, i.tZ)(g.O.Left, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioLeft,
                                                    }),
                                                  }),
                                                  (0, i.tZ)(g.O.Center, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioCenter,
                                                    }),
                                                  }),
                                                  (0, i.tZ)(g.O.Right, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioRight,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            }),
                                        }),
                                        (0, i.tZ)(f.p.Button.Sound, {
                                          children: () =>
                                            (0, i.tZ)("div", {
                                              className: d.Z.settingAudioIcon,
                                              children: (0, i.tZ)("i", {
                                                class:
                                                  "fm-iconFont fm-iconFont-ios-music-on",
                                              }),
                                            }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              l.music &&
                                (0, i.BX)("div", {
                                  className: d.Z.settingAudio,
                                  children: [
                                    (0, i.tZ)(f.p.Button.Music, {
                                      children: ({ title: e }) =>
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingAudioTitle,
                                          children: e,
                                        }),
                                    }),
                                    (0, i.BX)("div", {
                                      className: d.Z.settingAudioContent,
                                      children: [
                                        (0, i.tZ)(f.p.Button.Music, {
                                          children: () =>
                                            (0, i.tZ)("div", {
                                              className: d.Z.settingAudioIcon,
                                              children: (0, i.tZ)("i", {
                                                class:
                                                  "fm-iconFont fm-iconFont-ios-music-off",
                                              }),
                                            }),
                                        }),
                                        (0, i.tZ)(g.O.Music, {
                                          children: ({ disabled: e, ...t }) =>
                                            (0, i.tZ)(g.O, {
                                              ...t,
                                              children: (0, i.BX)("div", {
                                                className:
                                                  d.Z.settingAudioRange,
                                                children: [
                                                  (0, i.tZ)(g.O.Input, {
                                                    children: (0, i.tZ)(
                                                      "input",
                                                      {}
                                                    ),
                                                  }),
                                                  (0, i.tZ)(g.O.Left, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioLeft,
                                                    }),
                                                  }),
                                                  (0, i.tZ)(g.O.Center, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioCenter,
                                                    }),
                                                  }),
                                                  (0, i.tZ)(g.O.Right, {
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.settingAudioRight,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            }),
                                        }),
                                        (0, i.tZ)(f.p.Button.Music, {
                                          children: () =>
                                            (0, i.tZ)("div", {
                                              className: d.Z.settingAudioIcon,
                                              children: (0, i.tZ)("i", {
                                                class:
                                                  "fm-iconFont fm-iconFont-ios-music-on",
                                              }),
                                            }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                            ],
                          }),
                          l.quickMode &&
                            (0, i.BX)("div", {
                              className: d.Z.toggle,
                              children: [
                                (0, i.tZ)(f.p.Button.QuickMode, {
                                  children: ({ title: e }) =>
                                    (0, i.tZ)("div", {
                                      className: d.Z.toggleTitle,
                                      children: e,
                                    }),
                                }),
                                (0, i.tZ)(f.p.Button.QuickMode.Toggle, {
                                  children: (e) =>
                                    (0, i.tZ)(v.D, {
                                      ...e,
                                      children: ({ value: e }) =>
                                        (0, i.tZ)("div", {
                                          className: o()(d.Z.toggleToggle, {
                                            [d.Z.toggleToggleActive]: e,
                                          }),
                                        }),
                                    }),
                                }),
                              ],
                            }),
                          l.animation &&
                            (0, i.BX)("div", {
                              className: d.Z.toggle,
                              children: [
                                (0, i.tZ)(f.p.Button.Animation, {
                                  children: ({ title: e }) =>
                                    (0, i.tZ)("div", {
                                      className: d.Z.toggleTitle,
                                      children: e,
                                    }),
                                }),
                                (0, i.tZ)(f.p.Button.Animation.Toggle, {
                                  children: (e) =>
                                    (0, i.tZ)(v.D, {
                                      ...e,
                                      children: ({ value: e }) =>
                                        (0, i.tZ)("div", {
                                          "data-track":
                                            "settings.toggle_animation",
                                          className: o()(d.Z.toggleToggle, {
                                            [d.Z.toggleToggleActive]: !e,
                                          }),
                                        }),
                                    }),
                                }),
                              ],
                            }),
                        ],
                      }),
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.settingContentBottom,
                      children: (0, i.BX)("div", {
                        className: d.Z.settingAside,
                        children: [
                          l.bigTimer &&
                            (0, i.BX)("div", {
                              className: d.Z.settingTimer,
                              children: [
                                (0, i.tZ)("div", {
                                  className: d.Z.settingTimerHeader,
                                  children: "Time in game:",
                                }),
                                (0, i.tZ)("div", {
                                  className: d.Z.settingTimerContent,
                                  children: (0, i.tZ)(Z.B, {
                                    step: 1e3,
                                    useInitDate: !0,
                                    children: ({
                                      hours: e,
                                      minutes: t,
                                      seconds: n,
                                    }) =>
                                      (0, i.BX)(i.HY, {
                                        children: [
                                          (0, i.BX)("div", {
                                            className: d.Z.settingTimerItem,
                                            children: [
                                              (0, i.tZ)("span", {
                                                children: e,
                                              }),
                                              "h",
                                            ],
                                          }),
                                          (0, i.BX)("div", {
                                            className: d.Z.settingTimerItem,
                                            children: [
                                              (0, i.tZ)("span", {
                                                children: t,
                                              }),
                                              "m",
                                            ],
                                          }),
                                          (0, i.BX)("div", {
                                            className: d.Z.settingTimerItem,
                                            children: [
                                              (0, i.tZ)("span", {
                                                children: n,
                                              }),
                                              "s",
                                            ],
                                          }),
                                        ],
                                      }),
                                  }),
                                }),
                              ],
                            }),
                          (0, i.BX)("div", {
                            className: d.Z.settingList,
                            children: [
                              l.turbouniverse &&
                                !1 !== p?.displayUniverse &&
                                (0, i.tZ)(f.p.Button.Universe, {
                                  closeSettings: !1,
                                  
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      className: o()(
                                        d.Z.settingListItem,
                                        d.Z.settingListItemUppercase
                                      ),
                                      "data-track": "settings.turbouniverse",
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            d.Z.settingListItemUniverseIcon,
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.freebets &&
                                (0, i.tZ)(f.p.Button.Freebets, {
                                  closeSettings: !1,
                                  onClick: () => {
                                    t("freebets");
                                  },
                                  children: ({ title: e, count: t }) =>
                                    (0, i.BX)("div", {
                                      className: o()(
                                        d.Z.settingListItem,
                                        d.Z.settingListItemUppercase,
                                        d.Z.settingListItemWobbleBottom
                                      ),
                                      "data-track": "settings.free_bets",
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-box",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.tournaments &&
                                (0, i.tZ)(f.p.Button.Tournaments, {
                                  closeSettings: !1,
                                  onClick: () => {
                                    s.length > 1 && t("tournaments");
                                  },
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      className: o()(
                                        d.Z.settingListItem,
                                        d.Z.settingListItemUppercase
                                      ),
                                      "data-track": "settings.tournaments",
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-cup",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.guide &&
                                (0, i.tZ)(f.p.Button.Guide, {
                                  closeSettings: !1,
                                  onClick: () => {
                                    t("guide");
                                  },
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      "data-track": "settings.guide",
                                      className: d.Z.settingListItem,
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-how-to-play",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              (l.mybets || l.mybetsHistory) &&
                                (0, i.tZ)(f.p.Button.MyBets, {
                                  modalName: l.mybetsHistory
                                    ? "mybetsHistory"
                                    : "mybets",
                                  closeSettings: !1,
                                  onClick: () => {
                                    t(
                                      l.mybetsHistory
                                        ? "mybetsHistory"
                                        : "mybets"
                                    );
                                  },
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      "data-track": "settings.my_bets",
                                      className: d.Z.settingListItem,
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-list",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.limit &&
                                (0, i.tZ)(f.p.Button.Limit, {
                                  closeSettings: !1,
                                  onClick: () => {
                                    t("limit");
                                  },
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      "data-track": "settings.limits",
                                      className: d.Z.settingListItem,
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-limit",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.rules &&
                                (0, i.tZ)(f.p.Button.Rule, {
                                  closeSettings: !1,
                                  onClick: () => {
                                    t("rules");
                                  },
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      "data-track": "settings.rules",
                                      className: d.Z.settingListItem,
                                      children: [
                                        (0, i.tZ)("div", {
                                          className: d.Z.settingListHover,
                                        }),
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-rules",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                              l.fair &&
                                (0, i.BX)("div", {
                                  className: d.Z.settingListItem,
                                  children: [
                                    (0, i.tZ)("div", {
                                      className: d.Z.settingListHover,
                                    }),
                                    (0, i.tZ)("i", {
                                      class:
                                        "fm-iconFont fm-iconFont-ios-check",
                                    }),
                                    (0, i.tZ)("span", {
                                      children: "Provably fair",
                                    }),
                                  ],
                                }),
                              l.exit &&
                                (0, i.tZ)(f.p.Button.ExitGame, {
                                  closeSettings: !1,
                                  delayOpen: 0,
                                  delayClose: 200,
                                  children: ({ title: e }) =>
                                    (0, i.BX)("div", {
                                      "data-track": "settings.exit",
                                      className: o()(
                                        d.Z.settingListItem,
                                        d.Z.settingListItemExit
                                      ),
                                      children: [
                                        (0, i.tZ)("i", {
                                          class:
                                            "fm-iconFont fm-iconFont-ios-home",
                                        }),
                                        (0, i.tZ)("span", { children: e }),
                                      ],
                                    }),
                                }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)(C, {}),
            ],
          });
        });
      var y = n(8257);
      const b = function ({ page: e, setPage: t }) {
        const { t: n } = (0, u.useTranslation)();
        return (0, i.tZ)(y.c, {
          children: ({ title: e, min: a, max: l, win: s }) =>
            (0, i.BX)("div", {
              className: o()(d.Z.tmpInner, d.Z.tmpInnerBg1),
              children: [
                (0, i.tZ)("div", {
                  className: d.Z.tmpHeader,
                  children: (0, i.BX)("div", {
                    className: d.Z.settingHeaderModal,
                    children: [
                      (0, i.BX)("div", {
                        className: d.Z.settingHeaderModalBack,
                        onClick: () => {
                          t("");
                        },
                        children: [
                          (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-back",
                          }),
                          (0, i.tZ)("span", { children: n("Back") }),
                        ],
                      }),
                      (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalTitle,
                        children: e,
                      }),
                      (0, i.tZ)(m.u.Close.All, {
                        children: (0, i.tZ)("div", {
                          className: d.Z.settingHeaderModalClose,
                          children: (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-close",
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                (0, i.tZ)("div", {
                  className: d.Z.tmpContent,
                  children: (0, i.tZ)("div", {
                    className: d.Z.limit,
                    children: (0, i.BX)("div", {
                      className: d.Z.limitList,
                      children: [
                        (0, i.tZ)("div", {
                          className: d.Z.box,
                          children: (0, i.BX)("div", {
                            className: d.Z.limitItem,
                            children: [
                              (0, i.tZ)("i", {
                                className: "fm-iconFont fm-iconFont-ios-limit",
                              }),
                              a.name,
                              ": ",
                              (0, i.tZ)("span", { children: a.value }),
                            ],
                          }),
                        }),
                        (0, i.tZ)("div", {
                          className: d.Z.box,
                          children: (0, i.BX)("div", {
                            className: d.Z.limitItem,
                            children: [
                              (0, i.tZ)("i", {
                                className: "fm-iconFont fm-iconFont-ios-dollar",
                              }),
                              l.name,
                              ": ",
                              (0, i.tZ)("span", { children: l.value }),
                            ],
                          }),
                        }),
                        (0, i.tZ)("div", {
                          className: d.Z.box,
                          children: (0, i.BX)("div", {
                            className: d.Z.limitItem,
                            children: [
                              (0, i.tZ)("i", {
                                className:
                                  "fm-iconFont fm-iconFont-ios-arrow-top",
                              }),
                              s.name,
                              ": ",
                              (0, i.tZ)("span", { children: s.value }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, i.tZ)(C, {}),
              ],
            }),
        });
      };
      var M = n(5695);
      const O = function ({ page: e, setPage: t, logoImg: n }) {
        const { t: a } = (0, u.useTranslation)(),
          [l, s] = (0, c.useState)(!1),
          [r, Z] = (0, c.useState)(!0),
          h = (e) => {
            const t = e.target.scrollTop > 0,
              n =
                (e.target.scrollHeight - e.target.scrollTop - 2).toFixed(0) >
                e.target.clientHeight;
            (s(t), Z(n));
          };
        return (0, i.tZ)(M.i, {
          children: ({ title: e, short: s, list: c, loading: u }) =>
            (0, i.BX)("div", {
              className: o()(d.Z.tmpInner, d.Z.tmpInnerBg5),
              children: [
                (0, i.tZ)("div", {
                  className: d.Z.tmpHeader,
                  children: (0, i.BX)("div", {
                    className: d.Z.settingHeaderModal,
                    children: [
                      (0, i.BX)("div", {
                        className: d.Z.settingHeaderModalBack,
                        onClick: () => {
                          t("");
                        },
                        children: [
                          (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-back",
                          }),
                          (0, i.tZ)("span", { children: a("Back") }),
                        ],
                      }),
                      (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalTitle,
                        children: e,
                      }),
                      (0, i.tZ)(m.u.Close.All, {
                        children: (0, i.tZ)("div", {
                          className: d.Z.settingHeaderModalClose,
                          children: (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-close",
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                (0, i.BX)("div", {
                  className: d.Z.tmpContent,
                  children: [
                    (0, i.BX)("div", {
                      className: o()(d.Z.rules, { [d.Z.rulesLoading]: u }),
                      children: [
                        (0, i.tZ)("div", {
                          className: d.Z.rulesList,
                          children: (0, i.tZ)("div", {
                            className: d.Z.rulesListInner,
                            children: c.map((e, t) =>
                              (0, i.tZ)("div", {
                                className: d.Z.rulesItem,
                                onClick: (e) => {
                                  (e.preventDefault(),
                                    document
                                      .getElementById(`rule${t}`)
                                      .scrollIntoView({
                                        behavior: "smooth",
                                        block: 0 === t ? "end" : "start",
                                      }));
                                },
                                children: e.title,
                              })
                            ),
                          }),
                        }),
                        (0, i.tZ)("div", {
                          className: o()(d.Z.rulesWrapper, {
                            [d.Z.rulesAddMaskTop]: l,
                            [d.Z.rulesAddMaskBottom]: r,
                          }),
                          children: (0, i.BX)("div", {
                            className: d.Z.rulesContent,
                            onScroll: h,
                            children: [
                              n &&
                                (0, i.tZ)("div", {
                                  className: d.Z.rulesLogo,
                                  style: { backgroundImage: `url(${n})` },
                                }),
                              s,
                              c.map((e, t) =>
                                (0, i.tZ)("div", {
                                  id: `rule${t}`,
                                  className: d.Z.rulesSection,
                                  children: e.content,
                                })
                              ),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, i.tZ)("div", {
                      className: o()(d.Z.preloader, {
                        [d.Z.preloaderActive]: !u,
                      }),
                    }),
                  ],
                }),
                (0, i.tZ)(C, {}),
              ],
            }),
        });
      };
      var E = n(4227);
      const T = function ({ page: e, setPage: t }) {
        const { t: n } = (0, u.useTranslation)(),
          { settings: a } = (0, c.useContext)(le);
        return (0, i.tZ)(E.Q, {
          children: ({
            title: e,
            columns: l,
            bets: s,
            betsFreebet: r,
            loading: c,
            data: u,
          }) =>
            (0, i.BX)("div", {
              className: o()(d.Z.tmpInner, d.Z.tmpInnerBg2),
              children: [
                (0, i.tZ)("div", {
                  className: d.Z.tmpHeader,
                  children: (0, i.BX)("div", {
                    className: d.Z.settingHeaderModal,
                    children: [
                      (0, i.BX)("div", {
                        className: d.Z.settingHeaderModalBack,
                        onClick: () => {
                          t("");
                        },
                        children: [
                          (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-back",
                          }),
                          (0, i.tZ)("span", { children: n("Back") }),
                        ],
                      }),
                      (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalTitle,
                        children: e,
                      }),
                      (0, i.tZ)(m.u.Close.All, {
                        children: (0, i.tZ)("div", {
                          className: d.Z.settingHeaderModalClose,
                          children: (0, i.tZ)("i", {
                            className: "fm-iconFont fm-iconFont-ios-close",
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                (0, i.BX)("div", {
                  className: d.Z.tmpContent,
                  children: [
                    (0, i.BX)("div", {
                      className: o()(d.Z.mybets, { [d.Z.mybetsLoading]: c }),
                      children: [
                        (0, i.BX)("div", {
                          className: d.Z.mybetsHeader,
                          children: [
                            l.map((e) =>
                              (0, i.tZ)("div", {
                                className: d.Z.mybetsCol,
                                children: (0, i.tZ)("span", { children: e }),
                              })
                            ),
                            (0, i.tZ)("div", { className: d.Z.mybetsInfo }),
                          ],
                        }),
                        s.map((e, n) =>
                          (0, i.tZ)(E.Q.Info, {
                            index: n,
                            onClick: () => {
                              a.mybetsinfo && t("mybetsinfo");
                            },
                            children: (0, i.tZ)("div", {
                              className: d.Z.mybetsRow,
                              children: (0, i.BX)("div", {
                                className: d.Z.mybetsRowDefault,
                                children: [
                                  e.map((e, t) =>
                                    (0, i.tZ)("div", {
                                      className: o()(d.Z.mybetsCol, {
                                        [d.Z.mybetsColBold]:
                                          (r.includes(n) && 1 === t) || 3 === t,
                                        [d.Z.mybetsColItalic]:
                                          r.includes(n) && 1 === t,
                                      }),
                                      children: (0, i.tZ)("span", {
                                        children: e,
                                      }),
                                    })
                                  ),
                                  (0, i.tZ)("div", {
                                    className: d.Z.mybetsInfo,
                                    children: (0, i.tZ)("i", {
                                      class:
                                        "fm-iconFont fm-iconFont-ios-warning",
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          })
                        ),
                      ],
                    }),
                    (0, i.tZ)("div", {
                      className: o()(d.Z.preloader, {
                        [d.Z.preloaderActive]: !c,
                      }),
                    }),
                  ],
                }),
                (0, i.tZ)(C, {}),
              ],
            }),
        });
      };
      var B = n(7879);
      const I = function ({ page: e, setPage: t }) {
          const { t: n } = (0, u.useTranslation)();
          return (0, i.BX)("div", {
            className: o()(d.Z.tmpInner, d.Z.tmpInnerBg3),
            children: [
              (0, i.tZ)("div", {
                className: d.Z.tmpHeader,
                children: (0, i.BX)("div", {
                  className: d.Z.settingHeaderModal,
                  children: [
                    (0, i.BX)("div", {
                      className: d.Z.settingHeaderModalBack,
                      onClick: () => {
                        t("mybets");
                      },
                      children: [
                        (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-back",
                        }),
                        (0, i.tZ)("span", { children: n("COMMON.BACK") }),
                      ],
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.settingHeaderModalTitle,
                      children: n("DICE.BET_DETAILS"),
                    }),
                    (0, i.tZ)(m.u.Close.All, {
                      children: (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalClose,
                        children: (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-close",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)("div", {
                className: d.Z.tmpContent,
                children: (0, i.tZ)(B.t.Iframe.Loading, {
                  children: ({ loading: e }) =>
                    (0, i.BX)(i.HY, {
                      children: [
                        (0, i.tZ)("div", {
                          className: o()(d.Z.mybetsinfo, {
                            [d.Z.mybetsinfoLoading]: e,
                          }),
                          children: (0, i.tZ)(B.t.Iframe, {
                            children: (0, i.tZ)("iframe", {
                              className: d.Z.mybetsinfoIframe,
                              scrolling: "no",
                            }),
                          }),
                        }),
                        (0, i.tZ)("div", {
                          className: o()(d.Z.preloader, {
                            [d.Z.preloaderActive]: !e,
                          }),
                        }),
                      ],
                    }),
                }),
              }),
              (0, i.tZ)(C, {}),
            ],
          });
        },
        S = function ({ page: e, setPage: t }) {
          const {
              uiCommon: { betHistoryInfoResultIndex: n },
            } = (0, a.GET_STORE)(),
            { t: l } = (0, u.useTranslation)();
          return (0, i.BX)("div", {
            className: o()(d.Z.tmpInner, d.Z.tmpInnerBg3),
            children: [
              (0, i.tZ)("div", {
                className: d.Z.tmpHeader,
                children: (0, i.BX)("div", {
                  className: d.Z.settingHeaderModal,
                  children: [
                    (0, i.BX)("div", {
                      className: d.Z.settingHeaderModalBack,
                      onClick: () => {
                        t("mybetsHistory");
                      },
                      children: [
                        (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-back",
                        }),
                        (0, i.tZ)("span", { children: l("COMMON.BACK") }),
                      ],
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.settingHeaderModalTitle,
                      children: l("DICE.BET_DETAILS"),
                    }),
                    (0, i.tZ)(m.u.Close.All, {
                      children: (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalClose,
                        children: (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-close",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)("div", {
                className: d.Z.tmpContent,
                children: (0, i.tZ)(B.t.Iframe.Loading, {
                  children: ({ loading: e }) =>
                    (0, i.BX)(i.HY, {
                      children: [
                        (0, i.tZ)("div", {
                          className: o()(d.Z.mybetsinfo, {
                            [d.Z.mybetsinfoLoading]: e,
                          }),
                          children: (0, i.tZ)(B.t.Iframe, {
                            resultIndex: String(n),
                            children: (0, i.tZ)("iframe", {
                              className: d.Z.mybetsinfoIframe,
                              scrolling: "no",
                            }),
                          }),
                        }),
                        (0, i.tZ)("div", {
                          className: o()(d.Z.preloader, {
                            [d.Z.preloaderActive]: !e,
                          }),
                        }),
                      ],
                    }),
                }),
              }),
              (0, i.tZ)(C, {}),
            ],
          });
        };
      var A = n(9874);
      const x = function ({ page: e, setPage: t }) {
        const { t: n } = (0, u.useTranslation)();
        return (0, i.tZ)(i.HY, {
          children: (0, i.tZ)(A.z.List, {
            children: ({
              title: e,
              loading: a,
              list: l,
              listActive: s,
              listFinished: r,
            }) =>
              (0, i.BX)("div", {
                className: o()(d.Z.tmpInner, d.Z.tmpInnerBg6),
                children: [
                  (0, i.tZ)("div", {
                    className: d.Z.tmpHeader,
                    children: (0, i.BX)("div", {
                      className: d.Z.settingHeaderModal,
                      children: [
                        (0, i.BX)("div", {
                          className: d.Z.settingHeaderModalBack,
                          onClick: () => {
                            t("");
                          },
                          children: [
                            (0, i.tZ)("i", {
                              className: "fm-iconFont fm-iconFont-ios-back",
                            }),
                            (0, i.tZ)("span", { children: n("COMMON.BACK") }),
                          ],
                        }),
                        (0, i.tZ)("div", {
                          className: d.Z.settingHeaderModalTitle,
                          children: e,
                        }),
                        (0, i.tZ)(m.u.Close.All, {
                          children: (0, i.tZ)("div", {
                            className: d.Z.settingHeaderModalClose,
                            children: (0, i.tZ)("i", {
                              className: "fm-iconFont fm-iconFont-ios-close",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, i.tZ)("div", {
                    className: d.Z.tmpContent,
                    children: (0, i.BX)("div", {
                      className: d.Z.settingTournament,
                      children: [
                        s.map(
                          (
                            {
                              tournamentId: e,
                              image: t,
                              imageMob: a,
                              image656x192: l,
                              timer: s,
                              name: r,
                              sum: c,
                              currency: m,
                              finish: u,
                            },
                            h
                          ) =>
                            (0, i.BX)("div", {
                              className: d.Z.tournament,
                              children: [
                                l &&
                                  (0, i.tZ)("div", {
                                    className: d.Z.tournamentImage,
                                    style: { backgroundImage: `url('${l}')` },
                                  }),
                                l &&
                                  (0, i.tZ)("div", {
                                    className: d.Z.tournamentImageMod,
                                    style: { backgroundImage: `url('${l}')` },
                                  }),
                                !u &&
                                  (0, i.tZ)(Z.B, {
                                    ...s,
                                    children: ({
                                      days: e,
                                      hours: t,
                                      minutes: a,
                                    }) =>
                                      (0, i.BX)("div", {
                                        className: d.Z.tournamentTime,
                                        children: [
                                          n("COMMON.EXPIRES_IN"),
                                          ":",
                                          (0, i.BX)("span", {
                                            children: [
                                              e,
                                              n("COMMON.DAYS.SHORT"),
                                            ],
                                          }),
                                          (0, i.BX)("span", {
                                            children: [
                                              t,
                                              n("COMMON.HOURS.SHORT"),
                                            ],
                                          }),
                                          (0, i.BX)("span", {
                                            children: [
                                              a,
                                              n("COMMON.MINUTES.SHORT"),
                                            ],
                                          }),
                                        ],
                                      }),
                                  }),
                                r &&
                                  (0, i.tZ)("div", {
                                    className: d.Z.tournamentTitle,
                                    children: r,
                                  }),
                                c &&
                                  (0, i.BX)("div", {
                                    className: d.Z.tournamentPrize,
                                    children: [
                                      "Prize fund:",
                                      " ",
                                      (0, i.BX)("span", {
                                        children: [c, " ", m],
                                      }),
                                    ],
                                  }),
                                (0, i.tZ)(A.z.List.Button, {
                                  tournamentId: e,
                                  children: ({ title: e }) =>
                                    (0, i.tZ)("div", {
                                      className: d.Z.tournamentDetails,
                                      children: (0, i.tZ)("div", {
                                        className: o()(
                                          d.Z.secondaryButton,
                                          d.Z.secondaryButtonFont18,
                                          d.Z.secondaryButtonH40,
                                          d.Z.secondaryButtonFontWeight600
                                        ),
                                        children: e,
                                      }),
                                    }),
                                }),
                              ],
                            })
                        ),
                        r.length > 0 &&
                          (0, i.tZ)("div", {
                            className: d.Z.settingTournamentDescription,
                            children: n("COMMON.ARCHIVE"),
                          }),
                        r.map(
                          (
                            {
                              tournamentId: e,
                              image: t,
                              imageMob: n,
                              timer: a,
                              name: l,
                              sum: s,
                              currency: r,
                              finish: c,
                            },
                            m
                          ) =>
                            (0, i.BX)("div", {
                              className: d.Z.tournament,
                              children: [
                                t &&
                                  (0, i.tZ)("div", {
                                    className: o()(
                                      d.Z.tournamentImage,
                                      d.Z.tournamentImageFinish
                                    ),
                                    style: { backgroundImage: `url('${t}')` },
                                  }),
                                n &&
                                  (0, i.tZ)("div", {
                                    className: o()(
                                      d.Z.tournamentImageMob,
                                      d.Z.tournamentImageMobFinish
                                    ),
                                    style: { backgroundImage: `url('${n}')` },
                                  }),
                                c &&
                                  (0, i.tZ)("div", {
                                    className: d.Z.tournamentFinished,
                                  }),
                                l &&
                                  (0, i.tZ)("div", {
                                    className: o()(
                                      d.Z.tournamentTitle,
                                      d.Z.tournamentTitleFinish
                                    ),
                                    children: l,
                                  }),
                                s &&
                                  (0, i.BX)("div", {
                                    className: o()(d.Z.tournamentPrize),
                                    children: [
                                      "Prize fund:",
                                      " ",
                                      (0, i.BX)("span", {
                                        children: [s, " ", r],
                                      }),
                                    ],
                                  }),
                                (0, i.tZ)(A.z.List.Button, {
                                  tournamentId: e,
                                  children: ({ title: e }) =>
                                    (0, i.tZ)("div", {
                                      className: o()(d.Z.tournamentDetails),
                                      children: (0, i.tZ)("div", {
                                        className: o()(
                                          d.Z.secondaryButton,
                                          d.Z.secondaryButtonFont18,
                                          d.Z.secondaryButtonH40,
                                          d.Z.secondaryButtonFontWeight600
                                        ),
                                        children: e,
                                      }),
                                    }),
                                }),
                              ],
                            })
                        ),
                      ],
                    }),
                  }),
                  (0, i.tZ)(C, {}),
                ],
              }),
          }),
        });
      };
      var H = n(2642);
      const R = function ({ page: e, setPage: t }) {
        const { t: n } = (0, u.useTranslation)();
        return (0, i.BX)(i.HY, {
          children: [
            (0, i.tZ)(H.p, {
              children: ({
                title: e,
                notFound: a,
                titleNotFound: l,
                titleFreebetsFinished: s,
                listActive: r,
                listArchived: c,
              }) =>
                (0, i.BX)("div", {
                  className: o()(d.Z.tmpInner, d.Z.tmpInnerBg7),
                  children: [
                    (0, i.BX)("div", {
                      className: o()(d.Z.tmpHeader, d.Z.tmpHeaderG24, {
                        [d.Z.tmpHeaderH200]: !a,
                      }),
                      children: [
                        (0, i.BX)("div", {
                          className: d.Z.settingHeaderModal,
                          children: [
                            (0, i.BX)("div", {
                              className: d.Z.settingHeaderModalBack,
                              onClick: () => {
                                t("");
                              },
                              children: [
                                (0, i.tZ)("i", {
                                  className: "fm-iconFont fm-iconFont-ios-back",
                                }),
                                (0, i.tZ)("span", {
                                  children: n("Back"),
                                }),
                              ],
                            }),
                            (0, i.tZ)("div", {
                              className: d.Z.settingHeaderModalTitle,
                              children: e,
                            }),
                            (0, i.tZ)(m.u.Close.All, {
                              children: (0, i.tZ)("div", {
                                className: d.Z.settingHeaderModalClose,
                                children: (0, i.tZ)("i", {
                                  className:
                                    "fm-iconFont fm-iconFont-ios-close",
                                }),
                              }),
                            }),
                          ],
                        }),
                        !a &&
                          (0, i.tZ)(H.p.Enabled, {
                            delayOpen: 0,
                            delayClose: 200,
                            children: ({
                              title: e,
                              disabled: t,
                              showTooltip: n,
                              tooltipText: a,
                              ...l
                            }) =>
                              (0, i.tZ)("div", {
                                className: d.Z.freebets,
                                children: (0, i.tZ)("div", {
                                  className: o()(d.Z.box, d.Z.boxP16),
                                  children: (0, i.BX)("div", {
                                    className: d.Z.toggle,
                                    children: [
                                      (0, i.tZ)("div", {
                                        className: d.Z.toggleTitle,
                                        children: e,
                                      }),
                                      (0, i.tZ)("div", {
                                        className: o()(d.Z.toggleTooltip, {
                                          [d.Z.toggleTooltipActive]: n,
                                        }),
                                        children: a,
                                      }),
                                      (0, i.tZ)(v.D, {
                                        ...l,
                                        children: ({ value: e }) =>
                                          (0, i.tZ)("div", {
                                            className: o()(d.Z.toggleToggle, {
                                              [d.Z.toggleToggleActive]: !e,
                                              [d.Z.toggleToggleDisabled]: t,
                                            }),
                                          }),
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                          }),
                      ],
                    }),
                    (0, i.BX)("div", {
                      className: d.Z.tmpContent,
                      children: [
                        a &&
                          (0, i.tZ)("div", {
                            className: d.Z.notFound,
                            children: l,
                          }),
                        !a &&
                          (0, i.BX)("div", {
                            className: d.Z.freebets,
                            children: [
                              r.map(
                                (
                                  {
                                    title: e,
                                    titleAmount: t,
                                    titlePayout: a,
                                    leftAndTotal: l,
                                    amount: s,
                                    payout: r,
                                    currency: c,
                                    titleExpires: m,
                                    isActive: u,
                                    timer: h,
                                  },
                                  f
                                ) =>
                                  (0, i.tZ)(H.p.Item, {
                                    index: f,
                                    children: ({ disabled: f }) =>
                                      (0, i.BX)("div", {
                                        className: o()(d.Z.freebetsItem, {
                                          [d.Z.freebetsItemActive]: u,
                                          [d.Z.freebetsItemDisabled]: f,
                                        }),
                                        children: [
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsRow,
                                              d.Z.freebetsRowMt16
                                            ),
                                            children: [
                                              (0, i.BX)("div", {
                                                className: o()(
                                                  d.Z.freebetsText,
                                                  d.Z.freebetsTextTitle
                                                ),
                                                children: [
                                                  (0, i.tZ)("span", {
                                                    className:
                                                      d.Z.freebetsPoint,
                                                  }),
                                                  e,
                                                ],
                                              }),
                                              (0, i.tZ)("div", {
                                                className: o()(
                                                  d.Z.freebetsValue,
                                                  d.Z.freebetsValueCount
                                                ),
                                                children: l,
                                              }),
                                            ],
                                          }),
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsRow,
                                              d.Z.freebetsRowMt8
                                            ),
                                            children: [
                                              (0, i.BX)("div", {
                                                className: d.Z.freebetsText,
                                                children: [t, ":"],
                                              }),
                                              (0, i.BX)("div", {
                                                className: d.Z.freebetsValue,
                                                children: [s, " ", c],
                                              }),
                                            ],
                                          }),
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsRow,
                                              d.Z.freebetsRowMt4
                                            ),
                                            children: [
                                              (0, i.BX)("div", {
                                                className: o()(
                                                  d.Z.freebetsText,
                                                  d.Z.freebetsTextRed
                                                ),
                                                children: [a, ":"],
                                              }),
                                              (0, i.BX)("div", {
                                                className: o()(
                                                  d.Z.freebetsValue,
                                                  d.Z.freebetsValueRed
                                                ),
                                                children: [r, " ", c],
                                              }),
                                            ],
                                          }),
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsRow,
                                              d.Z.freebetsRowBgGrey,
                                              d.Z.freebetsRowMt8,
                                              d.Z.freebetsRowPt8,
                                              d.Z.freebetsRowPb8
                                            ),
                                            children: [
                                              (0, i.tZ)("div", {
                                                className: d.Z.freebetsText,
                                                children: m,
                                              }),
                                              (0, i.tZ)(Z.B, {
                                                ...h,
                                                children: ({
                                                  years: e,
                                                  days: t,
                                                  hours: a,
                                                  minutes: l,
                                                  seconds: s,
                                                  milliseconds: o,
                                                }) =>
                                                  (0, i.tZ)("div", {
                                                    className:
                                                      d.Z.freebetsValue,
                                                    children: `${t}${n("COMMON.DAYS.SHORT")} ${a}${n("COMMON.HOURS.SHORT")} ${l}${n("COMMON.MINUTES.SHORT")}`,
                                                  }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                  })
                              ),
                              c.length &&
                                (0, i.tZ)("div", {
                                  className: d.Z.freebetsArchivedTitle,
                                  children: s,
                                }),
                              c.map(
                                ({
                                  title: e,
                                  titleAmount: t,
                                  titlePayout: n,
                                  leftAndTotal: a,
                                  amount: l,
                                  payout: s,
                                  currency: r,
                                }) =>
                                  (0, i.BX)("div", {
                                    className: o()(
                                      d.Z.freebetsItem,
                                      d.Z.freebetsItemArchived
                                    ),
                                    children: [
                                      (0, i.BX)("div", {
                                        className: o()(
                                          d.Z.freebetsRow,
                                          d.Z.freebetsRowMt16
                                        ),
                                        children: [
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsText,
                                              d.Z.freebetsTextTitle
                                            ),
                                            children: [e, ":"],
                                          }),
                                          (0, i.tZ)("div", {
                                            className: o()(
                                              d.Z.freebetsValue,
                                              d.Z.freebetsValueCount
                                            ),
                                            children: a,
                                          }),
                                        ],
                                      }),
                                      (0, i.BX)("div", {
                                        className: o()(
                                          d.Z.freebetsRow,
                                          d.Z.freebetsRowMt8
                                        ),
                                        children: [
                                          (0, i.BX)("div", {
                                            className: d.Z.freebetsText,
                                            children: [t, ":"],
                                          }),
                                          (0, i.BX)("div", {
                                            className: d.Z.freebetsValue,
                                            children: [l, " ", r],
                                          }),
                                        ],
                                      }),
                                      (0, i.BX)("div", {
                                        className: o()(
                                          d.Z.freebetsRow,
                                          d.Z.freebetsRowMt4
                                        ),
                                        children: [
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsText,
                                              d.Z.freebetsTextRed
                                            ),
                                            children: [n, ":"],
                                          }),
                                          (0, i.BX)("div", {
                                            className: o()(
                                              d.Z.freebetsValue,
                                              d.Z.freebetsValueRed
                                            ),
                                            children: [s, " ", r],
                                          }),
                                        ],
                                      }),
                                      (0, i.tZ)("div", {
                                        className: d.Z.freebetsFinished,
                                      }),
                                    ],
                                  })
                              ),
                            ],
                          }),
                      ],
                    }),
                    (0, i.tZ)(C, {}),
                  ],
                }),
            }),
            (0, i.tZ)(m.u.Connect, {
              modalName: "freebetsConfirmation",
              children: ({ open: e, close: t, ...n }) =>
                (0, i.tZ)(m.u, {
                  ...n,
                  children: (0, i.tZ)("div", {
                    className: o()(d.Z.exit, {
                      [d.Z.exitOpen]: e,
                      [d.Z.exitClose]: t,
                    }),
                    children: (0, i.tZ)(m.u.Content, {
                      children: (0, i.tZ)("div", {
                        className: d.Z.exitInner,
                        children: (0, i.tZ)(H.p.Enabled, {
                          children: ({
                            titleConfirmation: e,
                            titleLoseProgress: t,
                            titleConfirmationYes: n,
                            titleConfirmationNo: a,
                          }) =>
                            (0, i.BX)(i.HY, {
                              children: [
                                (0, i.tZ)("div", {
                                  className: d.Z.exitDescription,
                                  children: e,
                                }),
                                " ",
                                t &&
                                  (0, i.tZ)("div", {
                                    className: d.Z.exitDescription,
                                    children: t,
                                  }),
                                (0, i.BX)("div", {
                                  className: d.Z.exitButtons,
                                  children: [
                                    (0, i.tZ)(m.u.Close, {
                                      children: (0, i.tZ)("div", {
                                        className: o()(
                                          d.Z.primaryButton,
                                          d.Z.primaryButtonRed
                                        ),
                                        children: a,
                                      }),
                                    }),
                                    (0, i.tZ)(m.u.Submit, {
                                      children: (0, i.tZ)("div", {
                                        className: d.Z.secondaryButton,
                                        children: n,
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        }),
                      }),
                    }),
                  }),
                }),
            }),
            (0, i.tZ)(m.u.Connect, {
              modalName: "freebetsChangeConfirm",
              children: ({ open: e, close: t, data: a, ...l }) =>
                (0, i.tZ)(m.u, {
                  ...l,
                  children: (0, i.tZ)("div", {
                    className: o()(d.Z.exit, {
                      [d.Z.exitOpen]: e,
                      [d.Z.exitClose]: t,
                    }),
                    children: (0, i.tZ)(m.u.Content, {
                      children: (0, i.BX)("div", {
                        className: d.Z.exitInner,
                        children: [
                          (0, i.tZ)("div", {
                            className: d.Z.exitDescription,
                            children: n("FREEBETS.CHANGE"),
                          }),
                          " ",
                          a &&
                            (0, i.tZ)("div", {
                              className: d.Z.exitDescription,
                              children: a,
                            }),
                          (0, i.BX)("div", {
                            className: d.Z.exitButtons,
                            children: [
                              (0, i.tZ)(m.u.Close, {
                                children: (0, i.tZ)("div", {
                                  className: o()(
                                    d.Z.primaryButton,
                                    d.Z.primaryButtonRed
                                  ),
                                  children: n("COMMON.NO"),
                                }),
                              }),
                              (0, i.tZ)(m.u.Submit, {
                                children: (0, i.tZ)("div", {
                                  className: d.Z.secondaryButton,
                                  children: n("COMMON.YES"),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                }),
            }),
          ],
        });
      };
      var k,
        F = n(8925);
      !(function (e) {
        ((e[(e.Unstarted = -1)] = "Unstarted"),
          (e[(e.Ended = 0)] = "Ended"),
          (e[(e.Playing = 1)] = "Playing"),
          (e[(e.Paused = 2)] = "Paused"),
          (e[(e.Buffering = 3)] = "Buffering"),
          (e[(e.VideoCued = 5)] = "VideoCued"));
      })(k || (k = {}));
      var X = (0, r.observer)(({ setPage: e }) => {
          const {
              audioCommon: { setGlobalMuted: t, globalMuted: n },
            } = (0, a.GET_STORE)(),
            { config: l } = (0, c.useContext)(le),
            s = l?.guide?.videoLinkId ?? "",
            r = (0, c.useRef)(null),
            [Z, h] = (0, c.useState)(!1),
            [f, g] = (0, c.useState)(!1),
            v = (0, c.useCallback)((e) => {
              switch (e.target.getPlayerState()) {
                case k.Unstarted:
                  g(!1);
                  break;
                case k.Ended:
                  (g(!1),
                    h(!1),
                    r.current.destroy(),
                    setTimeout(() => {
                      h(!0);
                    }, 0));
                  break;
                case k.Playing:
                  g(!0);
                  break;
                case k.Paused:
                  g(!1);
                case k.Buffering:
                case k.VideoCued:
              }
            }, []);
          ((0, c.useEffect)(() => {
            if (document.getElementById("yt-iframe-api")) return void h(!0);
            const e = document.createElement("script");
            ((e.src = "https://www.youtube.com/iframe_api"),
              (e.id = "yt-iframe-api-guide"),
              document.body.appendChild(e),
              (e.onload = () => {
                setTimeout(() => {
                  h(!0);
                }, 1e3);
              }));
          }, []),
            (0, c.useEffect)(() => {
              if (Z && s)
                return (
                  (r.current = new YT.Player("player", {
                    videoId: s,
                    playerVars: {
                      fs: 0,
                      controls: 0,
                      modestbranding: 1,
                      rel: 0,
                      iv_load_policy: 3,
                    },
                    events: {
                      onPlay: () => {
                        console.log("onPlay");
                      },
                      onPause: () => {
                        console.log("onPause");
                      },
                      onReady: (e) => {
                        console.log("onReady");
                      },
                      onStateChange: v,
                    },
                  })),
                  () => {
                    (clearInterval(void 0), r.current.destroy());
                  }
                );
            }, [Z, s]),
            (0, c.useEffect)(() => {
              Z && t(f);
            }, [f]));
          const p = () => {
            e("rules");
          };
          (0, c.useEffect)(
            () => (
              window.addEventListener("unload", p),
              () => {
                window.removeEventListener("unload", p);
              }
            ),
            []
          );
          const { t: N } = (0, u.useTranslation)();
          return (0, i.BX)("div", {
            className: o()(d.Z.tmpInner, d.Z.tmpInnerBg5),
            children: [
              (0, i.tZ)("div", {
                className: d.Z.tmpContent,
                children: (0, i.BX)("div", {
                  className: `${d.Z.guide} ${d.Z.settingHeaderModal}`,
                  children: [
                    (0, i.tZ)("div", {
                      className: d.Z.guideHeader,
                      children: (0, i.tZ)("div", {
                        className: d.Z.guideHeader__title,
                        children: N("COMMON.HOW_TO_PLAY"),
                      }),
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.guideVideo,
                      children: (0, i.tZ)("div", {
                        id: "player",
                        className: d.Z.guideVideo__iframe,
                      }),
                    }),
                    (0, i.BX)("div", {
                      className: `${d.Z.guideBack} ${d.Z.settingHeaderModalBack}`,
                      onClick: () => {
                        e("");
                      },
                      children: [
                        (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-back",
                        }),
                        (0, i.tZ)("span", { children: N("COMMON.BACK") }),
                      ],
                    }),
                    (0, i.tZ)(m.u.Close.All, {
                      onClick: () => t(!1),
                      children: (0, i.tZ)("div", {
                        className: `${d.Z.guideClose} ${d.Z.settingHeaderModalClose}`,
                        children: (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-close",
                        }),
                      }),
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.guideFooter,
                      children:
                        !f &&
                        (0, i.BX)(i.HY, {
                          children: [
                            (0, i.tZ)("div", {
                              className: d.Z.guideFooter__rules,
                              children: (0, i.BX)("div", {
                                className: d.Z.guideFooter__rulesList,
                                children: [
                                  (0, i.BX)("div", {
                                    className: d.Z.guideFooter__rulesListItem,
                                    children: [
                                      (0, i.tZ)("span", { children: "01" }),
                                      (0, i.tZ)("p", {
                                        children: N(l?.guide?.step1Key ?? ""),
                                      }),
                                    ],
                                  }),
                                  (0, i.BX)("div", {
                                    className: d.Z.guideFooter__rulesListItem,
                                    children: [
                                      (0, i.tZ)("span", { children: "02" }),
                                      (0, i.tZ)("p", {
                                        children: N(l?.guide?.step2Key ?? ""),
                                      }),
                                    ],
                                  }),
                                  (0, i.BX)("div", {
                                    className: d.Z.guideFooter__rulesListItem,
                                    children: [
                                      (0, i.tZ)("span", { children: "03" }),
                                      (0, i.tZ)("p", {
                                        children: N(l?.guide?.step3Key ?? ""),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, i.tZ)("div", {
                              className: d.Z.guide__link,
                              onClick: p,
                              children: N("COMMON.DETAILED_RULES"),
                            }),
                          ],
                        }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)(C, {}),
            ],
          });
        }),
        L = (0, r.observer)(({ setPage: e, guide: t }) => {
          const { config: n } = (0, c.useContext)(le),
            a = () => {
              e("rules");
            };
          (0, c.useEffect)(
            () => (
              window.addEventListener("unload", a),
              () => {
                window.removeEventListener("unload", a);
              }
            ),
            []
          );
          const { t: l } = (0, u.useTranslation)();
          return (0, i.BX)("div", {
            className: o()(d.Z.tmpInner, d.Z.tmpInnerBg5),
            children: [
              (0, i.tZ)("div", {
                className: d.Z.tmpHeader,
                children: (0, i.BX)("div", {
                  className: d.Z.settingHeaderModal,
                  children: [
                    (0, i.BX)("div", {
                      className: d.Z.settingHeaderModalBack,
                      onClick: () => {
                        e("");
                      },
                      children: [
                        (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-back",
                        }),
                        (0, i.tZ)("span", { children: l("COMMON.BACK") }),
                      ],
                    }),
                    (0, i.tZ)("div", {
                      className: d.Z.settingHeaderModalTitle,
                      children: l("COMMON.HOW_TO_PLAY"),
                    }),
                    (0, i.tZ)(m.u.Close.All, {
                      children: (0, i.tZ)("div", {
                        className: d.Z.settingHeaderModalClose,
                        children: (0, i.tZ)("i", {
                          className: "fm-iconFont fm-iconFont-ios-close",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, i.tZ)("div", {
                className: d.Z.tmpContent,
                children: t ?? (0, i.tZ)(i.HY, {}),
              }),
              (0, i.tZ)(C, {}),
            ],
          });
        }),
        _ = (0, r.observer)(({ setPage: e, guide: t }) => {
          const { config: n } = (0, c.useContext)(le);
          return (0, i.BX)(i.HY, {
            children: [
              "image" === n?.guide?.type &&
                (0, i.tZ)(L, { setPage: e, guide: t }),
              "video" === n?.guide?.type && (0, i.tZ)(X, { setPage: e }),
            ],
          });
        }),
        w = n(4474);
      const P = (0, r.observer)(function ({
        children: e,
        bet: t,
        onClick: n = () => {},
        delayOpen: s,
        delayClose: o,
      }) {
        console.log({ bet: t });
        const {
          game: { gameServerId: r },
          uiCommon: {
            setBetInfoGameId: c,
            setBetInfoId: d,
            setModal: m,
            setBetHistoryInfoResultIndex: u,
          },
          profileCommon: {
            language: Z,
            profile: {
              token: h,
              apiKey: f,
              currencySign: g,
              rounding: v,
              name: p,
            },
          },
        } = (0, a.GET_STORE)();
        console.log({ bet: t });
        const C = (e) => {
          (c(r),
            d(t.betId),
            u(t.resultIndex),
            m({
              modalName: "mybetsHistoryInfo",
              render: !0,
              delayOpen: s,
              delayClose: o,
            }),
            n(e));
        };
        return (0, i.tZ)(i.HY, {
          children: (0, l.toChildArray)(e).map((e) =>
            (0, l.cloneElement)(e, { onClick: C })
          ),
        });
      });
      var Y = n(2464),
        G = n(8596);
      const $ = (0, l.createContext)({}),
        D = Object.assign(
          (0, r.observer)(function ({
            children: e,
            columns: t = ["updatedAt", "amount", "coefficient", "payout"],
            limit: n = 10,
            offset: s = 0,
          }) {
            const {
              profileCommon: {
                language: o,
                profile: { token: r, apiKey: d, currencySign: m, rounding: Z },
              },
              uiCommon: { errorCodeResolver: h },
              game: { gameServerId: f, mybets: g },
            } = (0, a.GET_STORE)();
            if (!r || !d) return null;
            const { t: v } = (0, u.useTranslation)(),
              [p, C] = (0, c.useState)([]),
              [N, y] = (0, c.useState)([]),
              [b, M] = (0, c.useState)([]),
              [O, E] = (0, c.useState)([]),
              [T, B] = (0, c.useState)([]),
              [I, S] = (0, c.useState)(!1),
              A = {
                updatedAt: v("COMMON.TIME"),
                amount: v("COMMON.BET_AMOUNT"),
                coefficient: v("COMMON.MULTIPLIER"),
                payout: v("COMMON.PAYOUT"),
                prefixAmount: v("COMMON.BET_AMOUNT"),
                prefixCoefficient: v("COMMON.MULTIPLIER"),
                prefixPayout: v("COMMON.PAYOUT"),
                amountSufix: v("COMMON.BET_AMOUNT"),
                coefficientSufix: v("COMMON.MULTIPLIER"),
                payoutSufix: v("COMMON.PAYOUT"),
              },
              { config: x } = (0, c.useContext)(le);
            return (
              (0, c.useEffect)(() => {
                (async () => {
                  try {
                    const { data: e } = await (0, w.af)({
                      headers: { authorization: r, apiKey: d },
                      gameId: f,
                      limit: n,
                      offset: s,
                    });
                    (E(e), B(e), S(!0));
                  } catch (e) {
                    (console.log("getMyBetsError", e), h(e));
                  }
                })();
              }, []),
              (0, c.useEffect)(() => {
                if (!I && !g) return;
                const e = [...g, ...O].slice(0, n);
                B(e);
              }, [g, n]),
              (0, c.useEffect)(() => {
                let e = [],
                  n = [],
                  i = [];
                for (let a = 0; a < T.length; a++) {
                  const l = T[a];
                  l.freebetsId && i.push(a);
                  for (let i of l.results) {
                    const a = {},
                      s = {
                        betId: l.betId,
                        amount: l.amount,
                        payout: i.payout,
                        coefficient: i.payoutCoefficient,
                        updatedAt: l.updatedAt,
                        currency: l.currency,
                        resultIndex: l.results.indexOf(i),
                      };
                    for (let e of t)
                      ("updatedAt" === e &&
                        (a.updatedAt = new Intl.DateTimeFormat(
                          o ? o.slice(0, 2) : "en",
                          { hour: "numeric", minute: "numeric" }
                        ).format(new Date(l.updatedAt))),
                        "amount" === e &&
                          (a.amount = l.freebetsId
                            ? "FREE BET"
                            : (0, Y.Z)(l.amount, Z)),
                        "payout" === e &&
                          (a.payout = x?.module?.moduleSetting
                            ?.truncateDecimalsMybetsPayout
                            ? (0, G.Z)(i.payout, Z)
                            : (0, Y.Z)(i.payout, Z)),
                        "coefficient" === e &&
                          (a.coefficient = i.payoutCoefficient
                            ? i.payoutCoefficient.toFixed(2)
                            : "-"),
                        "prefixAmount" === e &&
                          (a.prefixAmount = l.freebetsId
                            ? "FREE BET"
                            : `${m} ${(0, Y.Z)(l.amount, Z)}`),
                        "prefixPayout" === e &&
                          (a.prefixPayout = `${m} ${(0, Y.Z)(i.payout, Z)}`),
                        "prefixCoefficient" === e &&
                          (a.prefixCoefficient = i.payoutCoefficient
                            ? "x" + i.payoutCoefficient.toFixed(2)
                            : "-"),
                        "amountSufix" === e &&
                          (a.amountSufix = l.freebetsId
                            ? "FREE BET"
                            : `${(0, Y.Z)(l.amount, Z)} ${m}`),
                        "payoutSufix" === e &&
                          (a.payoutSufix = `${(0, Y.Z)(i.payout, Z)} ${m}`),
                        "coefficientSufix" === e &&
                          (a.coefficientSufix = i.payoutCoefficient
                            ? i.payoutCoefficient.toFixed(2) + "x"
                            : "-"));
                    (n.push(s), e.push(a));
                  }
                }
                (y(n), C(e.map((e) => t.map((t) => e[t]))), M(i));
              }, [T]),
              (0, i.tZ)($.Provider, {
                value: { data: T },
                children: (0, i.tZ)(i.HY, {
                  children: (0, l.toChildArray)(
                    e({
                      title: v("My bets"),
                      bets: p,
                      betsInfo: N,
                      betsFreebet: b,
                      columns: t.map((e) => A[e]),
                      loading: I,
                      data: T,
                    })
                  ).map((e) => (0, l.cloneElement)(e)),
                }),
              })
            );
          }),
          { Info: P }
        ),
        U = function ({ page: e, setPage: t }) {
          const { t: n } = (0, u.useTranslation)(),
            { settings: a } = (0, c.useContext)(le);
          return (0, i.tZ)(D, {
            children: ({
              title: e,
              columns: l,
              bets: s,
              betsFreebet: r,
              loading: c,
              betsInfo: u,
            }) =>
              (0, i.BX)("div", {
                className: o()(d.Z.tmpInner, d.Z.tmpInnerBg2),
                children: [
                  (0, i.tZ)("div", {
                    className: d.Z.tmpHeader,
                    children: (0, i.BX)("div", {
                      className: d.Z.settingHeaderModal,
                      children: [
                        (0, i.BX)("div", {
                          className: d.Z.settingHeaderModalBack,
                          onClick: () => {
                            t("");
                          },
                          children: [
                            (0, i.tZ)("i", {
                              className: "fm-iconFont fm-iconFont-ios-back",
                            }),
                            (0, i.tZ)("span", { children: n("COMMON.BACK") }),
                          ],
                        }),
                        (0, i.tZ)("div", {
                          className: d.Z.settingHeaderModalTitle,
                          children: e,
                        }),
                        (0, i.tZ)(m.u.Close.All, {
                          children: (0, i.tZ)("div", {
                            className: d.Z.settingHeaderModalClose,
                            children: (0, i.tZ)("i", {
                              className: "fm-iconFont fm-iconFont-ios-close",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, i.BX)("div", {
                    className: d.Z.tmpContent,
                    children: [
                      (0, i.BX)("div", {
                        className: o()(d.Z.mybets, { [d.Z.mybetsLoading]: c }),
                        children: [
                          (0, i.BX)("div", {
                            className: d.Z.mybetsHeader,
                            children: [
                              l.map((e) =>
                                (0, i.tZ)("div", {
                                  className: d.Z.mybetsCol,
                                  children: (0, i.tZ)("span", { children: e }),
                                })
                              ),
                              (0, i.tZ)("div", { className: d.Z.mybetsInfo }),
                            ],
                          }),
                          s.map((e, n) =>
                            (0, i.tZ)(D.Info, {
                              bet: u[n],
                              onClick: () => {
                                a.mybetsInfoHistory && t("mybetsInfoHistory");
                              },
                              children: (0, i.tZ)("div", {
                                className: d.Z.mybetsRow,
                                children: (0, i.BX)("div", {
                                  className: d.Z.mybetsRowDefault,
                                  children: [
                                    e.map((e, t) =>
                                      (0, i.tZ)("div", {
                                        className: o()(d.Z.mybetsCol, {
                                          [d.Z.mybetsColBold]:
                                            (r.includes(n) && 1 === t) ||
                                            3 === t,
                                          [d.Z.mybetsColItalic]:
                                            r.includes(n) && 1 === t,
                                        }),
                                        children: (0, i.tZ)("span", {
                                          children: e,
                                        }),
                                      })
                                    ),
                                    (0, i.tZ)("div", {
                                      className: d.Z.mybetsInfo,
                                      children: (0, i.tZ)("i", {
                                        class:
                                          "fm-iconFont fm-iconFont-ios-warning",
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            })
                          ),
                        ],
                      }),
                      (0, i.tZ)("div", {
                        className: o()(d.Z.preloader, {
                          [d.Z.preloaderActive]: !c,
                        }),
                      }),
                    ],
                  }),
                  (0, i.tZ)(C, {}),
                ],
              }),
          });
        },
        z = (0, r.observer)(function ({ logoImg: e, guide: t }) {
          const {
              uiCommon: { modal: n },
              profileCommon: {
                settings: { options: l },
              },
              audioCommon: {
                setGlobalMuted: s,
                globalMuted: r,
                soundMuted: u,
                musicMuted: Z,
              },
            } = (0, a.GET_STORE)(),
            { settings: h } = (0, c.useContext)(le),
            [f, g] = (0, c.useState)(!1),
            v = (0, c.useRef)(""),
            [p, C] = (0, c.useState)("");
          return (
            (0, c.useEffect)(() => {
              (f && C(""), n?.setting?.data?.page && C(n?.setting?.data?.page));
            }, [f]),
            (0, c.useEffect)(() => {
              v.current = p;
            }, [p]),
            (0, i.tZ)(m.u.Connect, {
              modalName: "setting",
              children: ({
                show: n,
                open: a,
                close: c,
                onClose: f,
                data: y,
              }) => (
                y && y.page && "mybetsinfo" === y.page && C("mybetsinfo"),
                g(n),
                (0, i.tZ)(m.u, {
                  show: n,
                  onClose: f,
                  children: (0, i.tZ)("div", {
                    className: o()(d.Z.animation, {
                      [d.Z.animationOpen]: a && !c,
                    }),
                    style: {
                      ...("" !== v.current && {
                        "--animation-delay-nav": "0s",
                      }),
                    },
                    children: (0, i.tZ)("div", {
                      className: d.Z.animationInner,
                      children: (0, i.tZ)(m.u.Content, {
                        children: (0, i.BX)("div", {
                          className: d.Z.tmp,
                          children: [
                            "" === p && (0, i.tZ)(N, { page: p, setPage: C }),
                            // "turbouniverse" === p &&
                            //   h.turbouniverse &&
                            //   !1 !== l?.displayUniverse &&
                            //   (0, i.tZ)(F.default, {
                            //     setPage: C,
                            //     setGlobalMuted: r || (Z && u) ? void 0 : s,
                            //   }),
                            "guide" === p &&
                              h.guide &&
                              (0, i.tZ)(_, { setPage: C, guide: t }),
                            "limit" === p &&
                              h.limit &&
                              (0, i.tZ)(b, { page: p, setPage: C }),
                            "rules" === p &&
                              h.rules &&
                              (0, i.tZ)(O, { page: p, setPage: C, logoImg: e }),
                            "mybets" === p &&
                              h.mybets &&
                              (0, i.tZ)(T, { page: p, setPage: C }),
                            "mybetsHistory" === p &&
                              h.mybetsHistory &&
                              (0, i.tZ)(U, { page: p, setPage: C }),
                            "mybetsinfo" === p &&
                              h.mybetsinfo &&
                              (0, i.tZ)(I, { page: p, setPage: C }),
                            "mybetsInfoHistory" === p &&
                              h.mybetsInfoHistory &&
                              (0, i.tZ)(S, { page: p, setPage: C }),
                            "tournaments" === p &&
                              h.tournaments &&
                              (0, i.tZ)(x, { page: p, setPage: C }),
                            "freebets" === p &&
                              h.freebets &&
                              (0, i.tZ)(R, { page: p, setPage: C }),
                          ],
                        }),
                      }),
                    }),
                  }),
                })
              ),
            })
          );
        });
      var V = n(6872);
      const W = function () {
        return (0, i.tZ)(V.b, {
          delayOpen: 300,
          delayClose: 300,
          children: (0, i.tZ)(V.b.Message, {
            children: (e) =>
              (0, i.tZ)(i.HY, {
                children: (0, i.BX)("div", {
                  className: o()(d.Z.alert, {
                    [d.Z.alertSuccess]: "success" === e.type,
                    [d.Z.alertError]: "error" === e.type,
                    [d.Z.alertWarning]: "warning" === e.type,
                    [d.Z.alertOpen]: e.open,
                    [d.Z.alertClose]: e.close,
                    [d.Z.alertQuickMode]: "gameQuickMode" === e.type,
                    [d.Z.alertGreetings]: "greetings" === e.type,
                  }),
                  children: [
                    e.title &&
                      (0, i.tZ)("div", {
                        className: d.Z.alertTitle,
                        children: e.title,
                      }),
                    e.text &&
                      (0, i.tZ)("div", {
                        className: d.Z.alertText,
                        children: e.text,
                      }),
                  ],
                }),
              }),
          }),
        });
      };
      var K = n(7884);
      const q = function () {
          const { t: e } = (0, u.useTranslation)();
          return (0, i.tZ)(m.u.Connect, {
            modalName: "exitGame",
            children: ({ open: t, close: n, ...a }) =>
              (0, i.tZ)(m.u, {
                ...a,
                children: (0, i.tZ)("div", {
                  className: o()(d.Z.exit, {
                    [d.Z.exitOpen]: t,
                    [d.Z.exitClose]: n,
                  }),
                  children: (0, i.tZ)(m.u.Content, {
                    children: (0, i.tZ)("div", {
                      className: d.Z.exitInner,
                      children: (0, i.tZ)(K.$, {
                        children: ({ title: t, description: n }) =>
                          (0, i.BX)(i.HY, {
                            children: [
                              (0, i.tZ)("div", {
                                className: d.Z.exitTitle,
                                children: t,
                              }),
                              (0, i.tZ)("div", {
                                className: d.Z.exitDescription,
                                children: n,
                              }),
                              (0, i.BX)("div", {
                                className: d.Z.exitButtons,
                                children: [
                                  (0, i.tZ)(m.u.Close, {
                                    children: (0, i.tZ)("div", {
                                      className: o()(
                                        d.Z.primaryButton,
                                        d.Z.primaryButtonRed
                                      ),
                                      children: e("Cancel"),
                                    }),
                                  }),
                                  (0, i.tZ)(K.$.Exit, {
                                    children: ({ title: e }) =>
                                      (0, i.tZ)("div", {
                                        className: d.Z.secondaryButton,
                                        children: e,
                                      }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                      }),
                    }),
                  }),
                }),
              }),
          });
        },
        j = function () {
          const { t: e } = (0, u.useTranslation)();
          return (0, i.tZ)(i.HY, {
            children: (0, i.tZ)(m.u.Connect, {
              modalName: "tournamentsInfo",
              children: ({ open: t, close: n, ...a }) =>
                (0, i.tZ)(m.u, {
                  ...a,
                  children: (0, i.BX)("div", {
                    className: d.Z.tournamentModal,
                    children: [
                      (0, i.tZ)("div", {
                        className: d.Z.tournamentModalHeader,
                        children: (0, i.BX)(m.u.Close, {
                          children: [
                            (0, i.tZ)("span", { children: e("COMMON.CLOSE") }),
                            (0, i.tZ)("div", {
                              className: d.Z.tournamentModalClose,
                              children: (0, i.tZ)("i", {
                                className: "fm-iconFont fm-iconFont-ios-close",
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, i.tZ)("div", {
                        className: d.Z.tournamentModalInner,
                        children: (0, i.tZ)(m.u.Content, {
                          children: (0, i.tZ)("div", {
                            className: d.Z.tournamentModalContent,
                            children: (0, i.tZ)(A.z.Info, {
                              children: ({
                                timer: t,
                                startAt: n,
                                endAt: a,
                                finish: l,
                                loading: s,
                                image: r,
                                imageMob: c,
                                image656x192: m,
                                image592x540: u,
                                image320x200: h,
                                name: f,
                                currency: g,
                                sum: v,
                                sumShort: p,
                                winnerCount: C,
                              }) =>
                                (0, i.BX)("div", {
                                  className: d.Z.tournament,
                                  children: [
                                    m &&
                                      (0, i.tZ)("div", {
                                        className: o()(d.Z.tournamentImage, {
                                          [d.Z.tournamentImageFinish]: l,
                                        }),
                                        style: {
                                          backgroundImage: `url('${m}')`,
                                        },
                                      }),
                                    !l &&
                                      (0, i.tZ)(Z.B, {
                                        ...t,
                                        children: ({
                                          days: t,
                                          hours: n,
                                          minutes: a,
                                        }) =>
                                          (0, i.BX)("div", {
                                            className: d.Z.tournamentTime,
                                            children: [
                                              e("COMMON.EXPIRES_IN"),
                                              ":",
                                              (0, i.BX)("span", {
                                                children: [
                                                  t,
                                                  e("COMMON.DAYS.SHORT"),
                                                ],
                                              }),
                                              (0, i.BX)("span", {
                                                children: [
                                                  n,
                                                  e("COMMON.HOURS.SHORT"),
                                                ],
                                              }),
                                              (0, i.BX)("span", {
                                                children: [
                                                  a,
                                                  e("COMMON.MINUTES.SHORT"),
                                                ],
                                              }),
                                            ],
                                          }),
                                      }),
                                    l &&
                                      (0, i.tZ)("div", {
                                        className: d.Z.tournamentFinished,
                                      }),
                                    f &&
                                      (0, i.tZ)("div", {
                                        className: o()(d.Z.tournamentTitle, {
                                          [d.Z.tournamentFinish]: l,
                                        }),
                                        children: f,
                                      }),
                                    v &&
                                      (0, i.BX)("div", {
                                        className: d.Z.tournamentPrize,
                                        children: [
                                          "Prize fund:",
                                          " ",
                                          (0, i.BX)("span", {
                                            children: [v, " ", g],
                                          }),
                                        ],
                                      }),
                                    !l &&
                                      (0, i.tZ)(A.z.Info.Tab, {
                                        list: ["leaderbords", "prizes"],
                                        children: ({ list: e, active: t }) =>
                                          (0, i.BX)(i.HY, {
                                            children: [
                                              (0, i.tZ)("div", {
                                                className: d.Z.tournamentTabs,
                                                children: e.map((e, n) =>
                                                  (0, i.tZ)(A.z.Info.Tab.Item, {
                                                    index: n,
                                                    children: (0, i.tZ)("div", {
                                                      className:
                                                        d.Z.tournamentTab,
                                                      children: (0, i.tZ)(
                                                        "div",
                                                        {
                                                          className: o()(
                                                            d.Z
                                                              .settingMenuButton,
                                                            {
                                                              [d.Z
                                                                .settingMenuButtonActive]:
                                                                t === n,
                                                            }
                                                          ),
                                                          children: e,
                                                        }
                                                      ),
                                                    }),
                                                  })
                                                ),
                                              }),
                                              0 === t &&
                                                (0, i.tZ)(
                                                  A.z.Info.Leaderbords,
                                                  {
                                                    children: ({
                                                      list: e,
                                                      listSpaceIndex: t,
                                                      loading: n,
                                                      activeId: a,
                                                      titlePosition: l,
                                                      titleUser: s,
                                                      titlePrize: r,
                                                      titlePoints: c,
                                                    }) =>
                                                      (0, i.BX)("div", {
                                                        className:
                                                          d.Z.tournamentTable,
                                                        children: [
                                                          (0, i.BX)("div", {
                                                            className:
                                                              d.Z.tournamentRow,
                                                            children: [
                                                              (0, i.tZ)("div", {
                                                                className: o()(
                                                                  d.Z
                                                                    .tournamentCol,
                                                                  d.Z
                                                                    .tournamentColW50
                                                                ),
                                                                children: "#",
                                                              }),
                                                              (0, i.tZ)("div", {
                                                                className: o()(
                                                                  d.Z
                                                                    .tournamentCol,
                                                                  d.Z
                                                                    .tournamentColLeft,
                                                                  d.Z
                                                                    .tournamentColGrow1
                                                                ),
                                                                children: s,
                                                              }),
                                                              (0, i.tZ)("div", {
                                                                className: o()(
                                                                  d.Z
                                                                    .tournamentCol,
                                                                  d.Z
                                                                    .tournamentColRight
                                                                ),
                                                                children: c,
                                                              }),
                                                            ],
                                                          }),
                                                          e.map((e, n) =>
                                                            (0, i.BX)(i.HY, {
                                                              children: [
                                                                t === n &&
                                                                  (0, i.tZ)(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        o()(
                                                                          d.Z
                                                                            .tournamentTr,
                                                                          d.Z
                                                                            .tournamentTrP8
                                                                        ),
                                                                    }
                                                                  ),
                                                                (0, i.BX)(
                                                                  "div",
                                                                  {
                                                                    className:
                                                                      o()(
                                                                        d.Z
                                                                          .tournamentRow,
                                                                        {
                                                                          [d.Z
                                                                            .tournamentRowActive]:
                                                                            a ===
                                                                            e.playerId,
                                                                          [d.Z
                                                                            .tournamentRowOne]:
                                                                            0 ===
                                                                            n,
                                                                          [d.Z
                                                                            .tournamentRowTwo]:
                                                                            1 ===
                                                                            n,
                                                                          [d.Z
                                                                            .tournamentRowThree]:
                                                                            2 ===
                                                                            n,
                                                                        }
                                                                      ),
                                                                    children: [
                                                                      (0, i.tZ)(
                                                                        "div",
                                                                        {
                                                                          className:
                                                                            o()(
                                                                              d
                                                                                .Z
                                                                                .tournamentCol,
                                                                              d
                                                                                .Z
                                                                                .tournamentColW50
                                                                            ),
                                                                          children:
                                                                            e.rank,
                                                                        }
                                                                      ),
                                                                      (0, i.tZ)(
                                                                        "div",
                                                                        {
                                                                          className:
                                                                            o()(
                                                                              d
                                                                                .Z
                                                                                .tournamentCol,
                                                                              d
                                                                                .Z
                                                                                .tournamentColLeft,
                                                                              d
                                                                                .Z
                                                                                .tournamentColGrow1
                                                                            ),
                                                                          children:
                                                                            e.playerName,
                                                                        }
                                                                      ),
                                                                      (0, i.tZ)(
                                                                        "div",
                                                                        {
                                                                          className:
                                                                            o()(
                                                                              d
                                                                                .Z
                                                                                .tournamentCol,
                                                                              d
                                                                                .Z
                                                                                .tournamentColRight
                                                                            ),
                                                                          children:
                                                                            e.value,
                                                                        }
                                                                      ),
                                                                    ],
                                                                  }
                                                                ),
                                                              ],
                                                            })
                                                          ),
                                                        ],
                                                      }),
                                                  }
                                                ),
                                              1 === t &&
                                                (0, i.tZ)(A.z.Info.Prize, {
                                                  children: ({
                                                    prize: e,
                                                    titlePrize: t,
                                                    loading: n,
                                                  }) =>
                                                    (0, i.BX)("div", {
                                                      className:
                                                        d.Z.tournamentTable,
                                                      children: [
                                                        (0, i.BX)("div", {
                                                          className:
                                                            d.Z.tournamentRow,
                                                          children: [
                                                            (0, i.tZ)("div", {
                                                              className: o()(
                                                                d.Z
                                                                  .tournamentCol,
                                                                d.Z
                                                                  .tournamentColW50
                                                              ),
                                                              children: "#",
                                                            }),
                                                            (0, i.tZ)("div", {
                                                              className: o()(
                                                                d.Z
                                                                  .tournamentCol,
                                                                d.Z
                                                                  .tournamentColRight
                                                              ),
                                                              children: t,
                                                            }),
                                                          ],
                                                        }),
                                                        e.map((e, t) =>
                                                          (0, i.BX)("div", {
                                                            className: o()(
                                                              d.Z.tournamentRow,
                                                              {
                                                                [d.Z
                                                                  .tournamentRowOne]:
                                                                  0 === t,
                                                                [d.Z
                                                                  .tournamentRowTwo]:
                                                                  1 === t,
                                                                [d.Z
                                                                  .tournamentRowThree]:
                                                                  2 === t,
                                                              }
                                                            ),
                                                            children: [
                                                              (0, i.tZ)("div", {
                                                                className: o()(
                                                                  d.Z
                                                                    .tournamentCol,
                                                                  d.Z
                                                                    .tournamentColW50
                                                                ),
                                                                children: e.key,
                                                              }),
                                                              (0, i.tZ)("div", {
                                                                className: o()(
                                                                  d.Z
                                                                    .tournamentCol,
                                                                  d.Z
                                                                    .tournamentColRight
                                                                ),
                                                                children:
                                                                  e.value,
                                                              }),
                                                            ],
                                                          })
                                                        ),
                                                      ],
                                                    }),
                                                }),
                                            ],
                                          }),
                                      }),
                                    l &&
                                      (0, i.tZ)("div", {
                                        className: d.Z.tournamentTitle,
                                        children: e("TOURNAMENT.WINNERS"),
                                      }),
                                    l &&
                                      (0, i.tZ)(A.z.Info.Winners, {
                                        children: ({
                                          list: e,
                                          listSpaceIndex: t,
                                          loading: n,
                                          activeId: a,
                                          titlePosition: l,
                                          titleUser: s,
                                          titlePrize: r,
                                          titlePoints: c,
                                        }) =>
                                          (0, i.BX)("div", {
                                            className: d.Z.tournamentTable,
                                            children: [
                                              (0, i.BX)("div", {
                                                className: d.Z.tournamentRow,
                                                children: [
                                                  (0, i.tZ)("div", {
                                                    className: o()(
                                                      d.Z.tournamentCol,
                                                      d.Z.tournamentColW50
                                                    ),
                                                    children: "#",
                                                  }),
                                                  (0, i.tZ)("div", {
                                                    className: o()(
                                                      d.Z.tournamentCol,
                                                      d.Z.tournamentColLeft,
                                                      d.Z.tournamentColW150
                                                    ),
                                                    children: s,
                                                  }),
                                                  (0, i.tZ)("div", {
                                                    className: o()(
                                                      d.Z.tournamentCol,
                                                      d.Z.tournamentColW100
                                                    ),
                                                    children: c,
                                                  }),
                                                  (0, i.tZ)("div", {
                                                    className: o()(
                                                      d.Z.tournamentCol,
                                                      d.Z.tournamentColRight,
                                                      d.Z.tournamentColW50
                                                    ),
                                                    children: r,
                                                  }),
                                                ],
                                              }),
                                              e.map((e, n) =>
                                                (0, i.BX)(i.HY, {
                                                  children: [
                                                    t === n &&
                                                      (0, i.tZ)("div", {
                                                        className: o()(
                                                          d.Z.tournamentTr,
                                                          d.Z.tournamentTrP8
                                                        ),
                                                      }),
                                                    (0, i.BX)("div", {
                                                      className: o()(
                                                        d.Z.tournamentRow,
                                                        {
                                                          [d.Z
                                                            .tournamentRowActive]:
                                                            a === e.playerId,
                                                          [d.Z
                                                            .tournamentRowOne]:
                                                            0 === n,
                                                          [d.Z
                                                            .tournamentRowTwo]:
                                                            1 === n,
                                                          [d.Z
                                                            .tournamentRowThree]:
                                                            2 === n,
                                                        }
                                                      ),
                                                      children: [
                                                        (0, i.tZ)("div", {
                                                          className: o()(
                                                            d.Z.tournamentCol,
                                                            d.Z.tournamentColW50
                                                          ),
                                                          children: e.rank,
                                                        }),
                                                        (0, i.tZ)("div", {
                                                          className: o()(
                                                            d.Z.tournamentCol,
                                                            d.Z
                                                              .tournamentColLeft,
                                                            d.Z
                                                              .tournamentColW150
                                                          ),
                                                          children:
                                                            e.playerName,
                                                        }),
                                                        (0, i.tZ)("div", {
                                                          className: o()(
                                                            d.Z.tournamentCol,
                                                            d.Z
                                                              .tournamentColW100
                                                          ),
                                                          children: e.value,
                                                        }),
                                                        (0, i.tZ)("div", {
                                                          className: o()(
                                                            d.Z.tournamentCol,
                                                            d.Z
                                                              .tournamentColRight,
                                                            d.Z.tournamentColW50
                                                          ),
                                                          children: e.prize,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                })
                                              ),
                                            ],
                                          }),
                                      }),
                                    (0, i.tZ)("div", {
                                      className: d.Z.tournamentTr,
                                    }),
                                    (0, i.tZ)(A.z.Info.Rule, {
                                      children: ({ rules: e, loading: t }) =>
                                        (0, i.tZ)("div", {
                                          className: d.Z.tournamentRules,
                                          children: e,
                                        }),
                                    }),
                                  ],
                                }),
                            }),
                          }),
                        }),
                      }),
                      (0, i.tZ)(C, {}),
                    ],
                  }),
                }),
            }),
          });
        },
        Q = function () {
          const { t: e } = (0, u.useTranslation)();
          return (0, i.tZ)(m.u.Connect, {
            modalName: "freebetsCompleted",
            children: ({ open: t, close: n, ...a }) =>
              (0, i.tZ)(m.u, {
                ...a,
                children: (0, i.tZ)("div", {
                  className: o()(d.Z.freebetsCompleted, {
                    [d.Z.freebetsCompletedOpen]: t,
                    [d.Z.freebetsCompletedClose]: n,
                  }),
                  children: (0, i.tZ)(H.p.Completed, {
                    children: ({
                      titleCongratulations: t,
                      titlePayout: n,
                      titleTotal: a,
                      total: l,
                      currency: s,
                      payout: r,
                    }) =>
                      (0, i.BX)("div", {
                        className: d.Z.freebetsCompletedInner,
                        children: [
                          (0, i.tZ)("div", {
                            className: o()(
                              d.Z.freebetsCompletedLabel,
                              d.Z.freebetsCompletedLabelWin,
                              d.Z.freebetsCompletedLabelTop
                            ),
                          }),
                          (0, i.tZ)("div", {
                            className: o()(
                              d.Z.freebetsCompletedLabel,
                              d.Z.freebetsCompletedLabelWin,
                              d.Z.freebetsCompletedLabelBottom
                            ),
                          }),
                          (0, i.tZ)("div", {
                            className: o()(
                              d.Z.freebetsCompletedLabel,
                              d.Z.freebetsCompletedLabelCongrat,
                              d.Z.freebetsCompletedLabelLeft
                            ),
                          }),
                          (0, i.tZ)("div", {
                            className: o()(
                              d.Z.freebetsCompletedLabel,
                              d.Z.freebetsCompletedLabelCongrat,
                              d.Z.freebetsCompletedLabelRight
                            ),
                          }),
                          (0, i.BX)("div", {
                            className: d.Z.freebetsCompletedCongrat,
                            children: [
                              t,
                              (0, i.tZ)("div", {
                                className: d.Z.freebetsCompletedCongratLayer,
                                children: t,
                              }),
                            ],
                          }),
                          (0, i.BX)("div", {
                            className: d.Z.freebetsCompletedTitle,
                            children: [n, ":"],
                          }),
                          (0, i.BX)("div", {
                            className: d.Z.freebetsCompletedValue,
                            children: [r, " ", s],
                          }),
                          (0, i.BX)("div", {
                            className: d.Z.freebetsCompletedDescription,
                            children: [l, " ", a],
                          }),
                          (0, i.tZ)("div", {
                            className: d.Z.freebetsCompletedButton,
                            children: (0, i.tZ)("div", {
                              className: d.Z.secondaryButton,
                              children: e("COMMON.OK"),
                            }),
                          }),
                        ],
                      }),
                  }),
                }),
              }),
          });
        },
        J = new URLSearchParams(window.location.search).get("cid"),
        ee =
          J &&
          [
            "fortunecoins",
            "zulacasino",
            "sportzino",
            "fortunecoins-dev",
            "fortunecoins-qa",
            "fortunecoins-stg",
            "zula-dev",
            "zula-qa",
            "zula-stg",
            "spzino-dev",
            "spzino-qa",
            "spzino-stg",
          ].includes(J);
      var te = n(2009);
      const ne = (0, r.observer)(function () {
        const {
          profileCommon: {
            profile: { token: e },
          },
          uiCommon: {
            postMessage: t,
            errorCodeResolver: n,
            addLastBetAction: i,
          },
        } = (0, a.GET_STORE)();
        return (
          (0, c.useEffect)(() => {
            try {
              if ("betLike" === t?.data?.type) {
                const {
                    betId: n,
                    customerId: a,
                    playerId: l,
                    action: s,
                  } = t.data?.data,
                  o = te.Z.get("players_likes"),
                  r = JSON.parse(o) || [],
                  c = "like" === s ? [...r, n] : r.filter((e) => e !== n);
                (te.Z.set("players_likes", JSON.stringify(c)),
                  "like" === s
                    ? (0, w.r)(
                        { authorization: e },
                        {
                          token: e,
                          ticketId: n,
                          customerId: Number(a),
                          playerId: l,
                        }
                      )
                    : (0, w.KQ)(
                        { authorization: e },
                        { token: e, ticketId: n, customerId: a, playerId: l }
                      ),
                  i({ betId: n, action: s }));
              }
            } catch (e) {
              console.log("RequestError", e);
            }
          }, [t]),
          null
        );
      });
      var ie = n(7974);
      const ae = (0, r.observer)(function () {
          return (0, i.tZ)(m.u.Connect, {
            modalName: "gameIsDisabled",
            children: ({ open: e, close: t, ...n }) =>
              (0, i.tZ)(m.u, {
                ...n,
                children: (0, i.tZ)("div", {
                  className: o()(d.Z.exit, {
                    [d.Z.exitOpen]: e,
                    [d.Z.exitClose]: t,
                  }),
                  children: (0, i.tZ)(m.u.Content, {
                    children: (0, i.tZ)("div", {
                      className: d.Z.exitInner,
                      children: (0, i.tZ)(ie.Y, {
                        children: ({
                          title: e,
                          description: t,
                          titleRefresh: n,
                          titleBack: a,
                        }) =>
                          (0, i.BX)(i.HY, {
                            children: [
                              (0, i.tZ)("div", {
                                className: d.Z.exitTitle,
                                children: e,
                              }),
                              (0, i.tZ)("div", {
                                className: d.Z.exitDescription,
                                children: t,
                              }),
                              (0, i.BX)("div", {
                                className: d.Z.exitButtons,
                                children: [
                                  (0, i.tZ)("div", {
                                    className: o()(
                                      d.Z.primaryButton,
                                      d.Z.primaryButtonRed
                                    ),
                                    onClick: () => history.back(),
                                    children: a,
                                  }),
                                  (0, i.tZ)(m.u.Submit, {
                                    children: (0, i.tZ)("div", {
                                      className: d.Z.secondaryButton,
                                      children: n,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                      }),
                    }),
                  }),
                }),
              }),
          });
        }),
        le = (0, l.createContext)({}),
        se = function ({ logoImg: e, guide: t = null }) {
          if (!(0, a.GET_GAME_CONFIG)().module) return null;
          if (!(0, a.GET_GAME_CONFIG)().module.moduleLayout) return null;
          const n = (0, a.GET_GAME_CONFIG)(),
            l = n.module.moduleSetting;
          return (
            ee &&
              (l.mybets && (l.mybets = !1),
              l.mybetsinfo && (l.mybetsinfo = !1)),
            (0, i.tZ)(i.HY, {
              children: (0, i.BX)(le.Provider, {
                value: { config: n, settings: l },
                children: [
                  (0, i.tZ)(z, { logoImg: e, guide: t }),
                  (0, i.tZ)(ae, {}),
                  (0, i.tZ)(W, {}),
                  l.exit && (0, i.tZ)(q, {}),
                  l.tournaments && (0, i.tZ)(j, {}),
                  l.freebets && (0, i.tZ)(Q, {}),
                  (0, i.tZ)(ne, {}),
                ],
              }),
            })
          );
        };
    },
  },
]);
