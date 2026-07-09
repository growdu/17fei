# 主题皮肤系统设计方案

**日期**: 2026-05-15 **项目**: 17fei.fun 主题皮肤系统 **状态**: 已批准

---

## 一、主题系统架构

### 1. 主题定义格式

每个主题为一个标准化的CSS变量文件 (`static/themes/{theme-name}.css`)：

```css
/* 主题变量定义 */
:root {
  --theme-primary: #ff6b9d; /* 主色 */
  --theme-secondary: #c44569; /* 次色 */
  --theme-background: #fff0f5; /* 背景色 */
  --theme-text: #4a4a4a; /* 文字色 */
  --theme-accent: #ff8fab; /* 强调色 */
  --theme-card-bg: #ffffff; /* 卡片背景 */
  --theme-gradient-start: #ff6b9d; /* 渐变起始 */
  --theme-gradient-end: #c44569; /* 渐变结束 */
  --theme-animation: 0.3s ease; /* 动画速度 */
  --theme-border-radius: 16px; /* 圆角大小 */
  --theme-shadow: 0 4px 20px rgba(255, 107, 157, 0.3); /* 阴影 */
  --theme-particle: true; /* 粒子效果 */
  --theme-icon-style: rounded; /* 图标风格 rounded/circle/square */
}
```

### 2. 主题加载机制

```
用户选择主题 → 检查VIP状态/试用次数 → 加载对应CSS变量文件 → 动态注入到<head>
```

### 3. 默认4种主题

| 主题ID     | 名称     | 视觉风格                     | 适用场景 |
| ---------- | -------- | ---------------------------- | -------- |
| `romantic` | 浪漫梦幻 | 粉色渐变、爱心粒子、星空背景 | 默认主题 |
| `minimal`  | 简约现代 | 扁平化、柔和配色、清新线条   | 清新风格 |
| `playful`  | 活泼可爱 | 明快橙黄、圆润元素、弹性动画 | 可爱风格 |
| `premium`  | 高端私密 | 深紫黑金、精致纹理、商务质感 | 高端场景 |

### 4. 插件式扩展架构

主题目录结构：

```
static/themes/
├── romantic.css      # 默认主题
├── minimal.css
├── playful.css
├── premium.css
└── _manifest.json   # 主题索引（可被扩展）
```

`_manifest.json` 格式：

```json
{
  "themes": ["romantic", "minimal", "playful", "premium"],
  "default": "romantic"
}
```

**扩展方式**：上传新的 `.css` 文件到 `static/themes/`，更新 `_manifest.json`
即可。无需修改代码。

---

## 二、VIP系统设计

### 1. 激活码机制

- **激活码格式**: 8位字母数字组合（如 `VIP202406`）
- **存储方式**: Deno KV，键为 `["activation_codes", code]`，值为
  `{ used: boolean, usedBy?: email, usedAt?: date }`
- **验证流程**: 用户输入激活码 → 服务端校验 → 解锁VIP身份

### 2. 试用机制

| 用户类型    | 试用次数 | 权限                            |
| ----------- | -------- | ------------------------------- |
| 非VIP未试用 | 每天3次  | 可试用任意主题，每次切换消耗1次 |
| VIP用户     | 无限制   | 可自由切换所有主题              |

- 试用次数存储在 `localStorage`，键为 `theme_trial_{日期}`
- 每天凌晨0点重置

### 3. VIP状态持久化

- VIP身份存储在 `localStorage`，键为 `vip_status`
- VIP用户可查看和激活所有主题
- 非VIP用户可预览主题（应用CSS变量但不保存切换）

---

## 三、主题切换Island组件

新建 `islands/theme-switcher.tsx`：

```tsx
// 核心功能：
// 1. 读取 _manifest.json 获取可用主题列表
// 2. 检查VIP状态 / 试用次数
// 3. 加载选中主题的CSS文件并注入
// 4. 保存用户选择到 localStorage
// 5. 未VIP时显示试用限制提示
```

组件状态：

- `availableThemes: Theme[]` - 从manifest加载
- `currentTheme: string` - 当前激活主题
- `isVip: boolean` - VIP状态
- `trialCount: number` - 剩余试用次数
- `showVipModal: boolean` - 是否显示VIP开通弹窗

---

## 四、界面UI设计

### 1. 主题切换入口

在页面头部（`_app.tsx`）添加主题切换按钮：

- 一个小图标按钮，点击展开主题选择面板
- 显示当前主题缩略图预览

### 2. 主题选择面板

- 网格布局展示所有主题卡片
- 每个卡片显示：主题预览色块 + 主题名称
- VIP用户：可点击激活
- 非VIP用户：点击后提示"试用次数剩余X次"或"开通VIP解锁全部"

### 3. VIP开通弹窗

- 显示激活码输入框
- 显示VIP特权说明
- 已有激活码：输入激活
- 无激活码：显示联系方式（可复用现有的会员空间/AI订阅逻辑）

---

## 五、技术实现要点

### 1. 动态CSS加载

```tsx
const loadTheme = async (themeId: string) => {
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
```

### 2. VIP状态验证（服务端）

```tsx
// routes/api/activate.ts
export const handler = {
  async POST(req) {
    const { code } = await req.json();
    const kv = await Deno.openKv();
    const record = await kv.get(["activation_codes", code]);

    if (!record.value || record.value.used) {
      return Response.json({ success: false, message: "激活码无效或已使用" });
    }

    // 标记已使用
    await kv.set(["activation_codes", code], { ...record.value, used: true });
    return Response.json({ success: true });
  },
};
```

### 3. 主题选择验证流程

```
用户点击主题卡片
    ↓
检查 localStorage.vip_status === true ?
    ↓ 是 → 直接激活主题
    ↓ 否 → 检查试用次数
             ↓ 剩余 > 0 → 消耗1次，激活主题
             ↓ 剩余 = 0 → 弹出VIP开通提示
```

---

## 六、部署说明

1. 主题文件部署在 `static/themes/` 目录
2. 激活码数据存储在 Deno KV
3. 无需额外数据库或外部依赖

---

## 七、文件清单

### 新增文件

- `static/themes/_manifest.json` - 主题索引
- `static/themes/romantic.css` - 浪漫梦幻主题（默认）
- `static/themes/minimal.css` - 简约现代主题
- `static/themes/playful.css` - 活泼可爱主题
- `static/themes/premium.css` - 高端私密主题
- `islands/theme-switcher.tsx` - 主题切换组件
- `routes/api/activate.ts` - 激活码验证API
- `routes/api/themes.ts` - 主题列表API

### 修改文件

- `routes/_app.tsx` - 添加主题切换按钮入口
- `twind.config.ts` - 适配主题CSS变量
