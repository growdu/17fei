import { Handlers } from "$fresh/server.ts";

// 老 /card_version 路由已经合并到 /card 的下拉选择, 永久重定向
export const handler: Handlers = {
  GET() {
    return new Response(null, {
      status: 301,
      headers: { Location: "/card" },
    });
  },
};
