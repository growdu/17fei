# 17fei.fun

> 情侣情趣飞行棋 + 姿势卡牌 + AI 伴侣 · 由 Fresh + Preact + Deno 构建

## 访问地址

https://17fei.fun

## 包含玩法

- **飞行棋** - 经典双人对战版（独立 SPA）
- **任务卡牌** - 9 个版本（恋爱 / 热恋 / 同居 / 进阶 / 私密 / SM / 户外 / 女仆 / 男仆 / 自定义）
- **姿势卡牌** - 3D 翻牌抽姿势 + 收藏
- **姿势大全** - 100+ 姿势图鉴，搜索 + 收藏排序
- **AI 伴侣** - 排队订阅中
- **主题皮肤** - 5 套主题：浪漫梦幻 / 简约现代 / 活泼可爱 / 高端私密 / 暗夜玫瑰
- **VIP 激活码** - Deno KV 验证 + 浏览器 localStorage 双重确认

## 视觉与技术

- 完全静态 + Deno KV，无数据库
- 玻璃拟态 + 渐变 + 微动效 + 主题切换
- a11y: skip link / focus ring / 减少动效 / 强制色 / 高对比度适配
- 键盘快捷键: `h` 首页 / `c` 任务卡 / `p` 姿势卡 / `g` 飞行棋 / `a` 关于 / `t` 主题切换

## 技术栈

- Fresh 1.7 + Preact 10
- TypeScript (严格), Deno KV, Twind
- CSS 自定义属性作为主题层

## 本地运行

```
deno task start
```

需 Deno 1.40+。

## 部署

`deno task build` 然后用 Deno Deploy 直接同步仓库即可。

## 自定义开发联系

微信 `wbot10`

## License

代码 MIT, 内容资源版权归原作者所有。
