import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";

export default function Custom() {
  return (
    <>
      <Container narrow>
        <header class="hero">
          <span class="hero-badge">站长笔记</span>
          <h1 class="hero-title">站长怎么赚钱</h1>
          <p class="hero-subtitle">从 0 到月入几百块，我在小红书的踩坑记录</p>
        </header>

        <section class="form-card">
          <h2 class="section-heading">坦诚说: 不太赚钱</h2>
          <p class="section-text" style={{ marginTop: "16px" }}>
            这个网站其实不怎么赚钱，
            但好处是不用太大成本。人人都能玩 —— 搭建完放置着，每个月被动收入 400~800 元。
          </p>

          <div class="glow-divider"></div>

          <h2 class="section-heading">变现来源</h2>
          <ul
            class="section-text"
            style={{ paddingLeft: "20px", marginTop: "16px" }}
          >
            <li>会员收款（人工微信）：单月 10 / 终身 49</li>
            <li>小红书笔记带来的自然流量</li>
            <li>承接相似站点的搭建外包</li>
          </ul>

          <div class="glow-divider"></div>

          <h2 class="section-heading">小红书的玩法</h2>
          <p class="section-text" style={{ marginTop: "16px" }}>
            一篇老笔记被官方翻牌，收获几十个红心。
            就这么一点点流量其实就可以带来每月几百块的收入，
            近期我又偶尔更新一下笔记，但是效果很随机，我还没有找到窍门吧。
          </p>

          <div class="glow-divider"></div>

          <h2 class="section-heading">自己搭一个？</h2>
          <p class="section-text" style={{ marginTop: "16px" }}>
            网站做好后放置一段时间，因为小红书的笔记管理很严格，感觉没法玩。
            但即便如此，每月依然有被动收入。
          </p>
          <p class="section-text" style={{ marginTop: "12px" }}>
            搭建一个 收 200 元，会流量玩法的可以弄一下，我也偷师学习一下。
          </p>

          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              background: "var(--theme-surface-strong)",
              borderRadius: "var(--theme-border-radius)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "14px", color: "var(--theme-text-light)" }}>
              微信咨询
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--theme-primary)",
                marginTop: "4px",
              }}
            >
              wbot10
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
