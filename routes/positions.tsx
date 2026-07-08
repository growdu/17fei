import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";
import PositionList from "../islands/position-list.tsx";
import { POSITION_KEYS } from "../lib/positions.ts";

export default function PositionsPage() {
  return (
    <>
      <SeoHead
        title="姿势大全 - 100+ 姿势配图教学"
        description="情侣姿势图鉴,免费查看前 40 个,VIP 解锁全部 100+ 个。支持搜索、按收藏排序"
        url="/positions"
        keywords="姿势大全, 姿势图鉴, 情侣姿势, 情趣姿势"
      />
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
