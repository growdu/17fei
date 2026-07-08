import Container from "../components/Container.tsx";
import SeoHead from "../components/SeoHead.tsx";

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
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="/" class="btn">回到首页</a>
                        <button
                            type="button"
                            class="btn btn-ghost"
                            onClick={() => {
                                if (typeof history !== "undefined") history.back();
                            }}
                        >
                            ← 返回上页
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
}
