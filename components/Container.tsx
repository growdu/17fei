interface Props {
  children: preact.ComponentChildren;
  narrow?: boolean;
}

export default function Container({ children, narrow }: Props) {
  return (
    <main class={narrow ? "page page-narrow" : "page"}>
      {children}
    </main>
  );
}
