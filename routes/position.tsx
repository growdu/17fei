import { Head } from "$fresh/runtime.ts";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import PositionCard from "../islands/position-card.tsx";
import { POSITION_KEYS, FREE_POSITION_COUNT } from "../lib/positions.ts";

export default function PositionPage() {
  return (
    <>
      <Head>
        <title>姿势卡牌 · 17fei</title>
      </Head>
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
