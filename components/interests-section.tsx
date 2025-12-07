import type React from "react"
import { Gamepad2, BookOpen, Music, Film, Zap } from "lucide-react"
import type { Interest } from "@/lib/types"

interface InterestsSectionProps {
  interests: Interest[]
}

const iconMap: Record<string, React.ReactNode> = {
  "gamepad-2": <Gamepad2 className="h-6 w-6" />,
  "book-open": <BookOpen className="h-6 w-6" />,
  music: <Music className="h-6 w-6" />,
  film: <Film className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
}

export function InterestsSection({ interests }: InterestsSectionProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Beyond the Code</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I&apos;m not morphing into different engineering roles, you can find me enjoying these pursuits.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {interest.icon && iconMap[interest.icon] ? iconMap[interest.icon] : <Zap className="h-6 w-6" />}
              </div>
              <span className="font-medium">{interest.name}</span>
              {interest.description && (
                <span className="text-sm text-muted-foreground text-center max-w-[150px]">{interest.description}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
