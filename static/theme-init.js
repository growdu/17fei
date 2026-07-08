// 17fei.fun 主题预加载 - 防止主题闪烁
// 必须在 <head> 内, 同步执行
(function () {
  try {
    var mode = localStorage.getItem("theme_mode");
    var explicitAuto = mode === null || mode === "auto";

    if (explicitAuto) {
      // 自动模式: 跟随系统暗色
      var isDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = isDark ? "darkrose" : "romantic";
      var existing = document.getElementById("theme-css");
      if (existing) existing.remove();
      var link = document.createElement("link");
      link.id = "theme-css";
      link.rel = "stylesheet";
      link.href = "/themes/" + theme + ".css";
      document.head.appendChild(link);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("data-theme-mode",
        isDark ? "dark" : "light");
      // 同时存到 localStorage, 让 theme-meta.js / SSR 知道当前主题
      localStorage.setItem("current_theme", theme);
      return;
    }

    var saved = localStorage.getItem("current_theme");
    if (!saved) return;
    if (saved === "romantic") return;
    var existing = document.getElementById("theme-css");
    if (existing) existing.remove();
    var link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = "/themes/" + saved + ".css";
    document.head.appendChild(link);
    document.documentElement.setAttribute("data-theme", saved);
  } catch (_e) {
    /* localStorage 不可用 */
  }
})();
