import { IS_BROWSER } from "$fresh/runtime.ts";

export default function OfflineReload() {
  const onReload = (e: Event) => {
    e.preventDefault();
    if (IS_BROWSER) globalThis.location.reload();
  };
  return (
    <button
      type="button"
      class="btn"
      onClick={onReload}
    >
      🔄 重新连接
    </button>
  );
}
