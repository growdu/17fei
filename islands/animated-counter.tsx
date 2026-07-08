import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  value: number;
  /** 后缀, 例如 "+" */
  suffix?: string;
  /** 滚动时长, ms */
  duration?: number;
  /** 数字颜色覆盖 */
  className?: string;
}

/**
 * 进入视口时从 0 计数到目标值
 * 用 requestAnimationFrame 平滑过渡
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1600,
  className,
}: Props) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const animate = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setN(Math.floor(eased * value));
              if (t < 1) requestAnimationFrame(animate);
              else setN(value);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} class={className}>
      {n}
      {suffix}
    </span>
  );
}
