import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { ActiveSectionProvider } from "@/lib/contexts/ActiveSectionContext"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import SpotlightEffect from "@/components/spotlight-effect"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "lg:px-18 mx-auto min-h-screen max-w-screen-xl bg-background py-12 font-sans antialiased md:px-12 md:py-16 lg:py-0",
            fontSans.variable
          )}
        >
          <ActiveSectionProvider>
          <SpotlightEffect>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4">
                <SiteHeader />
                <div className="w-full grow">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </SpotlightEffect>
          </ActiveSectionProvider>
        </body>
      </html>
    </>
  )
}
