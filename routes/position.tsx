import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";
import PositionCard from "../islands/position-card.tsx";
import { FREE_POSITION_COUNT, POSITION_KEYS } from "../lib/positions.ts";

export default function PositionPage() {
  return (
    <>
      <SeoHead
        title="姿势卡牌 - 3D 翻牌随机姿势"
        description="100+ 姿势随机抽取,3D 翻牌动效,支持收藏喜欢的姿势,免费抽 10 个,VIP 解锁全部"
        url="/position"
        keywords="姿势, 抽卡, 情趣姿势, 情侣姿势"
      />
      <Container>
        <header class="hero">
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>💃</div>
          <h1 class="hero-title">姿势卡牌</h1>
          <p class="hero-subtitle">
            翻滚 3D 卡片 · 随机抽姿势 · 可收藏喜欢的
          </p>
        </header>
        <PositionCard
          positions={POSITION_KEYS}
          freeCount={FREE_POSITION_COUNT}
        />
      </Container>
      <Footer />
    </>
  );
}
