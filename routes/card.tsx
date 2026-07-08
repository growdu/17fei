import { Head } from "$fresh/runtime.ts";
import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import CardGame from "../islands/card-game.tsx";
import { TASKS } from "../lib/tasks.ts";

export default function Card() {
    const versions: [string, string[]][] = Object.entries(TASKS);

    return (
        <>
            <Head>
                <title>任务卡牌 · 17fei</title>
            </Head>
            <Container>
                <header class="hero">
                    <div style={{ fontSize: "72px", marginBottom: "16px" }}>🃏</div>
                    <h1 class="hero-title">任务卡牌</h1>
                    <p class="hero-subtitle">
                        轮流翻牌完成任务 · 完不成认输受惩罚
                    </p>
                </header>
                <CardGame versions={versions} />
            </Container>
            <Footer />
        </>
    );
}
