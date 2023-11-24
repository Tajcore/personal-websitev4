import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import ExperienceList from "@/components/experience-list"
import { Icons } from "@/components/icons"
import ProjectList from "@/components/project-list"

export default function IndexPage() {
  return (
    <div className="container pt-24 lg:py-24">
      <section
        title="home"
        id="home"
        className="relative mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 "
      >
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 text-lg font-semibold uppercase tracking-wider backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:p-0 lg:opacity-0">
          About
        </div>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <p className="max-w-[700px] text-muted-foreground">
            During my <span className="text-white">university</span> years in
            2019, I stumbled upon web design and development by creating custom
            themes. This sparked my interest in coding, leading me to delve into{" "}
            <span className="text-white">JavaScript</span> and explore the
            broader landscape of web development.
          </p>
          <p className="max-w-[700px] text-muted-foreground">
            My growing expertise in JavaScript led me to participate in
            hackathons, where I refined my skills and collaborated with peers.
            These experiences were crucial in shaping my career path and also
            propelled me into the realm of AI-driven web applications.{" "}
          </p>
          <p className="max-w-[700px] text-muted-foreground">
            In 2020, I started my professional career as a Software Engineer at
            a local agency. This role allowed me to apply my skills to
            real-world projects, working on everything from web applications to
            innovative mobile apps, each offering unique challenges and learning
            experiences.{" "}
          </p>
        </div>
      </section>
      <section
        title="experience"
        id="experience"
        className="relative mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      >
        <div className=" sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 text-lg font-semibold uppercase tracking-wider backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:p-0 lg:opacity-0">
          Experience
        </div>
        <ExperienceList experiences={siteConfig.experiences} />
        <Link className="w-full" legacyBehavior href={siteConfig.resume}>
          <a className="ml-1 transition-all duration-75 ease-linear group-hover:translate-x-1 ">
            <div className="underline-offset-3 group relative flex items-center font-semibold transition-all duration-75 ease-linear hover:underline lg:px-4">
              View Full Résumé
             <span><Icons.rightArrow className="h-4 w-4 transition-all duration-75 ease-linear group-hover:translate-x-1 " /></span>
            </div>
          </a>
        </Link>
      </section>
      <section
        title="projects"
        id="projects"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      >        <div className=" sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 text-lg font-semibold uppercase tracking-wider backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:p-0 lg:opacity-0">
      Projects
    </div>
    <ProjectList projects={siteConfig.projects} />
    </section>
    </div>
  )
}
