import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="mb-24 flex h-full lg:sticky lg:top-0 lg:mb-0 lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div className="container flex h-16 flex-col items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
        </div>
      </div>
    </header>
  )
}
