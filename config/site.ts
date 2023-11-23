export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Tahjyei Thompson",
  role: "Software Engineer",
  email: "tahjyeithompson@gmail.com",
  summary: "I'm a Software Engiener based in Kingston, Jamaica. I enjoy building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences.",
  mainNav: [
    {
      title: "Home",
      href: "#home",
    },
    {
      title: "Experience",
      href: "#experience",
    },
    {
      title: "Projects",
      href: "#projects",
    },

  ],
  resume: "resume.pdf",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },

  experiences: [
    {
      startDate: 'Apr 2022',
      endDate: 'Present',
      role: 'Software Engineer I',
      company: 'RealDecoy Global Services | Ottawa, CA',
      description: `
      Led the frontend development of an IPO portal using Vue.js, enhancing user experience significantly. Improved the ASP.NET backend, resulting in better performance and scalability. Contributed to a 5% increase in IPO stock options transactions through innovative updates to the investment platform. Developed an advanced PaaS product using Svelte and SvelteKit, improving frontend capabilities. Implemented an efficient Node.js backend with TypeORM, optimizing database interactions. Strengthened data storage with PostgreSQL's robust features. Key contributor in designing and maintaining a task management system specifically for pentesters.
      `,
      technologies: ['Vue.js', 'ASP.NET', 'Node.js', 'TypeORM', 'PostgreSQL', 'Svelte', 'SvelteKit'],
      link: 'https://www.realdecoy.com/',
    },
    {
      startDate: 'Nov 2021',
      endDate: 'Apr 2022',
      role: 'Software Developer',
      company: 'Radeos Technologies | Kingston, Jamaica',
      description: `
      Enhanced a Laravel backend and React frontend application, boosting platform performance. Increased order processing speeds by 15% through optimized features and code refactoring. Reduced warehouse errors by 10% by addressing system bottlenecks and bugs. Played a key role in system maintenance, including bug fixes, performance tuning, and feature integration. Developed an innovative SaaS product providing extensive media presence insights. Created a scalable, high-performance Flask backend. Integrated TensorFlow for real-time radio broadcast transcription. Utilized AWS S3 for effective storage and retrieval of audio content. Improved transcription metadata management and search efficiency by integrating Solr
      `,
      technologies: ['Laravel', 'React', 'Flask', 'TensorFlow', 'AWS S3', 'Solr'],
    },
    {
      startDate: 'Nov 2020',
      endDate: 'Nov 2021',
      role: 'Junior Developer',
      company: 'Norus Technologies | Kingston, Jamaica',
      description: `
      Collaborated on creating a crowdfunding platform designed for micro-initiatives and groups. Contributed to developing a user-friendly React frontend, focusing on a seamless user experience. Worked closely with the team on a Nest.js Node backend, enhancing the system's robustness and scalability.
      `,
      technologies: ['React', 'Nest.js', 'Node'],
      link: 'https://www.norustech.com/',
    },
  ]
}
