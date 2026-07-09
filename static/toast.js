// 全局 toast 触发器
// 任何 island / 内联 JS 都可调用 window.showToast("message")
(function () {
  function showToast(msg, opts) {
    opts = opts || {};
    var duration = typeof opts.duration === "number" ? opts.duration : 2400;
    var existing = document.querySelector(".toast-container");
    var container = existing;
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    var node = document.createElement("div");
    node.className = "toast";
    node.textContent = msg;
    container.appendChild(node);
    setTimeout(function () {
      node.style.opacity = "0";
      node.style.transform = "translateY(-8px)";
      node.style.transition = "opacity .25s, transform .25s";
      setTimeout(function () {
        node.remove();
        if (!container.children.length) container.remove();
      }, 260);
    }, duration);
  }

  // Toast.island 同时挂一个同名, 避免冲突
  if (typeof globalThis.__toastHandler === "function") {
    var orig = globalThis.__toastHandler;
    globalThis.__toastHandler = function (m, opts) {
      orig(m, opts);
      showToast(m, opts);
    };
  } else {
    globalThis.__toastHandler = showToast;
  }
  globalThis.showToast = showToast;
})();
