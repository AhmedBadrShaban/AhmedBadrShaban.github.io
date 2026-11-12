import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Badr Shaaban — Frontend Engineer",
  description:
    "The portfolio of Ahmed Badr Shaaban, a frontend engineer crafting clear, considered digital experiences.",
  icons: {
    icon: [{ url: "/favicon.svg?v=1", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
