var fm;
(() => {
  "use strict";
  var e,
    a,
    t,
    r,
    d,
    n,
    o,
    f,
    l,
    c,
    i,
    s,
    b,
    u,
    h,
    m,
    p,
    v,
    g,
    P,
    y = {
      2728: (e, a, t) => {
        var r = {
            "./bootstrap": () =>
              Promise.all([t.e(5160), t.e(5535), t.e(1299), t.e(3922)]).then(
                () => () => t(3922)
              ),
            "./assets/scss/globals": () => t.e(859).then(() => () => t(859)),
            "./assets/font/gilroy": () => t.e(5945).then(() => () => t(5945)),
            "./assets/font/icons": () => t.e(7232).then(() => () => t(7232)),
            "./helpers": () => t.e(4938).then(() => () => t(4938)),
            "./ui": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5103),
                t.e(7101),
                t.e(4992),
                t.e(7477),
                t.e(8925),
                t.e(5266),
                t.e(4227),
                t.e(9443),
              ]).then(() => () => t(9443)),
            "./bubbles": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5871),
              ]).then(() => () => t(5871)),
            "./dice": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(6999),
              ]).then(() => () => t(6999)),
            "./mines": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(1553),
              ]).then(() => () => t(1553)),
            "./onetapmines": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5610),
              ]).then(() => () => t(5610)),
            "./multimines": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(3631),
              ]).then(() => () => t(3631)),
            "./bonustowers": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(4668),
              ]).then(() => () => t(4668)),
            "./double": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(1513),
              ]).then(() => () => t(1513)),
            "./plinko": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(8433),
              ]).then(() => () => t(8433)),
            "./crash": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(203),
              ]).then(() => () => t(203)),
            "./vortex": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(3352),
              ]).then(() => () => t(3352)),
            "./olympus": () => t.e(6726).then(() => () => t(6726)),
            "./ultimatedice": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(9495),
              ]).then(() => () => t(9495)),
            "./towers": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(9955),
              ]).then(() => () => t(9955)),
            "./limbo": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(4989),
              ]).then(() => () => t(4989)),
            "./wheel": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5890),
              ]).then(() => () => t(5890)),
            "./crystalpoker": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(6795),
              ]).then(() => () => t(6795)),
            "./holdcrash": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5511),
              ]).then(() => () => t(5511)),
            "./dice3": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7009),
              ]).then(() => () => t(7009)),
            "./jewelclicker": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(6851),
              ]).then(() => () => t(6851)),
            "./pandapoker": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(398),
              ]).then(() => () => t(398)),
            "./catanza": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5443),
              ]).then(() => () => t(5443)),
            "./chickenzap": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5471),
              ]).then(() => () => t(5471)),
            "./clicker": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(431),
                t.e(5103),
                t.e(371),
                t.e(3897),
              ]).then(() => () => t(3897)),
            "./mysteco": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(1259),
              ]).then(() => () => t(1259)),
            "./module/ModuleGroupPreloader": () =>
              Promise.all([t.e(5160), t.e(8255)]).then(() => () => t(8255)),
            "./module/ModuleGroupPageRender": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(4992),
                t.e(1714),
              ]).then(() => () => t(1714)),
            "./module/ModuleGroupPageBet": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(4992),
                t.e(7477),
                t.e(596),
              ]).then(() => () => t(596)),
            "./module/ModuleGroupPageBetIframe": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(4992),
                t.e(7477),
                t.e(6389),
              ]).then(() => () => t(6389)),
            "./module/ModuleGroupPageBetShare": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(4992),
                t.e(7477),
                t.e(596),
                t.e(8143),
              ]).then(() => () => t(8143)),
            "./module/ModuleLayout": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(1858),
              ]).then(() => () => t(1858)),
            "./module/ModuleSetting": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(5103),
                t.e(7101),
                t.e(4992),
                t.e(7477),
                t.e(8925),
                t.e(5266),
                t.e(4227),
                t.e(6238),
              ]).then(() => () => t(6238)),
            "./module/ModuleTurboUniverse": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(4992),
                t.e(8925),
              ]).then(() => () => t(8925)),
            "./module/ModulePaytable": () =>
              Promise.all([
                t.e(5160),
                t.e(5535),
                t.e(1299),
                t.e(3922),
                t.e(1154),
                t.e(7101),
                t.e(588),
              ]).then(() => () => t(588)),
            "./canvas/CanvasController": () =>
              t.e(4340).then(() => () => t(4340)),
          },
          d = (e, a) => (
            (t.R = a),
            (a = t.o(r, e)
              ? r[e]()
              : Promise.resolve().then(() => {
                  throw new Error(
                    'Module "' + e + '" does not exist in container.'
                  );
                })),
            (t.R = void 0),
            a
          ),
          n = (e, a) => {
            if (t.S) {
              var r = "default",
                d = t.S[r];
              if (d && d !== e)
                throw new Error(
                  "Container initialization failed as it has already been initialized with a different share scope"
                );
              return ((t.S[r] = e), t.I(r, a));
            }
          };
        t.d(a, { get: () => d, init: () => n });
      },
    },
    w = {};
  function j(e) {
    var a = w[e];
    if (void 0 !== a) return a.exports;
    var t = (w[e] = { id: e, exports: {} });
    return (y[e].call(t.exports, t, t.exports, j), t.exports);
  }
  ((j.m = y),
    (j.c = w),
    (j.n = (e) => {
      var a = e && e.__esModule ? () => e.default : () => e;
      return (j.d(a, { a }), a);
    }),
    (a = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (j.t = function (t, r) {
      if ((1 & r && (t = this(t)), 8 & r)) return t;
      if ("object" == typeof t && t) {
        if (4 & r && t.__esModule) return t;
        if (16 & r && "function" == typeof t.then) return t;
      }
      var d = Object.create(null);
      j.r(d);
      var n = {};
      e = e || [null, a({}), a([]), a(a)];
      for (var o = 2 & r && t; "object" == typeof o && !~e.indexOf(o); o = a(o))
        Object.getOwnPropertyNames(o).forEach((e) => (n[e] = () => t[e]));
      return ((n.default = () => t), j.d(d, n), d);
    }),
    (j.d = (e, a) => {
      for (var t in a)
        j.o(a, t) &&
          !j.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: a[t] });
    }),
    (j.f = {}),
    (j.e = (e) =>
      Promise.all(Object.keys(j.f).reduce((a, t) => (j.f[t](e, a), a), []))),
    (j.u = (e) =>
      e +
      "." +
      {
        82: "9f18eed490accb73de0a",
        94: "d42bbde86cf6eccdbd89",
        203: "42df8791ac98578f10ca",
        242: "b4ddcc2495bc4b9d5529",
        371: "4be7f5f2a8bfee83286b",
        396: "bce2a24a37393c2f543c",
        398: "6ff1dac85d4beb09f10c",
        431: "60431710acd6b89d8ee7",
        509: "1d3a54d16bad285afa7c",
        552: "93434f81e94a187728d3",
        588: "81c82bbaed9ca4a7fadc",
        595: "f08acafc5acd9000da83",
        596: "28b925a8fc499c818323",
        623: "26bde40c14707fadbc01",
        859: "163ad9118b96ec6f47a5",
        1011: "d2aec95f50c626996ca5",
        1072: "0a00daca5b50cb84908a",
        1154: "b2e6096fd8f744f96d80",
        1218: "9f862884338457d8567f",
        1259: "f9d91c4aa36fa92149fb",
        1299: "a89c22a16e3393b59a57",
        1344: "3fd32fded0bb92c59b69",
        1505: "3591cbafe5923be8fe46",
        1513: "d3dbe8c176ef0ad85e36",
        1553: "a7171fd7462726175ea0",
        1714: "e0299d9ae77000fad341",
        1766: "da3afa1dfd856a9b722f",
        1826: "136f2f5b0af562ee68b7",
        1858: "ff2c8f5f0a360b638f0d",
        1871: "934c74cecbc9eeebfdbc",
        2013: "005116f5917fa9866b94",
        2456: "a23141910ad132b32e8b",
        2534: "90a0f0d830dfecf61c95",
        2654: "444b83d35ef361cff377",
        2679: "d1882b37397deac8312a",
        3051: "ec37dbdcaecbe714e847",
        3072: "1953749c2f628ccce098",
        3352: "0bbc43137ea3eeb03e5c",
        3631: "93e4b431295a2f3208a0",
        3778: "282e881895d9e482d43d",
        3895: "3c9bb659403ace7a84b7",
        3897: "e26ee34a7efa64c8ba19",
        3922: "d771030332b9d67a3041",
        4184: "97678345b9d281ec983f",
        4227: "098f45794d5c4d375774",
        4340: "6e8da6de75be8deb4398",
        4529: "83627b2d9f604bc25d3f",
        4548: "f02f232871c5d97981c7",
        4668: "831baebafd07c2fbf7c4",
        4741: "6f280ee1e79af732f9f7",
        4819: "f214dcfe3b5edcc8e89f",
        4938: "5caacba59442abd21228",
        4989: "8d26357ff43b1ab805b7",
        4992: "e5020668be80fd84fbca",
        5103: "e401eb46e516f54c2cdf",
        5160: "4ae111932f76041b7a8d",
        5266: "a258892af764af62bdd0",
        5415: "c4e210e7484af5798f7c",
        5443: "8bdba6dbaf8edc874ffd",
        5471: "da0fad2cc484fa344b06",
        5511: "9b881abf97c463d93440",
        5535: "86d1a908989a2aa867fd",
        5543: "257fb27804971c335201",
        5576: "53b769f872e0594a019e",
        5610: "4c24b210dc391a232d5e",
        5827: "c632a365dff10f8dd533",
        5871: "4ab0d1a910ec8e935bba",
        5890: "af58f2e768c090aa557f",
        5907: "01a2ef4ee29031e320ae",
        5945: "b4df219b1756d1d992da",
        5946: "417a2e84474201bc8de4",
        6207: "112ec999ee138d056916",
        6238: "bb8ec0eb0567eb10fe37",
        6389: "3c4a4ff420399f444818",
        6400: "3df79382aeae64129bdf",
        6409: "4430cc01036fd7273561",
        6574: "dc289799a02eb7355fce",
        6609: "860bab91037517adf3fa",
        6726: "0928bf75dcf201df0d4f",
        6795: "70b3c06bc196bba6ca6a",
        6851: "7b7f6b713435d6b082a5",
        6858: "d31b20568010f28105d8",
        6908: "089b10d9082c1bc99b56",
        6958: "d303773d8713e8e47393",
        6999: "0128b3b8f1d311c05c49",
        7005: "f195608a5535f1e17632",
        7009: "a4207148e7ce311468ef",
        7017: "261bb2b8242d132b2733",
        7056: "4aace93de3b9bfa77820",
        7101: "d17a089031a0730b7e2c",
        7232: "68e60fe6e9a7434229ca",
        7430: "e49b6a69cd0243a91807",
        7477: "acc4a0d67d0125172b09",
        7829: "8c4a71763e69a1c1dcdf",
        7833: "59e52b1c93ffad954581",
        8009: "439eee2fc3f18629c9fb",
        8025: "e8f82a806d170e4bd963",
        8063: "e78d77b209fae7864684",
        8143: "a8b7c4032b78df9884a2",
        8255: "21ae50f98cd24ebea54b",
        8375: "1f9dda1fcba186e509bf",
        8433: "09e2587c83bee37f4586",
        8438: "627b66911d33dc859875",
        8651: "9d0afd3bdfc74905613c",
        8844: "0eac23abdf676f3757e3",
        8925: "e989f654bb1c21888be0",
        8949: "a684205d017754471cd6",
        9116: "3052f1ee59ace570e644",
        9408: "38479ad1ac8eba2d0088",
        9419: "e0baf22e4a58d6dc6876",
        9443: "bd51d48e23234c297912",
        9472: "2c95145cef9c34dadda1",
        9495: "58d48ffdf088b1f2d00f",
        9556: "31a8618cfb29ed15786e",
        9955: "203dd7981f23d98f1b1f",
      }[e] +
      ".js"),
    (j.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (j.o = (e, a) => Object.prototype.hasOwnProperty.call(e, a)),
    (t = {}),
    (r = "federation-modules:"),
    (j.l = (e, a, d, n) => {
      if (t[e]) t[e].push(a);
      else {
        var o, f;
        if (void 0 !== d)
          for (
            var l = document.getElementsByTagName("script"), c = 0;
            c < l.length;
            c++
          ) {
            var i = l[c];
            if (
              i.getAttribute("src") == e ||
              i.getAttribute("data-webpack") == r + d
            ) {
              o = i;
              break;
            }
          }
        (o ||
          ((f = !0),
          ((o = document.createElement("script")).charset = "utf-8"),
          (o.timeout = 120),
          j.nc && o.setAttribute("nonce", j.nc),
          o.setAttribute("data-webpack", r + d),
          (o.src = e)),
          (t[e] = [a]));
        var s = (a, r) => {
            ((o.onerror = o.onload = null), clearTimeout(b));
            var d = t[e];
            if (
              (delete t[e],
              o.parentNode && o.parentNode.removeChild(o),
              d && d.forEach((e) => e(r)),
              a)
            )
              return a(r);
          },
          b = setTimeout(
            s.bind(null, void 0, { type: "timeout", target: o }),
            12e4
          );
        ((o.onerror = s.bind(null, o.onerror)),
          (o.onload = s.bind(null, o.onload)),
          f && document.head.appendChild(o));
      }
    }),
    (j.r = (e) => {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (() => {
      j.S = {};
      var e = {},
        a = {};
      j.I = (t, r) => {
        r || (r = []);
        var d = a[t];
        if ((d || (d = a[t] = {}), !(r.indexOf(d) >= 0))) {
          if ((r.push(d), e[t])) return e[t];
          j.o(j.S, t) || (j.S[t] = {});
          var n = j.S[t],
            o = "federation-modules",
            f = (e, a, t, r) => {
              var d = (n[e] = n[e] || {}),
                f = d[a];
              (!f || (!f.loaded && (!r != !f.eager ? r : o > f.from))) &&
                (d[a] = { get: t, from: o, eager: !!r });
            },
            l = [];
          return (
            "default" === t &&
              (f("@fingerprintjs/fingerprintjs", "4.5.1", () =>
                j.e(4529).then(() => () => j(4529))
              ),
              f("axios", "1.4.0", () => j.e(1871).then(() => () => j(1871))),
              f("base-x", "5.0.1", () => j.e(82).then(() => () => j(82))),
              f("centrifuge", "2.8.5", () =>
                j.e(6574).then(() => () => j(6574))
              ),
              f("classnames", "2.3.2", () =>
                j.e(4184).then(() => () => j(4184))
              ),
              f("fflate", "0.8.2", () => j.e(3778).then(() => () => j(3778))),
              f("howler", "2.2.3", () => j.e(1766).then(() => () => j(1766))),
              f("i18next", "23.2.8", () => j.e(6609).then(() => () => j(6609))),
              f("jwt-js-decode", "1.8.2", () =>
                Promise.all([j.e(2679), j.e(8009)]).then(() => () => j(2679))
              ),
              f("markdown-to-jsx", "7.3.2", () =>
                Promise.all([j.e(5160), j.e(5535), j.e(9419)]).then(
                  () => () => j(5576)
                )
              ),
              f("mobx-react-lite", "3.4.3", () =>
                Promise.all([j.e(5160), j.e(5535), j.e(1299), j.e(4548)]).then(
                  () => () => j(242)
                )
              ),
              f("mobx", "6.9.0", () => j.e(8949).then(() => () => j(8949))),
              f("preact/hooks", "0.1.0", () =>
                Promise.all([j.e(5160), j.e(396)]).then(() => () => j(396))
              ),
              f("preact", "10.15.1", () => j.e(6400).then(() => () => j(6400))),
              f("react-fast-marquee", "1.6.5", () =>
                Promise.all([j.e(5160), j.e(5535), j.e(6958)]).then(
                  () => () => j(7005)
                )
              ),
              f("react-i18next", "13.0.1", () =>
                Promise.all([j.e(5160), j.e(5535), j.e(8438)]).then(
                  () => () => j(1072)
                )
              ),
              f("recursive-diff", "1.0.9", () =>
                j.e(7829).then(() => () => j(7829))
              ),
              f("uuid", "9.0.0", () => j.e(7017).then(() => () => j(7017)))),
            (e[t] = l.length ? Promise.all(l).then(() => (e[t] = 1)) : 1)
          );
        }
      };
    })(),
    (() => {
      var e;
      j.g.importScripts && (e = j.g.location + "");
      var a = j.g.document;
      if (!e && a && (a.currentScript && (e = a.currentScript.src), !e)) {
        var t = a.getElementsByTagName("script");
        if (t.length) for (var r = t.length - 1; r > -1 && !e; ) e = t[r--].src;
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      ((e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (j.p = e));
    })(),
    (d = (e) => {
      var a = (e) => e.split(".").map((e) => (+e == e ? +e : e)),
        t = /^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),
        r = t[1] ? a(t[1]) : [];
      return (
        t[2] && (r.length++, r.push.apply(r, a(t[2]))),
        t[3] && (r.push([]), r.push.apply(r, a(t[3]))),
        r
      );
    }),
    (n = (e, a) => {
      ((e = d(e)), (a = d(a)));
      for (var t = 0; ; ) {
        if (t >= e.length) return t < a.length && "u" != (typeof a[t])[0];
        var r = e[t],
          n = (typeof r)[0];
        if (t >= a.length) return "u" == n;
        var o = a[t],
          f = (typeof o)[0];
        if (n != f) return ("o" == n && "n" == f) || "s" == f || "u" == n;
        if ("o" != n && "u" != n && r != o) return r < o;
        t++;
      }
    }),
    (o = (e) => {
      var a = e[0],
        t = "";
      if (1 === e.length) return "*";
      if (a + 0.5) {
        t +=
          0 == a
            ? ">="
            : -1 == a
              ? "<"
              : 1 == a
                ? "^"
                : 2 == a
                  ? "~"
                  : a > 0
                    ? "="
                    : "!=";
        for (var r = 1, d = 1; d < e.length; d++)
          (r--,
            (t +=
              "u" == (typeof (f = e[d]))[0]
                ? "-"
                : (r > 0 ? "." : "") + ((r = 2), f)));
        return t;
      }
      var n = [];
      for (d = 1; d < e.length; d++) {
        var f = e[d];
        n.push(
          0 === f
            ? "not(" + l() + ")"
            : 1 === f
              ? "(" + l() + " || " + l() + ")"
              : 2 === f
                ? n.pop() + " " + n.pop()
                : o(f)
        );
      }
      return l();
      function l() {
        return n.pop().replace(/^\((.+)\)$/, "$1");
      }
    }),
    (f = (e, a) => {
      if (0 in e) {
        a = d(a);
        var t = e[0],
          r = t < 0;
        r && (t = -t - 1);
        for (var n = 0, o = 1, l = !0; ; o++, n++) {
          var c,
            i,
            s = o < e.length ? (typeof e[o])[0] : "";
          if (n >= a.length || "o" == (i = (typeof (c = a[n]))[0]))
            return !l || ("u" == s ? o > t && !r : ("" == s) != r);
          if ("u" == i) {
            if (!l || "u" != s) return !1;
          } else if (l)
            if (s == i)
              if (o <= t) {
                if (c != e[o]) return !1;
              } else {
                if (r ? c > e[o] : c < e[o]) return !1;
                c != e[o] && (l = !1);
              }
            else if ("s" != s && "n" != s) {
              if (r || o <= t) return !1;
              ((l = !1), o--);
            } else {
              if (o <= t || i < s != r) return !1;
              l = !1;
            }
          else "s" != s && "n" != s && ((l = !1), o--);
        }
      }
      var b = [],
        u = b.pop.bind(b);
      for (n = 1; n < e.length; n++) {
        var h = e[n];
        b.push(1 == h ? u() | u() : 2 == h ? u() & u() : h ? f(h, a) : !u());
      }
      return !!u();
    }),
    (l = (e, a) => {
      var t = e[a];
      return Object.keys(t).reduce(
        (e, a) => (!e || (!t[e].loaded && n(e, a)) ? a : e),
        0
      );
    }),
    (c = (e, a, t, r) =>
      "Unsatisfied version " +
      t +
      " from " +
      (t && e[a][t].from) +
      " of shared singleton module " +
      a +
      " (required " +
      o(r) +
      ")"),
    (i = (e, a, t, r) => {
      var d = l(e, t);
      return (f(r, d) || b(c(e, t, d, r)), u(e[t][d]));
    }),
    (s = (e, a, t) => {
      var r = e[a];
      return (
        (a = Object.keys(r).reduce(
          (e, a) => (!f(t, a) || (e && !n(e, a)) ? e : a),
          0
        )) && r[a]
      );
    }),
    (b = (e) => {
      "undefined" != typeof console && console.warn && console.warn(e);
    }),
    (u = (e) => ((e.loaded = 1), e.get())),
    (m = (h = (e) =>
      function (a, t, r, d) {
        var n = j.I(a);
        return n && n.then
          ? n.then(e.bind(e, a, j.S[a], t, r, d))
          : e(a, j.S[a], t, r, d);
      })((e, a, t, r, d) => (a && j.o(a, t) ? i(a, 0, t, r) : d()))),
    (p = h((e, a, t, r, d) => {
      var n = a && j.o(a, t) && s(a, t, r);
      return n ? u(n) : d();
    })),
    (v = {}),
    (g = {
      5160: () =>
        m("default", "preact", [1, 10, 15, 1], () =>
          j.e(6400).then(() => () => j(6400))
        ),
      5535: () =>
        m("default", "preact/hooks", [1, 10, 0, 0], () =>
          j.e(552).then(() => () => j(396))
        ),
      1299: () =>
        m("default", "mobx", [1, 6, 9, 0], () =>
          j.e(8949).then(() => () => j(8949))
        ),
      257: () =>
        p("default", "@fingerprintjs/fingerprintjs", [1, 4, 5, 0], () =>
          j.e(4529).then(() => () => j(4529))
        ),
      286: () =>
        p("default", "react-i18next", [1, 13, 0, 1], () =>
          j.e(1072).then(() => () => j(1072))
        ),
      529: () =>
        p("default", "axios", [1, 1, 4, 0], () =>
          j.e(1871).then(() => () => j(1871))
        ),
      3868: () =>
        p("default", "i18next", [1, 23, 2, 3], () =>
          j.e(6609).then(() => () => j(6609))
        ),
      4166: () =>
        p("default", "howler", [1, 2, 2, 3], () =>
          j.e(1766).then(() => () => j(1766))
        ),
      8534: () =>
        p("default", "jwt-js-decode", [1, 1, 8, 2], () =>
          Promise.all([j.e(2679), j.e(8009)]).then(() => () => j(2679))
        ),
      2734: () =>
        m("default", "preact/hooks", [1, 10, 15, 1], () =>
          j.e(552).then(() => () => j(396))
        ),
      4977: () =>
        m("default", "mobx-react-lite", [1, 3, 4, 3], () =>
          j.e(242).then(() => () => j(242))
        ),
      5103: () =>
        p("default", "uuid", [1, 9, 0, 0], () =>
          j.e(7017).then(() => () => j(7017))
        ),
      7101: () =>
        p("default", "classnames", [1, 2, 3, 2], () =>
          j.e(4184).then(() => () => j(4184))
        ),
      7670: () =>
        p("default", "base-x", [1, 5, 0, 1], () =>
          j.e(82).then(() => () => j(82))
        ),
      2274: () =>
        p("default", "react-fast-marquee", [1, 1, 6, 5], () =>
          j.e(7005).then(() => () => j(7005))
        ),
      6289: () =>
        p("default", "markdown-to-jsx", [1, 7, 3, 2], () =>
          j.e(5576).then(() => () => j(5576))
        ),
      6444: () =>
        p("default", "centrifuge", [1, 2, 7, 6], () =>
          j.e(6574).then(() => () => j(6574))
        ),
      509: () =>
        p("default", "recursive-diff", [1, 1, 0, 9], () =>
          j.e(7829).then(() => () => j(7829))
        ),
      5202: () =>
        p("default", "fflate", [2, 0, 8, 2], () =>
          j.e(3778).then(() => () => j(3778))
        ),
    }),
    (P = {
      431: [6444],
      509: [509],
      1154: [2734, 4977],
      1299: [1299],
      3922: [257, 286, 529, 3868, 4166, 8534],
      4819: [5202],
      4992: [7670],
      5103: [5103],
      5160: [5160],
      5266: [6289],
      5535: [5535],
      7101: [7101],
      8925: [2274],
    }),
    (j.f.consumes = (e, a) => {
      j.o(P, e) &&
        P[e].forEach((e) => {
          if (j.o(v, e)) return a.push(v[e]);
          var t = (a) => {
              ((v[e] = 0),
                (j.m[e] = (t) => {
                  (delete j.c[e], (t.exports = a()));
                }));
            },
            r = (a) => {
              (delete v[e],
                (j.m[e] = (t) => {
                  throw (delete j.c[e], a);
                }));
            };
          try {
            var d = g[e]();
            d.then ? a.push((v[e] = d.then(t).catch(r))) : t(d);
          } catch (e) {
            r(e);
          }
        });
    }),
    (() => {
      j.b = document.baseURI || self.location.href;
      var e = { 3052: 0 };
      j.f.j = (a, t) => {
        var r = j.o(e, a) ? e[a] : void 0;
        if (0 !== r)
          if (r) t.push(r[2]);
          else if (/^(5(09|103|160|535)|1154|1299|431|7101)$/.test(a)) e[a] = 0;
          else {
            var d = new Promise((t, d) => (r = e[a] = [t, d]));
            t.push((r[2] = d));
            var n = j.p + j.u(a),
              o = new Error();
            j.l(
              n,
              (t) => {
                if (j.o(e, a) && (0 !== (r = e[a]) && (e[a] = void 0), r)) {
                  var d = t && ("load" === t.type ? "missing" : t.type),
                    n = t && t.target && t.target.src;
                  ((o.message =
                    "Loading chunk " + a + " failed.\n(" + d + ": " + n + ")"),
                    (o.name = "ChunkLoadError"),
                    (o.type = d),
                    (o.request = n),
                    r[1](o));
                }
              },
              "chunk-" + a,
              a
            );
          }
      };
      var a = (a, t) => {
          var r,
            d,
            n = t[0],
            o = t[1],
            f = t[2],
            l = 0;
          if (n.some((a) => 0 !== e[a])) {
            for (r in o) j.o(o, r) && (j.m[r] = o[r]);
            f && f(j);
          }
          for (a && a(t); l < n.length; l++)
            ((d = n[l]), j.o(e, d) && e[d] && e[d][0](), (e[d] = 0));
        },
        t = (self.webpackChunkfederation_modules =
          self.webpackChunkfederation_modules || []);
      (t.forEach(a.bind(null, 0)), (t.push = a.bind(null, t.push.bind(t))));
    })(),
    (j.nc = void 0));
  var x = j(2728);
  fm = x;
})();
