import { JSX } from "preact";

interface Link {
  href: string;
  label: string;
}

const links: Link[] = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于 / 赞助" },
  { href: "/custom", label: "站长笔记" },
  { href: "/member", label: "会员空间" },
];

export default function Footer(_props: JSX.HTMLAttributes<HTMLElement>) {
  const year = new Date().getFullYear();
  return (
    <footer
      class="footer"
      style={{
        marginTop: "60px",
        padding: "32px 20px",
        textAlign: "center",
        borderTop: "1px solid var(--theme-card-border)",
        background: "var(--theme-surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {links.map((l) => (
          <a
            href={l.href}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              color: "var(--theme-text-light)",
              borderRadius: "var(--theme-border-radius-pill)",
              transition: "all var(--theme-transition-fast)",
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div style={{ fontSize: "13px", color: "var(--theme-text-light)" }}>
        <span style={{ marginRight: "8px" }}>© {year}</span>
        <span style={{ color: "var(--theme-primary)", fontWeight: 600 }}>
          17fei.fun
        </span>
        <span style={{ marginLeft: "8px" }}>· 让爱更有趣</span>
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "var(--theme-text-muted)",
          marginTop: "8px",
        }}
      >
        本站仅供成年人娱乐 · 内容无害 · 不收集隐私
      </div>
    </footer>
  );
}
