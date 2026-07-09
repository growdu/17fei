import Container from "../components/Container.tsx";
import Footer from "../components/Footer.tsx";
import SeoHead from "../components/SeoHead.tsx";
import CardGame from "../islands/card-game.tsx";
import { TASKS } from "../lib/tasks.ts";

export default function Card() {
  const versions: [string, string[]][] = Object.entries(TASKS);

  return (
    <>
      <SeoHead
        title="任务卡牌 - 9 个版本的情侣翻牌游戏"
        description="恋爱版、热恋版、同居版、进阶版、私密版、SM版、户外版、女仆版、男仆版,九个版本轮流翻牌挑战甜蜜任务"
        url="/card"
        keywords="情侣任务, 任务卡牌, 翻牌游戏, 情趣游戏"
      />
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
