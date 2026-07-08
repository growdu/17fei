// 键盘快捷键导航
// h → 首页   c → 任务卡牌   p → 姿势卡牌   g → 飞行棋   t → 主题切换面板
(function () {
  var isEditing = function (target) {
    if (!target) return false;
    var tag = (target.tagName || "").toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (target.isContentEditable) return true;
    return false;
  };

  window.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isEditing(e.target)) return;
    var key = e.key.toLowerCase();
    var map = {
      h: "/",
      c: "/card",
      p: "/position",
      g: "/fxq/index.html",
      a: "/about",
    };
    var target = map[key];
    if (target) {
      e.preventDefault();
      location.href = target;
      return;
    }
    if (key === "t") {
      var btn = document.querySelector(".theme-toggle-btn");
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    }
    if (key === "?") {
      // 帮助提示
      console.log(
        "%c17fei 快捷键",
        "color:#ff4d8d;font-weight:bold;font-size:14px",
      );
      console.log("h 首页 · c 任务卡 · p 姿势卡 · g 飞行棋 · a 关于 · t 主题 · ? 帮助");
    }
  });
})();
