import type { Metadata } from "next";
import "./globals.css";
import EmotionRegistry from "@/components/EmotionRegistry";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "TechMeister | Mohammad Chowdhry",
  description:
    "Full Stack Architect specializing in precision engineering and high-performance system architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <div className="app-root">
            <Header />
            {children}
          </div>
        </EmotionRegistry>
      </body>
    </html>
  );
}
