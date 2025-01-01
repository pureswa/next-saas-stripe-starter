import "@/styles/globals.css";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@/components/analytics";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { fontSans, fontUrban, fontHeading, fontGeist } from "@/assets/fonts";
import { Inter } from 'next/font/google'
import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { ModalProvider } from "@/components/modals/providers";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth", fontSans.variable, fontUrban.variable, fontHeading.variable, fontGeist.variable, inter.className)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <ModalProvider>
              <NavBar />
              <main>{children}</main>
              <SiteFooter />
              <Analytics />
            <Toaster richColors closeButton position="bottom-right" />
            <TailwindIndicator />
            </ModalProvider>
          </SessionProvider>
        </ThemeProvider>
        <Script
          src="https://example.com/script.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}