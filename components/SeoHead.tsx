import { Head } from "$fresh/runtime.ts";

interface Props {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  noindex?: boolean;
}

const SITE = "https://17fei.fun";
const DEFAULT_DESC =
  "情侣情趣飞行棋 - 包含不同尺度适合不同阶段情侣一起玩的情趣游戏";

export default function SeoHead({
  title,
  description = DEFAULT_DESC,
  image = "/logo.png",
  url,
  keywords,
  noindex,
}: Props) {
  const fullUrl = url ? `${SITE}${url}` : SITE;
  const fullTitle = title.includes("17fei") ? title : `${title} · 17fei.fun`;
  const fullImage = image.startsWith("http") ? image : `${SITE}${image}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="17fei.fun" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
}
