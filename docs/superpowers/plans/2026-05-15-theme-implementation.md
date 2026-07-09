# 主题皮肤系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:**
实现主题皮肤系统，支持4种可切换主题，VIP用户可自由切换，非VIP用户每天3次试用机会

**Architecture:**
采用插件式主题架构，CSS变量定义主题样式，动态加载切换。VIP验证通过服务端激活码API，试用次数存储在localStorage。

**Tech Stack:** Fresh 1.5.2 + Preact + Twind + Deno KV

---

## 文件结构

```
/root/17fei/
├── static/themes/
│   ├── _manifest.json           # 主题索引
│   ├── romantic.css             # 浪漫梦幻（默认）
│   ├── minimal.css             # 简约现代
│   ├── playful.css             # 活泼可爱
│   └── premium.css             # 高端私密
├── islands/
│   └── theme-switcher.tsx      # 主题切换组件（新建）
├── routes/
│   ├── api/
│   │   ├── activate.ts         # 激活码验证API（新建）
│   │   └── themes.ts           # 主题列表API（新建）
│   └── _app.tsx                # 全局布局（修改）
├── twind.config.ts             # 主题变量配置（修改）
└── docs/superpowers/plans/2026-05-15-theme-implementation.md
```

---

## Task 1: 创建主题变量定义文件

**Files:**

- Create: `static/themes/romantic.css`
- Create: `static/themes/minimal.css`
- Create: `static/themes/playful.css`
- Create: `static/themes/premium.css`

---

### Task 1: romantic.css（浪漫梦幻 - 默认主题）

- [ ] **Step 1: 创建 romantic.css**

```css
/* 浪漫梦幻主题 - 17fei.fun 默认主题 */
:root {
  /* 主色调 - 粉色系 */
  --theme-primary: #ff6b9d;
  --theme-secondary: #c44569;
  --theme-accent: #ff8fab;

  /* 背景色 */
  --theme-background: #fff0f5;
  --theme-background-secondary: #ffe4ec;

  /* 文字色 */
  --theme-text: #4a4a4a;
  --theme-text-light: #8a6c6c;

  /* 卡片 */
  --theme-card-bg: #ffffff;
  --theme-card-border: rgba(255, 107, 157, 0.2);

  /* 渐变 */
  --theme-gradient-start: #ff6b9d;
  --theme-gradient-end: #c44569;
  --theme-gradient: linear-gradient(
    135deg,
    var(--theme-gradient-start),
    var(--theme-gradient-end)
  );

  /* 圆角 */
  --theme-border-radius: 16px;
  --theme-border-radius-sm: 8px;

  /* 阴影 */
  --theme-shadow: 0 4px 20px rgba(255, 107, 157, 0.3);
  --theme-shadow-hover: 0 8px 30px rgba(255, 107, 157, 0.4);

  /* 动画 */
  --theme-transition: 0.3s ease;
  --theme-animation: pulse 2s ease-in-out infinite;

  /* 按钮 */
  --theme-btn-bg: linear-gradient(135deg, #ff6b9d, #c44569);
  --theme-btn-hover-bg: linear-gradient(135deg, #ff8fab, #d65a7d);

  /* 粒子效果 */
  --theme-particle-enabled: true;

  /* 图标风格 */
  --theme-icon-border-radius: 50%;
}
```

---

### Task 2: minimal.css（简约现代）

- [ ] **Step 1: 创建 minimal.css**

```css
/* 简约现代主题 - 17fei.fun */
:root {
  /* 主色调 - 柔和蓝灰 */
  --theme-primary: #5c7cfa;
  --theme-secondary: #4c6ef5;
  --theme-accent: #748ffc;

  /* 背景色 */
  --theme-background: #f8f9fa;
  --theme-background-secondary: #e9ecef;

  /* 文字色 */
  --theme-text: #343a40;
  --theme-text-light: #868e96;

  /* 卡片 */
  --theme-card-bg: #ffffff;
  --theme-card-border: rgba(0, 0, 0, 0.08);

  /* 渐变 */
  --theme-gradient-start: #5c7cfa;
  --theme-gradient-end: #4c6ef5;
  --theme-gradient: linear-gradient(
    135deg,
    var(--theme-gradient-start),
    var(--theme-gradient-end)
  );

  /* 圆角 */
  --theme-border-radius: 8px;
  --theme-border-radius-sm: 4px;

  /* 阴影 */
  --theme-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --theme-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.12);

  /* 动画 */
  --theme-transition: 0.2s ease;
  --theme-animation: none;

  /* 按钮 */
  --theme-btn-bg: linear-gradient(135deg, #5c7cfa, #4c6ef5);
  --theme-btn-hover-bg: linear-gradient(135deg, #748ffc, #5c7cfa);

  /* 粒子效果 */
  --theme-particle-enabled: false;

  /* 图标风格 */
  --theme-icon-border-radius: 4px;
}
```

---

### Task 3: playful.css（活泼可爱）

- [ ] **Step 1: 创建 playful.css**

```css
/* 活泼可爱主题 - 17fei.fun */
:root {
  /* 主色调 - 明快橙黄 */
  --theme-primary: #ff922b;
  --theme-secondary: #ff7b00;
  --theme-accent: #ffa94d;

  /* 背景色 */
  --theme-background: #fff9db;
  --theme-background-secondary: #fff3bf;

  /* 文字色 */
  --theme-text: #495057;
  --theme-text-light: #868e96;

  /* 卡片 */
  --theme-card-bg: #ffffff;
  --theme-card-border: rgba(255, 146, 43, 0.2);

  /* 渐变 */
  --theme-gradient-start: #ff922b;
  --theme-gradient-end: #ff7b00;
  --theme-gradient: linear-gradient(
    135deg,
    var(--theme-gradient-start),
    var(--theme-gradient-end)
  );

  /* 圆角 */
  --theme-border-radius: 20px;
  --theme-border-radius-sm: 12px;

  /* 阴影 */
  --theme-shadow: 0 4px 12px rgba(255, 146, 43, 0.25);
  --theme-shadow-hover: 0 6px 20px rgba(255, 146, 43, 0.35);

  /* 动画 */
  --theme-transition: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  --theme-animation: bounce 1s ease-in-out infinite;

  /* 按钮 */
  --theme-btn-bg: linear-gradient(135deg, #ff922b, #ff7b00);
  --theme-btn-hover-bg: linear-gradient(135deg, #ffa94d, #ff922b);

  /* 粒子效果 */
  --theme-particle-enabled: true;
  --theme-particle-color: #ff922b;

  /* 图标风格 */
  --theme-icon-border-radius: 30%;
}
```

---

### Task 4: premium.css（高端私密）

- [ ] **Step 1: 创建 premium.css**

```css
/* 高端私密主题 - 17fei.fun */
:root {
  /* 主色调 - 深紫黑金 */
  --theme-primary: #9775fa;
  --theme-secondary: #845ef7;
  --theme-accent: #b197fc;

  /* 背景色 */
  --theme-background: #1a1a2e;
  --theme-background-secondary: #16213e;

  /* 文字色 */
  --theme-text: #e9ecef;
  --theme-text-light: #adb5bd;

  /* 卡片 */
  --theme-card-bg: rgba(255, 255, 255, 0.05);
  --theme-card-border: rgba(151, 117, 250, 0.3);

  /* 渐变 */
  --theme-gradient-start: #9775fa;
  --theme-gradient-end: #845ef7;
  --theme-gradient: linear-gradient(
    135deg,
    var(--theme-gradient-start),
    var(--theme-gradient-end)
  );

  /* 圆角 */
  --theme-border-radius: 12px;
  --theme-border-radius-sm: 6px;

  /* 阴影 */
  --theme-shadow: 0 4px 20px rgba(151, 117, 250, 0.2);
  --theme-shadow-hover: 0 8px 30px rgba(151, 117, 250, 0.3);

  /* 动画 */
  --theme-transition: 0.3s ease;
  --theme-animation: glow 2s ease-in-out infinite;

  /* 按钮 */
  --theme-btn-bg: linear-gradient(135deg, #9775fa, #845ef7);
  --theme-btn-hover-bg: linear-gradient(135deg, #b197fc, #9775fa);

  /* 粒子效果 */
  --theme-particle-enabled: true;
  --theme-particle-color: #9775fa;

  /* 图标风格 */
  --theme-icon-border-radius: 8px;
}
```

---

## Task 5: 创建主题索引文件

**Files:**

- Create: `static/themes/_manifest.json`

- [ ] **Step 1: 创建 _manifest.json**

```json
{
  "themes": ["romantic", "minimal", "playful", "premium"],
  "default": "romantic",
  "version": "1.0.0",
  "description": "17fei.fun 主题皮肤系统"
}
```

---

## Task 6: 创建主题切换Island组件

**Files:**

- Create: `islands/theme-switcher.tsx`

- [ ] **Step 1: 创建 theme-switcher.tsx**

```tsx
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
          background:
            "var(--theme-btn-bg, linear-gradient(135deg, #ff6b9d, #c44569))",
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
                  background: currentTheme.value === theme.id
                    ? "var(--theme-background-secondary)"
                    : "transparent",
                  border: currentTheme.value === theme.id
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
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--theme-primary)",
                    }}
                  >
                    ✓
                  </span>
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
              剩余试用次数:{" "}
              <strong style={{ color: "var(--theme-primary)" }}>
                {trialCount.value}
              </strong>{" "}
              / {MAX_TRIAL_PER_DAY}
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
            <p
              style={{ color: "var(--theme-text-light)", marginBottom: "24px" }}
            >
              解锁全部主题，享受无限切换
            </p>

            {isVip.value
              ? (
                <div style={{ color: "var(--theme-primary)", padding: "20px" }}>
                  您已是VIP会员 ✨
                </div>
              )
              : (
                <>
                  <input
                    type="text"
                    placeholder="输入激活码"
                    value={activationCode.value}
                    onInput={(
                      e,
                    ) => (activationCode.value =
                      (e.target as HTMLInputElement).value)}
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
```

---

## Task 7: 创建激活码验证API

**Files:**

- Create: `routes/api/activate.ts`

- [ ] **Step 1: 创建 activate API**

```typescript
import { Handlers } from "$fresh/server.ts";

interface ActivationRecord {
  used: boolean;
  usedBy?: string;
  usedAt?: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const { code } = await req.json();

      if (!code || typeof code !== "string") {
        return Response.json(
          { success: false, message: "激活码不能为空" },
          { status: 400 },
        );
      }

      const kv = await Deno.openKv();
      const record = await kv.get<ActivationRecord>([
        "activation_codes",
        code.toUpperCase(),
      ]);

      if (!record.value) {
        return Response.json(
          { success: false, message: "激活码无效" },
          { status: 400 },
        );
      }

      if (record.value.used) {
        return Response.json(
          { success: false, message: "激活码已被使用" },
          { status: 400 },
        );
      }

      // 标记为已使用
      const updatedRecord: ActivationRecord = {
        ...record.value,
        used: true,
        usedAt: new Date().toISOString(),
      };

      await kv.set(["activation_codes", code.toUpperCase()], updatedRecord);

      return Response.json({
        success: true,
        message: "激活成功",
      });
    } catch (error) {
      console.error("Activation error:", error);
      return Response.json(
        { success: false, message: "服务器错误，请重试" },
        { status: 500 },
      );
    }
  },
};
```

---

## Task 8: 创建主题列表API

**Files:**

- Create: `routes/api/themes.ts`

- [ ] **Step 1: 创建 themes API**

```typescript
import { Handlers } from "$fresh/server.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string;
  description: string;
}

const THEMES: ThemeInfo[] = [
  {
    id: "romantic",
    name: "浪漫梦幻",
    preview: "linear-gradient(135deg, #ff6b9d, #c44569)",
    description: "粉色渐变、爱心粒子、星空背景",
  },
  {
    id: "minimal",
    name: "简约现代",
    preview: "linear-gradient(135deg, #5c7cfa, #4c6ef5)",
    description: "扁平化设计、柔和配色、清新线条",
  },
  {
    id: "playful",
    name: "活泼可爱",
    preview: "linear-gradient(135deg, #ff922b, #ff7b00)",
    description: "明快橙黄、圆润元素、趣味动画",
  },
  {
    id: "premium",
    name: "高端私密",
    preview: "linear-gradient(135deg, #9775fa, #845ef7)",
    description: "深紫黑金、精致纹理、商务质感",
  },
];

export const handler: Handlers = {
  async GET(req) {
    return Response.json({
      themes: THEMES,
      default: "romantic",
    });
  },
};
```

---

## Task 9: 修改全局布局添加主题切换器

**Files:**

- Modify: `routes/_app.tsx`

- [ ] **Step 1: 读取当前 _app.tsx**

```bash
cat /root/17fei/routes/_app.tsx
```

- [ ] **Step 2: 添加主题切换器到布局**

修改 `routes/_app.tsx`，在组件中引入 ThemeSwitcher 并添加到布局：

```tsx
import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>17fei.fun</title>
      </head>
      <body>
        {/* 加载默认主题 */}
        <link
          id="theme-css"
          rel="stylesheet"
          href="/themes/romantic.css"
        />
        {/* 主题切换器 */}
        <ThemeSwitcher />
        <Component />
      </body>
    </html>
  );
}
```

并添加导入：

```tsx
import ThemeSwitcher from "../islands/theme-switcher.tsx";
```

---

## Task 10: 更新 Twind 配置

**Files:**

- Modify: `twind.config.ts`

- [ ] **Step 1: 读取当前 twind.config.ts**

```bash
cat /root/17fei/twind.config.ts
```

- [ ] **Step 2: 添加主题CSS变量映射**

更新 `twind.config.ts` 以使用CSS变量：

```typescript
import { defineConfig } from "$fresh/twind.ts";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary)",
        secondary: "var(--theme-secondary)",
        accent: "var(--theme-accent)",
        background: "var(--theme-background)",
        "background-secondary": "var(--theme-background-secondary)",
        text: "var(--theme-text)",
        "text-light": "var(--theme-text-light)",
        card: "var(--theme-card-bg)",
      },
      borderRadius: {
        DEFAULT: "var(--theme-border-radius)",
        sm: "var(--theme-border-radius-sm)",
      },
      boxShadow: {
        DEFAULT: "var(--theme-shadow)",
        hover: "var(--theme-shadow-hover)",
      },
    },
  },
});
```

---

## Task 11: 初始化激活码（可选）

**Files:**

- Create: `scripts/init-activation-codes.ts`

- [ ] **Step 1: 创建激活码初始化脚本**

```typescript
// scripts/init-activation-codes.ts
// 运行方式: deno run --allow-net --allow-write scripts/init-activation-codes.ts

const kv = await Deno.openKv();

// 预设一些激活码
const codes = [
  "VIP202406",
  "LOVE2024",
  "FUN2024",
  "TEST1234",
];

for (const code of codes) {
  await kv.set(["activation_codes", code], {
    used: false,
  });
  console.log(`Created activation code: ${code}`);
}

console.log("Done!");
```

运行命令：

```bash
deno run --allow-net --allow-write scripts/init-activation-codes.ts
```

---

## 验证步骤

1. 启动开发服务器 `deno task dev`
2. 访问 http://localhost:8000
3. 点击右上角主题切换按钮
4. 验证主题面板正常显示
5. 切换主题，检查CSS变量是否生效
6. 测试VIP激活码功能
7. 验证试用次数限制

---

## 文件清单

| 文件                               | 操作         |
| ---------------------------------- | ------------ |
| `static/themes/_manifest.json`     | 新建         |
| `static/themes/romantic.css`       | 新建         |
| `static/themes/minimal.css`        | 新建         |
| `static/themes/playful.css`        | 新建         |
| `static/themes/premium.css`        | 新建         |
| `islands/theme-switcher.tsx`       | 新建         |
| `routes/api/activate.ts`           | 新建         |
| `routes/api/themes.ts`             | 新建         |
| `routes/_app.tsx`                  | 修改         |
| `twind.config.ts`                  | 修改         |
| `scripts/init-activation-codes.ts` | 新建（可选） |

---

**Plan complete and saved to
`docs/superpowers/plans/2026-05-15-theme-implementation.md`**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task,
review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans,
batch execution with checkpoints

**Which approach?**
