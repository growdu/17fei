import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ThemeSwitcher from "../islands/theme-switcher.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html lang="zh-CN">
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ff4d8d" />
        <meta
          name="description"
          content="情侣情趣飞行棋 - 包含不同尺度适合不同阶段情侣一起玩的情趣游戏"
        />
        <title>情侣飞行棋 · 17fei.fun</title>
        {/* 主题预加载脚本 - 防止主题闪烁,必须在头部 */}
        <script src="/theme-init.js"></script>
        {/* 全局样式 */}
        <link rel="stylesheet" href="/app.css" />
        {/* 默认主题 - 由 theme-init 同步替换为已保存主题 */}
        <link id="theme-css" rel="stylesheet" href="/themes/romantic.css" />
        {/* 统计 + 微交互 */}
        <script src="/stat.js" defer></script>
        <script src="/back-to-top.js" defer></script>
        <script src="/keyboard-nav.js" defer></script>
        <script src="/theme-meta.js" defer></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <a href="#main-content" class="skip-link">跳到主内容</a>
        <ThemeSwitcher />
        <div id="main-content">
          <Component />
        </div>
      </body>
    </html>
  );
}
