import { defineComponent as e, computed as p, openBlock as u, createElementBlock as s, normalizeClass as l, unref as c, renderSlot as a } from "vue";
import "./style/index.css";
const m = e({ name: "vp-button" }), d = /* @__PURE__ */ e({
  ...m,
  props: {
    type: null
  },
  setup(o) {
    const t = o, n = p(() => ({ [`vp-button--${t.type}`]: t.type }));
    return (r, f) => (u(), s("button", {
      class: l(["vp-button", c(n)])
    }, [
      a(r.$slots, "default")
    ], 2));
  }
});
export {
  d as default
};
