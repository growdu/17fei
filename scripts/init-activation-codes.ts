// scripts/init-activation-codes.ts
// 运行方式: deno run --allow-net --allow-write scripts/init-activation-codes.ts

const kv = await Deno.openKv();

// 预设一些激活码
const codes = [
  "VIP202406",
  "LOVE2024",
  "FUN2024",
  "TEST1234",
];

for (const code of codes) {
  await kv.set(["activation_codes", code], {
    used: false,
  });
  console.log(`Created activation code: ${code}`);
}

console.log("Done!");
