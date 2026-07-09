interface Props {
  children: preact.ComponentChildren;
  subtitle?: string;
}

export default function SectionHeading({ children, subtitle }: Props) {
  return (
    <div class="section-heading-wrapper" style={{ marginBottom: "20px" }}>
      <h2 class="section-heading">
        {children}
      </h2>
      {subtitle && (
        <p
          class="section-text"
          style={{ marginLeft: "16px", marginTop: "4px" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
