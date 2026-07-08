// 主题切换时同步 meta[name=theme-color] 和 html attribute
// 让浏览器顶栏 / 状态栏颜色跟随当前主题
(function () {
  var apply = function () {
    var link = document.getElementById("theme-css");
    if (!link) return;
    var saved = localStorage.getItem("current_theme") || "romantic";
    var colors = {
      romantic: "#ff4d8d",
      minimal: "#4263eb",
      playful: "#ff922b",
      premium: "#845ef7",
      darkrose: "#1a0e1a",
    };
    var color = colors[saved] || colors.romantic;
    var meta = document.querySelector("meta[name=theme-color]");
    if (meta) meta.setAttribute("content", color);
  };

  var interval = setInterval(apply, 200);
  apply();

  // theme switcher 切换时立刻刷新一次
  document.addEventListener("click", function (e) {
    var btn = e.target instanceof Element ? e.target.closest(".theme-toggle-btn") : null;
    if (btn) setTimeout(apply, 60);
  });
  window.addEventListener("theme-changed", apply);
})();
