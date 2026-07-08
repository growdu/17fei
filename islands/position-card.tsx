import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

interface Props {
  positions: string[];
  freeCount: number;
}

const STORAGE_VIP = "vip";
const STORAGE_TOTAL = "position_drawn_total";
const STORAGE_FAVS = "position_favs";

export default function PositionCard({ positions, freeCount }: Props) {
  const [vip, setVip] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [flipping, setFlipping] = useState<boolean>(false);
  const [showFront, setShowFront] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [favs, setFavs] = useState<string[]>([]);
  const isFav = useSignal<boolean>(false);

  useEffect(() => {
    setVip(localStorage.getItem(STORAGE_VIP) === "true");
    const t = parseInt(localStorage.getItem(STORAGE_TOTAL) || "0", 10);
    setTotal(t);
    try {
      const f = JSON.parse(localStorage.getItem(STORAGE_FAVS) || "[]");
      setFavs(Array.isArray(f) ? f : []);
    } catch {
      setFavs([]);
    }
  }, []);

  useEffect(() => {
    isFav.value = favs.includes(src);
  }, [src, favs.join("|")]);

  const drawPosition = () => {
    const pool = vip ? positions : positions.slice(0, freeCount);
    if (!pool.length) return;
    setFlipping(true);
    setTimeout(() => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      const url = atob(next);
      setSrc(url);
      const n = total + 1;
      setTotal(n);
      localStorage.setItem(STORAGE_TOTAL, String(n));
      setShowFront(false);
      setFlipping(false);
    }, 300);
  };

  const toggleFav = () => {
    if (!src) return;
    let nextFavs: string[];
    if (favs.includes(src)) {
      nextFavs = favs.filter((f) => f !== src);
    } else {
      nextFavs = [...favs, src];
    }
    setFavs(nextFavs);
    localStorage.setItem(STORAGE_FAVS, JSON.stringify(nextFavs));
  };

  const reset = () => {
    setShowFront(true);
    setSrc("");
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
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span class="chip">
          🖼️ {vip ? positions.length : freeCount} 个可用姿势
        </span>
        <span class="chip">已抽 {total} 张</span>
        {favs.length > 0 && <span class="chip">⭐ {favs.length}</span>}
      </div>

      <div
        style={{
          width: "min(360px, 78vw)",
          height: "min(360px, 78vw)",
          perspective: "1200px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: showFront ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* 正面 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
              color: "#fff",
              borderRadius: "var(--theme-border-radius-lg)",
              boxShadow: "var(--theme-shadow-lg)",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "80px" }}>💃</div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginTop: "16px",
              }}
            >
              点击抽姿势
            </div>
            <div style={{ fontSize: "13px", opacity: 0.85, marginTop: "8px" }}>
              翻滚 3D 卡片，看今天玩什么
            </div>
          </div>

          {/* 背面 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--theme-surface-elevated)",
              border: "2px solid var(--theme-card-border)",
              borderRadius: "var(--theme-border-radius-lg)",
              boxShadow: "var(--theme-shadow-lg)",
              padding: "12px",
              overflow: "hidden",
            }}
          >
            {src && (
              <img
                src={src}
                alt="姿势"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "var(--theme-border-radius)",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          class="btn"
          onClick={drawPosition}
          disabled={flipping}
        >
          {flipping ? "翻牌中…" : "🎲 抽一个"}
        </button>
        <button class="btn btn-ghost" onClick={reset}>
          🔄 复位
        </button>
        {src && (
          <button class="btn btn-ghost" onClick={toggleFav}>
            {isFav.value ? "⭐ 已收藏" : "☆ 收藏"}
          </button>
        )}
        {!vip && (
          <a href="/about" class="btn btn-ghost">
            🔓 解锁全部
          </a>
        )}
      </div>
    </div>
  );
}
