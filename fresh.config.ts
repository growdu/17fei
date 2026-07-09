import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

// twindConfig 在编译时是 BaseTheme 类型,运行时需要 selfURL (Fresh 1.x 注入)
const config = twindConfig as unknown as
  & { selfURL: string }
  & typeof twindConfig;
config.selfURL = new URL("./twind.config.ts", import.meta.url).href;

export default defineConfig({
  // deno-lint-ignore no-explicit-any
  plugins: [twindPlugin(config as any)],
});
