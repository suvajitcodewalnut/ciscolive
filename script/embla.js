!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis
          ? globalThis
          : n || self).EmblaCarousel = t());
})(this, function () {
  "use strict";
  function n(n) {
    return "number" == typeof n;
  }
  function t(n) {
    return "string" == typeof n;
  }
  function e(n) {
    return "boolean" == typeof n;
  }
  function r(n) {
    return "[object Object]" === Object.prototype.toString.call(n);
  }
  function o(n) {
    return Math.abs(n);
  }
  function i(n) {
    return Math.sign(n);
  }
  function c(n, t) {
    return o(n - t);
  }
  function u(n) {
    return f(n).map(Number);
  }
  function s(n) {
    return n[a(n)];
  }
  function a(n) {
    return Math.max(0, n.length - 1);
  }
  function d(n, t) {
    return t === a(n);
  }
  function l(n, t = 0) {
    return Array.from(Array(n), (n, e) => t + e);
  }
  function f(n) {
    return Object.keys(n);
  }
  function p(n, t) {
    return [n, t].reduce(
      (n, t) => (
        f(t).forEach((e) => {
          const o = n[e],
            i = t[e],
            c = r(o) && r(i);
          n[e] = c ? p(o, i) : i;
        }),
        n
      ),
      {}
    );
  }
  function m(n, t) {
    return void 0 !== t.MouseEvent && n instanceof t.MouseEvent;
  }
  function g() {
    let n = [];
    const t = {
      add: function (e, r, o, i = { passive: !0 }) {
        let c;
        if ("addEventListener" in e)
          e.addEventListener(r, o, i),
            (c = () => e.removeEventListener(r, o, i));
        else {
          const n = e;
          n.addListener(o), (c = () => n.removeListener(o));
        }
        return n.push(c), t;
      },
      clear: function () {
        n = n.filter((n) => n());
      },
    };
    return t;
  }
  function h(n, t, e, r) {
    const o = g(),
      i = 1e3 / 60;
    let c = null,
      u = 0,
      s = 0;
    function a(n) {
      if (!s) return;
      c || ((c = n), e(), e());
      const o = n - c;
      for (c = n, u += o; u >= i; ) e(), (u -= i);
      r(u / i), s && (s = t.requestAnimationFrame(a));
    }
    function d() {
      t.cancelAnimationFrame(s), (c = null), (u = 0), (s = 0);
    }
    return {
      init: function () {
        o.add(n, "visibilitychange", () => {
          n.hidden && ((c = null), (u = 0));
        });
      },
      destroy: function () {
        d(), o.clear();
      },
      start: function () {
        s || (s = t.requestAnimationFrame(a));
      },
      stop: d,
      update: e,
      render: r,
    };
  }
  function x(n = 0, t = 0) {
    const e = o(n - t);
    function r(t) {
      return t < n;
    }
    function i(n) {
      return n > t;
    }
    function c(n) {
      return r(n) || i(n);
    }
    return {
      length: e,
      max: t,
      min: n,
      constrain: function (e) {
        return c(e) ? (r(e) ? n : t) : e;
      },
      reachedAny: c,
      reachedMax: i,
      reachedMin: r,
      removeOffset: function (n) {
        return e ? n - e * Math.ceil((n - t) / e) : n;
      },
    };
  }
  function y(n, t, e) {
    const { constrain: r } = x(0, n),
      i = n + 1;
    let c = u(t);
    function u(n) {
      return e ? o((i + n) % i) : r(n);
    }
    function s() {
      return c;
    }
    function a() {
      return y(n, s(), e);
    }
    const d = {
      get: s,
      set: function (n) {
        return (c = u(n)), d;
      },
      add: function (n) {
        return a().set(s() + n);
      },
      clone: a,
    };
    return d;
  }
  function v(n, t, r, u, s, a, d, l, f, p, h, y, v, b, S, w, E, L, D) {
    const { cross: I, direction: M } = n,
      A = ["INPUT", "SELECT", "TEXTAREA"],
      F = { passive: !1 },
      T = g(),
      O = g(),
      P = x(50, 225).constrain(b.measure(20)),
      z = { mouse: 300, touch: 400 },
      H = { mouse: 500, touch: 600 },
      k = S ? 43 : 25;
    let V = !1,
      B = 0,
      C = 0,
      N = !1,
      R = !1,
      j = !1,
      G = !1;
    function q(n) {
      if (!m(n, u) && n.touches.length >= 2) return U(n);
      const t = a.readPoint(n),
        e = a.readPoint(n, I),
        r = c(t, B),
        o = c(e, C);
      if (!R && !G) {
        if (!n.cancelable) return U(n);
        if (((R = r > o), !R)) return U(n);
      }
      const i = a.pointerMove(n);
      r > w && (j = !0),
        p.useFriction(0.3).useDuration(0.75),
        l.start(),
        s.add(M(i)),
        n.preventDefault();
    }
    function U(n) {
      const t = h.byDistance(0, !1).index !== y.get(),
        e = a.pointerUp(n) * (S ? H : z)[G ? "mouse" : "touch"],
        r = (function (n, t) {
          const e = y.add(-1 * i(n)),
            r = h.byDistance(n, !S).distance;
          return S || o(n) < P
            ? r
            : E && t
            ? 0.5 * r
            : h.byIndex(e.get(), 0).distance;
        })(M(e), t),
        u = (function (n, t) {
          if (0 === n || 0 === t) return 0;
          if (o(n) <= o(t)) return 0;
          const e = c(o(n), o(t));
          return o(e / n);
        })(e, r),
        s = k - 10 * u,
        d = L + u / 50;
      (R = !1),
        (N = !1),
        O.clear(),
        p.useDuration(s).useFriction(d),
        f.distance(r, !S),
        (G = !1),
        v.emit("pointerUp");
    }
    function W(n) {
      j && (n.stopPropagation(), n.preventDefault(), (j = !1));
    }
    return {
      init: function (n) {
        if (!D) return;
        function o(o) {
          (e(D) || D(n, o)) &&
            (function (n) {
              const e = m(n, u);
              if (
                ((G = e),
                (j = S && e && !n.buttons && V),
                (V = c(s.get(), d.get()) >= 2),
                e && 0 !== n.button)
              )
                return;
              if (
                (function (n) {
                  const t = n.nodeName || "";
                  return A.includes(t);
                })(n.target)
              )
                return;
              (N = !0),
                a.pointerDown(n),
                p.useFriction(0).useDuration(0),
                s.set(d),
                (function () {
                  const n = G ? r : t;
                  O.add(n, "touchmove", q, F)
                    .add(n, "touchend", U)
                    .add(n, "mousemove", q, F)
                    .add(n, "mouseup", U);
                })(),
                (B = a.readPoint(n)),
                (C = a.readPoint(n, I)),
                v.emit("pointerDown");
            })(o);
        }
        const i = t;
        T.add(i, "dragstart", (n) => n.preventDefault(), F)
          .add(i, "touchmove", () => {}, F)
          .add(i, "touchend", () => {})
          .add(i, "touchstart", o)
          .add(i, "mousedown", o)
          .add(i, "touchcancel", U)
          .add(i, "contextmenu", U)
          .add(i, "click", W, !0);
      },
      destroy: function () {
        T.clear(), O.clear();
      },
      pointerDown: function () {
        return N;
      },
    };
  }
  function b(n, t) {
    let e, r;
    function i(n) {
      return n.timeStamp;
    }
    function c(e, r) {
      const o = "client" + ("x" === (r || n.scroll) ? "X" : "Y");
      return (m(e, t) ? e : e.touches[0])[o];
    }
    return {
      pointerDown: function (n) {
        return (e = n), (r = n), c(n);
      },
      pointerMove: function (n) {
        const t = c(n) - c(r),
          o = i(n) - i(e) > 170;
        return (r = n), o && (e = n), t;
      },
      pointerUp: function (n) {
        if (!e || !r) return 0;
        const t = c(r) - c(e),
          u = i(n) - i(e),
          s = i(n) - i(r) > 170,
          a = t / u;
        return u && !s && o(a) > 0.1 ? a : 0;
      },
      readPoint: c,
    };
  }
  function S(n, t, r, i, c, u, s) {
    const a = [n].concat(i);
    let d,
      l,
      f = [],
      p = !1;
    function m(n) {
      return c.measureSize(s.measure(n));
    }
    return {
      init: function (c) {
        u &&
          ((l = m(n)),
          (f = i.map(m)),
          (d = new ResizeObserver((r) => {
            (e(u) || u(c, r)) &&
              (function (e) {
                for (const r of e) {
                  if (p) return;
                  const e = r.target === n,
                    u = i.indexOf(r.target),
                    s = e ? l : f[u];
                  if (o(m(e ? n : i[u]) - s) >= 0.5) {
                    c.reInit(), t.emit("resize");
                    break;
                  }
                }
              })(r);
          })),
          r.requestAnimationFrame(() => {
            a.forEach((n) => d.observe(n));
          }));
      },
      destroy: function () {
        (p = !0), d && d.disconnect();
      },
    };
  }
  function w(n, t, e, r, i) {
    const c = i.measure(10),
      u = i.measure(50),
      s = x(0.1, 0.99);
    let a = !1;
    function d() {
      return !a && !!n.reachedAny(e.get()) && !!n.reachedAny(t.get());
    }
    return {
      shouldConstrain: d,
      constrain: function (i) {
        if (!d()) return;
        const a = n.reachedMin(t.get()) ? "min" : "max",
          l = o(n[a] - t.get()),
          f = e.get() - t.get(),
          p = s.constrain(l / u);
        e.subtract(f * p),
          !i &&
            o(f) < c &&
            (e.set(n.constrain(e.get())), r.useDuration(25).useBaseFriction());
      },
      toggleActive: function (n) {
        a = !n;
      },
    };
  }
  function E(n, t, e, r) {
    const o = t.min + 0.1,
      i = t.max + 0.1,
      { reachedMin: c, reachedMax: u } = x(o, i);
    return {
      loop: function (t) {
        if (
          !(function (n) {
            return 1 === n ? u(e.get()) : -1 === n && c(e.get());
          })(t)
        )
          return;
        const o = n * (-1 * t);
        r.forEach((n) => n.add(o));
      },
    };
  }
  function L(n, t, e, r, c) {
    const { reachedAny: u, removeOffset: a, constrain: d } = r;
    function l(n) {
      return n.concat().sort((n, t) => o(n) - o(t))[0];
    }
    function f(t, r) {
      const o = [t, t + e, t - e];
      if (!n) return t;
      if (!r) return l(o);
      const c = o.filter((n) => i(n) === r);
      return c.length ? l(c) : s(o) - e;
    }
    return {
      byDistance: function (e, r) {
        const i = c.get() + e,
          { index: s, distance: l } = (function (e) {
            const r = n ? a(e) : d(e),
              i = t
                .map((n, t) => ({ diff: f(n - r, 0), index: t }))
                .sort((n, t) => o(n.diff) - o(t.diff)),
              { index: c } = i[0];
            return { index: c, distance: r };
          })(i),
          p = !n && u(i);
        return !r || p
          ? { index: s, distance: e }
          : { index: s, distance: e + f(t[s] - l, 0) };
      },
      byIndex: function (n, e) {
        return { index: n, distance: f(t[n] - c.get(), e) };
      },
      shortcut: f,
    };
  }
  function D(t, r, o, i, c, u, s, a) {
    const d = { passive: !0, capture: !0 };
    let l = 0;
    function f(n) {
      "Tab" === n.code && (l = new Date().getTime());
    }
    return {
      init: function (p) {
        a &&
          (u.add(document, "keydown", f, !1),
          r.forEach((r, f) => {
            u.add(
              r,
              "focus",
              (r) => {
                (e(a) || a(p, r)) &&
                  (function (e) {
                    if (new Date().getTime() - l > 10) return;
                    s.emit("slideFocusStart"), (t.scrollLeft = 0);
                    const r = o.findIndex((n) => n.includes(e));
                    n(r) &&
                      (c.useDuration(0), i.index(r, 0), s.emit("slideFocus"));
                  })(f);
              },
              d
            );
          }));
      },
    };
  }
  function I(t) {
    let e = t;
    function r(t) {
      return n(t) ? t : t.get();
    }
    return {
      get: function () {
        return e;
      },
      set: function (n) {
        e = r(n);
      },
      add: function (n) {
        e += r(n);
      },
      subtract: function (n) {
        e -= r(n);
      },
    };
  }
  function M(n, t) {
    const e =
        "x" === n.scroll
          ? function (n) {
              return `translate3d(${n}px,0px,0px)`;
            }
          : function (n) {
              return `translate3d(0px,${n}px,0px)`;
            },
      r = t.style;
    let o = null,
      i = !1;
    return {
      clear: function () {
        i ||
          ((r.transform = ""),
          t.getAttribute("style") || t.removeAttribute("style"));
      },
      to: function (t) {
        if (i) return;
        const c = ((u = n.direction(t)), Math.round(100 * u) / 100);
        var u;
        c !== o && ((r.transform = e(c)), (o = c));
      },
      toggleActive: function (n) {
        i = !n;
      },
    };
  }
  function A(n, t, e, r, o, i, c, s, a) {
    const d = 0.5,
      l = u(o),
      f = u(o).reverse(),
      p = (function () {
        const n = c[0];
        return h(g(f, n), e, !1);
      })().concat(
        (function () {
          const n = t - c[0] - 1;
          return h(g(l, n), -e, !0);
        })()
      );
    function m(n, t) {
      return n.reduce((n, t) => n - o[t], t);
    }
    function g(n, t) {
      return n.reduce((n, e) => (m(n, t) > 0 ? n.concat([e]) : n), []);
    }
    function h(o, c, u) {
      const l = (function (n) {
        return i.map((e, o) => ({
          start: e - r[o] + d + n,
          end: e + t - d + n,
        }));
      })(c);
      return o.map((t) => {
        const r = u ? 0 : -e,
          o = u ? e : 0,
          i = u ? "end" : "start",
          c = l[t][i];
        return {
          index: t,
          loopPoint: c,
          slideLocation: I(-1),
          translate: M(n, a[t]),
          target: () => (s.get() > c ? r : o),
        };
      });
    }
    return {
      canLoop: function () {
        return p.every(
          ({ index: n }) =>
            m(
              l.filter((t) => t !== n),
              t
            ) <= 0.1
        );
      },
      clear: function () {
        p.forEach((n) => n.translate.clear());
      },
      loop: function () {
        p.forEach((n) => {
          const { target: t, translate: e, slideLocation: r } = n,
            o = t();
          o !== r.get() && (e.to(o), r.set(o));
        });
      },
      loopPoints: p,
    };
  }
  function F(n, t, r) {
    let o,
      i = !1;
    return {
      init: function (c) {
        r &&
          ((o = new MutationObserver((n) => {
            i ||
              ((e(r) || r(c, n)) &&
                (function (n) {
                  for (const e of n)
                    if ("childList" === e.type) {
                      c.reInit(), t.emit("slidesChanged");
                      break;
                    }
                })(n));
          })),
          o.observe(n, { childList: !0 }));
      },
      destroy: function () {
        o && o.disconnect(), (i = !0);
      },
    };
  }
  function T(n, t, e, r) {
    const o = {};
    let i,
      c = null,
      u = null,
      s = !1;
    return {
      init: function () {
        (i = new IntersectionObserver(
          (n) => {
            s ||
              (n.forEach((n) => {
                const e = t.indexOf(n.target);
                o[e] = n;
              }),
              (c = null),
              (u = null),
              e.emit("slidesInView"));
          },
          { root: n.parentElement, threshold: r }
        )),
          t.forEach((n) => i.observe(n));
      },
      destroy: function () {
        i && i.disconnect(), (s = !0);
      },
      get: function (n = !0) {
        if (n && c) return c;
        if (!n && u) return u;
        const t = (function (n) {
          return f(o).reduce((t, e) => {
            const r = parseInt(e),
              { isIntersecting: i } = o[r];
            return ((n && i) || (!n && !i)) && t.push(r), t;
          }, []);
        })(n);
        return n && (c = t), n || (u = t), t;
      },
    };
  }
  function O(t, e, r, i, c, d, l, f, p) {
    const { startEdge: m, endEdge: g, direction: h } = t,
      x = n(r);
    return {
      groupSlides: function (n) {
        return x
          ? (function (n, t) {
              return u(n)
                .filter((n) => n % t == 0)
                .map((e) => n.slice(e, e + t));
            })(n, r)
          : (function (n) {
              return n.length
                ? u(n)
                    .reduce((t, r, u) => {
                      const x = s(t) || 0,
                        y = 0 === x,
                        v = r === a(n),
                        b = c[m] - d[x][m],
                        S = c[m] - d[r][g],
                        w = !i && y ? h(l) : 0,
                        E = o(S - (!i && v ? h(f) : 0) - (b + w));
                      return (
                        u && E > e + p && t.push(r), v && t.push(n.length), t
                      );
                    }, [])
                    .map((t, e, r) => {
                      const o = Math.max(r[e - 1] || 0);
                      return n.slice(o, t);
                    })
                : [];
            })(n);
      },
    };
  }
  function P(n, e, r, f, p, m, P) {
    const {
        align: z,
        axis: H,
        direction: k,
        startIndex: V,
        loop: B,
        duration: C,
        dragFree: N,
        dragThreshold: R,
        inViewThreshold: j,
        slidesToScroll: G,
        skipSnaps: q,
        containScroll: U,
        watchResize: W,
        watchSlides: $,
        watchDrag: Q,
        watchFocus: X,
      } = m,
      Y = {
        measure: function (n) {
          const {
            offsetTop: t,
            offsetLeft: e,
            offsetWidth: r,
            offsetHeight: o,
          } = n;
          return {
            top: t,
            right: e + r,
            bottom: t + o,
            left: e,
            width: r,
            height: o,
          };
        },
      },
      J = Y.measure(e),
      K = r.map(Y.measure),
      Z = (function (n, t) {
        const e = "rtl" === t,
          r = "y" === n,
          o = !r && e ? -1 : 1;
        return {
          scroll: r ? "y" : "x",
          cross: r ? "x" : "y",
          startEdge: r ? "top" : e ? "right" : "left",
          endEdge: r ? "bottom" : e ? "left" : "right",
          measureSize: function (n) {
            const { height: t, width: e } = n;
            return r ? t : e;
          },
          direction: function (n) {
            return n * o;
          },
        };
      })(H, k),
      _ = Z.measureSize(J),
      nn = (function (n) {
        return {
          measure: function (t) {
            return n * (t / 100);
          },
        };
      })(_),
      tn = (function (n, e) {
        const r = {
          start: function () {
            return 0;
          },
          center: function (n) {
            return o(n) / 2;
          },
          end: o,
        };
        function o(n) {
          return e - n;
        }
        return {
          measure: function (o, i) {
            return t(n) ? r[n](o) : n(e, o, i);
          },
        };
      })(z, _),
      en = !B && !!U,
      rn = B || !!U,
      {
        slideSizes: on,
        slideSizesWithGaps: cn,
        startGap: un,
        endGap: sn,
      } = (function (n, t, e, r, i, c) {
        const { measureSize: u, startEdge: a, endEdge: l } = n,
          f = e[0] && i,
          p = (function () {
            if (!f) return 0;
            const n = e[0];
            return o(t[a] - n[a]);
          })(),
          m = (function () {
            if (!f) return 0;
            const n = c.getComputedStyle(s(r));
            return parseFloat(n.getPropertyValue(`margin-${l}`));
          })(),
          g = e.map(u),
          h = e
            .map((n, t, e) => {
              const r = !t,
                o = d(e, t);
              return r ? g[t] + p : o ? g[t] + m : e[t + 1][a] - n[a];
            })
            .map(o);
        return { slideSizes: g, slideSizesWithGaps: h, startGap: p, endGap: m };
      })(Z, J, K, r, rn, p),
      an = O(Z, _, G, B, J, K, un, sn, 2),
      { snaps: dn, snapsAligned: ln } = (function (n, t, e, r, i) {
        const { startEdge: c, endEdge: u } = n,
          { groupSlides: a } = i,
          d = a(r)
            .map((n) => s(n)[u] - n[0][c])
            .map(o)
            .map(t.measure),
          l = r.map((n) => e[c] - n[c]).map((n) => -o(n)),
          f = a(l)
            .map((n) => n[0])
            .map((n, t) => n + d[t]);
        return { snaps: l, snapsAligned: f };
      })(Z, tn, J, K, an),
      fn = -s(dn) + s(cn),
      { snapsContained: pn, scrollContainLimit: mn } = (function (
        n,
        t,
        e,
        r,
        o
      ) {
        const i = x(-t + n, 0),
          u = e
            .map((n, t) => {
              const { min: r, max: o } = i,
                c = i.constrain(n),
                u = !t,
                s = d(e, t);
              return u ? o : s || l(r, c) ? r : l(o, c) ? o : c;
            })
            .map((n) => parseFloat(n.toFixed(3))),
          a = (function () {
            const n = u[0],
              t = s(u);
            return x(u.lastIndexOf(n), u.indexOf(t) + 1);
          })();
        function l(n, t) {
          return c(n, t) <= 1;
        }
        return {
          snapsContained: (function () {
            if (t <= n + o) return [i.max];
            if ("keepSnaps" === r) return u;
            const { min: e, max: c } = a;
            return u.slice(e, c);
          })(),
          scrollContainLimit: a,
        };
      })(_, fn, ln, U, 2),
      gn = en ? pn : ln,
      { limit: hn } = (function (n, t, e) {
        const r = t[0];
        return { limit: x(e ? r - n : s(t), r) };
      })(fn, gn, B),
      xn = y(a(gn), V, B),
      yn = xn.clone(),
      vn = u(r),
      bn = h(
        f,
        p,
        () =>
          (({
            dragHandler: n,
            scrollBody: t,
            scrollBounds: e,
            options: { loop: r },
          }) => {
            r || e.constrain(n.pointerDown()), t.seek();
          })(Hn),
        (n) =>
          ((
            {
              scrollBody: n,
              translate: t,
              location: e,
              offsetLocation: r,
              previousLocation: o,
              scrollLooper: i,
              slideLooper: c,
              dragHandler: u,
              animation: s,
              eventHandler: a,
              scrollBounds: d,
              options: { loop: l },
            },
            f
          ) => {
            const p = n.settled(),
              m = !d.shouldConstrain(),
              g = l ? p : p && m;
            g && !u.pointerDown() && (s.stop(), a.emit("settle")),
              g || a.emit("scroll");
            const h = e.get() * f + o.get() * (1 - f);
            r.set(h), l && (i.loop(n.direction()), c.loop()), t.to(r.get());
          })(Hn, n)
      ),
      Sn = gn[xn.get()],
      wn = I(Sn),
      En = I(Sn),
      Ln = I(Sn),
      Dn = I(Sn),
      In = (function (n, t, e, r, c, u) {
        let s = 0,
          a = 0,
          d = c,
          l = u,
          f = n.get(),
          p = 0;
        function m(n) {
          return (d = n), h;
        }
        function g(n) {
          return (l = n), h;
        }
        const h = {
          direction: function () {
            return a;
          },
          duration: function () {
            return d;
          },
          velocity: function () {
            return s;
          },
          seek: function () {
            const t = r.get() - n.get();
            let o = 0;
            return (
              d
                ? (e.set(n),
                  (s += t / d),
                  (s *= l),
                  (f += s),
                  n.add(s),
                  (o = f - p))
                : ((s = 0), e.set(r), n.set(r), (o = t)),
              (a = i(o)),
              (p = f),
              h
            );
          },
          settled: function () {
            return o(r.get() - t.get()) < 0.001;
          },
          useBaseFriction: function () {
            return g(u);
          },
          useBaseDuration: function () {
            return m(c);
          },
          useFriction: g,
          useDuration: m,
        };
        return h;
      })(wn, Ln, En, Dn, C, 0.68),
      Mn = L(B, gn, fn, hn, Dn),
      An = (function (n, t, e, r, o, i, c) {
        function u(o) {
          const u = o.distance,
            s = o.index !== t.get();
          i.add(u),
            u &&
              (r.duration()
                ? n.start()
                : (n.update(), n.render(1), n.update())),
            s && (e.set(t.get()), t.set(o.index), c.emit("select"));
        }
        return {
          distance: function (n, t) {
            u(o.byDistance(n, t));
          },
          index: function (n, e) {
            const r = t.clone().set(n);
            u(o.byIndex(r.get(), e));
          },
        };
      })(bn, xn, yn, In, Mn, Dn, P),
      Fn = (function (n) {
        const { max: t, length: e } = n;
        return {
          get: function (n) {
            return e ? (n - t) / -e : 0;
          },
        };
      })(hn),
      Tn = g(),
      On = T(e, r, P, j),
      { slideRegistry: Pn } = (function (n, t, e, r, o, i) {
        const { groupSlides: c } = o,
          { min: u, max: f } = r;
        return {
          slideRegistry: (function () {
            const r = c(i),
              o = !n || "keepSnaps" === t;
            return 1 === e.length
              ? [i]
              : o
              ? r
              : r.slice(u, f).map((n, t, e) => {
                  const r = !t,
                    o = d(e, t);
                  return r
                    ? l(s(e[0]) + 1)
                    : o
                    ? l(a(i) - s(e)[0] + 1, s(e)[0])
                    : n;
                });
          })(),
        };
      })(en, U, gn, mn, an, vn),
      zn = D(n, r, Pn, An, In, Tn, P, X),
      Hn = {
        ownerDocument: f,
        ownerWindow: p,
        eventHandler: P,
        containerRect: J,
        slideRects: K,
        animation: bn,
        axis: Z,
        dragHandler: v(
          Z,
          n,
          f,
          p,
          Dn,
          b(Z, p),
          wn,
          bn,
          An,
          In,
          Mn,
          xn,
          P,
          nn,
          N,
          R,
          q,
          0.68,
          Q
        ),
        eventStore: Tn,
        percentOfView: nn,
        index: xn,
        indexPrevious: yn,
        limit: hn,
        location: wn,
        offsetLocation: Ln,
        previousLocation: En,
        options: m,
        resizeHandler: S(e, P, p, r, Z, W, Y),
        scrollBody: In,
        scrollBounds: w(hn, Ln, Dn, In, nn),
        scrollLooper: E(fn, hn, Ln, [wn, Ln, En, Dn]),
        scrollProgress: Fn,
        scrollSnapList: gn.map(Fn.get),
        scrollSnaps: gn,
        scrollTarget: Mn,
        scrollTo: An,
        slideLooper: A(Z, _, fn, on, cn, dn, gn, Ln, r),
        slideFocus: zn,
        slidesHandler: F(e, P, $),
        slidesInView: On,
        slideIndexes: vn,
        slideRegistry: Pn,
        slidesToScroll: an,
        target: Dn,
        translate: M(Z, e),
      };
    return Hn;
  }
  const z = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0,
    watchFocus: !0,
  };
  function H(n) {
    function t(n, t) {
      return p(n, t || {});
    }
    const e = {
      mergeOptions: t,
      optionsAtMedia: function (e) {
        const r = e.breakpoints || {},
          o = f(r)
            .filter((t) => n.matchMedia(t).matches)
            .map((n) => r[n])
            .reduce((n, e) => t(n, e), {});
        return t(e, o);
      },
      optionsMediaQueries: function (t) {
        return t
          .map((n) => f(n.breakpoints || {}))
          .reduce((n, t) => n.concat(t), [])
          .map(n.matchMedia);
      },
    };
    return e;
  }
  function k(n, e, r) {
    const o = n.ownerDocument,
      i = o.defaultView,
      c = H(i),
      u = (function (n) {
        let t = [];
        return {
          init: function (e, r) {
            return (
              (t = r.filter(
                ({ options: t }) => !1 !== n.optionsAtMedia(t).active
              )),
              t.forEach((t) => t.init(e, n)),
              r.reduce((n, t) => Object.assign(n, { [t.name]: t }), {})
            );
          },
          destroy: function () {
            t = t.filter((n) => n.destroy());
          },
        };
      })(c),
      s = g(),
      a = (function () {
        let n,
          t = {};
        function e(n) {
          return t[n] || [];
        }
        const r = {
          init: function (t) {
            n = t;
          },
          emit: function (t) {
            return e(t).forEach((e) => e(n, t)), r;
          },
          off: function (n, o) {
            return (t[n] = e(n).filter((n) => n !== o)), r;
          },
          on: function (n, o) {
            return (t[n] = e(n).concat([o])), r;
          },
          clear: function () {
            t = {};
          },
        };
        return r;
      })(),
      { mergeOptions: d, optionsAtMedia: l, optionsMediaQueries: f } = c,
      { on: p, off: m, emit: h } = a,
      x = A;
    let y,
      v,
      b,
      S,
      w = !1,
      E = d(z, k.globalOptions),
      L = d(E),
      D = [];
    function I(t) {
      const e = P(n, b, S, o, i, t, a);
      if (t.loop && !e.slideLooper.canLoop()) {
        return I(Object.assign({}, t, { loop: !1 }));
      }
      return e;
    }
    function M(e, r) {
      w ||
        ((E = d(E, e)),
        (L = l(E)),
        (D = r || D),
        (function () {
          const { container: e, slides: r } = L,
            o = t(e) ? n.querySelector(e) : e;
          b = o || n.children[0];
          const i = t(r) ? b.querySelectorAll(r) : r;
          S = [].slice.call(i || b.children);
        })(),
        (y = I(L)),
        f([E, ...D.map(({ options: n }) => n)]).forEach((n) =>
          s.add(n, "change", A)
        ),
        L.active &&
          (y.translate.to(y.location.get()),
          y.animation.init(),
          y.slidesInView.init(),
          y.slideFocus.init(V),
          y.eventHandler.init(V),
          y.resizeHandler.init(V),
          y.slidesHandler.init(V),
          y.options.loop && y.slideLooper.loop(),
          b.offsetParent && S.length && y.dragHandler.init(V),
          (v = u.init(V, D))));
    }
    function A(n, t) {
      const e = O();
      F(), M(d({ startIndex: e }, n), t), a.emit("reInit");
    }
    function F() {
      y.dragHandler.destroy(),
        y.eventStore.clear(),
        y.translate.clear(),
        y.slideLooper.clear(),
        y.resizeHandler.destroy(),
        y.slidesHandler.destroy(),
        y.slidesInView.destroy(),
        y.animation.destroy(),
        u.destroy(),
        s.clear();
    }
    function T(n, t, e) {
      L.active &&
        !w &&
        (y.scrollBody.useBaseFriction().useDuration(!0 === t ? 0 : L.duration),
        y.scrollTo.index(n, e || 0));
    }
    function O() {
      return y.index.get();
    }
    const V = {
      canScrollNext: function () {
        return y.index.add(1).get() !== O();
      },
      canScrollPrev: function () {
        return y.index.add(-1).get() !== O();
      },
      containerNode: function () {
        return b;
      },
      internalEngine: function () {
        return y;
      },
      destroy: function () {
        w || ((w = !0), s.clear(), F(), a.emit("destroy"), a.clear());
      },
      off: m,
      on: p,
      emit: h,
      plugins: function () {
        return v;
      },
      previousScrollSnap: function () {
        return y.indexPrevious.get();
      },
      reInit: x,
      rootNode: function () {
        return n;
      },
      scrollNext: function (n) {
        T(y.index.add(1).get(), n, -1);
      },
      scrollPrev: function (n) {
        T(y.index.add(-1).get(), n, 1);
      },
      scrollProgress: function () {
        return y.scrollProgress.get(y.location.get());
      },
      scrollSnapList: function () {
        return y.scrollSnapList;
      },
      scrollTo: T,
      selectedScrollSnap: O,
      slideNodes: function () {
        return S;
      },
      slidesInView: function () {
        return y.slidesInView.get();
      },
      slidesNotInView: function () {
        return y.slidesInView.get(!1);
      },
    };
    return M(e, r), setTimeout(() => a.emit("init"), 0), V;
  }
  return (k.globalOptions = void 0), k;
});
