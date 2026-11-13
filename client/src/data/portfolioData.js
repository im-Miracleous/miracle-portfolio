const URLS = {
  github: 'https://github.com/im-Miracleous',
  instagram: 'https://www.instagram.com/im_miracleous',
  linkedin: 'https://www.linkedin.com/in/miracle-steven',
  youtube: 'https://www.youtube.com/@im_miracleous',
  discord: 'https://www.discord.com/users/751762039424155688',
  cv: '/CV_Miracle_Steven_Gerrald.pdf',
};

export const portfolioData = {
  urls: URLS,

  profile: {
    firstName: 'miracle',
    fullName: 'Miracle Steven Gerrald',
    initials: 'MG',
    greetingPrefix: 'hi!',
    greetingHighlight: "i'm miracle",
    tagline: 'informatics engineering student, full-stack developer, and homelab enjoyer',
    subtitle: 'AI & Cybersecurity Enthusiast',
    role: '3rd Year Student @ MCU',
    email: 'miraclesteven05@gmail.com',
    avatarUrl: '/avatar.jpg',
    copyright: '© 2026 Miracle Steven Gerrald',
    bioIntro: "hi! i'm miracle — i build reliable web systems, tinker with self-hosted infrastructure, and lead student tech communities.",
    bioClosing: 'open to software engineering internships, tech collaborations, and interesting infrastructure challenges.',
    education: [
      {
        degree: 'Bachelor of Informatics Engineering (S1)',
        institution: 'Maranatha Christian University — Bandung',
        period: '2024 – Present',
      },
    ],
    experiences: [
      {
        organization: 'Saint Ursula Junior High School',
        location: 'Bandung, Indonesia',
        role: 'Private Tutor (Part-time)',
        period: 'August 2026 – Present',
        points: [
          'Delivered individual tutoring in Mathematics, Physics, and Chemistry for junior high school students.',
          'Designed tailored study materials and practice problems to reinforce core STEM concepts and exam performance.',
        ],
      },
      {
        organization: 'Maranatha Christian University Choir (MCUC)',
        location: 'Bandung, Indonesia',
        role: 'Junior Choral Director',
        period: 'January 2026 – Present',
        points: [
          'Helped in vocal training, curated song repertoires, and rehearsal schedules across various regular performances, special programs, and services.',
          'Produced and distributed custom MIDI audio guides (if the song guide is not available publicly) to accelerate the learning process and enhance pitch accuracy for the singers.',
          'Managed sheet music inventory system, overseeing physical cataloging (A-Z), and the streamlined distribution of digital materials to the team.',
        ],
      },
      {
        organization: 'Informatics Engineering Student Association (HMIF)',
        location: 'Bandung, Indonesia',
        role: 'Staff of Partnerships & Innovations',
        period: 'January 2025 – February 2026',
        points: [
          'Built strategic relationships and partnerships with industry sponsors, alumni, and/or other communities to support events and tech initiatives issued by the student association.',
          'Executed merchandise and fundraising campaigns to sustain operational budgets for the student association.',
        ],
      },
      {
        organization: 'Lifeskills Indonesia (Part of Satu Persen)',
        location: 'Bandung, Indonesia',
        role: 'Head Division of Event Operations',
        period: 'December 2024 – September 2025',
        points: [
          'Design and implement event strategies aligning to the organizational goals.',
          'Supervise and monitor the tasks given to the EO members to ensure smooth workflows.',
          'Create an agenda for further meetings & discussions, and point out important tasks to be completed.',
        ],
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
      id: 'cv',
      label: 'CV / Resume',
      href: URLS.cv,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: URLS.github,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: URLS.instagram,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: URLS.linkedin,
    },
    {
      id: 'discord',
      label: 'Discord',
      href: URLS.discord,
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
      id: 'loan-approval',
      title: 'Loan Approval System',
      period: 'May – Jun 2026',
      imageUrl: '/projects/loan-approval.png',
      summary:
        'CrediSenseAI loan approval platform combining a Laravel portal with a Python multi-agent scoring and LLM insight engine, plus ML/TabNet credit default prediction.',
      tags: ['Laravel', 'Python', 'TabNet', 'Docker', 'Streamlit'],
      repoUrl: 'https://github.com/Febrian123-create/Tubes-Kecerdasan-Mesin',
    },
    {
      id: 'lab-inventory',
      title: 'Lab Inventory App',
      period: 'May – Jun 2026',
      imageUrl: '/projects/lab-inventory.png',
      summary:
        'Labventory multi-lab inventory system using a Node.js REST API and Laravel frontend for role-based procurement, asset & consumables tracking, maintenance logs, and label printing.',
      tags: ['Node.js', 'Laravel', 'REST API', 'MySQL'],
      repoUrl: 'https://github.com/FeliciaivannaW/capstone2_lab_inventory',
    },
    {
      id: 'library-management',
      title: 'Library Management',
      period: 'Dec 2025 – Jan 2026',
      imageUrl: '/projects/library-management.png',
      summary:
        'Collaborative library management web application for cataloging collections, managing member borrowing/returns, and tracking book inventory.',
      tags: ['Web App', 'Database', 'Collaboration'],
      repoUrl: 'https://github.com/im-Miracleous/library_app',
    },
  ],

  links: [
    {
      id: 'github',
      label: 'github',
      href: URLS.github,
    },
    {
      id: 'linkedin',
      label: 'linkedin',
      href: URLS.linkedin,
    },
    {
      id: 'youtube',
      label: 'youtube',
      href: URLS.youtube,
    },
    {
      id: 'instagram',
      label: 'instagram',
      href: URLS.instagram,
    },
    {
      id: 'discord',
      label: 'discord',
      href: URLS.discord,
    },
    {
      id: 'cv',
      label: 'resume / cv',
      href: URLS.cv,
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
