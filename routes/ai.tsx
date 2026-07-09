import { Handlers } from "$fresh/server.ts";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";

export const handler: Handlers = {
  GET(_req: Request, ctx) {
    return ctx.render();
  },
  async POST(req: Request, _ctx) {
    try {
      const form = await req.formData();

      const email = (form.get("email")?.toString() ?? "").trim();
      const aisex = (form.get("aisex")?.toString() ?? "").trim();

      if (!email || !aisex) {
        return new Response("Missing email or sex", { status: 400 });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response("Invalid email", { status: 400 });
      }

      const kv = await Deno.openKv();
      await kv.set(["subusers", email], aisex);
      return Response.redirect(req.headers.get("origin") + "/aiok");
    } catch (err) {
      console.error("AI subscribe error:", err);
      return new Response("Server error", { status: 500 });
    }
  },
};
export default function AI() {
  return (
    <>
      <SeoHead
        title="AI 伴侣 - 懂你、可撩、定制的虚拟陪伴"
        description="即将上线。留下邮箱 + 期望性别,上线第一时间通知你。"
        url="/ai"
      />
      <Container narrow>
        <header class="hero">
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>🤖</div>
          <span class="hero-badge">即将上线</span>
          <h1 class="hero-title">AI 伴侣</h1>
          <p class="hero-subtitle">
            懂你 · 可撩 · 力所能及地满足各种需求
          </p>
        </header>

        <section class="form-card">
          <h2 class="section-heading">抢先试用</h2>
          <p class="section-text" style={{ marginTop: "12px" }}>
            留下邮箱 + 期望的性别,我们将在 AI 伴侣上线后第一时间通知你。
          </p>
          <form method="POST" style={{ marginTop: "24px" }} novalidate>
            <div class="field">
              <label class="field-label" for="email">邮箱</label>
              <input
                id="email"
                name="email"
                type="email"
                class="input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              <div class="helper">
                用于发送 AI 伴侣上线通知,绝不用作其他用途
              </div>
            </div>

            <div class="field">
              <label class="field-label">希望 AI 是</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <label
                  style={{
                    padding: "16px",
                    border: "1px solid var(--theme-card-border)",
                    borderRadius: "var(--theme-border-radius)",
                    background: "var(--theme-surface-strong)",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="aisex"
                    value="1"
                    checked
                    style={{ marginRight: "8px" }}
                  />
                  👩 女伴侣
                </label>
                <label
                  style={{
                    padding: "16px",
                    border: "1px solid var(--theme-card-border)",
                    borderRadius: "var(--theme-border-radius)",
                    background: "var(--theme-surface-strong)",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="aisex"
                    value="2"
                    style={{ marginRight: "8px" }}
                  />
                  👨 男伴侣
                </label>
              </div>
            </div>

            <button class="btn" type="submit" style={{ width: "100%" }}>
              🚀 登记排队
            </button>
          </form>
        </section>

        <section class="section" style={{ marginTop: "32px" }}>
          <h2 class="section-heading">我们能做什么</h2>
          <div class="game-grid" style={{ marginTop: "16px" }}>
            <div class="game-card">
              <span class="game-card-emoji">💬</span>
              <h3 class="game-card-title">日常聊天</h3>
              <p class="game-card-desc">陪伴你聊天解闷,永远不会不耐烦</p>
            </div>
            <div class="game-card">
              <span class="game-card-emoji">🎭</span>
              <h3 class="game-card-title">角色扮演</h3>
              <p class="game-card-desc">多场景剧本,沉浸式互动体验</p>
            </div>
            <div class="game-card">
              <span class="game-card-emoji">💡</span>
              <h3 class="game-card-title">个性化</h3>
              <p class="game-card-desc">记忆偏好,越来越懂你</p>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
