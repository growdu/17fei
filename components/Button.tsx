import { ComponentChildren, JSX } from "preact";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
  children: ComponentChildren;
}

export default function Button({ variant = "solid", children, ...rest }: Props) {
  const className = variant === "ghost" ? "btn btn-ghost" : "btn";
  return (
    <button {...rest} class={`${rest.class ?? ""} ${className}`.trim()}>
      {children}
    </button>
  );
}
