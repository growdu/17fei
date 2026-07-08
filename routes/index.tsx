import { useSignal } from "@preact/signals";

import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";
import AnimatedCounter from "../islands/animated-counter.tsx";

interface Game {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  tag?: string;
  gradient: string;
}

const GAMES: Game[] = [
  {
    emoji: "🎲",
    title: "飞行棋",
    desc: "经典双人对战，掷骰子走格子",
    href: "/fxq/index.html",
    tag: "经典",
    gradient: "linear-gradient(135deg, #ff4d8d, #f76707)",
  },
  {
    emoji: "🃏",
    title: "任务卡牌",
    desc: "轮流抽卡，挑战甜蜜任务",
    href: "/card",
    tag: "热门",
    gradient: "linear-gradient(135deg, #9775fa, #ff4d8d)",
  },
  {
    emoji: "💃",
    title: "姿势卡牌",
    desc: "随机姿势抽卡 + 评分",
    href: "/position",
    tag: "VIP",
    gradient: "linear-gradient(135deg, #ff922b, #f03e6d)",
  },
  {
    emoji: "📚",
    title: "姿势大全",
    desc: "上百个姿势配图教学",
    href: "/positions",
    tag: "VIP",
    gradient: "linear-gradient(135deg, #4263eb, #5c7cfa)",
  },
  {
    emoji: "✨",
    title: "AI 伴侣",
    desc: "懂你、可撩、定制的虚拟陪伴",
    href: "/ai",
    tag: "新品",
    gradient: "linear-gradient(135deg, #20c997, #1098ad)",
  },
  {
    emoji: "💎",
    title: "会员空间",
    desc: "解锁全部姿势 / 主题 / 私密内容",
    href: "/member",
    tag: "会员",
    gradient: "linear-gradient(135deg, #f59f00, #ff4d8d)",
  },
];

export default function Home() {
  return (
    <>
      <SeoHead
        title="情侣情趣飞行棋 - 任务卡牌 + 姿势图鉴 + AI 伴侣"
        description="免费的情侣情趣小游戏站:飞行棋、9 版本任务卡牌、100+ 姿势图鉴、即将上线的 AI 伴侣。5 套主题皮肤,1 个激活码开放全部功能。"
        url="/"
        keywords="情侣游戏, 情趣游戏, 飞行棋, 任务卡牌, 姿势图鉴, AI 伴侣, 17fei"
      />
      <Container>
        <header class="hero">
          <img src="/logo.png" alt="logo" class="hero-logo" />
          <span class="hero-badge">✨ 情侣专属 · 飞行棋 / 卡牌 / 姿势图鉴</span>
          <h1 class="hero-title">情侣情趣飞行棋</h1>
          <p class="hero-subtitle">
            飞行棋 · 任务卡 · 姿势图鉴 · AI 陪伴
            <br />
            一站式私密游乐场，让爱更有趣
          </p>
          <div style={{ marginTop: "24px" }}>
            <a href="#games" class="btn">立即开始 →</a>
          </div>
        </header>

        <div class="stats">
          <div class="stat-card">
            <AnimatedCounter value={6} className="stat-num" />
            <div class="stat-label">款互动玩法</div>
          </div>
          <div class="stat-card">
            <AnimatedCounter value={9} className="stat-num" />
            <div class="stat-label">任务版本</div>
          </div>
          <div class="stat-card">
            <span class="stat-num">100</span>
            <div class="stat-label">+ 姿势图鉴</div>
          </div>
          <div class="stat-card">
            <AnimatedCounter value={5} className="stat-num" />
            <div class="stat-label">套主题皮肤</div>
          </div>
        </div>

        <section class="section" id="games">
          <h2 class="section-heading">游戏列表</h2>
          <div class="game-grid">
            {GAMES.map((g, i) => (
              <a
                href={g.href}
                class="game-card"
                style={{
                  animationDelay: `${0.05 * (i + 1)}s`,
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "130px",
                    background: g.gradient,
                    backgroundSize: "200% 200%",
                    animation: `gradient-drift 8s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "60px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                    }}
                  >
                    {g.emoji}
                  </span>
                  {g.tag && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        padding: "2px 10px",
                        background: "rgba(0,0,0,0.18)",
                        color: "#fff",
                        borderRadius: "var(--theme-border-radius-pill)",
                        fontSize: "11px",
                        fontWeight: 600,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {g.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <h3 class="game-card-title" style={{ marginBottom: "4px" }}>
                    {g.title}
                  </h3>
                  <p class="game-card-desc" style={{ fontSize: "13px" }}>
                    {g.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div class="glow-divider"></div>

        <section class="section">
          <h2 class="section-heading">为什么选择 17fei</h2>
          <div class="game-grid">
            <div class="game-card">
              <span class="game-card-emoji">🔒</span>
              <h3 class="game-card-title">隐私优先</h3>
              <p class="game-card-desc">
                无需注册、不收集隐私，本地存储，所有数据只在你浏览器
              </p>
            </div>
            <div class="game-card">
              <span class="game-card-emoji">🎨</span>
              <h3 class="game-card-title">丰富皮肤</h3>
              <p class="game-card-desc">
                4 套主题皮肤，每天还能免费试用 3 次不同的颜色心情
              </p>
            </div>
            <div class="game-card">
              <span class="game-card-emoji">📱</span>
              <h3 class="game-card-title">全设备兼容</h3>
              <p class="game-card-desc">
                iOS / Android / 平板 / 电脑 / 微信内置浏览器全支持
              </p>
            </div>
          </div>
        </section>

        <div class="glow-divider"></div>

        <section class="section">
          <h2 class="section-heading">友邻玩法</h2>
          <p class="section-text">
            玩法参考自网络开源与公开资料；
            本项目做内容聚合 + 重新美化 + 工程化整合，无版权素材来自网络。
            如有版权问题请 微信: wbot10 联系删除。
          </p>
        </section>
      </Container>
      <Footer />
    </>
  );
}
