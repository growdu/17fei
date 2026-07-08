interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  emoji?: string;
  showLogo?: boolean;
}

export default function Hero({ title, subtitle, badge, emoji, showLogo }: Props) {
  // 优先级: showLogo (logo.png) > emoji > 都不显示
  const displayVisual = showLogo
    ? <img src="/logo.png" alt="logo" class="hero-logo" />
    : emoji
    ? <div style={{ fontSize: "72px", marginBottom: "16px" }}>{emoji}</div>
    : null;

  return (
    <header class="hero">
      {displayVisual}
      {badge && <span class="hero-badge">{badge}</span>}
      <h1 class="hero-title">{title}</h1>
      {subtitle && <p class="hero-subtitle">{subtitle}</p>}
    </header>
  );
}
