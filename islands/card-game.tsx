import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

interface Props {
  /** 任务列表, 形如 [["key1", ["任务1","任务2"]], ...] */
  versions: [string, string[]][];
}

const showToast = (msg: string) => {
  if (typeof window !== "undefined") {
    const w = window as unknown as { showToast?: (m: string) => void };
    w.showToast?.(msg);
  }
};

const VERSION_TITLES: Record<string, string> = {
  lover0: "恋爱版",
  lover1: "热恋版",
  sex0: "同居版",
  sex1: "进阶版",
  sex2: "私密版",
  sm: "SM 版",
  huwai: "户外版",
  nvpu: "女仆版",
  nanpu: "男仆版",
  custom: "自定义",
};

const VIP_PREFIXES_NEED = ["sex", "sm", "huwai", "nvpu", "nanpu", "custom"];

const STORAGE_VERSION = "card_version";
const STORAGE_VIP = "vip";
const STORAGE_COUNTER = "card_drawn_total";

export default function CardGame({ versions }: Props) {
  const [vip, setVip] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("lover0");
  const [tasks, setTasks] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [showCard, setShowCard] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [flipping, setFlipping] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_VERSION) || "lover0";
    const isVip = localStorage.getItem(STORAGE_VIP) === "true";
    setVip(isVip);
    initVersion(stored);
    const t = parseInt(localStorage.getItem(STORAGE_COUNTER) || "0", 10);
    setTotal(t);
  }, []);

  const initVersion = (v: string) => {
    // 权限校验
    const needVip = VIP_PREFIXES_NEED.some((p) => v.startsWith(p));
    if (needVip && !vip && localStorage.getItem(STORAGE_VIP) !== "true") {
      alert("这是私密版块，开通 VIP 后才能使用");
      location.href = "/about";
      return;
    }
    const found = versions.find(([key]) => key === v);
    if (!found) return;
    setVersion(found[0]);
    setTasks(found[1]);
    setContent("");
    setShowCard(true);
    localStorage.setItem(STORAGE_VERSION, found[0]);
  };

  const pickTask = () => {
    if (!tasks.length) return;
    setFlipping(true);
    setTimeout(() => {
      const newTask = tasks[Math.floor(Math.random() * tasks.length)];
      setContent(newTask);
      const next = total + 1;
      setTotal(next);
      localStorage.setItem(STORAGE_COUNTER, String(next));
      setFlipping(false);
      if (next === 1 || next % 10 === 0) {
        showToast(next === 1 ? "🎉 开始第一张" : `已经抽了 ${next} 张`);
      }
    }, 250);
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 顶栏: 版本切换 + 统计 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <select
          class="select"
          style={{ width: "auto" }}
          value={version}
          onChange={(e) =>
            initVersion((e.target as HTMLSelectElement).value)
          }
        >
          {versions.map(([key]) => {
            const needVip = VIP_PREFIXES_NEED.some((p) => key.startsWith(p));
            return (
              <option value={key}>
                {VERSION_TITLES[key] || key}
                {needVip ? " 🔒" : ""}
              </option>
            );
          })}
        </select>
        <span class="chip">已抽 {total} 张</span>
      </div>

      {/* 卡片本体 */}
      <div
        onClick={pickTask}
        style={{
          width: "min(320px, 78vw)",
          height: "min(440px, 100vw)",
          perspective: "1000px",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: showCard ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* 卡片正面 (waiting) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              borderRadius: "var(--theme-border-radius-lg)",
              background:
                "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
              boxShadow: "var(--theme-shadow-lg)",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "64px" }}>🃏</div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginTop: "16px",
              }}
            >
              点击翻牌
            </div>
            <div style={{ fontSize: "13px", opacity: 0.85, marginTop: "8px" }}>
              {VERSION_TITLES[version]} · 共 {tasks.length} 题
            </div>
          </div>

          {/* 卡片背面 (content) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
              borderRadius: "var(--theme-border-radius-lg)",
              background: "var(--theme-surface-elevated)",
              boxShadow: "var(--theme-shadow-lg)",
              border: "2px solid var(--theme-card-border)",
              writingMode: "vertical-rl",
              textOrientation: "upright",
            }}
          >
            <div
              style={{
                fontSize: "clamp(20px, 5vw, 28px)",
                fontWeight: 700,
                color: "var(--theme-primary)",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              {content || "点击正面开始抽卡"}
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          color: "var(--theme-text-light)",
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        💡 轮流点击翻牌 · 无法完成认输受惩罚
      </p>
    </div>
  );
}
