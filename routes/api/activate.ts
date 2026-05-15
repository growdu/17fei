import { Handlers } from "$fresh/server.ts";

interface ActivationRecord {
  used: boolean;
  usedBy?: string;
  usedAt?: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const { code } = await req.json();

      if (!code || typeof code !== "string") {
        return Response.json(
          { success: false, message: "激活码不能为空" },
          { status: 400 }
        );
      }

      const kv = await Deno.openKv();
      const record = await kv.get<ActivationRecord>(["activation_codes", code.toUpperCase()]);

      if (!record.value) {
        return Response.json(
          { success: false, message: "激活码无效" },
          { status: 400 }
        );
      }

      if (record.value.used) {
        return Response.json(
          { success: false, message: "激活码已被使用" },
          { status: 400 }
        );
      }

      // 标记为已使用
      const updatedRecord: ActivationRecord = {
        ...record.value,
        used: true,
        usedAt: new Date().toISOString(),
      };

      await kv.set(["activation_codes", code.toUpperCase()], updatedRecord);

      return Response.json({
        success: true,
        message: "激活成功",
      });
    } catch (error) {
      console.error("Activation error:", error);
      return Response.json(
        { success: false, message: "服务器错误，请重试" },
        { status: 500 }
      );
    }
  },
};