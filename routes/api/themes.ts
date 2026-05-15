import { Handlers } from "$fresh/server.ts";

interface ThemeInfo {
  id: string;
  name: string;
  preview: string;
  description: string;
}

const THEMES: ThemeInfo[] = [
  {
    id: "romantic",
    name: "浪漫梦幻",
    preview: "linear-gradient(135deg, #ff6b9d, #c44569)",
    description: "粉色渐变、爱心粒子、星空背景",
  },
  {
    id: "minimal",
    name: "简约现代",
    preview: "linear-gradient(135deg, #5c7cfa, #4c6ef5)",
    description: "扁平化设计、柔和配色、清新线条",
  },
  {
    id: "playful",
    name: "活泼可爱",
    preview: "linear-gradient(135deg, #ff922b, #ff7b00)",
    description: "明快橙黄、圆润元素、趣味动画",
  },
  {
    id: "premium",
    name: "高端私密",
    preview: "linear-gradient(135deg, #9775fa, #845ef7)",
    description: "深紫黑金、精致纹理、商务质感",
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