import { IS_BROWSER } from "$fresh/runtime.ts";

export default function ErrorControls() {
  const onBack = (e: Event) => {
    e.preventDefault();
    if (IS_BROWSER && typeof history !== "undefined") history.back();
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <a href="/" class="btn" type="button">回到首页</a>
      <button type="button" class="btn btn-ghost" onClick={onBack}>
        ← 返回上页
      </button>
    </div>
  );
}
