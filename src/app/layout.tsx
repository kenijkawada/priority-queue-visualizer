import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://priority-queue-visualizer.vercel.app"),
  title: "priority queue visualizer",
  description: "Visualize priority queue algorithms",
  openGraph: {
    title: "Priority Queue Visualizer",
    description: "Freelance software developer based in Japan",
    url: "https://priority-queue-visualizer.vercel.app",
    siteName: "Priority Queue Visualizer",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Priority Queue Visualizer",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
