import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

// @ts-ignore - selfURL is required by Fresh's twind plugin
twindConfig.selfURL = new URL("./twind.config.ts", import.meta.url).href;

export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
});