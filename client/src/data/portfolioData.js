export const portfolioData = {
  profile: {
    firstName: 'miracle',
    fullName: 'Miracle Steven Gerrald',
    initials: 'MG',
    greetingPrefix: 'hi!',
    greetingHighlight: "i'm miracle",
    tagline: 'informatics engineering student, full-stack developer, and homelab enthusiast',
    subtitle: 'AI & Cybersecurity Enthusiast',
    role: '3rd Year Student @ MCU',
    email: 'miracle.gerrald@gmail.com',
    copyright: '© 2026 Miracle Steven Gerrald',
    bioIntro: "hi! i'm miracle — i build reliable web systems, tinker with self-hosted infrastructure, and lead student tech & music communities.",
    bioClosing: 'open to software engineering internships, full-stack collaborations, and interesting infrastructure challenges.',
    education: [
      {
        degree: 'Bachelor of Informatics Engineering (S1)',
        institution: 'Universitas Kristen Maranatha — Bandung',
        period: '2023 – Present',
      },
    ],
    experiences: [
      {
        role: 'President',
        organization: 'Argos Club UKM — Universitas Kristen Maranatha',
        period: '2024 – Present',
        detail: 'Leading student club operations, technical workshops, and community initiatives.',
      },
      {
        role: 'Full-Stack Software Developer',
        organization: 'Academic & Community Projects',
        period: '2024 – Present',
        detail: 'Built web systems using Laravel, React, Node.js, and MySQL including ReWardrobe and university lab management tools.',
      },
      {
        role: 'Choral Ensemble Director',
        organization: 'University Choral Ensembles',
        period: '2023 – Present',
        detail: 'Directing rehearsals, vocal balancing, and live campus performances.',
      },
    ],
    otherInterests: [
      'proxmox, docker & linux homelabbing',
      'self-hosted infrastructure & networking',
      'choral music & vocal arranging',
      'iot & civic disaster-tech architecture',
    ],
    languages: {
      summary: 'i have native fluency in Indonesian and strong professional proficiency in English.',
      note: 'comfortable collaborating in bilingual technical teams, writing documentation, and presenting projects in both languages.',
    },
  },

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/miraclegerrald',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/miracle-steven-gerrald',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@miraclegerrald',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/miraclegerrald',
    },
  ],

  tools: [
    'Docker',
    'Proxmox VE',
    'Linux',
    'Git',
    'Nginx',
    'MySQL',
    'VS Code',
    'Postman',
    'Figma',
  ],

  development: [
    'PHP',
    'Laravel',
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'HTML/CSS',
    'Tailwind CSS',
    'Python',
    'Java',
  ],

  projects: [
    {
      id: 'rewardrobe',
      title: 'ReWardrobe',
      category: 'Web',
      year: '2025',
      summary:
        'Community clothing donation and distribution web platform connecting donors, verifiers, and recipients with transparent inventory and request tracking.',
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      highlights: [
        'Role-based dashboards for donors, community coordinators, and recipients',
        'Structured donation intake, condition grading, and distribution workflows',
      ],
      repoUrl: 'https://github.com/miraclegerrald',
    },
    {
      id: 'flood-nav',
      title: 'FLOOD-NAV',
      category: 'Systems',
      year: '2025',
      summary:
        'Flood-aware routing and disaster navigation application designed to help commuters and responders avoid inundated road segments in real time.',
      tags: ['React', 'Node.js', 'Geospatial'],
      highlights: [
        'Dynamic hazard-avoidance route recalculation around reported flood zones',
        'Low-friction incident reporting interface optimized for mobile responders',
      ],
      repoUrl: 'https://github.com/miraclegerrald',
    },
    {
      id: 'ascend',
      title: 'ASCEND',
      category: 'IoT & Architecture',
      year: '2025',
      summary:
        'Smart Curb for Flood Detection IoT & software architecture proposal combining roadside water-level telemetry with real-time alert pipelines.',
      tags: ['IoT', 'Architecture', 'Telemetry'],
      highlights: [
        'End-to-end sensor-to-cloud ingestion design for urban drainage monitoring',
        'Threshold-based early warning flow integrated with municipal mapping',
      ],
      repoUrl: 'https://github.com/miraclegerrald',
    },
    {
      id: 'lab-inventory',
      title: 'Laboratory Inventory & Management System',
      category: 'Web',
      year: '2024',
      summary:
        'Administrative and asset tracking system built for university operations to streamline equipment borrowing, maintenance logs, and lab scheduling.',
      tags: ['Laravel', 'MySQL', 'Admin UI'],
      highlights: [
        'Check-in / check-out ledger with overdue tracking and audit history',
        'Centralized catalog for lab hardware, peripherals, and room assignments',
      ],
      repoUrl: 'https://github.com/miraclegerrald',
    },
  ],

  links: [
    {
      id: 'github',
      label: 'github',
      href: 'https://github.com/miraclegerrald',
    },
    {
      id: 'linkedin',
      label: 'linkedin',
      href: 'https://www.linkedin.com/in/miracle-steven-gerrald',
    },
    {
      id: 'youtube',
      label: 'youtube',
      href: 'https://www.youtube.com/@miraclegerrald',
    },
    {
      id: 'instagram',
      label: 'instagram',
      href: 'https://www.instagram.com/miraclegerrald',
    },
    {
      id: 'discord',
      label: 'discord',
      href: 'https://discord.com',
    },
  ],

  faqs: [
    {
      id: 'stack',
      question: 'What is your preferred tech stack?',
      answer:
        'For full-stack web apps I gravitate toward Laravel + MySQL when rapid, structured backend scaffolding matters, and React + Node.js/Express + Tailwind CSS for interactive frontends and lightweight APIs. For infrastructure, I rely on Linux, Docker, and Proxmox.',
    },
    {
      id: 'availability',
      question: 'Are you available for internships or collaborations?',
      answer:
        'Yes! As an Informatics Engineering student based in Bandung, I am open to software engineering internships, freelance web development projects, and hackathon or research collaborations.',
    },
    {
      id: 'homelab',
      question: 'What does your self-hosting / homelab setup look like?',
      answer:
        'I run a Proxmox VE host at home with isolated Linux VMs and LXC containers managed via Docker Compose. It hosts personal web apps, reverse proxies, monitoring dashboards, and automated backup routines — giving me hands-on experience with networking and sysadmin workflows.',
    },
    {
      id: 'choral',
      question: 'Software engineering and choral directing — how do they connect?',
      answer:
        'Directing university choral ensembles and leading Argos Club UKM both revolve around listening closely, aligning people toward a shared tempo, and breaking complex pieces into clear, practiced sections — skills that translate directly to engineering teams.',
    },
  ],
};
