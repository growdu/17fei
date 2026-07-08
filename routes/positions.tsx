import { Head } from "$fresh/runtime.ts";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import PositionList from "../islands/position-list.tsx";
import { POSITION_KEYS } from "../lib/positions.ts";

export default function PositionsPage() {
  return (
    <>
      <Head>
        <title>姿势大全 · 17fei</title>
      </Head>
      <Container>
        <header class="hero">
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>📚</div>
          <h1 class="hero-title">姿势大全</h1>
          <p class="hero-subtitle">
            {POSITION_KEYS.length} 个姿势 · 搜索 / 收藏 / 解锁 VIP
          </p>
        </header>
        <PositionList positions={POSITION_KEYS} />
      </Container>
      <Footer />
    </>
  );
}
