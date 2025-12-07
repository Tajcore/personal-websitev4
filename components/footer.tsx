import { Github, Linkedin, Mail, Zap } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg font-bold">Tahjyei Thompson</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
            <Link href="/resume" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Resume
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tajcore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/tahjyei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:tahjyeithompson@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Tahjyei Thompson. It&apos;s Morphin&apos; Time.</p>
        </div>
      </div>
    </footer>
  )
}
