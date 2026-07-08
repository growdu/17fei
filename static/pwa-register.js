// 注册 Service Worker (仅 https / localhost)
(function () {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(
      function (reg) {
        // 处理更新
        reg.addEventListener("updatefound", function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", function () {
            if (nw.state === "activated") {
              console.log("[17fei] 已激活新版本,刷新页面生效");
            }
          });
        });
      },
      function (err) {
        console.warn("[17fei] SW 注册失败:", err);
      }
    );
  });
})();
