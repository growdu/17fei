import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

/**
 * 一次性 toast 触发器
 * 用法: <Toast message="保存成功" />
 *   或: const t = useToast(); t.show("hello")
 */
interface Props {
  message?: string;
  duration?: number;
}

let external: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  if (external) external(msg);
}

export default function Toast({ message = "", duration = 2400 }: Props) {
  const text = useSignal<string>("");
  const visible = useSignal<boolean>(false);

  useEffect(() => {
    external = (msg: string) => {
      text.value = msg;
      visible.value = true;
      setTimeout(() => (visible.value = false), duration);
    };
    return () => {
      external = null;
    };
  }, []);

  if (!visible.value) return null;

  return (
    <div class="toast-container">
      <div class="toast" key={text.value}>
        {text.value || message}
      </div>
    </div>
  );
}
