// 17fei.fun 主题预加载 - 防止主题闪烁
// 必须在 <head> 内, 同步执行
(function () {
  try {
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
  } catch (_e) {
    /* localStorage 不可用 */
  }
})();
