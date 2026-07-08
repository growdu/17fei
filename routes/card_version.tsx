import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return new Response(null, {
      status: 301,
      headers: { Location: "/card" },
    });
  },
};

export default function CardVersionLegacy() {
  return (
    <Head>
      <title>任务卡牌 · 17fei</title>
    </Head>
  );
}
