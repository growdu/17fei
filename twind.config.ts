import { defineConfig } from "@twind/core";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary)",
        secondary: "var(--theme-secondary)",
        accent: "var(--theme-accent)",
        background: "var(--theme-background)",
        "background-secondary": "var(--theme-background-secondary)",
        text: "var(--theme-text)",
        "text-light": "var(--theme-text-light)",
        card: "var(--theme-card-bg)",
      },
      borderRadius: {
        DEFAULT: "var(--theme-border-radius)",
        sm: "var(--theme-border-radius-sm)",
      },
      boxShadow: {
        DEFAULT: "var(--theme-shadow)",
        hover: "var(--theme-shadow-hover)",
      },
    },
  },
});
