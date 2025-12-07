"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const roles = ["Software Engineer", "Data Engineer", "Frontend Developer", "Full Stack Engineer", "Search Consultant"]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Available for Opportunities</span>
          </div>

          {/* Name */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            Tahjyei Thompson
          </h1>

          {/* Animated Role */}
          <div className="h-12 md:h-16 flex items-center justify-center mb-8 overflow-hidden">
            <p
              className={`text-2xl md:text-4xl font-medium text-primary transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {roles[currentRole]}
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Experienced software engineer with a focus on data analysis, machine learning, and building performant data
            pipelines. I adapt to diverse technical challenges and deliver impactful solutions.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-10">
            <MapPin className="h-4 w-4" />
            <span>Jamaica / Remote</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/resume">
              <Button size="lg" className="gap-2 px-8">
                Download Resume
                <ArrowDown className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#experience">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                View Experience
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/tajcore"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/tahjyei"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:tahjyeithompson@gmail.com"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
