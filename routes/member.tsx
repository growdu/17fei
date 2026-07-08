import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";

export default function Member() {
  return (
    <>
      <Container narrow>
        <header class="hero">
          <span class="hero-badge">会员专享</span>
          <h1 class="hero-title">会员空间</h1>
          <p class="hero-subtitle">
            提供大家好玩分享空间，共同成长，
            <br />
            不露脸不露点，不低俗不越界
          </p>
        </header>

        <section class="form-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🚧</div>
          <h2 style={{ margin: "0 0 8px", color: "var(--theme-text)" }}>
            功能搭建中
          </h2>
          <p class="section-text">
            我们正在筹备会员分享板与高质量姿势图鉴，
            <br />
            完成后将在第一时间通知。
          </p>
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "var(--theme-surface)",
              borderRadius: "var(--theme-border-radius)",
            }}
          >
            <p
              class="section-text"
              style={{ margin: 0, fontSize: "13px" }}
            >
              💬 有任何建议或想法，欢迎加微信{" "}
              <code
                style={{
                  padding: "2px 8px",
                  background: "var(--theme-surface-strong)",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              >
                wbot10
              </code>{" "}
              一起共建
            </p>
          </div>
          <a href="/" class="btn" style={{ marginTop: "24px" }}>
            返回首页
          </a>
        </section>
      </Container>
      <Footer />
    </>
  );
}
