"use strict";
(self.webpackChunkfederation_modules =
  self.webpackChunkfederation_modules || []).push([
  [2534],
  {
    2534: (e, n, s) => {
      (s.r(n), s.d(n, { ButtonTurboUniverse: () => l }));
      var t = s(6584),
        r = s(7101),
        a = s.n(r),
        i = s(4258),
        o = s(4099),
        c = s(2734);
      const l = function ({ customChildren: e, style: n, mode: s }) {
        const r = (0, c.useRef)(null);
        return e
          ? (0, t.tZ)(i.h.Nav.Button.Universe, { style: n, children: e() })
          : (0, t.tZ)(i.h.Nav.Button.Universe, {
              style: n,
              delayOpen: 0,
              delayClose: 800,
              children: ({ storiesNew: e }) =>
                (0, t.BX)("div", {
                  ref: r,
                  "data-track": "universe",
                  className: a()(o.Z.icon, { [o.Z.iconDark]: "dark" === s }),
                  children: [
                    e &&
                      (0, t.tZ)("span", { className: o.Z.iconActiveIndicator }),
                    (0, t.tZ)("div", { className: o.Z.iconTurboUniverse }),
                  ],
                }),
            });
      };
    },
  },
]);
