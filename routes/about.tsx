import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";

interface Plan {
  name: string;
  price: string;
  original?: string;
  desc: string;
  badge?: string;
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "单月会员",
    price: "10",
    desc: "解锁全部主题 + 全部姿势图鉴",
  },
  {
    name: "终身会员",
    price: "49",
    original: "99",
    desc: "一次开通,永久使用",
    badge: "限时",
    recommended: true,
  },
];

export default function About() {
  return (
    <>
      <SeoHead
        title="关于 17fei.fun - 会员开通 / 联系站长"
        description="单月 10 元,终身 49 元。微信 wbot10 联系开通。1~12 小时内人工响应。"
        url="/about"
        keywords="17fei 会员, 开通 VIP, 激活码"
      />
      <Container narrow>
        <header class="hero">
          <img src="/logo.png" alt="logo" class="hero-logo" />
          <h1 class="hero-title">关于本站</h1>
          <p class="hero-subtitle">
            由一对情侣开发者维护 · 独立运营 · 全凭爱好发电
          </p>
        </header>

        <section class="section">
          <h2 class="section-heading">会员方案</h2>
          <div class="game-grid" style={{ marginTop: "16px" }}>
            {PLANS.map((p) => (
              <div
                class="game-card"
                style={{
                  borderColor: p.recommended
                    ? "var(--theme-primary)"
                    : undefined,
                  borderWidth: p.recommended ? "2px" : "1px",
                }}
              >
                {p.badge && (
                  <span
                    class="game-card-tag"
                    style={{
                      color: "#fff",
                      background: "var(--theme-gradient)",
                      borderColor: "transparent",
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <h3 class="game-card-title">{p.name}</h3>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    background: "var(--theme-gradient)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: "8px 0",
                  }}
                >
                  ¥{p.price}
                  {p.original && (
                    <span
                      style={{
                        fontSize: "16px",
                        textDecoration: "line-through",
                        color: "var(--theme-text-muted)",
                        WebkitTextFillColor: "var(--theme-text-muted)",
                        marginLeft: "8px",
                      }}
                    >
                      ¥{p.original}
                    </span>
                  )}
                </div>
                <p class="game-card-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <p
            class="section-text"
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "var(--theme-surface)",
              borderRadius: "var(--theme-border-radius)",
              border: "1px solid var(--theme-card-border)",
            }}
          >
            💡 当前仅支持 <strong>客服人工收款</strong>。付款后请加微信{" "}
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
            ,1~12 小时内响应。
          </p>
        </section>

        <div class="glow-divider"></div>

        <section class="section" style={{ textAlign: "center" }}>
          <h2 class="section-heading" style={{ justifyContent: "center" }}>
            联系方式
          </h2>
          <img
            src="/qrcode.JPG"
            alt="微信 wbot10 二维码"
            style={{
              maxWidth: "240px",
              borderRadius: "var(--theme-border-radius-lg)",
              boxShadow: "var(--theme-shadow-lg)",
              margin: "16px auto",
              display: "block",
            }}
          />
          <p class="section-text">扫码加微信 · 提供定制开发咨询</p>
        </section>

        <section class="section">
          <h2 class="section-heading">其他服务</h2>
          <p class="section-text">
            想做一个 <strong>完全一样</strong> 的网站自己运营？{" "}
            <a href="/custom" style={{ fontWeight: 600 }}>
              → 看这里怎么搭
            </a>
          </p>
        </section>
      </Container>
      <Footer />
    </>
  );
}
