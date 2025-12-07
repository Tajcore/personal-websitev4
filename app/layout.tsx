import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Libre_Baskerville, IBM_Plex_Mono, Lora, Libre_Baskerville as V0_Font_Libre_Baskerville, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

// Initialize fonts
const _libreBaskerville = V0_Font_Libre_Baskerville({ subsets: ['latin'], weight: ["400","700"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = V0_Font_Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Tahjyei Thompson | Software Engineer",
  description:
    "Experienced software engineer with expertise in frontend development, full stack engineering, data engineering, and search solutions.",
  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
  ],
  authors: [{ name: "Tahjyei Thompson" }],
  openGraph: {
    title: "Tahjyei Thompson | Software Engineer",
    description: "One Engineer, Many Forms. Generate a custom resume tailored to any role.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahjyei Thompson | Software Engineer",
    description: "One Engineer, Many Forms. Generate a custom resume tailored to any role.",
    creator: "@tajcore",
  },
  icons: {
    icon: [
      { url: "/file.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/file.svg"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${libreBaskerville.variable} ${ibmPlexMono.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
