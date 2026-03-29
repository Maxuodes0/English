import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

import { AppFooter } from "@/components/ui/app-footer";
import { AppHeader } from "@/components/ui/app-header";
import { ProgressProvider } from "@/components/ui/progress-provider";

import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumena",
    template: "%s | Lumena",
  },
  description:
    "A premium English vocabulary platform with bilingual definitions, focus mode, adaptive quizzes, and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-950">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('lumena-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved === 'light' || saved === 'dark' ? saved : (systemDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
        <ProgressProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.14),transparent_28%)]" />
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
