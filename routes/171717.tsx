import { Handlers } from "$fresh/server.ts";
import Container from "../components/Container.tsx";
import SeoHead from "../components/SeoHead.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render();
  },
  async POST(req) {
    try {
      const form = await req.formData();
      const code = (form.get("code")?.toString() ?? "").trim();
      if (!code) {
        return new Response("Missing code", { status: 400 });
      }
      const kv = await Deno.openKv();
      const key = ["activation_codes", code.toUpperCase()];
      const record = await kv.get<{ used?: boolean }>(key);
      if (!record.value) {
        return new Response("激活码无效", { status: 400 });
      }
      if (record.value.used) {
        return new Response("激活码已被使用", { status: 400 });
      }
      await kv.set(key, { ...record.value, used: true });
    } catch (err) {
      console.error("VIP activate error:", err);
      return new Response("激活失败", { status: 500 });
    }
    return new Response(null, {
      status: 303,
      headers: { Location: "/?activated=1" },
    });
  },
};

export default function ActivatePage() {
  return (
    <>
      <SeoHead title="激活 VIP" url="/171717" />
      <Container narrow>
        <header class="hero">
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>✨</div>
          <h1 class="hero-title">激活 VIP</h1>
          <p class="hero-subtitle">输入激活码, 解锁全部主题与姿势图鉴</p>
        </header>

        <section class="form-card">
          <form method="POST">
            <div class="field">
              <label class="field-label" for="code">激活码</label>
              <input
                id="code"
                name="code"
                type="text"
                class="input"
                placeholder="如: VIP202406"
                required
                autoComplete="off"
                style={{ letterSpacing: "0.1em", fontFamily: "monospace" }}
              />
              <div class="helper">没有激活码, 请微信 wbot10 联系开通</div>
            </div>
            <button class="btn" type="submit" style={{ width: "100%" }}>
              激活
            </button>
          </form>
        </section>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "var(--theme-text-light)",
            fontSize: "13px",
          }}
        >
          微信咨询:{" "}
          <strong style={{ color: "var(--theme-primary)" }}>wbot10</strong>
        </p>
      </Container>
    </>
  );
}
