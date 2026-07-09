import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string;
  gradient: string;
  description: string;
  isDark?: boolean;
}

const LIGHT_THEMES: ThemeInfo[] = [
  {
    id: "romantic",
    name: "浪漫梦幻",
    preview: "linear-gradient(135deg, #ff4d8d 0%, #c2255c 100%)",
    gradient: "linear-gradient(135deg, #ff4d8d 0%, #c2255c 100%)",
    description: "粉色 · 玻璃 · 心形",
  },
  {
    id: "minimal",
    name: "简约现代",
    preview: "linear-gradient(135deg, #4263eb 0%, #5c7cfa 100%)",
    gradient: "linear-gradient(135deg, #4263eb 0%, #5c7cfa 100%)",
    description: "蓝灰 · 平面 · 干净",
  },
  {
    id: "playful",
    name: "活泼可爱",
    preview: "linear-gradient(135deg, #ff922b 0%, #f76707 100%)",
    gradient: "linear-gradient(135deg, #ff922b 0%, #f76707 100%)",
    description: "橙黄 · 弹性 · 圆润",
  },
];

const DARK_THEMES: ThemeInfo[] = [
  {
    id: "premium",
    name: "高端私密",
    preview: "linear-gradient(135deg, #b197fc 0%, #845ef7 100%)",
    gradient: "linear-gradient(135deg, #b197fc 0%, #845ef7 100%)",
    description: "深紫 · 玻璃 · 高质感",
    isDark: true,
  },
  {
    id: "darkrose",
    name: "暗夜玫瑰",
    preview: "linear-gradient(135deg, #ff6b9d 0%, #cc3370 100%)",
    gradient: "linear-gradient(135deg, #ff6b9d 0%, #cc3370 100%)",
    description: "暗底玫红 · 玻璃磨砂",
    isDark: true,
  },
];

const MAX_TRIAL_PER_DAY = 3;

const STORAGE_VIP = "vip_status";
const STORAGE_THEME = "current_theme";
const STORAGE_MODE = "theme_mode"; // "manual" | "auto"
const VIP_TOGGLE_KEY = "vip_toggle_enabled";

const DAY_KEY = (d: string) => `theme_trial_${d}`;
const getToday = () => new Date().toISOString().split("T")[0];

interface TrialInfo {
  date: string;
  count: number;
}

const getTrial = (): TrialInfo | null => {
  if (typeof localStorage === "undefined") return null;
  const data = localStorage.getItem(DAY_KEY(getToday()));
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    return parsed && typeof parsed.count === "number" ? parsed : null;
  } catch {
    return null;
  }
};

const setTrial = (count: number) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(
    DAY_KEY(getToday()),
    JSON.stringify({ date: getToday(), count }),
  );
};

const systemPrefersDark = (): boolean => {
  if (typeof window === "undefined") return false;
  return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ??
    false;
};

const pickAuto = (): string => systemPrefersDark() ? "darkrose" : "romantic";

const loadThemeCss = (themeId: string) => {
  if (typeof document === "undefined") return;
  const old = document.getElementById("theme-css");
  old?.remove();
  const link = document.createElement("link");
  link.id = "theme-css";
  link.rel = "stylesheet";
  link.href = `/themes/${themeId}.css`;
  document.head.appendChild(link);
  document.documentElement.setAttribute("data-theme", themeId);
  document.documentElement.setAttribute(
    "data-theme-mode",
    systemPrefersDark() ? "dark" : "light",
  );
};

export default function ThemeSwitcher() {
  const currentTheme = useSignal<string>("romantic");
  const isAuto = useSignal<boolean>(true);
  const isVip = useSignal<boolean>(false);
  const trialCount = useSignal<number>(MAX_TRIAL_PER_DAY);
  const isPanelOpen = useSignal<boolean>(false);
  const showVipModal = useSignal<boolean>(false);
  const activationCode = useSignal<string>("");
  const isActivating = useSignal<boolean>(false);
  const activationError = useSignal<string>("");
  const activationOk = useSignal<boolean>(false);

  // 初始化 + 监听系统暗色变化
  useEffect(() => {
    if (!IS_BROWSER) return;

    isVip.value = localStorage.getItem(STORAGE_VIP) === "true";

    const mode = localStorage.getItem(STORAGE_MODE);
    const explicitAuto = mode === null; // 默认 auto
    isAuto.value = explicitAuto || mode === "auto";

    const applyByMode = () => {
      if (isAuto.value) {
        const picked = pickAuto();
        currentTheme.value = picked;
        loadThemeCss(picked);
      } else {
        const saved = localStorage.getItem(STORAGE_THEME) || "romantic";
        currentTheme.value = saved;
        if (saved !== "romantic") loadThemeCss(saved);
      }
    };
    applyByMode();

    const trial = getTrial();
    trialCount.value = trial
      ? Math.max(0, MAX_TRIAL_PER_DAY - trial.count)
      : MAX_TRIAL_PER_DAY;

    const mql = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (isAuto.value) applyByMode();
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setMode = (mode: "auto" | "manual") => {
    isAuto.value = mode === "auto";
    localStorage.setItem(STORAGE_MODE, mode);
    if (mode === "auto") {
      const picked = pickAuto();
      currentTheme.value = picked;
      loadThemeCss(picked);
    }
  };

  const switchTheme = (themeId: string) => {
    if (themeId === currentTheme.value) return;
    if (isAuto.value) {
      // 用户主动切换 → 退出 AUTO
      setMode("manual");
      isAuto.value = false;
    }
    if (isVip.value) {
      applyTheme(themeId);
      return;
    }
    if (trialCount.value > 0) {
      const cur = getTrial();
      const next = (cur?.count ?? 0) + 1;
      setTrial(next);
      trialCount.value = Math.max(0, MAX_TRIAL_PER_DAY - next);
      applyTheme(themeId);
    } else {
      showVipModal.value = true;
    }
  };

  const applyTheme = (themeId: string) => {
    currentTheme.value = themeId;
    loadThemeCss(themeId);
    localStorage.setItem(STORAGE_THEME, themeId);
  };

  const activateVip = async () => {
    const code = activationCode.value.trim();
    if (!code) {
      activationError.value = "请输入激活码";
      return;
    }
    isActivating.value = true;
    activationError.value = "";
    activationOk.value = false;
    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(STORAGE_VIP, "true");
        localStorage.setItem(VIP_TOGGLE_KEY, "true");
        isVip.value = true;
        activationOk.value = true;
        celebrate();
        setTimeout(() => {
          showVipModal.value = false;
          activationCode.value = "";
          activationOk.value = false;
        }, 1800);
      } else {
        activationError.value = data.message || "激活码无效";
      }
    } catch {
      activationError.value = "网络错误，请重试";
    } finally {
      isActivating.value = false;
    }
  };

  const celebrate = () => {
    if (typeof document === "undefined") return;
    const colors = [
      "var(--theme-primary)",
      "var(--theme-secondary)",
      "var(--theme-accent)",
      "#ffd700",
      "#ff6b9d",
      "#9b59b6",
    ];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = `${-10 + Math.random() * 20}vh`;
      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      piece.style.animationDuration = `${1 + Math.random() * 0.6}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2000);
    }
  };

  const resetTrial = () => {
    setTrial(0);
    trialCount.value = MAX_TRIAL_PER_DAY;
  };

  const renderTheme = (t: ThemeInfo) => {
    const active = currentTheme.value === t.id && !isAuto.value;
    return (
      <button
        type="button"
        key={t.id}
        onClick={() => switchTheme(t.id)}
        style={{
          padding: "10px",
          border: active
            ? "2px solid var(--theme-primary)"
            : "1px solid var(--theme-card-border)",
          borderRadius: "var(--theme-border-radius)",
          background: "var(--theme-surface)",
          cursor: "pointer",
          textAlign: "left",
          transition: "all 0.2s var(--theme-ease-out)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "40px",
            borderRadius: "var(--theme-border-radius-sm)",
            background: t.gradient,
            marginBottom: "6px",
            boxShadow: active ? "var(--theme-shadow-glow)" : "none",
          }}
        />
        <div
          style={{
            fontWeight: 700,
            fontSize: "12px",
            color: "var(--theme-text)",
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "var(--theme-text-light)",
            marginTop: "2px",
          }}
        >
          {t.description}
        </div>
        {active && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "var(--theme-gradient)",
              color: "#fff",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            ✓
          </span>
        )}
      </button>
    );
  };

  return (
    <div class="theme-switcher">
      <button
        type="button"
        class="theme-toggle-btn"
        onClick={() => (isPanelOpen.value = !isPanelOpen.value)}
        title="切换主题"
        aria-label="切换主题"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--theme-btn-bg)",
          border: "none",
          cursor: "pointer",
          boxShadow: "var(--theme-btn-shadow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s var(--theme-ease-out)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "22px", color: "white" }}>
          {isAuto.value ? "✨" : "🎨"}
        </span>
      </button>

      {isPanelOpen.value && (
        <div
          class="theme-panel"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            width: "320px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            background: "var(--theme-surface-elevated)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderRadius: "var(--theme-border-radius-lg)",
            boxShadow: "var(--theme-shadow-lg)",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid var(--theme-card-border)",
            animation: "fade-up 0.25s var(--theme-ease-out)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--theme-text)",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              主题选择
            </h3>
            {isVip.value
              ? (
                <span class="chip" style={{ color: "var(--theme-primary)" }}>
                  ✨ VIP
                </span>
              )
              : null}
          </div>

          {/* AUTO / 手动 切换 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
              padding: "4px",
              background: "var(--theme-surface)",
              borderRadius: "var(--theme-border-radius-pill)",
              marginBottom: "14px",
            }}
          >
            <button
              type="button"
              onClick={() => setMode("auto")}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--theme-border-radius-pill)",
                border: "none",
                background: isAuto.value
                  ? "var(--theme-surface-strong)"
                  : "transparent",
                boxShadow: isAuto.value ? "var(--theme-shadow-sm)" : "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
                color: "var(--theme-text)",
                transition: "all 0.2s var(--theme-ease-out)",
              }}
            >
              ✨ 自动
            </button>
            <button
              type="button"
              onClick={() => setMode("manual")}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--theme-border-radius-pill)",
                border: "none",
                background: !isAuto.value
                  ? "var(--theme-surface-strong)"
                  : "transparent",
                boxShadow: !isAuto.value ? "var(--theme-shadow-sm)" : "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
                color: "var(--theme-text)",
                transition: "all 0.2s var(--theme-ease-out)",
              }}
            >
              🎨 手动
            </button>
          </div>

          {isAuto.value && (
            <div
              style={{
                padding: "8px 12px",
                background: "var(--theme-gradient-soft)",
                borderRadius: "var(--theme-border-radius)",
                fontSize: "11px",
                color: "var(--theme-text)",
                marginBottom: "12px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>💡</span>
              <span>
                跟随系统: {systemPrefersDark() ? "暗" : "亮"}{" "}
                · 手动选主题自动退出
              </span>
            </div>
          )}

          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--theme-text-light)",
              marginBottom: "6px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            ☀️ 浅色
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {LIGHT_THEMES.map(renderTheme)}
          </div>

          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--theme-text-light)",
              marginBottom: "6px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            🌙 深色
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {DARK_THEMES.map(renderTheme)}
          </div>

          {!isVip.value && (
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                background: "var(--theme-gradient-soft)",
                borderRadius: "var(--theme-border-radius)",
                fontSize: "12px",
                color: "var(--theme-text)",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                🎁 今日剩余试用:{" "}
                <strong style={{ color: "var(--theme-primary)" }}>
                  {trialCount.value}
                </strong>{" "}
                / {MAX_TRIAL_PER_DAY}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  class="btn btn-ghost"
                  style={{ padding: "6px 12px", fontSize: "11px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetTrial();
                  }}
                >
                  重置
                </button>
                <button
                  type="button"
                  class="btn"
                  style={{ padding: "6px 12px", fontSize: "11px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    showVipModal.value = true;
                  }}
                >
                  开通 VIP 解锁全部
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showVipModal.value && (
        <div
          onClick={() => (showVipModal.value = false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            animation: "fade-up 0.2s var(--theme-ease-out)",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "32px",
              background: "var(--theme-surface-elevated)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--theme-card-border)",
              borderRadius: "var(--theme-border-radius-lg)",
              boxShadow: "var(--theme-shadow-lg)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              {isVip.value ? "✨" : "🔒"}
            </div>
            <h2
              style={{
                margin: "0 0 8px",
                color: "var(--theme-text)",
                fontSize: "22px",
              }}
            >
              {isVip.value ? "你已是 VIP" : "开通 VIP"}
            </h2>
            <p
              style={{
                color: "var(--theme-text-light)",
                fontSize: "13px",
                margin: "0 0 24px",
              }}
            >
              {isVip.value
                ? "已经享受无限切换所有主题"
                : "解锁全部 5 套主题 · 解锁全部姿势图鉴"}
            </p>

            {!isVip.value && (
              <>
                <input
                  type="text"
                  placeholder="输入激活码"
                  value={activationCode.value}
                  onInput={(e) => {
                    activationCode.value = (e.target as HTMLInputElement).value;
                    activationError.value = "";
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "var(--theme-border-radius-sm)",
                    border: "1px solid var(--theme-card-border)",
                    background: "var(--theme-surface)",
                    color: "var(--theme-text)",
                    fontSize: "15px",
                    textAlign: "center",
                    marginBottom: "8px",
                    letterSpacing: "0.1em",
                    fontFamily: "monospace",
                  }}
                />
                {activationError.value && (
                  <div
                    style={{
                      color: "#e53e3e",
                      fontSize: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    {activationError.value}
                  </div>
                )}
                {activationOk.value && (
                  <div
                    style={{
                      color: "var(--theme-primary)",
                      fontSize: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    ✨ 激活成功
                  </div>
                )}
                <button
                  type="button"
                  class="btn"
                  onClick={activateVip}
                  disabled={isActivating.value}
                  style={{
                    width: "100%",
                    padding: "12px",
                  }}
                >
                  {isActivating.value ? "激活中…" : "激活 VIP"}
                </button>
                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "12px",
                    color: "var(--theme-text-light)",
                  }}
                >
                  没有激活码？{" "}
                  <a href="/about" style={{ fontWeight: 600 }}>
                    联系开通 →
                  </a>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => (showVipModal.value = false)}
              style={{
                marginTop: "16px",
                background: "transparent",
                border: "none",
                color: "var(--theme-text-light)",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
