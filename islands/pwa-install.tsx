import { useSignal, useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa_install_dismissed";

export default function PwaInstall() {
  const deferred = useSignal<BeforeInstallPromptEvent | null>(null);
  const installed = useSignal<boolean>(false);
  const visible = useSignal<boolean>(false);

  useEffect(() => {
    if (!IS_BROWSER) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      if (localStorage.getItem(DISMISS_KEY)) return;
      deferred.value = e as BeforeInstallPromptEvent;
      visible.value = true;
    };

    const onInstalled = () => {
      installed.value = true;
      visible.value = false;
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // 检查 navigator standalone(已安装)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore iOS
      (typeof navigator.standalone === "boolean" && navigator.standalone);
    if (isStandalone) installed.value = true;

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferred.value) return;
    try {
      await deferred.value.prompt();
      const { outcome } = await deferred.value.userChoice;
      if (outcome === "accepted") {
        visible.value = false;
      }
    } catch {
      // 用户取消
    }
    deferred.value = null;
  };

  const dismiss = () => {
    visible.value = false;
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch { /* ignore */ }
  };

  if (!visible.value || installed.value) return null;

  return (
    <div
      role="dialog"
      aria-label="安装应用"
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 800,
        background: "var(--theme-surface-elevated)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--theme-card-border)",
        borderRadius: "var(--theme-border-radius-lg)",
        boxShadow: "var(--theme-shadow-lg)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "calc(100vw - 32px)",
        animation: "fade-up 0.35s var(--theme-ease-out)",
      }}
    >
      <img
        src="/logo.png"
        alt=""
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "var(--theme-icon-border-radius, 10px)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--theme-text)",
          }}
        >
          安装 17fei 到桌面
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--theme-text-light)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          添加到主屏,离线可用
        </div>
      </div>
      <button
        class="btn"
        onClick={install}
        style={{ padding: "8px 14px", fontSize: "12px" }}
      >
        安装
      </button>
      <button
        aria-label="关闭"
        onClick={dismiss}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--theme-text-light)",
          cursor: "pointer",
          padding: "4px 8px",
          fontSize: "16px",
        }}
      >
        ✕
      </button>
    </div>
  );
}
