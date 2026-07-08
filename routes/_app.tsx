import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ThemeSwitcher from "../islands/theme-switcher.tsx";
import PwaInstall from "../islands/pwa-install.tsx";

const SITE_URL = "https://17fei.fun";
const SITE_TITLE = "情侣飞行棋 · 17fei.fun";
const SITE_DESCRIPTION =
  "情侣情趣飞行棋 - 包含不同尺度适合不同阶段情侣一起玩的情趣游戏";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "17fei.fun",
  alternateName: "情侣飞行棋",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "zh-CN",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export default function App({ Component }: AppProps) {
  return (
    <html lang="zh-CN">
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="theme-color"
          content="#ff4d8d"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a0e1a"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="17fei" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="17fei" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="17fei.fun" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta property="og:image:alt" content="17fei 情侣飞行棋" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />

        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={jsonLd}
        />

        <title>{SITE_TITLE}</title>
        {/* toast + theme-init 必须早于 island hydrate, 同步加载 */}
        <script src="/toast.js"></script>
        <script src="/theme-init.js"></script>
        {/* 全局样式 */}
        <link rel="stylesheet" href="/app.css" />
        {/* 默认主题 - 由 theme-init 同步替换 */}
        <link id="theme-css" rel="stylesheet" href="/themes/romantic.css" />
        {/* 统计 + 微交互 */}
        <script src="/stat.js" defer></script>
        <script src="/back-to-top.js" defer></script>
        <script src="/keyboard-nav.js" defer></script>
        <script src="/theme-meta.js" defer></script>
        <script src="/pwa-register.js" defer></script>
      </Head>
      <body>
        <a href="#main-content" class="skip-link">跳到主内容</a>
        <ThemeSwitcher />
        <div id="main-content">
          <Component />
        </div>
        <PwaInstall />
      </body>
    </html>
  );
}

