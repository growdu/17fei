import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string; // 主色
  description: string;
}

interface TrialInfo {
  date: string;
  count: number;
}

const MAX_TRIAL_PER_DAY = 3;

export default function ThemeSwitcher() {
  const availableThemes = useSignal<ThemeInfo[]>([]);
  const currentTheme = useSignal<string>("romantic");
  const isVip = useSignal<boolean>(false);
  const trialCount = useSignal<number>(0);
  const isPanelOpen = useSignal<boolean>(false);
  const showVipModal = useSignal<boolean>(false);
  const activationCode = useSignal<string>("");
  const isActivating = useSignal<boolean>(false);
  const activationError = useSignal<string>("");

  // 加载主题列表
  useEffect(() => {
    if (!IS_BROWSER) return;

    // 检查VIP状态
    const vipStatus = localStorage.getItem("vip_status");
    isVip.value = vipStatus === "true";

    // 加载当前主题
    const savedTheme = localStorage.getItem("current_theme");
    currentTheme.value = savedTheme || "romantic";

    // 检查试用次数
    const today = new Date().toISOString().split("T")[0];
    const trialKey = `theme_trial_${today}`;
    const trialData = localStorage.getItem(trialKey);
    if (trialData) {
      const trial: TrialInfo = JSON.parse(trialData);
      if (trial.date === today) {
        trialCount.value = Math.max(0, MAX_TRIAL_PER_DAY - trial.count);
      }
    } else {
      trialCount.value = MAX_TRIAL_PER_DAY;
    }

    // 加载主题列表
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      const res = await fetch("/api/themes");
      const data = await res.json();
      availableThemes.value = data.themes;
    } catch (e) {
      console.error("Failed to load themes:", e);
    }
  };

  const loadThemeCss = (themeId: string) => {
    // 移除旧主题样式
    const oldLink = document.getElementById("theme-css");
    oldLink?.remove();

    // 加载新主题
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = `/themes/${themeId}.css`;
    document.head.appendChild(link);
  };

  const switchTheme = (themeId: string) => {
    if (themeId === currentTheme.value) return;

    if (isVip.value) {
      // VIP用户直接切换
      applyTheme(themeId);
    } else {
      // 非VIP用户检查试用次数
      if (trialCount.value > 0) {
        // 消耗试用次数
        const today = new Date().toISOString().split("T")[0];
        const trialKey = `theme_trial_${today}`;
        const existing = localStorage.getItem(trialKey);
        const trial: TrialInfo = existing
          ? JSON.parse(existing)
          : { date: today, count: 0 };
        trial.count += 1;
        localStorage.setItem(trialKey, JSON.stringify(trial));
        trialCount.value = Math.max(0, MAX_TRIAL_PER_DAY - trial.count);
        applyTheme(themeId);
      } else {
        // 弹出VIP提示
        showVipModal.value = true;
      }
    }
  };

  const applyTheme = (themeId: string) => {
    currentTheme.value = themeId;
    loadThemeCss(themeId);
    localStorage.setItem("current_theme", themeId);
  };

  const activateVip = async () => {
    if (!activationCode.value.trim()) {
      activationError.value = "请输入激活码";
      return;
    }

    isActivating.value = true;
    activationError.value = "";

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: activationCode.value.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("vip_status", "true");
        isVip.value = true;
        showVipModal.value = false;
        activationCode.value = "";
      } else {
        activationError.value = data.message || "激活码无效";
      }
    } catch (e) {
      activationError.value = "网络错误，请重试";
    } finally {
      isActivating.value = false;
    }
  };

  return (
    <div class="theme-switcher">
      {/* 切换按钮 */}
      <button
        class="theme-toggle-btn"
        onClick={() => (isPanelOpen.value = !isPanelOpen.value)}
        title="切换主题"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "var(--theme-btn-bg, linear-gradient(135deg, #ff6b9d, #c44569))",
          border: "none",
          cursor: "pointer",
          boxShadow: "var(--theme-shadow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <span style={{ fontSize: "20px", color: "white" }}>🎨</span>
      </button>

      {/* 主题选择面板 */}
      {isPanelOpen.value && (
        <div
          class="theme-panel"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            width: "300px",
            background: "var(--theme-card-bg)",
            borderRadius: "var(--theme-border-radius)",
            boxShadow: "var(--theme-shadow)",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid var(--theme-card-border)",
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", color: "var(--theme-text)" }}>
            选择主题
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {availableThemes.value.map((theme) => (
              <div
                key={theme.id}
                class="theme-card"
                onClick={() => switchTheme(theme.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "var(--theme-border-radius-sm)",
                  background:
                    currentTheme.value === theme.id
                      ? "var(--theme-background-secondary)"
                      : "transparent",
                  border:
                    currentTheme.value === theme.id
                      ? "2px solid var(--theme-primary)"
                      : "1px solid var(--theme-card-border)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--theme-border-radius-sm)",
                    background: theme.preview,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "var(--theme-text)",
                    }}
                  >
                    {theme.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--theme-text-light)",
                    }}
                  >
                    {theme.description}
                  </div>
                </div>
                {currentTheme.value === theme.id && (
                  <span style={{ marginLeft: "auto", color: "var(--theme-primary)" }}>✓</span>
                )}
              </div>
            ))}
          </div>

          {/* 试用提示 */}
          {!isVip.value && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: "var(--theme-background)",
                borderRadius: "var(--theme-border-radius-sm)",
                fontSize: "12px",
                color: "var(--theme-text-light)",
                textAlign: "center",
              }}
            >
              剩余试用次数: <strong style={{ color: "var(--theme-primary)" }}>{trialCount.value}</strong> / {MAX_TRIAL_PER_DAY}
              <br />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showVipModal.value = true;
                }}
                style={{
                  marginTop: "8px",
                  padding: "6px 16px",
                  background: "var(--theme-btn-bg)",
                  border: "none",
                  borderRadius: "var(--theme-border-radius-sm)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                开通VIP解锁全部
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIP开通弹窗 */}
      {showVipModal.value && (
        <div
          class="vip-modal-overlay"
          onClick={() => (showVipModal.value = false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            class="vip-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--theme-card-bg)",
              padding: "32px",
              borderRadius: "var(--theme-border-radius)",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0 0 8px 0", color: "var(--theme-text)" }}>
              开通VIP
            </h2>
            <p style={{ color: "var(--theme-text-light)", marginBottom: "24px" }}>
              解锁全部主题，享受无限切换
            </p>

            {isVip.value ? (
              <div style={{ color: "var(--theme-primary)", padding: "20px" }}>
                您已是VIP会员 ✨
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="输入激活码"
                  value={activationCode.value}
                  onInput={(e) =>
                    (activationCode.value = (e.target as HTMLInputElement).value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--theme-border-radius-sm)",
                    border: "1px solid var(--theme-card-border)",
                    background: "var(--theme-background)",
                    color: "var(--theme-text)",
                    fontSize: "16px",
                    textAlign: "center",
                    marginBottom: "12px",
                  }}
                />
                {activationError.value && (
                  <div
                    style={{
                      color: "#e53e3e",
                      fontSize: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    {activationError.value}
                  </div>
                )}
                <button
                  onClick={activateVip}
                  disabled={isActivating.value}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "var(--theme-btn-bg)",
                    border: "none",
                    borderRadius: "var(--theme-border-radius-sm)",
                    color: "white",
                    fontSize: "16px",
                    cursor: isActivating.value ? "not-allowed" : "pointer",
                    opacity: isActivating.value ? 0.7 : 1,
                  }}
                >
                  {isActivating.value ? "激活中..." : "激活VIP"}
                </button>
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