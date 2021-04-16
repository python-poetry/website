import "./css/app.css"

import Alpine from 'alpinejs'

Alpine.start()

window.Components = {};

window.Components.popoverGroup = function () {
    return {
        __type: "popoverGroup",
        init() {
            let t = (e) => {
                document.body.contains(this.$el)
                    ? e.target instanceof Element && !this.$el.contains(e.target) && window.dispatchEvent(new CustomEvent("close-popover-group", { detail: this.$el }))
                    : window.removeEventListener("focus", t, !0);
            };
            window.addEventListener("focus", t, !0);
        },
    };
}

window.Components.popover = function ({ open: t = !1, focus: e = !1 } = {}) {
    const i = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"]
        .map((t) => `${t}:not([tabindex='-1'])`)
        .join(",");

    return {
        __type: "popover",
        open: t,
        init() {
            e &&
                this.$watch("open", (t) => {
                    t &&
                        this.$nextTick(() => {
                            !(function (t) {
                                const e = Array.from(t.querySelectorAll(i));
                                !(function t(i) {
                                    void 0 !== i && (i.focus({ preventScroll: !0 }), document.activeElement !== i && t(e[e.indexOf(i) + 1]));
                                })(e[0]);
                            })(this.$refs.panel);
                        });
                });
            let t = (i) => {
                if (!document.body.contains(this.$el)) return void window.removeEventListener("focus", t, !0);
                let n = e ? this.$refs.panel : this.$el;
                if (this.open && i.target instanceof Element && !n.contains(i.target)) {
                    let t = this.$el;
                    for (; t.parentNode;)
                        if (((t = t.parentNode), t.__x instanceof this.constructor)) {
                            if ("popoverGroup" === t.__x.$data.__type) return;
                            if ("popover" === t.__x.$data.__type) break;
                        }
                    this.open = !1;
                }
            };
            window.addEventListener("focus", t, !0);
        },
        onEscape() {
            (this.open = !1), this.restoreEl && this.restoreEl.focus();
        },
        onClosePopoverGroup(t) {
            t.detail.contains(this.$el) && (this.open = !1);
        },
        toggle(t) {
            (this.open = !this.open), this.open ? (this.restoreEl = t.currentTarget) : this.restoreEl && this.restoreEl.focus();
        },
    };
}
