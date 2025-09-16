"use strict";
(self.webpackChunkfederation_modules =
  self.webpackChunkfederation_modules || []).push([
  [4992],
  {
    3645: (e) => {
      e.exports = function (e) {
        var t = [];
        return (
          (t.toString = function () {
            return this.map(function (t) {
              var n = "",
                r = void 0 !== t[5];
              return (
                t[4] && (n += "@supports (".concat(t[4], ") {")),
                t[2] && (n += "@media ".concat(t[2], " {")),
                r &&
                  (n += "@layer".concat(
                    t[5].length > 0 ? " ".concat(t[5]) : "",
                    " {"
                  )),
                (n += e(t)),
                r && (n += "}"),
                t[2] && (n += "}"),
                t[4] && (n += "}"),
                n
              );
            }).join("");
          }),
          (t.i = function (e, n, r, a, o) {
            "string" == typeof e && (e = [[null, e, void 0]]);
            var s = {};
            if (r)
              for (var i = 0; i < this.length; i++) {
                var c = this[i][0];
                null != c && (s[c] = !0);
              }
            for (var l = 0; l < e.length; l++) {
              var u = [].concat(e[l]);
              (r && s[u[0]]) ||
                (void 0 !== o &&
                  (void 0 === u[5] ||
                    (u[1] = "@layer"
                      .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                      .concat(u[1], "}")),
                  (u[5] = o)),
                n &&
                  (u[2]
                    ? ((u[1] = "@media ".concat(u[2], " {").concat(u[1], "}")),
                      (u[2] = n))
                    : (u[2] = n)),
                a &&
                  (u[4]
                    ? ((u[1] = "@supports ("
                        .concat(u[4], ") {")
                        .concat(u[1], "}")),
                      (u[4] = a))
                    : (u[4] = "".concat(a))),
                t.push(u));
            }
          }),
          t
        );
      };
    },
    1667: (e) => {
      e.exports = function (e, t) {
        return (
          t || (t = {}),
          e
            ? ((e = String(e.__esModule ? e.default : e)),
              /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
              t.hash && (e += t.hash),
              /["'() \t\n]|(%20)/.test(e) || t.needQuotes
                ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"')
                : e)
            : e
        );
      };
    },
    8081: (e) => {
      e.exports = function (e) {
        return e[1];
      };
    },
    3379: (e) => {
      var t = [];
      function n(e) {
        for (var n = -1, r = 0; r < t.length; r++)
          if (t[r].identifier === e) {
            n = r;
            break;
          }
        return n;
      }
      function r(e, r) {
        for (var o = {}, s = [], i = 0; i < e.length; i++) {
          var c = e[i],
            l = r.base ? c[0] + r.base : c[0],
            u = o[l] || 0,
            d = "".concat(l, " ").concat(u);
          o[l] = u + 1;
          var p = n(d),
            h = {
              css: c[1],
              media: c[2],
              sourceMap: c[3],
              supports: c[4],
              layer: c[5],
            };
          if (-1 !== p) (t[p].references++, t[p].updater(h));
          else {
            var m = a(h, r);
            ((r.byIndex = i),
              t.splice(i, 0, { identifier: d, updater: m, references: 1 }));
          }
          s.push(d);
        }
        return s;
      }
      function a(e, t) {
        var n = t.domAPI(t);
        return (
          n.update(e),
          function (t) {
            if (t) {
              if (
                t.css === e.css &&
                t.media === e.media &&
                t.sourceMap === e.sourceMap &&
                t.supports === e.supports &&
                t.layer === e.layer
              )
                return;
              n.update((e = t));
            } else n.remove();
          }
        );
      }
      e.exports = function (e, a) {
        var o = r((e = e || []), (a = a || {}));
        return function (e) {
          e = e || [];
          for (var s = 0; s < o.length; s++) {
            var i = n(o[s]);
            t[i].references--;
          }
          for (var c = r(e, a), l = 0; l < o.length; l++) {
            var u = n(o[l]);
            0 === t[u].references && (t[u].updater(), t.splice(u, 1));
          }
          o = c;
        };
      };
    },
    569: (e) => {
      var t = {};
      e.exports = function (e, n) {
        var r = (function (e) {
          if (void 0 === t[e]) {
            var n = document.querySelector(e);
            if (
              window.HTMLIFrameElement &&
              n instanceof window.HTMLIFrameElement
            )
              try {
                n = n.contentDocument.head;
              } catch (e) {
                n = null;
              }
            t[e] = n;
          }
          return t[e];
        })(e);
        if (!r)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        r.appendChild(n);
      };
    },
    9216: (e) => {
      e.exports = function (e) {
        var t = document.createElement("style");
        return (e.setAttributes(t, e.attributes), e.insert(t, e.options), t);
      };
    },
    3565: (e, t, n) => {
      e.exports = function (e) {
        var t = n.nc;
        t && e.setAttribute("nonce", t);
      };
    },
    7795: (e) => {
      e.exports = function (e) {
        if ("undefined" == typeof document)
          return { update: function () {}, remove: function () {} };
        var t = e.insertStyleElement(e);
        return {
          update: function (n) {
            !(function (e, t, n) {
              var r = "";
              (n.supports && (r += "@supports (".concat(n.supports, ") {")),
                n.media && (r += "@media ".concat(n.media, " {")));
              var a = void 0 !== n.layer;
              (a &&
                (r += "@layer".concat(
                  n.layer.length > 0 ? " ".concat(n.layer) : "",
                  " {"
                )),
                (r += n.css),
                a && (r += "}"),
                n.media && (r += "}"),
                n.supports && (r += "}"));
              var o = n.sourceMap;
              (o &&
                "undefined" != typeof btoa &&
                (r +=
                  "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                    btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
                    " */"
                  )),
                t.styleTagTransform(r, e, t.options));
            })(t, e, n);
          },
          remove: function () {
            !(function (e) {
              if (null === e.parentNode) return !1;
              e.parentNode.removeChild(e);
            })(t);
          },
        };
      };
    },
    4589: (e) => {
      e.exports = function (e, t) {
        if (t.styleSheet) t.styleSheet.cssText = e;
        else {
          for (; t.firstChild; ) t.removeChild(t.firstChild);
          t.appendChild(document.createTextNode(e));
        }
      };
    },
    7879: (e, t, n) => {
      n.d(t, { _: () => _, t: () => k });
      var r = n(6584),
        a = n(5160),
        o = n(2734),
        s = n(4977),
        i = n(4474),
        c = n(6511),
        l = n(3922),
        u = n(2667),
        d = n(2009),
        p = n(7791);
      const h = (0, s.observer)(function ({
          children: e,
          customUrl: t = null,
          customPath: n = null,
          withClientPublicUrl: s = !0,
          resultIndex: i,
        }) {
          let {
            uiCommon: {
              betInfoGameId: c,
              betInfoId: h,
              isMobile: m,
              orientation: g,
            },
            profileCommon: {
              rates: f,
              language: y,
              rtp: b,
              profile: { rounding: v, id: w, currency: C },
              settings: { options: M },
            },
          } = (0, l.GET_STORE)();
          const S = (0, o.useRef)(null),
            P = new URLSearchParams(window.location.search),
            E = P.get("cid"),
            x = P.get("sub_partner_id"),
            [H, $] = (0, o.useState)(0);
          if (
            ((0, o.useEffect)(() => {
              const e = (0, p.L)({
                iframeHeight: (e) => {
                  $(e);
                },
                getPlayerId: () => {
                  S.current.contentWindow.postMessage(
                    { type: "playerId", data: w },
                    "*"
                  );
                },
                getIsDemo: () => {
                  const e = new URLSearchParams(document.location.search),
                    t = e.get("cid"),
                    n = e.get("token"),
                    r = e.get("demo"),
                    a =
                      !Boolean(t) ||
                      !Boolean(n) ||
                      (t === u.LY && "false" !== r);
                  S.current.contentWindow.postMessage(
                    { type: "isDemo", data: a },
                    "*"
                  );
                },
                getLocalStorageBetData: () => {
                  const e = d.Z.get("players_likes"),
                    t = JSON.parse(e) || [];
                  S.current.contentWindow.postMessage(
                    { type: "localStorageBetData", data: t },
                    "*"
                  );
                },
                getCurrencyRates: () => {
                  try {
                    const e = f ? JSON.parse(JSON.stringify(f)) : null;
                    S.current.contentWindow.postMessage(
                      { type: "currencyRates", data: e },
                      "*"
                    );
                  } catch (e) {
                    console.error(
                      "Error serializing or posting currency rates:",
                      e
                    );
                  }
                },
                getUserCurrency: () => {
                  S.current.contentWindow.postMessage(
                    { type: "userCurrency", data: C },
                    "*"
                  );
                },
              });
              return () => e();
            }, []),
            !c || !h)
          )
            return null;
          const O = new URLSearchParams(window.location.search).get("host"),
            T = (s && (0, l.GET_GAME_CONFIG)().gameClientPublicUrl) || "",
            N = `${t || window.location.origin}${T}/${n || "render"}`,
            I = new URL(N);
          return (
            I.searchParams.append("betId", h),
            I.searchParams.append("cid", E),
            x && I.searchParams.append("sub", x),
            I.searchParams.append("mobile", `${m}`),
            I.searchParams.append("orientation", `${g}`),
            I.searchParams.append("locale", y),
            I.searchParams.append("rounding", String(v)),
            I.searchParams.append(
              "fontSize",
              document.documentElement.style.fontSize
            ),
            I.searchParams.append("gameClientPublicUrl", T),
            I.searchParams.append("bgTransparent", "true"),
            I.searchParams.append("rtp", `${b}`),
            M?.customBr &&
              I.searchParams.append("customBrFields", `${M?.customBr}`),
            O && I.searchParams.append("host", O),
            i && I.searchParams.append("ri", i),
            (0, r.tZ)(r.HY, {
              children: (0, a.toChildArray)(e).map((e) =>
                (0, a.cloneElement)(e, {
                  ref: S,
                  src: `${I.toString()}`,
                  frameBorder: 0,
                  style: { minHeight: H },
                })
              ),
            })
          );
        }),
        m = (0, a.createContext)({}),
        g = (0, s.observer)(function ({ children: e, useFullHeight: t = !1 }) {
          const [n, a] = (0, o.useState)(void 0),
            s = new URLSearchParams(window.location.search),
            i = s.get("fontSize"),
            c = s.get("rounding") || "2",
            l = s.get("bgTransparent"),
            u = s.get("orientation");
          return (
            i && document.documentElement.style.setProperty("font-size", i),
            (0, o.useEffect)(() => {
              const e = document.getElementById("app");
              if (e) {
                ((e.style.position = "relative"),
                  t && (e.style.height = "100%"));
                const n = new ResizeObserver(function (e) {
                  (window.parent.postMessage(
                    {
                      type: "iframeHeight",
                      data: Math.ceil(e[0].target.clientHeight),
                    },
                    "*"
                  ),
                    window.parent.postMessage({ type: "iframeReady" }, "*"));
                });
                return (
                  n.observe(e),
                  () => {
                    (n.unobserve(e), (e.style.position = ""));
                  }
                );
              }
            }, [n]),
            (0, o.useEffect)(() => {
              const e = (0, p.L)({
                betData: (e) => {
                  a(e);
                },
              });
              return () => e();
            }, []),
            n
              ? (0, r.BX)(r.HY, {
                  children: [
                    l &&
                      (0, r.tZ)("style", {
                        children:
                          "\n        html, body {\n          background-color: transparent !important;\n        }\n      ",
                      }),
                    (0, r.tZ)(m.Provider, {
                      value: {
                        betData: n,
                        rounding: Number(c),
                        orientation: u,
                      },
                      children: (0, r.tZ)(r.HY, {
                        children: e({
                          betData: n,
                          rounding: Number(c),
                          orientation: u,
                        }),
                      }),
                    }),
                  ],
                })
              : null
          );
        });
      var f = (e = "", t = 17) =>
        e && e.length > t ? `${e.slice(0, t)}...` : e;
      const y = (0, s.observer)(function ({ children: e }) {
        const {
          betData: { id: t },
        } = (0, o.useContext)(_);
        return (0, r.tZ)(r.HY, { children: e({ text: f(t), title: t }) });
      });
      var b = n(286),
        v = n(2464),
        w = n(5301);
      const C = (0, s.observer)(function ({
          children: e,
          convertToUserCurrency: t = !1,
        }) {
          const {
              betData: { amount: n, currency: a },
              rounding: s,
              rates: i,
              userCurrency: c,
            } = (0, o.useContext)(_),
            { t: l } = (0, b.useTranslation)(),
            u = t && i && c ? (0, w.Z)(i, a, c, n) : n,
            d = t && i && c ? c : a;
          return (0, r.tZ)(r.HY, {
            children: e({
              title: l("COMMON.BET_AMOUNT"),
              text: `${(0, v.Z)(u, s)} ${d}`,
            }),
          });
        }),
        M = (0, s.observer)(function ({ children: e }) {
          const {
            betData: {
              game: { clientSeed: t, fair: n },
            },
          } = (0, o.useContext)(_);
          return t || n?.clientSeed
            ? (0, r.tZ)(r.HY, {
                children: e({
                  title: "Client Seed",
                  text: `${t ?? n?.clientSeed}`,
                }),
              })
            : null;
        }),
        S = (0, s.observer)(function ({ children: e }) {
          const {
              betData: { coefficient: t, payoutCoefficient: n },
            } = (0, o.useContext)(_),
            { t: a } = (0, b.useTranslation)();
          return (0, r.tZ)(r.HY, {
            children: e({
              title: a("COMMON.MULTIPLIER"),
              text: n ? `${n}` : null,
            }),
          });
        }),
        P = (0, s.observer)(function ({ children: e }) {
          const {
              betData: { updatedAt: t },
            } = (0, o.useContext)(_),
            { t: n } = (0, b.useTranslation)(),
            a = new URLSearchParams(window.location.search).get("locale"),
            s = new Date(t),
            i = new Intl.DateTimeFormat(a ? a.slice(0, 2) : "en", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            }).format(s);
          return (0, r.tZ)(r.HY, {
            children: e({ title: n("COMMON.DATE"), text: i }),
          });
        }),
        E = (0, s.observer)(function ({ children: e }) {
          const { t } = (0, b.useTranslation)(),
            {
              betData: {
                game: { hash: n },
              },
            } = (0, o.useContext)(_);
          return n
            ? (0, r.tZ)(r.HY, {
                children: e({ title: t("COMMON.HASH"), text: `${n}` }),
              })
            : null;
        }),
        x = (0, s.observer)(function ({ children: e }) {
          const { t } = (0, b.useTranslation)(),
            {
              betData: {
                game: { encryptedHash: n },
              },
            } = (0, o.useContext)(_);
          return n
            ? (0, r.tZ)(r.HY, {
                children: e({ title: t("COMMON.ENCRYPTEDHASH"), text: `${n}` }),
              })
            : null;
        }),
        H = (0, s.observer)(function ({ children: e }) {
          const { t } = (0, b.useTranslation)(),
            {
              betData: {
                game: { salt: n },
              },
            } = (0, o.useContext)(_);
          return n
            ? (0, r.tZ)(r.HY, {
                children: e({ title: t("COMMON.SALT"), text: `${n}` }),
              })
            : null;
        }),
        $ = (0, s.observer)(function ({ children: e }) {
          const {
            betData: {
              game: { nonce: t, fair: n },
            },
          } = (0, o.useContext)(_);
          return t || n?.nonce
            ? (0, r.tZ)(r.HY, {
                children: e({ title: "Nonce", text: `${t ?? n?.nonce}` }),
              })
            : null;
        });
      var O = n(8596);
      const T = (0, s.observer)(function ({
          children: e,
          convertToUserCurrency: t = !1,
        }) {
          const {
              betData: { payout: n, currency: a },
              rounding: s,
              rates: i,
              userCurrency: c,
            } = (0, o.useContext)(_),
            { t: u } = (0, b.useTranslation)(),
            d = (0, l.GET_GAME_CONFIG)(),
            p = d?.module?.moduleSetting?.truncateDecimalsMybetsPayout,
            h = t && i && c ? (0, w.Z)(i, a, c, n) : n,
            m = t && i && c ? c : a;
          return (0, r.tZ)(r.HY, {
            children: e({
              title: u("COMMON.PAYOUT"),
              text: `${p ? (0, O.Z)(h, s) : (0, v.Z)(h, s)} ${m}`,
            }),
          });
        }),
        N = (0, s.observer)(function ({ children: e }) {
          const {
              betData: {
                player: { id: t },
              },
            } = (0, o.useContext)(_),
            { t: n } = (0, b.useTranslation)();
          return (0, r.tZ)(r.HY, {
            children: e({ title: n("COMMON.PLAYER_ID"), text: t }),
          });
        }),
        I = (0, s.observer)(function ({ children: e }) {
          const {
              betData: {
                player: { nickname: t },
              },
            } = (0, o.useContext)(_),
            { t: n } = (0, b.useTranslation)();
          return (0, r.tZ)(r.HY, {
            children: e({ title: n("COMMON.NICKNAME"), text: t }),
          });
        }),
        D = (0, s.observer)(function ({ children: e }) {
          const {
            betData: {
              game: { serverSeed: t, fair: n },
            },
          } = (0, o.useContext)(_);
          return t || n?.serverSeed
            ? (0, r.tZ)(r.HY, {
                children: e({
                  title: "Server seed",
                  text: `${t ?? n?.serverSeed}`,
                }),
              })
            : null;
        }),
        Z = (0, s.observer)(function ({ children: e }) {
          const {
            betData: {
              game: {
                exState: { mask: t },
              },
            },
          } = (0, o.useContext)(_);
          return t
            ? (0, r.tZ)(r.HY, {
                children: e({ title: "exState", text: `${t}` }),
              })
            : null;
        }),
        L = (0, s.observer)(function ({ children: e }) {
          const { t } = (0, b.useTranslation)(),
            {
              betData: {
                game: { encryptedHashes: n },
              },
            } = (0, o.useContext)(_);
          return n
            ? (0, r.tZ)(r.HY, {
                children: e({
                  title: t("COMMON.ENCRYPTEDHASHES"),
                  text: "",
                  values: n,
                }),
              })
            : null;
        }),
        R = (0, s.observer)(function ({ children: e }) {
          const {
              betData: { balance: t, currency: n },
              rounding: a,
            } = (0, o.useContext)(_),
            { t: s } = (0, b.useTranslation)();
          return (0, r.tZ)(r.HY, {
            children: e({
              title: s("COMMON.BALANCE_BEFORE"),
              text: `${t} ${n.toUpperCase()}`,
            }),
          });
        }),
        U = (0, s.observer)(function ({ children: e }) {
          const {
              betData: { finalBalance: t, currency: n },
              rounding: a,
            } = (0, o.useContext)(_),
            { t: s } = (0, b.useTranslation)();
          return (0, r.tZ)(r.HY, {
            children: e({
              title: s("COMMON.BALANCE_AFTER"),
              text: `${t} ${n.toUpperCase()}`,
            }),
          });
        }),
        Y = (0, s.observer)(function ({
          children: e,
          customUrl: t = null,
          customPath: n = null,
          isMobile: s,
          orientation: i,
          language: c,
          rtp: l,
          rounding: u,
          gameClientPublicUrl: d,
          cid: h,
          sub: m,
          betData: g,
        }) {
          const [f, y] = (0, o.useState)(0),
            [b, v] = (0, o.useState)(!1),
            w = (0, o.useRef)(null);
          if (!g) return null;
          const C = new URLSearchParams(window.location.search).get("host"),
            M = `${t || window.location.origin}${d || ""}/${n || "render"}`,
            S = new URL(M);
          return (
            S.searchParams.append("betId", g.id),
            S.searchParams.append("cid", h),
            S.searchParams.append("sub", m),
            S.searchParams.append("mobile", `${s}`),
            S.searchParams.append("orientation", `${i}`),
            S.searchParams.append("locale", c),
            S.searchParams.append("rounding", String(u)),
            S.searchParams.append(
              "fontSize",
              document.documentElement.style.fontSize
            ),
            S.searchParams.append("bgTransparent", "true"),
            S.searchParams.append("rtp", `${l}`),
            C && S.searchParams.append("host", C),
            (0, o.useEffect)(() => {
              w.current?.contentWindow &&
                b &&
                w.current.contentWindow.postMessage(
                  { type: "betData", data: g },
                  "*"
                );
            }, [g, w.current?.contentWindow, b]),
            (0, o.useEffect)(() => {
              const e = (0, p.L)({
                iframeHeight: (e) => {
                  y(e);
                },
                iframeReady: () => {
                  v(!0);
                },
              });
              return () => e();
            }, []),
            (0, r.tZ)(r.HY, {
              children: (0, a.toChildArray)(e).map((e) =>
                (0, a.cloneElement)(e, {
                  ref: w,
                  src: `${S.toString()}`,
                  frameBorder: 0,
                  style: { minHeight: f },
                })
              ),
            })
          );
        }),
        A = (0, s.observer)(function ({
          children: e,
          convertToUserCurrency: t = !1,
        }) {
          const {
              betData: {
                id: n,
                encryptedHashes: a,
                updatedAt: s,
                player: { id: i, nickname: c },
              },
            } = (0, o.useContext)(_),
            { t: l } = (0, b.useTranslation)(),
            u = new URLSearchParams(window.location.search).get("locale"),
            d = new Date(s);
          new Intl.DateTimeFormat(u ? u.slice(0, 2) : "en", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
          }).format(d);
          let p = "";
          try {
            p = JSON.stringify(a);
          } catch (e) {
            console.error(e);
          }
          const h = [
            { title: l("COMMON.BET_ID"), value: n },
            { title: l("COMMON.PLAYER_ID"), value: i },
          ];
          let m = "";
          try {
            m = JSON.stringify(h);
          } catch (e) {
            console.error(e);
          }
          return (0, r.tZ)(r.HY, {
            children: e({
              title: l("COMMON.BET_AMOUNT"),
              values: h,
              valuesString: m,
            }),
          });
        }),
        B = (0, s.observer)(function ({ children: e }) {
          const t = (0, l.GET_GAME_CONFIG)().module?.modulePageRender,
            {
              betData: { game: n, fair: a },
            } = (0, o.useContext)(_);
          return t &&
            Object.entries(t).some(([e, t]) => !(!t || !(n[e] || (a && a[e]))))
            ? (0, r.tZ)(r.HY, { children: e })
            : null;
        }),
        _ = (0, a.createContext)({}),
        k = Object.assign(
          (0, s.observer)(function ({
            children: e,
            useBetsApi: t = !1,
            customBetId: n = null,
            withShortUrl: a = !1,
            rates: s = null,
            userCurrency: l = null,
          }) {
            let u = new URLSearchParams(window.location.search);
            u =
              a && u.get("code") ? (0, c.t)().decode(window.location.href) : u;
            const [d, p] = (0, o.useState)(void 0),
              h = n || u.get("betId"),
              m = u.get("ri"),
              g = u.get("fontSize"),
              f = u.get("rounding") || "2",
              y = u.get("bgTransparent"),
              b = "true" === u.get("customBrFields");
            return h
              ? ((0, o.useEffect)(() => {
                  (async () => {
                    try {
                      const e = await (0, i.Qk)({
                        headers: {},
                        betId: h,
                        useBetsApi: t,
                      });
                      let n = e.data;
                      if (m)
                        try {
                          const { payout: t, payoutCoefficient: r } =
                            e.data.game?.results?.[m];
                          n = {
                            ...n,
                            payout: t,
                            payoutCoefficient: r,
                            resultIndex: m,
                          };
                        } catch (e) {
                          console.log("Error processing bets data");
                        }
                      (p(n),
                        a &&
                          window.location.href.includes("share") &&
                          (function ({ gameId: e }) {
                            if (
                              ((window.dataLayer = window.dataLayer || []), e)
                            ) {
                              const t = {
                                action: "init",
                                event: "ga4_interaction",
                                safe_url: document.location.href,
                                object: e,
                                size: `${window.innerWidth}x${window.innerHeight}`,
                              };
                              window.dataLayer.push(t);
                            }
                            window.dataLayer.push({
                              "gtm.start": new Date().getTime(),
                              event: "gtm.js",
                            });
                            const t =
                                document.getElementsByTagName("script")[0],
                              n = document.createElement("script");
                            ((n.async = !0),
                              (n.src =
                                "https://www.googletagmanager.com/gtm.js?id=GTM-TX65W37"),
                              t.parentNode.insertBefore(n, t));
                          })({ gameId: e.data.gameId }));
                    } catch (e) {
                      console.log("getMyBetsError", e);
                    }
                  })();
                }, []),
                d
                  ? (g &&
                      document.documentElement.style.setProperty(
                        "font-size",
                        g
                      ),
                    (0, o.useEffect)(() => {
                      const e = document.getElementById("app");
                      if (e) {
                        e.style.position = "relative";
                        const t = new ResizeObserver(function (e) {
                          (window.parent.postMessage(
                            {
                              type: "iframeHeight",
                              data: Math.ceil(e[0].target.clientHeight),
                            },
                            "*"
                          ),
                            window.parent.postMessage(
                              JSON.stringify({
                                type: "iframeHeight",
                                height: Math.ceil(e[0].target.clientHeight),
                              }),
                              "*"
                            ));
                        });
                        return (
                          window.parent.postMessage(
                            { type: "iframeReady" },
                            "*"
                          ),
                          t.observe(e),
                          () => {
                            (t.unobserve(e), (e.style.position = ""));
                          }
                        );
                      }
                    }, [d]),
                    (0, r.BX)(r.HY, {
                      children: [
                        y &&
                          (0, r.tZ)("style", {
                            children:
                              "\n        html, body {\n          background-color: transparent !important;\n        }\n      ",
                          }),
                        (0, r.tZ)(_.Provider, {
                          value: {
                            betData: d,
                            rounding: Number(f),
                            rates: s,
                            userCurrency: l,
                          },
                          children: (0, r.tZ)(r.HY, {
                            children: e({
                              betData: d,
                              rounding: Number(f),
                              customBrFields: b,
                            }),
                          }),
                        }),
                      ],
                    }))
                  : null)
              : null;
          }),
          {
            Inner: g,
            Iframe: Object.assign(h, {
              Loading: function ({ children: e }) {
                const [t, n] = (0, o.useState)(!1);
                return (
                  (0, o.useEffect)(() => {
                    const e = (0, p.L)({
                      iframeHeight: (e) => {
                        Number(e) > 0 && n(!0);
                      },
                    });
                    return () => e();
                  }, []),
                  (0, r.tZ)(r.HY, { children: e({ loading: t }) })
                );
              },
              Inner: Y,
            }),
            Id: y,
            Amount: C,
            ClientSeed: M,
            Coefficient: S,
            Date: P,
            Hash: E,
            EncryptedHash: x,
            EncryptedHashes: L,
            Salt: H,
            Nonce: $,
            Payout: T,
            PlayerId: N,
            PlayerName: I,
            ServerSeed: D,
            ExState: Z,
            BalanceBefore: R,
            BalanceAfter: U,
            TechData: A,
            HasFairParams: B,
          }
        );
    },
    7791: (e, t, n) => {
      n.d(t, { L: () => a });
      var r = (e) => {
        try {
          return JSON.parse(e) && !!e;
        } catch (e) {
          return !1;
        }
      };
      function a(e) {
        function t(t) {
          let { type: n, data: a } = t.data || {};
          if (r(t.data)) {
            const r = JSON.parse(t.data);
            if (((n = r.type), (a = r.data), r.height))
              try {
                e[n](r.height);
              } catch (e) {
                console.error(`Error handling message type "${n}":`, e);
              }
          } else if (n && n in e)
            try {
              e[n](a);
            } catch (e) {
              console.error(`Error handling message type "${n}":`, e);
            }
        }
        return (
          window.addEventListener("message", t),
          () => {
            window.removeEventListener("message", t);
          }
        );
      }
    },
    5301: (e, t, n) => {
      var r = n(121);
      t.Z = (e, t, n, a, o = !1) => {
        if (t === n) return (0, r.Z)(a);
        try {
          const [i, c] = e[t],
            [l, u] = e[n],
            d = (a / i) * l,
            p = ((s = o ? c : u), Math.log10(s));
          return (0, r.Z)(d, p);
        } catch (e) {
          return (0, r.Z)(a);
        }
        var s;
      };
    },
    2464: (e, t, n) => {
      n.d(t, { M: () => s });
      const r = [
          "",
          "k",
          "M",
          "G",
          "T",
          "P",
          "E",
          "Z",
          "Y",
          "B",
          "N",
          "D",
          "H",
          "O",
        ],
        a = (e, t) => {
          const n = Math.pow(10, t);
          return Math.round(e * n) / n;
        },
        o = (e) =>
          e
            .replace(/(\.\d*?[1-9])0+$/, "$1")
            .replace(/\.0+$/, "")
            .replace(/\.?$/, "");
      function s(e = 0, t = 2) {
        const n = e.toFixed(t);
        if (n.length <= 8) return n;
        const s = Math.abs(e);
        let i = Math.floor(Math.log10(s) / 3);
        i = Math.min(i, r.length - 1);
        const c = Math.pow(10, 3 * i);
        let l = a(e / c, t).toFixed(t);
        return ((l = o(l)), `${l}${r[i]}`);
      }
      t.Z = s;
    },
    6511: (e, t, n) => {
      n.d(t, { t: () => s });
      var r = n(2734),
        a = n(7670);
      const o = n.n(a)()(
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        ),
        s = () => ({
          generate: (0, r.useCallback)((e) => {
            const t = new URL(e),
              n = t.searchParams.get("betId"),
              r = t.searchParams.get("orientation") || "landscape",
              a = t.searchParams.get("locale") || "en",
              s = parseInt(t.searchParams.get("rounding") || "2"),
              i = parseInt(t.searchParams.get("rtp") || "95"),
              c = ((e) => {
                const t = ((e) =>
                  e
                    .replace(/-/g, "")
                    .match(/.{1,2}/g)
                    .map((e) => parseInt(e, 16)))(e);
                return o.encode(Uint8Array.from(t));
              })(n),
              l = (({
                orientation: e = "landscape",
                locale: t = "en",
                rounding: n = 2,
                rtp: r = 95,
              }) => {
                const a = "portrait" === e ? "p" : "l",
                  o = t.slice(0, 2),
                  s = n.toString(),
                  i = r.toString();
                return `${a}${o}${s.padStart(1, "0")}${i.padStart(2, "0")}`;
              })({ orientation: r, locale: a, rounding: s, rtp: i });
            return `${t.origin}/share?code=${c}_${l}`;
          }, []),
          decode: (0, r.useCallback)((e) => {
            const t = new URL(e),
              n = (t.origin, t.searchParams.get("code"));
            if (!n) throw new Error("Invalid short link: no code found");
            const [r, a] = n.split("_"),
              s = ((e) => {
                const t = o.decode(e);
                return ((e) => {
                  const t = e
                    .map((e) => e.toString(16).padStart(2, "0"))
                    .join("");
                  return `${t.slice(0, 8)}-${t.slice(8, 12)}-${t.slice(12, 16)}-${t.slice(16, 20)}-${t.slice(20)}`;
                })(Array.from(t));
              })(r),
              i = {
                orientation: "p" === (c = a)[0] ? "portrait" : "landscape",
                locale: c.slice(1, 3),
                rounding: parseInt(c[3]),
                rtp: parseInt(c.slice(4)),
              };
            var c;
            return new URLSearchParams({
              betId: s,
              orientation: i.orientation,
              locale: i.locale,
              rounding: i.rounding.toString(),
              rtp: i.rtp.toString(),
            });
          }, []),
        });
    },
  },
]);
