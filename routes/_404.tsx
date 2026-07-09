import Container from "../components/Container.tsx";
import SeoHead from "../components/SeoHead.tsx";
import ErrorControls from "../islands/error-controls.tsx";

export default function Error404() {
  return (
    <>
      <SeoHead title="404 - 页面不见了" noindex />
      <Container narrow>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div
            class="bounce-emoji"
            style={{
              fontSize: "120px",
              lineHeight: 1,
              display: "inline-block",
            }}
            aria-hidden="true"
          >
            🍃
          </div>
          <h1
            class="hero-title"
            style={{ fontSize: "48px", marginTop: "24px" }}
          >
            404
          </h1>
          <p
            class="hero-subtitle"
            style={{ marginTop: "8px", marginBottom: "32px" }}
          >
            这页似乎飞走了,去别处看看?
          </p>
          <ErrorControls />
        </div>
      </Container>
    </>
  );
}
