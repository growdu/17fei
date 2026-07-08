import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string;
  gradient: string;
  description: string;
}

const THEMES: ThemeInfo[] = [
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
  {
    id: "premium",
    name: "高端私密",
    preview: "linear-gradient(135deg, #b197fc 0%, #845ef7 100%)",
    gradient: "linear-gradient(135deg, #b197fc 0%, #845ef7 100%)",
    description: "深紫 · 玻璃 · 高质感",
  },
];

const MAX_TRIAL_PER_DAY = 3;
const STORAGE_VIP = "vip_status";
const STORAGE_THEME = "current_theme";
const VIP_TOGGLE_KEY = "vip_toggle_enabled";

const DAY_KEY = (d: string) => `theme_trial_${d}`;

interface TrialInfo {
  date: string;
  count: number;
}

const getToday = () => new Date().toISOString().split("T")[0];

const getTrial = (): TrialInfo | null => {
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
  localStorage.setItem(
    DAY_KEY(getToday()),
    JSON.stringify({ date: getToday(), count }),
  );
};

export default function ThemeSwitcher() {
  const currentTheme = useSignal<string>("romantic");
  const isVip = useSignal<boolean>(false);
  const trialCount = useSignal<number>(MAX_TRIAL_PER_DAY);
  const isPanelOpen = useSignal<boolean>(false);
  const showVipModal = useSignal<boolean>(false);
  const activationCode = useSignal<string>("");
  const isActivating = useSignal<boolean>(false);
  const activationError = useSignal<string>("");
  const activationOk = useSignal<boolean>(false);

  useEffect(() => {
    if (!IS_BROWSER) return;

    const vip = localStorage.getItem(STORAGE_VIP) === "true";
    isVip.value = vip;

    const saved = localStorage.getItem(STORAGE_THEME);
    currentTheme.value = saved || "romantic";
    if (saved && saved !== "romantic") {
      loadThemeCss(saved);
    }

    const trial = getTrial();
    trialCount.value = trial
      ? Math.max(0, MAX_TRIAL_PER_DAY - trial.count)
      : MAX_TRIAL_PER_DAY;
  }, []);

  const loadThemeCss = (themeId: string) => {
    const old = document.getElementById("theme-css");
    old?.remove();
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = `/themes/${themeId}.css`;
    document.head.appendChild(link);
  };

  const switchTheme = (themeId: string) => {
    if (themeId === currentTheme.value) return;
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
    // 简单五彩纸屑
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

  return (
    <div class="theme-switcher">
      <button
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
        <span style={{ fontSize: "22px", color: "white" }}>🎨</span>
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
            background: "var(--theme-surface-elevated)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderRadius: "var(--theme-border-radius-lg)",
            boxShadow: "var(--theme-shadow-lg)",
            padding: "24px",
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
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--theme-text)",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              选择主题
            </h3>
            {isVip.value && (
              <span class="chip" style={{ color: "var(--theme-primary)" }}>
                ✨ VIP
              </span>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: "12px",
            }}
          >
            {THEMES.map((theme) => {
              const active = currentTheme.value === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => switchTheme(theme.id)}
                  style={{
                    padding: "12px",
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
                      height: "44px",
                      borderRadius: "var(--theme-border-radius-sm)",
                      background: theme.gradient,
                      marginBottom: "8px",
                      boxShadow: active ? "var(--theme-shadow-glow)" : "none",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "var(--theme-text)",
                    }}
                  >
                    {theme.name}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--theme-text-light)",
                      marginTop: "2px",
                    }}
                  >
                    {theme.description}
                  </div>
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "var(--theme-gradient)",
                        color: "#fff",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!isVip.value && (
            <div
              style={{
                marginTop: "20px",
                padding: "14px",
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
                : "解锁全部 4 套主题 · 解锁全部姿势图鉴"}
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
