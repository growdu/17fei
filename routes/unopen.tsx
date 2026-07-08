import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";

export default function Unopen() {
  return (
    <>
      <SeoHead title="维护中" url="/unopen" noindex />
      <Container narrow>
        <header class="hero">
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>🔧</div>
          <h1 class="hero-title">该功能维护中</h1>
          <p class="hero-subtitle">
            更新时间: 10-26 ~ 10-27
            <br />
            请使用其他功能
          </p>
        </header>

        <section class="form-card" style={{ textAlign: "center" }}>
          <p class="section-text">
            我们正在为该功能加新内容
            <br />
            期间请尝试以下热门功能:
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <a href="/" class="btn">首页</a>
            <a href="/card" class="btn btn-ghost">任务卡牌</a>
            <a href="/position" class="btn btn-ghost">姿势卡牌</a>
          </div>
        </section>

        <p
          style={{
            marginTop: "32px",
            textAlign: "center",
            color: "var(--theme-text-light)",
            fontSize: "13px",
          }}
        >
          关注小红书,获取最新发布动态 →
          <a
            href="https://www.xiaohongshu.com/user/profile/64e8ce860000000001013f7a"
            target="_blank"
            rel="noopener"
          >
            官方账号
          </a>
        </p>
      </Container>
      <Footer />
    </>
  );
}
