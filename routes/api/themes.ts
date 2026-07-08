import { Handlers } from "$fresh/server.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string;
  description: string;
  isDark?: boolean;
}

const THEMES: ThemeInfo[] = [
  {
    id: "romantic",
    name: "浪漫梦幻",
    preview: "linear-gradient(135deg, #ff4d8d, #c2255c)",
    description: "粉色 · 玻璃 · 心形",
  },
  {
    id: "minimal",
    name: "简约现代",
    preview: "linear-gradient(135deg, #4263eb, #5c7cfa)",
    description: "蓝灰 · 平面 · 干净",
  },
  {
    id: "playful",
    name: "活泼可爱",
    preview: "linear-gradient(135deg, #ff922b, #f76707)",
    description: "橙黄 · 弹性 · 圆润",
  },
  {
    id: "premium",
    name: "高端私密",
    preview: "linear-gradient(135deg, #9775fa, #845ef7)",
    description: "深紫 · 玻璃 · 高质感",
    isDark: true,
  },
  {
    id: "darkrose",
    name: "暗夜玫瑰",
    preview: "linear-gradient(135deg, #ff6b9d, #cc3370)",
    description: "暗底玫红 · 玻璃磨砂",
    isDark: true,
  },
];

export const handler: Handlers = {
  async GET(req) {
    return Response.json({
      themes: THEMES,
      default: "romantic",
    });
  },
};