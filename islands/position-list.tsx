import { useEffect, useState } from "preact/hooks";

const STORAGE_VIP = "vip";
const FREE_COUNT = 40;

interface Props {
  positions: string[];
}

export default function PositionList({ positions }: Props) {
  const [vip, setVip] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [sortFavFirst, setSortFavFirst] = useState<boolean>(false);

  useEffect(() => {
    setVip(localStorage.getItem(STORAGE_VIP) === "true");
  }, []);

  const favs = (() => {
    try {
      return JSON.parse(localStorage.getItem("position_favs") || "[]");
    } catch {
      return [];
    }
  })();

  let visible = vip ? positions : positions.slice(0, FREE_COUNT);

  if (sortFavFirst && favs.length) {
    visible = [...visible].sort((a, b) => {
      const af = favs.includes(atob(a)) ? -1 : 0;
      const bf = favs.includes(atob(b)) ? -1 : 0;
      return af - bf;
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          type="search"
          placeholder="🔍 按文件名搜索姿势..."
          class="input"
          value={filter}
          onInput={(e) =>
            setFilter((e.target as HTMLInputElement).value.toLowerCase())}
        />
        <label
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "13px",
            color: "var(--theme-text-light)",
          }}
        >
          <input
            type="checkbox"
            checked={sortFavFirst}
            onChange={(e) =>
              setSortFavFirst((e.target as HTMLInputElement).checked)}
          />
          ⭐ 收藏的排前面
        </label>
        <div
          style={{
            fontSize: "13px",
            color: "var(--theme-text-light)",
          }}
        >
          共 <strong>{visible.length}</strong> 张
          {!vip && (
            <a href="/about" style={{ marginLeft: "8px" }}>
              · 开通 VIP 解锁全部 ({positions.length})
            </a>
          )}
        </div>
      </div>

      <div class="game-grid">
        {visible
          .filter((p) => !filter || atob(p).toLowerCase().includes(filter))
          .map((p) => {
            const url = atob(p);
            const isFav = favs.includes(url);
            return (
              <div
                class="game-card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <img
                  src={url}
                  alt={url}
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: isFav
                      ? "var(--theme-gradient)"
                      : "var(--theme-surface-strong)",
                    color: isFav ? "#fff" : "var(--theme-text-light)",
                    padding: "4px 10px",
                    borderRadius: "var(--theme-border-radius-pill)",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {isFav ? "⭐" : ""}
                </div>
              </div>
            );
          })}
      </div>

      {!vip && (
        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          <a href="/about" class="btn">
            🔓 开通会员解锁全部姿势
          </a>
        </div>
      )}
    </>
  );
}
