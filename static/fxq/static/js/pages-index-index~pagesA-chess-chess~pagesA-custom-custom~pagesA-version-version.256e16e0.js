(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[
  "pages-index-index~pagesA-chess-chess~pagesA-custom-custom~pagesA-version-version",
], {
  "084e": function (i, n, t) {
    "use strict";
    t.d(n, "b", function () {
      return o;
    }),
      t.d(n, "c", function () {
        return u;
      }),
      t.d(n, "a", function () {
        return e;
      });
    var e = { uStatusBar: t("9a99").default, uIcon: t("a6a2").default },
      o = function () {
        var i = this, n = i.$createElement, t = i._self._c || n;
        return t("v-uni-view", { staticClass: "u-navbar" }, [
          i.fixed && i.placeholder
            ? t("v-uni-view", {
              staticClass: "u-navbar__placeholder",
              style: {
                height: i.$u.addUnit(
                  i.$u.getPx(i.height) + i.$u.sys().statusBarHeight,
                  "px",
                ),
              },
            })
            : i._e(),
          t("v-uni-view", { class: [i.fixed && "u-navbar--fixed"] }, [
            i.safeAreaInsetTop
              ? t("u-status-bar", { attrs: { bgColor: i.bgColor } })
              : i._e(),
            t("v-uni-view", {
              staticClass: "u-navbar__content",
              class: [i.border && "u-border-bottom"],
              style: {
                height: i.$u.addUnit(i.height),
                backgroundColor: i.bgColor,
              },
            }, [
              t("v-uni-view", {
                staticClass: "u-navbar__content__left",
                attrs: {
                  "hover-class": "u-navbar__content__left--hover",
                  "hover-start-time": "150",
                },
                on: {
                  click: function (n) {
                    arguments[0] = n = i.$handleEvent(n),
                      i.leftClick.apply(void 0, arguments);
                  },
                },
              }, [i._t("left", [
                i.leftIcon
                  ? t("u-icon", {
                    attrs: {
                      name: i.leftIcon,
                      size: i.leftIconSize,
                      color: i.leftIconColor,
                    },
                  })
                  : i._e(),
                i.leftText
                  ? t("v-uni-text", {
                    staticClass: "u-navbar__content__left__text",
                    style: { color: i.leftIconColor },
                  }, [i._v(i._s(i.leftText))])
                  : i._e(),
              ])], 2),
              i._t("center", [
                t("v-uni-text", {
                  staticClass: "u-line-1 u-navbar__content__title",
                  style: [
                    { width: i.$u.addUnit(i.titleWidth) },
                    i.$u.addStyle(i.titleStyle),
                  ],
                }, [i._v(i._s(i.title))]),
              ]),
              i.$slots.right || i.rightIcon || i.rightText
                ? t("v-uni-view", {
                  staticClass: "u-navbar__content__right",
                  on: {
                    click: function (n) {
                      arguments[0] = n = i.$handleEvent(n),
                        i.rightClick.apply(void 0, arguments);
                    },
                  },
                }, [i._t("right", [
                  i.rightIcon
                    ? t("u-icon", { attrs: { name: i.rightIcon, size: "20" } })
                    : i._e(),
                  i.rightText
                    ? t("v-uni-text", {
                      staticClass: "u-navbar__content__right__text",
                    }, [i._v(i._s(i.rightText))])
                    : i._e(),
                ])], 2)
                : i._e(),
            ], 2),
          ], 1),
        ], 1);
      },
      u = [];
  },
  "0bd1": function (i, n, t) {
    "use strict";
    t("7a82"),
      Object.defineProperty(n, "__esModule", { value: !0 }),
      n.default = void 0;
    var e = {
      props: {
        bgColor: { type: String, default: uni.$u.props.statusBar.bgColor },
      },
    };
    n.default = e;
  },
  "0e26": function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("94c1"), o = t.n(e);
    for (var u in e) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return e[i];
        });
      }(u);
    }
    n["default"] = o.a;
  },
  1991: function (i, n, t) {
    var e = t("4bbc");
    e.__esModule && (e = e.default),
      "string" === typeof e && (e = [[i.i, e, ""]]),
      e.locals && (i.exports = e.locals);
    var o = t("4f06").default;
    o("3b1a317d", e, !0, { sourceMap: !1, shadowMode: !1 });
  },
  2606: function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("3204"), o = t.n(e);
    for (var u in e) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return e[i];
        });
      }(u);
    }
    n["default"] = o.a;
  },
  3204: function (i, n, t) {
    "use strict";
    t("7a82");
    var e = t("4ea4").default;
    Object.defineProperty(n, "__esModule", { value: !0 }),
      n.default = void 0,
      t("14d9"),
      t("caad"),
      t("2532"),
      t("c975");
    var o = e(t("d94c")),
      u = e(t("5c4a")),
      c = {
        name: "u-icon",
        data: function () {
          return {};
        },
        mixins: [uni.$u.mpMixin, uni.$u.mixin, u.default],
        computed: {
          uClasses: function () {
            var i = [];
            return i.push(this.customPrefix + "-" + this.name),
              this.color && uni.$u.config.type.includes(this.color) &&
              i.push("u-icon__icon--" + this.color),
              i;
          },
          iconStyle: function () {
            var i = {};
            return i = {
              fontSize: uni.$u.addUnit(this.size),
              lineHeight: uni.$u.addUnit(this.size),
              fontWeight: this.bold ? "bold" : "normal",
              top: uni.$u.addUnit(this.top),
            },
              this.color && !uni.$u.config.type.includes(this.color) &&
              (i.color = this.color),
              i;
          },
          isImg: function () {
            return -1 !== this.name.indexOf("/");
          },
          imgStyle: function () {
            var i = {};
            return i.width = this.width
              ? uni.$u.addUnit(this.width)
              : uni.$u.addUnit(this.size),
              i.height = this.height
                ? uni.$u.addUnit(this.height)
                : uni.$u.addUnit(this.size),
              i;
          },
          icon: function () {
            return o.default["uicon-" + this.name] || this.name;
          },
        },
        methods: {
          clickHandler: function (i) {
            this.$emit("click", this.index), this.stop && this.preventEvent(i);
          },
        },
      };
    n.default = c;
  },
  3405: function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("948f"), o = t.n(e);
    for (var u in e) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return e[i];
        });
      }(u);
    }
    n["default"] = o.a;
  },
  "4bbc": function (i, n, t) {
    var e = t("24fb");
    n = e(!1),
      n.push([
        i.i,
        '@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-59765974], uni-scroll-view[data-v-59765974], uni-swiper-item[data-v-59765974]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}@font-face{font-family:uicon-iconfont;src:url(https://at.alicdn.com/t/font_2225171_8kdcwk4po24.ttf) format("truetype")}.u-icon[data-v-59765974]{display:flex;align-items:center}.u-icon--left[data-v-59765974]{flex-direction:row-reverse;align-items:center}.u-icon--right[data-v-59765974]{flex-direction:row;align-items:center}.u-icon--top[data-v-59765974]{flex-direction:column-reverse;justify-content:center}.u-icon--bottom[data-v-59765974]{flex-direction:column;justify-content:center}.u-icon__icon[data-v-59765974]{font-family:uicon-iconfont;position:relative;display:flex;flex-direction:row;align-items:center}.u-icon__icon--primary[data-v-59765974]{color:#3c9cff}.u-icon__icon--success[data-v-59765974]{color:#5ac725}.u-icon__icon--error[data-v-59765974]{color:#f56c6c}.u-icon__icon--warning[data-v-59765974]{color:#f9ae3d}.u-icon__icon--info[data-v-59765974]{color:#909399}.u-icon__img[data-v-59765974]{height:auto;will-change:transform}.u-icon__label[data-v-59765974]{line-height:1}',
        "",
      ]),
      i.exports = n;
  },
  "5c4a": function (i, n, t) {
    "use strict";
    t("7a82"),
      Object.defineProperty(n, "__esModule", { value: !0 }),
      n.default = void 0,
      t("a9e3");
    var e = {
      props: {
        name: { type: String, default: uni.$u.props.icon.name },
        color: { type: String, default: uni.$u.props.icon.color },
        size: { type: [String, Number], default: uni.$u.props.icon.size },
        bold: { type: Boolean, default: uni.$u.props.icon.bold },
        index: { type: [String, Number], default: uni.$u.props.icon.index },
        hoverClass: { type: String, default: uni.$u.props.icon.hoverClass },
        customPrefix: { type: String, default: uni.$u.props.icon.customPrefix },
        label: { type: [String, Number], default: uni.$u.props.icon.label },
        labelPos: { type: String, default: uni.$u.props.icon.labelPos },
        labelSize: {
          type: [String, Number],
          default: uni.$u.props.icon.labelSize,
        },
        labelColor: { type: String, default: uni.$u.props.icon.labelColor },
        space: { type: [String, Number], default: uni.$u.props.icon.space },
        imgMode: { type: String, default: uni.$u.props.icon.imgMode },
        width: { type: [String, Number], default: uni.$u.props.icon.width },
        height: { type: [String, Number], default: uni.$u.props.icon.height },
        top: { type: [String, Number], default: uni.$u.props.icon.top },
        stop: { type: Boolean, default: uni.$u.props.icon.stop },
      },
    };
    n.default = e;
  },
  "5f99": function (i, n, t) {
    "use strict";
    t.d(n, "b", function () {
      return e;
    }),
      t.d(n, "c", function () {
        return o;
      }),
      t.d(n, "a", function () {});
    var e = function () {
        var i = this.$createElement, n = this._self._c || i;
        return n(
          "v-uni-view",
          { staticClass: "u-status-bar", style: [this.style] },
          [this._t("default")],
          2,
        );
      },
      o = [];
  },
  "70c5": function (i, n, t) {
    "use strict";
    var e = t("1991"), o = t.n(e);
    o.a;
  },
  "86c4": function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("084e"), o = t("0e26");
    for (var u in o) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return o[i];
        });
      }(u);
    }
    t("d056");
    var c = t("f0c5"),
      r = Object(c["a"])(
        o["default"],
        e["b"],
        e["c"],
        !1,
        null,
        "5302c461",
        null,
        !1,
        e["a"],
        void 0,
      );
    n["default"] = r.exports;
  },
  "948f": function (i, n, t) {
    "use strict";
    t("7a82");
    var e = t("4ea4").default;
    Object.defineProperty(n, "__esModule", { value: !0 }), n.default = void 0;
    var o = e(t("0bd1")),
      u = {
        name: "u-status-bar",
        mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
        data: function () {
          return {};
        },
        computed: {
          style: function () {
            var i = {};
            return i.height = uni.$u.addUnit(
              uni.$u.sys().statusBarHeight,
              "px",
            ),
              i.backgroundColor = this.bgColor,
              uni.$u.deepMerge(i, uni.$u.addStyle(this.customStyle));
          },
        },
      };
    n.default = u;
  },
  "94c1": function (i, n, t) {
    "use strict";
    t("7a82");
    var e = t("4ea4").default;
    Object.defineProperty(n, "__esModule", { value: !0 }), n.default = void 0;
    var o = e(t("b897")),
      u = {
        name: "u-navbar",
        mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
        data: function () {
          return {};
        },
        methods: {
          leftClick: function () {
            this.$emit("leftClick"), this.autoBack && uni.navigateBack();
          },
          rightClick: function () {
            this.$emit("rightClick");
          },
        },
      };
    n.default = u;
  },
  "9a99": function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("5f99"), o = t("3405");
    for (var u in o) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return o[i];
        });
      }(u);
    }
    t("bf6e");
    var c = t("f0c5"),
      r = Object(c["a"])(
        o["default"],
        e["b"],
        e["c"],
        !1,
        null,
        "186edb96",
        null,
        !1,
        e["a"],
        void 0,
      );
    n["default"] = r.exports;
  },
  a6a2: function (i, n, t) {
    "use strict";
    t.r(n);
    var e = t("eb9c"), o = t("2606");
    for (var u in o) {
      ["default"].indexOf(u) < 0 && function (i) {
        t.d(n, i, function () {
          return o[i];
        });
      }(u);
    }
    t("70c5");
    var c = t("f0c5"),
      r = Object(c["a"])(
        o["default"],
        e["b"],
        e["c"],
        !1,
        null,
        "59765974",
        null,
        !1,
        e["a"],
        void 0,
      );
    n["default"] = r.exports;
  },
  b897: function (i, n, t) {
    "use strict";
    t("7a82"),
      Object.defineProperty(n, "__esModule", { value: !0 }),
      n.default = void 0,
      t("a9e3");
    var e = {
      props: {
        safeAreaInsetTop: {
          type: Boolean,
          default: uni.$u.props.navbar.safeAreaInsetTop,
        },
        placeholder: {
          type: Boolean,
          default: uni.$u.props.navbar.placeholder,
        },
        fixed: { type: Boolean, default: uni.$u.props.navbar.fixed },
        border: { type: Boolean, default: uni.$u.props.navbar.border },
        leftIcon: { type: String, default: uni.$u.props.navbar.leftIcon },
        leftText: { type: String, default: uni.$u.props.navbar.leftText },
        rightText: { type: String, default: uni.$u.props.navbar.rightText },
        rightIcon: { type: String, default: uni.$u.props.navbar.rightIcon },
        title: { type: [String, Number], default: uni.$u.props.navbar.title },
        bgColor: { type: String, default: uni.$u.props.navbar.bgColor },
        titleWidth: {
          type: [String, Number],
          default: uni.$u.props.navbar.titleWidth,
        },
        height: { type: [String, Number], default: uni.$u.props.navbar.height },
        leftIconSize: {
          type: [String, Number],
          default: uni.$u.props.navbar.leftIconSize,
        },
        leftIconColor: {
          type: String,
          default: uni.$u.props.navbar.leftIconColor,
        },
        autoBack: { type: Boolean, default: uni.$u.props.navbar.autoBack },
        titleStyle: {
          type: [String, Object],
          default: uni.$u.props.navbar.titleStyle,
        },
      },
    };
    n.default = e;
  },
  bf6e: function (i, n, t) {
    "use strict";
    var e = t("d543"), o = t.n(e);
    o.a;
  },
  ca45: function (i, n, t) {
    var e = t("24fb");
    n = e(!1),
      n.push([
        i.i,
        '@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-status-bar[data-v-186edb96]{width:100%}',
        "",
      ]),
      i.exports = n;
  },
  d056: function (i, n, t) {
    "use strict";
    var e = t("e3a6"), o = t.n(e);
    o.a;
  },
  d543: function (i, n, t) {
    var e = t("ca45");
    e.__esModule && (e = e.default),
      "string" === typeof e && (e = [[i.i, e, ""]]),
      e.locals && (i.exports = e.locals);
    var o = t("4f06").default;
    o("401ff1cf", e, !0, { sourceMap: !1, shadowMode: !1 });
  },
  d94c: function (i, n, t) {
    "use strict";
    t("7a82"),
      Object.defineProperty(n, "__esModule", { value: !0 }),
      n.default = void 0;
    n.default = {
      "uicon-level": "",
      "uicon-column-line": "",
      "uicon-checkbox-mark": "",
      "uicon-folder": "",
      "uicon-movie": "",
      "uicon-star-fill": "",
      "uicon-star": "",
      "uicon-phone-fill": "",
      "uicon-phone": "",
      "uicon-apple-fill": "",
      "uicon-chrome-circle-fill": "",
      "uicon-backspace": "",
      "uicon-attach": "",
      "uicon-cut": "",
      "uicon-empty-car": "",
      "uicon-empty-coupon": "",
      "uicon-empty-address": "",
      "uicon-empty-favor": "",
      "uicon-empty-permission": "",
      "uicon-empty-news": "",
      "uicon-empty-search": "",
      "uicon-github-circle-fill": "",
      "uicon-rmb": "",
      "uicon-person-delete-fill": "",
      "uicon-reload": "",
      "uicon-order": "",
      "uicon-server-man": "",
      "uicon-search": "",
      "uicon-fingerprint": "",
      "uicon-more-dot-fill": "",
      "uicon-scan": "",
      "uicon-share-square": "",
      "uicon-map": "",
      "uicon-map-fill": "",
      "uicon-tags": "",
      "uicon-tags-fill": "",
      "uicon-bookmark-fill": "",
      "uicon-bookmark": "",
      "uicon-eye": "",
      "uicon-eye-fill": "",
      "uicon-mic": "",
      "uicon-mic-off": "",
      "uicon-calendar": "",
      "uicon-calendar-fill": "",
      "uicon-trash": "",
      "uicon-trash-fill": "",
      "uicon-play-left": "",
      "uicon-play-right": "",
      "uicon-minus": "",
      "uicon-plus": "",
      "uicon-info": "",
      "uicon-info-circle": "",
      "uicon-info-circle-fill": "",
      "uicon-question": "",
      "uicon-error": "",
      "uicon-close": "",
      "uicon-checkmark": "",
      "uicon-android-circle-fill": "",
      "uicon-android-fill": "",
      "uicon-ie": "",
      "uicon-IE-circle-fill": "",
      "uicon-google": "",
      "uicon-google-circle-fill": "",
      "uicon-setting-fill": "",
      "uicon-setting": "",
      "uicon-minus-square-fill": "",
      "uicon-plus-square-fill": "",
      "uicon-heart": "",
      "uicon-heart-fill": "",
      "uicon-camera": "",
      "uicon-camera-fill": "",
      "uicon-more-circle": "",
      "uicon-more-circle-fill": "",
      "uicon-chat": "",
      "uicon-chat-fill": "",
      "uicon-bag-fill": "",
      "uicon-bag": "",
      "uicon-error-circle-fill": "",
      "uicon-error-circle": "",
      "uicon-close-circle": "",
      "uicon-close-circle-fill": "",
      "uicon-checkmark-circle": "",
      "uicon-checkmark-circle-fill": "",
      "uicon-question-circle-fill": "",
      "uicon-question-circle": "",
      "uicon-share": "",
      "uicon-share-fill": "",
      "uicon-shopping-cart": "",
      "uicon-shopping-cart-fill": "",
      "uicon-bell": "",
      "uicon-bell-fill": "",
      "uicon-list": "",
      "uicon-list-dot": "",
      "uicon-zhihu": "",
      "uicon-zhihu-circle-fill": "",
      "uicon-zhifubao": "",
      "uicon-zhifubao-circle-fill": "",
      "uicon-weixin-circle-fill": "",
      "uicon-weixin-fill": "",
      "uicon-twitter-circle-fill": "",
      "uicon-twitter": "",
      "uicon-taobao-circle-fill": "",
      "uicon-taobao": "",
      "uicon-weibo-circle-fill": "",
      "uicon-weibo": "",
      "uicon-qq-fill": "",
      "uicon-qq-circle-fill": "",
      "uicon-moments-circel-fill": "",
      "uicon-moments": "",
      "uicon-qzone": "",
      "uicon-qzone-circle-fill": "",
      "uicon-baidu-circle-fill": "",
      "uicon-baidu": "",
      "uicon-facebook-circle-fill": "",
      "uicon-facebook": "",
      "uicon-car": "",
      "uicon-car-fill": "",
      "uicon-warning-fill": "",
      "uicon-warning": "",
      "uicon-clock-fill": "",
      "uicon-clock": "",
      "uicon-edit-pen": "",
      "uicon-edit-pen-fill": "",
      "uicon-email": "",
      "uicon-email-fill": "",
      "uicon-minus-circle": "",
      "uicon-minus-circle-fill": "",
      "uicon-plus-circle": "",
      "uicon-plus-circle-fill": "",
      "uicon-file-text": "",
      "uicon-file-text-fill": "",
      "uicon-pushpin": "",
      "uicon-pushpin-fill": "",
      "uicon-grid": "",
      "uicon-grid-fill": "",
      "uicon-play-circle": "",
      "uicon-play-circle-fill": "",
      "uicon-pause-circle-fill": "",
      "uicon-pause": "",
      "uicon-pause-circle": "",
      "uicon-eye-off": "",
      "uicon-eye-off-outline": "",
      "uicon-gift-fill": "",
      "uicon-gift": "",
      "uicon-rmb-circle-fill": "",
      "uicon-rmb-circle": "",
      "uicon-kefu-ermai": "",
      "uicon-server-fill": "",
      "uicon-coupon-fill": "",
      "uicon-coupon": "",
      "uicon-integral": "",
      "uicon-integral-fill": "",
      "uicon-home-fill": "",
      "uicon-home": "",
      "uicon-hourglass-half-fill": "",
      "uicon-hourglass": "",
      "uicon-account": "",
      "uicon-plus-people-fill": "",
      "uicon-minus-people-fill": "",
      "uicon-account-fill": "",
      "uicon-thumb-down-fill": "",
      "uicon-thumb-down": "",
      "uicon-thumb-up": "",
      "uicon-thumb-up-fill": "",
      "uicon-lock-fill": "",
      "uicon-lock-open": "",
      "uicon-lock-opened-fill": "",
      "uicon-lock": "",
      "uicon-red-packet-fill": "",
      "uicon-photo-fill": "",
      "uicon-photo": "",
      "uicon-volume-off-fill": "",
      "uicon-volume-off": "",
      "uicon-volume-fill": "",
      "uicon-volume": "",
      "uicon-red-packet": "",
      "uicon-download": "",
      "uicon-arrow-up-fill": "",
      "uicon-arrow-down-fill": "",
      "uicon-play-left-fill": "",
      "uicon-play-right-fill": "",
      "uicon-rewind-left-fill": "",
      "uicon-rewind-right-fill": "",
      "uicon-arrow-downward": "",
      "uicon-arrow-leftward": "",
      "uicon-arrow-rightward": "",
      "uicon-arrow-upward": "",
      "uicon-arrow-down": "",
      "uicon-arrow-right": "",
      "uicon-arrow-left": "",
      "uicon-arrow-up": "",
      "uicon-skip-back-left": "",
      "uicon-skip-forward-right": "",
      "uicon-rewind-right": "",
      "uicon-rewind-left": "",
      "uicon-arrow-right-double": "",
      "uicon-arrow-left-double": "",
      "uicon-wifi-off": "",
      "uicon-wifi": "",
      "uicon-empty-data": "",
      "uicon-empty-history": "",
      "uicon-empty-list": "",
      "uicon-empty-page": "",
      "uicon-empty-order": "",
      "uicon-man": "",
      "uicon-woman": "",
      "uicon-man-add": "",
      "uicon-man-add-fill": "",
      "uicon-man-delete": "",
      "uicon-man-delete-fill": "",
      "uicon-zh": "",
      "uicon-en": "",
    };
  },
  e3a6: function (i, n, t) {
    var e = t("f4eb");
    e.__esModule && (e = e.default),
      "string" === typeof e && (e = [[i.i, e, ""]]),
      e.locals && (i.exports = e.locals);
    var o = t("4f06").default;
    o("c2a3c028", e, !0, { sourceMap: !1, shadowMode: !1 });
  },
  eb9c: function (i, n, t) {
    "use strict";
    t.d(n, "b", function () {
      return e;
    }),
      t.d(n, "c", function () {
        return o;
      }),
      t.d(n, "a", function () {});
    var e = function () {
        var i = this, n = i.$createElement, t = i._self._c || n;
        return t("v-uni-view", {
          staticClass: "u-icon",
          class: ["u-icon--" + i.labelPos],
          on: {
            click: function (n) {
              arguments[0] = n = i.$handleEvent(n),
                i.clickHandler.apply(void 0, arguments);
            },
          },
        }, [
          i.isImg
            ? t("v-uni-image", {
              staticClass: "u-icon__img",
              style: [i.imgStyle, i.$u.addStyle(i.customStyle)],
              attrs: { src: i.name, mode: i.imgMode },
            })
            : t("v-uni-text", {
              staticClass: "u-icon__icon",
              class: i.uClasses,
              style: [i.iconStyle, i.$u.addStyle(i.customStyle)],
              attrs: { "hover-class": i.hoverClass },
            }, [i._v(i._s(i.icon))]),
          "" !== i.label
            ? t("v-uni-text", {
              staticClass: "u-icon__label",
              style: {
                color: i.labelColor,
                fontSize: i.$u.addUnit(i.labelSize),
                marginLeft: "right" == i.labelPos ? i.$u.addUnit(i.space) : 0,
                marginTop: "bottom" == i.labelPos ? i.$u.addUnit(i.space) : 0,
                marginRight: "left" == i.labelPos ? i.$u.addUnit(i.space) : 0,
                marginBottom: "top" == i.labelPos ? i.$u.addUnit(i.space) : 0,
              },
            }, [i._v(i._s(i.label))])
            : i._e(),
        ], 1);
      },
      o = [];
  },
  f4eb: function (i, n, t) {
    var e = t("24fb");
    n = e(!1),
      n.push([
        i.i,
        '@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-5302c461], uni-scroll-view[data-v-5302c461], uni-swiper-item[data-v-5302c461]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-navbar--fixed[data-v-5302c461]{position:fixed;left:0;right:0;top:0;z-index:11}.u-navbar__content[data-v-5302c461]{display:flex;flex-direction:row;align-items:center;height:44px;background-color:#9acafc;position:relative;justify-content:center}.u-navbar__content__left[data-v-5302c461], .u-navbar__content__right[data-v-5302c461]{padding:0 13px;position:absolute;top:0;bottom:0;display:flex;flex-direction:row;align-items:center}.u-navbar__content__left[data-v-5302c461]{left:0}.u-navbar__content__left--hover[data-v-5302c461]{opacity:.7}.u-navbar__content__left__text[data-v-5302c461]{font-size:15px;margin-left:3px}.u-navbar__content__title[data-v-5302c461]{text-align:center;font-size:16px;color:#303133}.u-navbar__content__right[data-v-5302c461]{right:0}.u-navbar__content__right__text[data-v-5302c461]{font-size:15px;margin-left:3px}',
        "",
      ]),
      i.exports = n;
  },
}]);
