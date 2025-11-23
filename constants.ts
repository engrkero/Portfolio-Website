import React from 'react';
import type { Skill, TimelineItem, Project, Achievement, Testimonial } from './types';
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon, InstagramIcon, WhatsappIcon, ReactIcon, FigmaIcon, AdobeSuiteIcon, TailwindCssIcon, UiUxIcon, GraphicDesignIcon, CodeIcon, TypescriptIcon, BrainIcon, UsersIcon, ClockIcon, HeartIcon, GlobeIcon, SmileIcon, BriefcaseIcon, TrophyIcon, BlockchainIcon, GraduationCapIcon, IdCardIcon, ComputerIcon } from './components/icons';

export const COLORS = {
  darkBlue: '#2A324B',
  redOrange: '#F0544F',
  yellowGold: '#F8B462',
  lightGray: '#F1F1F1',
  white: '#FFFFFF',
};

// University of Calabar Coordinates (Approximate center)
export const UNICAL_LOCATION = {
  latitude: 4.9526,
  longitude: 8.3413,
  radiusKm: 15 // Increased Alert radius for better coverage around Calabar
};

export const LATEST_UPDATES = [
  {
    id: 'upd_1',
    title: 'Admission Still Ongoing',
    status: 'Active',
    description: 'UNICAL Admission process is currently still ongoing. Check your admission status now.',
    urgent: true
  },
  {
    id: 'upd_2',
    title: 'Registration for Freshers',
    status: 'Urgent',
    description: '• JAMB Admission Letter Printing\n• Unical Checker Pin Purchase\n• Unical Admission Letter\n• Payment of Acceptance Fees\n• Online Screening (Requirements: JAMB Admission Letter, Birth Certificate, O\'Level Result, 2 Attestation Letters, Certificate of Origin, Passport)\n• Purchase of O\'Level Verification Pin\n• Payment of School Fees',
    urgent: true
  },
  {
    id: 'upd_3',
    title: 'Course Registration',
    status: 'Ongoing',
    description: 'Course Registration is currently ongoing for all students.',
    urgent: false
  },
  {
    id: 'upd_4',
    title: 'EDC & GSS Registrations',
    status: 'Ongoing',
    description: 'EDC & GSS Registrations are currently ongoing.',
    urgent: false
  },
  {
    id: 'upd_5',
    title: 'NYSC Registration',
    status: 'Part-Time',
    description: 'NYSC Registration (Part-Time) is still ongoing.',
    urgent: false
  }
];

export const SKILLS: Skill[] = [
  { name: 'UI/UX Design', icon: React.createElement(UiUxIcon) },
  { name: 'Graphic Design', icon: React.createElement(GraphicDesignIcon) },
  { name: 'Frontend Development', icon: React.createElement(CodeIcon) },
  { name: 'React', icon: React.createElement(ReactIcon) },
  { name: 'TypeScript', icon: React.createElement(TypescriptIcon) },
  { name: 'Tailwind CSS', icon: React.createElement(TailwindCssIcon) },
  { name: 'Figma', icon: React.createElement(FigmaIcon) },
  { name: 'Adobe Suite', icon: React.createElement(AdobeSuiteIcon) },
  { name: 'Problem Solving', icon: React.createElement(BrainIcon) },
  { name: 'Effective Communication', icon: React.createElement(UsersIcon) },
  { name: 'Time Management', icon: React.createElement(ClockIcon) },
  { name: 'Emotional Intelligence', icon: React.createElement(HeartIcon) },
];

export const EXPERIENCE: TimelineItem[] = [
  {
    date: 'July 2020 - April 2022',
    title: 'Computer Operator',
    subtitle: 'Grand Intenet Services, Calabar',
    description: "Increased customer's satisfaction rate. Designed the company logo and banner with my learnt skills."
  }
];

export const EDUCATION: TimelineItem[] = [
  {
    date: '2025 (Expected)',
    title: 'HND, Computer Science',
    subtitle: 'Akanu Ibiam Federal Polytechnic, Unwana Afikpo, Ebonyi State',
    description: 'Higher National Diploma in Computer Science.'
  },
  {
    date: '2023',
    title: 'OND, Computer Science',
    subtitle: 'Akanu Ibiam Federal Polytechnic, Unwana Afikpo, Ebonyi State',
    description: 'Ordinary National Diploma in Computer Science.'
  },
  {
    date: 'March 2022',
    title: 'Soft Skills Certification',
    subtitle: 'Relief Africa in Collaboration with W.A.V.E',
    description: "Completed an 80-hour soft skills training program including Customer Service, Teamwork, and Problem Solving."
  },
  {
    date: '2020',
    title: 'SSCE (WAEC & NECO)',
    subtitle: 'Ijiman Science Academy, Ugep',
    description: 'Completed Secondary School Certificate Examinations.'
  },
  {
    date: 'April 2019',
    title: 'Website Design and Development',
    subtitle: 'SKY7 Training & Consulting',
    description: 'Certificate of completion for course on website design and development.'
  },
];

export const TRAININGS: TimelineItem[] = [
    {
        date: 'Public Health Initiatives',
        title: 'Device Operator Officer',
        subtitle: 'Ipolongo Roll Back Malaria Campaigne, Calabar',
        description: 'Managed devices and data for the malaria campaign.'
    },
    {
        date: 'Public Health Initiatives',
        title: 'Data Entry Officer',
        subtitle: 'Measles Campaigne, Calabar',
        description: 'Responsible for accurate data entry for the measles campaign.'
    },
    {
        date: 'Public Health Initiatives',
        title: 'Data Entry Officer',
        subtitle: 'COVID-19 Campaigne, Calabar',
        description: 'Handled data entry tasks for the COVID-19 public health initiative.'
    }
];

export const PROJECTS: Project[] = [
  {
    title: 'Mara Scent Sales Campaign',
    category: 'Graphic Design',
    description: 'High-impact promotional flyer for Mara Scent\'s "Biggest Sales of the Year" event.',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2069&auto=format&fit=crop',
    tags: ['Photoshop', 'Flyer Design', 'Marketing'],
    longDescription: 'Designed a high-conversion promotional flyer for Mara Scent. The design focuses on bold typography and vibrant colors (specifically branding pinks and whites) to attract attention to the sales offer. Included details about discounts, dates, and delivery options in a clear, readable layout to maximize customer engagement.',
    detailImages: ['https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2066&auto=format&fit=crop', 'https://images.unsplash.com/photo-1595867357798-5dfdd8a4d939?q=80&w=2070&auto=format&fit=crop']
  },
  {
    title: 'Mara Scent Corporate Identity',
    category: 'Graphic Design',
    description: 'Professional letterhead design ensuring brand consistency for official communications.',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2070&auto=format&fit=crop',
    tags: ['Illustrator', 'Branding', 'Stationery'],
    longDescription: 'Created a clean and professional letterhead as part of Mara Scent\'s corporate identity package. The design incorporates the logo watermark and brand colors to maintain a cohesive look across all business documents, reinforcing the brand\'s professional image.',
    detailImages: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop']
  },
  {
    title: 'Blissful Drinks Branding',
    category: 'Graphic Design',
    description: 'Creative and playful logo design for a beverage brand featuring cloud elements.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2070&auto=format&fit=crop',
    tags: ['Logo Design', 'Illustrator', 'Typography'],
    longDescription: 'Developed a playful and memorable logo for "Blissful Drinks". The concept merges the imagery of bottles with clouds to evoke a sense of lightness and enjoyment. The typography is custom-styled to match the fluid and organic feel of the brand.',
    detailImages: ['https://images.unsplash.com/photo-1573554761328-c883511e42c3?q=80&w=2070&auto=format&fit=crop']
  },
  {
    title: 'Election Campaign Flyer',
    category: 'Graphic Design',
    description: 'Campaign materials for Comrade Kalu Chinomso Gold\'s Student Union election bid.',
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop',
    tags: ['Flyer Design', 'Political Campaign', 'Print Design'],
    longDescription: 'Designed a compelling political campaign flyer for Comrade Kalu Chinomso Gold running for Vice President. The design highlights the candidate\'s image, name, and position with a bold, authoritative layout suitable for an election campaign, ensuring high visibility and readability.',
    detailImages: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop']
  },
  {
    title: 'GreenDeck Africa',
    category: 'Frontend Development',
    description: 'A comprehensive web platform designed for GreenDeck Africa, focusing on sustainability, environmental solutions, and corporate presence.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'Tailwind CSS', 'Responsive Design'],
    liveUrl: 'https://www.greendeckafrica.netlify.app',
    repoUrl: '#',
    longDescription: 'Designed and developed the official website for GreenDeck Africa. The platform serves as a digital hub for showcasing environmental initiatives and sustainable solutions. Key features include a responsive layout, interactive project galleries, and an optimized user interface for seamless navigation. The site was built with performance and accessibility in mind, ensuring a broad reach across different devices and user demographics.',
    detailImages: ['https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Bigg Manuel Portfolio',
    category: 'UI/UX Design',
    description: 'A dynamic personal portfolio and brand website created for Bigg Manuel, featuring a custom design system and smooth interactions.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'UI/UX', 'Animation'],
    liveUrl: 'https://www.biggmanuel.netlify.app',
    repoUrl: '#',
    longDescription: 'Crafted a unique digital identity for Bigg Manuel through a custom-built portfolio website. This project emphasized visual storytelling and brand consistency. The site features a modern aesthetic, smooth scrolling animations, and a showcase of creative works. It was engineered to be fast, SEO-friendly, and easily maintainable, serving as a professional touchpoint for clients and partners.',
    detailImages: ['https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1974&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Brand Identity & Logo Design',
    category: 'Graphic Design',
    description: 'Developed a complete brand identity package for a startup, including logo, color palette, and typography guidelines to ensure brand consistency.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Adobe Illustrator', 'Branding', 'Logo Design'],
    repoUrl: '#',
    longDescription: 'The challenge was to create a memorable and scalable brand identity for a tech startup needing to stand out in a crowded market. My process began with a deep-dive discovery session with the stakeholders, followed by extensive market research and competitor analysis. I developed several logo concepts, iterating based on feedback to arrive at a final design that perfectly captured the company\'s innovative spirit. The final delivery included a comprehensive brand style guide with logo variations, a defined color palette, typography rules, and mockups, ensuring a cohesive and powerful brand presence across all digital and print channels.',
    detailImages: ['https://images.unsplash.com/photo-1600692925375-9b854378565a?q=80&w=1974&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'E-commerce App UI/UX',
    category: 'UI/UX Design',
    description: 'Designed an intuitive and user-friendly interface for a mobile e-commerce application, focusing on a seamless checkout process and user engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Figma', 'User Research', 'Prototyping'],
    liveUrl: '#',
    repoUrl: '#',
    longDescription: 'The primary goal was to tackle high cart abandonment rates by designing a frictionless shopping experience. The process started with comprehensive user research, including surveys and interviews, to create detailed user personas and journey maps. This helped identify key pain points in existing e-commerce flows. Using Figma, I created low-fidelity wireframes, which evolved into high-fidelity, interactive prototypes. These prototypes underwent several rounds of usability testing, with feedback directly informing design iterations. The final design features a clean interface, intuitive navigation, and a streamlined, multi-step checkout process that simplifies purchasing and builds user trust.',
    detailImages: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Personal Portfolio Website',
    category: 'Frontend Development',
    description: 'Built a responsive personal portfolio website from scratch using modern web technologies to showcase my skills and projects.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    longDescription: 'This project—the very website you are viewing—was a personal initiative to create a performant and aesthetically pleasing platform to showcase my work. The goal was to build a fast, fully responsive, and easily maintainable site. I chose a modern frontend stack: React for its component-based architecture, TypeScript for robust type safety and improved developer experience, and Tailwind CSS for rapid, utility-first styling. The site features smooth, subtle animations to enhance user experience, a carefully considered layout for all device sizes, and is optimized for search engines and fast load times. The code is clean, well-documented, and follows industry best practices.',
    detailImages: ['https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Event Banners and Flyers',
    category: 'Graphic Design',
    description: 'Created visually compelling marketing materials, including banners and flyers, for various corporate events and campaigns, leading to increased attendance.',
    imageUrl: 'https://images.unsplash.com/photo-1579265503929-4b68a9010530?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Adobe Photoshop', 'Print Design'],
    longDescription: 'For this project, I was tasked with creating a full suite of marketing materials for a major tech conference. The objective was to create a cohesive and exciting visual theme that would generate buzz and drive registrations. Working closely with the event organizers, I designed everything from large-format banners and stage backdrops to digital flyers and social media graphics. The designs maintained brand consistency while injecting a dynamic and modern feel, resulting in a strong visual impact that significantly contributed to a 25% increase in event registrations compared to the previous year.',
    detailImages: ['https://images.unsplash.com/photo-1549998394-156f7a421526?q=80&w=1964&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Mobile Banking App Concept',
    category: 'UI/UX Design',
    description: 'A concept design for a mobile banking app focused on simplicity and security, featuring biometric login and easy transaction tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1580974928064-75ae6a5293c0?q=80&w=1964&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Figma', 'UX', 'Mobile Design'],
    liveUrl: '#',
    longDescription: 'This conceptual project aimed to reimagine the mobile banking experience, addressing common user frustrations like cluttered interfaces and complex navigation. The core focus was on creating a design that feels simple, secure, and empowering for the user. Key features include a clean dashboard for an at-a-glance financial overview, intuitive flows for common tasks like transfers and payments, and robust security measures like biometric authentication. The high-fidelity prototype, built in Figma, was tested with potential users to validate design choices, ensuring the concept delivered a genuinely frictionless and trustworthy user experience.',
    detailImages: ['https://images.unsplash.com/photo-1601610932379-22a705b02b5e?q=80&w=1964&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    title: 'Weather App with React',
    category: 'Frontend Development',
    description: 'A clean and simple weather application built with React that fetches data from a third-party API to display current weather conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1965&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'API Integration', 'CSS'],
    liveUrl: '#',
    repoUrl: '#',
    longDescription: 'This project was built to demonstrate proficiency in fetching and handling data from a third-party API within a React application. The app allows users to search for a city and view its current weather conditions. I utilized React hooks (`useState` and `useEffect`) for state management and to handle the asynchronous API call to the OpenWeatherMap API. The UI is designed to be clean, responsive, and easy to interpret, with dynamic icons that change based on the weather. This project serves as a practical example of consuming REST APIs and conditionally rendering components based on the fetched data in a modern frontend application.',
    detailImages: ['https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1975&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  }
];

export const ACHIEVEMENTS: Achievement[] = [
    {
        title: "Projects Done",
        count: "500+",
        icon: React.createElement(BriefcaseIcon),
        delay: 0
    },
    {
        title: "Happy Clients",
        count: "2000+",
        icon: React.createElement(SmileIcon),
        delay: 150
    },
    {
        title: "Certifications",
        count: "8+",
        icon: React.createElement(TrophyIcon),
        delay: 300
    },
    {
        title: "Networks Active",
        count: "5+",
        icon: React.createElement(BlockchainIcon),
        delay: 450
    }
];

export const SOCIAL_LINKS = [
    { name: 'Github', url: 'https://github.com/engrkero', icon: React.createElement(GithubIcon) },
    { name: 'Linkedin', url: '#', icon: React.createElement(LinkedinIcon) },
    { name: 'X (Twitter)', url: 'https://www.x.com/KerenOnen46019', icon: React.createElement(TwitterIcon) },
    { name: 'Facebook', url: 'https://www.facebook.com/keren.onen.92', icon: React.createElement(FacebookIcon) },
    { name: 'Instagram', url: '#', icon: React.createElement(InstagramIcon) },
    { name: 'Whatsapp', url: 'https://wa.me/+2349015183471', icon: React.createElement(WhatsappIcon) },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "TechFlow",
        quote: "Working with Kero was an absolute pleasure. His attention to detail and ability to translate our complex requirements into a user-friendly interface exceeded our expectations.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        date: "March 15, 2024"
    },
    {
        id: "2",
        name: "David Chen",
        role: "CTO",
        company: "Innovate Inc",
        quote: "A rare combination of design flair and technical expertise. Kero delivered our project ahead of schedule and the code quality was top-notch.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        date: "April 2, 2024"
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "Creative Solutions",
        quote: "The brand identity package Kero created for us gave our business a whole new life. He really took the time to understand our vision.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        date: "May 10, 2024"
    }
];

export const SERVICES = [
  {
    title: "Academic & Admission Support",
    icon: React.createElement(GraduationCapIcon),
    items: [
      "JAMB Admission Letter",
      "UNICAL Checker Pin",
      "UNICAL Admission Letter",
      "UNICAL Acceptance Fees Payment",
      "Online Screening",
      "Course Registration",
      "School Fees Payment",
      "Pre-degree Acceptance Fees",
      "UNICAL JUPEB Acceptance Fees",
      "UNICAL Post Graduate Application",
      "UNICAL CES, Diploma and Pre-degree Registration",
      "Unicross (CRUTECH) Post UTME Registration",
      "EDC & GSS/GST Registrations",
      "WAEC/NECO Result Checking"
    ]
  },
  {
    title: "Digital & IT Solutions",
    icon: React.createElement(ComputerIcon),
    items: [
      "Professional Graphics Design",
      "Website Design & Development",
      "Domain Purchase & Website Hosting",
      "Business Email Creation",
      "Digital Marketing",
      "Remita Services",
      "Database Management",
      "International Payments",
      "Professional Printing Services (A4 Paper)"
    ]
  },
  {
    title: "Official ID & Registration Services",
    icon: React.createElement(IdCardIcon),
    items: [
      "NIN Slip to Plastic ID Card Conversion",
      "Correction of NIN Personal Data",
      "Navy Registration",
      "Airforce Registration",
      "Police Registration"
    ]
  }
];