import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "聯大生活圈 UNU LIFE",
  description: "國立聯合大學周邊美食、景點與虛擬校園探索平台"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
