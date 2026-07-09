// 回到顶部按钮
(function () {
  if (document.getElementById("back-to-top")) return;
  var btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.setAttribute("aria-label", "回到顶部");
  btn.innerHTML = "↑";
  btn.style.cssText = [
    "position:fixed",
    "bottom:24px",
    "right:24px",
    "width:44px",
    "height:44px",
    "border-radius:50%",
    "border:none",
    "background:var(--theme-btn-bg)",
    "color:#fff",
    "font-size:20px",
    "cursor:pointer",
    "box-shadow:var(--theme-btn-shadow)",
    "opacity:0",
    "transform:translateY(20px)",
    "transition:opacity .25s,transform .25s",
    "z-index:999",
    "pointer-events:none",
  ].join(";");
  btn.onmouseenter = function () {
    btn.style.transform = "translateY(-2px) scale(1.06)";
  };
  btn.onmouseleave = function () {
    btn.style.transform = "translateY(0)";
  };
  btn.onclick = function () {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };
  document.body.appendChild(btn);

  var visible = false;
  globalThis.addEventListener("scroll", function () {
    var show = globalThis.scrollY > 320;
    if (show !== visible) {
      visible = show;
      btn.style.opacity = show ? "1" : "0";
      btn.style.transform = show ? "translateY(0)" : "translateY(20px)";
      btn.style.pointerEvents = show ? "auto" : "none";
    }
  }, { passive: true });
})();
