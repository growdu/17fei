import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";

export default function AIOK() {
    return (
        <>
            <Container narrow>
                <header class="hero">
                    <div style={{ fontSize: "72px", marginBottom: "16px" }}>🎉</div>
                    <h1 class="hero-title">感谢订阅</h1>
                    <p class="hero-subtitle">你的 AI 伴侣内测名额已锁定</p>
                </header>
                <section
                    class="form-card"
                    style={{ textAlign: "center" }}
                >
                    <p class="section-text">
                        AI 伴侣上线后，我们会第一时间通过邮件通知你。
                        <br />
                        请留意邮箱（包括垃圾箱哦）。
                    </p>
                    <a href="/" class="btn" style={{ marginTop: "24px" }}>
                        返回首页
                    </a>
                </section>
            </Container>
            <Footer />
        </>
    );
}
