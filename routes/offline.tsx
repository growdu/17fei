import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";

export default function Offline() {
  return (
    <>
      <SeoHead title="没信号 - 离线模式" url="/offline" noindex />
      <Container narrow>
        <header class="hero">
          <div style={{ fontSize: "96px", marginBottom: "16px" }}>📡</div>
          <h1 class="hero-title">没信号</h1>
          <p class="hero-subtitle">
            网络好像掉了,但你已经玩过的游戏都还在缓存里
          </p>
        </header>

        <section class="form-card" style={{ textAlign: "center" }}>
          <p class="section-text">
            ⏳ 连接恢复后即可刷新
            <br />
            💡 部分游戏(飞行棋)需要联网才能玩
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <button
              class="btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                globalThis.location.reload();
              }}
            >
              🔄 重新连接
            </button>
            <a href="/" class="btn btn-ghost">🏠 回首页</a>
          </div>

          <div class="glow-divider"></div>

          <div
            style={{
              fontSize: "13px",
              color: "var(--theme-text-light)",
            }}
          >
            离线时可玩的:
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <span class="chip">🃏 任务卡牌</span>
            <span class="chip">💃 姿势卡牌</span>
            <span class="chip">📚 姿势大全(已浏览)</span>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
