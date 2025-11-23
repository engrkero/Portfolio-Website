
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
    id: 'proj_1',
    title: 'ZenithPay Mobile Banking',
    category: 'UI/UX Design',
    description: 'A futuristic mobile banking interface featuring biometric security and AI-driven financial insights.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2068&auto=format&fit=crop',
    tags: ['Figma', 'FinTech', 'User Research', 'Prototyping'],
    liveUrl: '#',
    longDescription: 'ZenithPay reimagines the banking experience for the Gen Z demographic. The project involved extensive user research to identify pain points in traditional banking apps. The solution features a dark-mode first design, intuitive gesture-based navigation, and a "Financial Wellness" dashboard that visualizes spending habits using 3D interactive charts. Key deliverables included user personas, wireframes, and a high-fidelity clickable prototype.',
    detailImages: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'proj_2',
    title: 'VestRight Investment Platform',
    category: 'Frontend Development',
    description: 'A comprehensive investment dashboard for tracking stocks, crypto, and real estate assets in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop',
    tags: ['React', 'D3.js', 'API Integration', 'Tailwind'],
    liveUrl: '#',
    repoUrl: '#',
    longDescription: 'VestRight is a robust web application built for modern investors. It integrates with multiple financial APIs to provide real-time data visualization. I utilized React for the frontend architecture and D3.js for rendering complex candlestick charts and portfolio distribution graphs. The platform includes a secure user authentication system and a responsive layout that works seamlessly across desktop and tablet devices.',
    detailImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'proj_3',
    title: 'SwiftLogistics Global',
    category: 'Frontend Development',
    description: 'A high-performance corporate website for a shipping and logistics company with shipment tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Next.js', 'Framer Motion', 'SEO'],
    liveUrl: '#',
    longDescription: 'SwiftLogistics Global required a digital presence that reflected reliability and speed. I developed a multi-page website using Next.js for server-side rendering and superior SEO performance. The site features a "Track Your Shipment" widget, an interactive global network map, and dynamic service pages. The design utilizes a professional blue and white color palette with subtle animations to guide user attention.',
    detailImages: [
        'https://images.unsplash.com/photo-1494412574643-35d324698427?q=80&w=2053&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'proj_4',
    title: 'Mara Scent Sales Campaign',
    category: 'Graphic Design',
    description: 'High-impact promotional flyer for Mara Scent\'s "Biggest Sales of the Year" event.',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2069&auto=format&fit=crop',
    tags: ['Photoshop', 'Flyer Design', 'Marketing'],
    longDescription: 'Designed a high-conversion promotional flyer for Mara Scent. The design focuses on bold typography and vibrant colors (specifically branding pinks and whites) to attract attention to the sales offer. Included details about discounts, dates, and delivery options in a clear, readable layout to maximize customer engagement.',
    detailImages: ['https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2066&auto=format&fit=crop', 'https://images.unsplash.com/photo-1595867357798-5dfdd8a4d939?q=80&w=2070&auto=format&fit=crop']
  },
  {
    id: 'proj_5',
    title: 'EcoLife Brand Identity',
    category: 'Graphic Design',
    description: 'Complete branding package including logo, color palette, and business cards for an eco-friendly startup.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    tags: ['Illustrator', 'Branding', 'Logo Design'],
    longDescription: 'EcoLife needed a brand identity that communicated sustainability and innovation. I created a minimalist logo combining a leaf and a lightbulb motif. The project deliverables included a comprehensive brand style guide, business card designs, and social media assets, ensuring a consistent visual language across all touchpoints.',
    detailImages: ['https://images.unsplash.com/photo-1600692925375-9b854378565a?q=80&w=1974&auto=format&fit=crop']
  },
  {
    id: 'proj_6',
    title: 'Bigg Manuel Portfolio',
    category: 'Frontend Development',
    description: 'A dynamic personal portfolio and brand website created for Bigg Manuel, featuring a custom design system.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop',
    tags: ['React', 'UI/UX', 'Animation'],
    liveUrl: 'https://www.biggmanuel.netlify.app',
    longDescription: 'Crafted a unique digital identity for Bigg Manuel. This project emphasized visual storytelling and brand consistency. The site features a modern aesthetic, smooth scrolling animations, and a showcase of creative works. It was engineered to be fast, SEO-friendly, and easily maintainable.',
    detailImages: ['https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1974&auto=format&fit=crop']
  },
  {
    id: 'proj_7',
    title: 'Tech Summit 2024',
    category: 'Graphic Design',
    description: 'Event branding and promotional materials for a major technology conference in Calabar.',
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop',
    tags: ['Print Design', 'Event Branding', 'Photoshop'],
    longDescription: 'I developed the visual theme for Tech Summit 2024, creating a cohesive look for banners, ID tags, flyers, and stage backdrops. The design utilizes geometric shapes and a "glitch" effect to convey a sense of cutting-edge technology and digital transformation.',
    detailImages: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop']
  },
  {
    id: 'proj_8',
    title: 'GreenDeck Africa',
    category: 'Frontend Development',
    description: 'A comprehensive web platform focusing on sustainability and environmental solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    tags: ['React', 'Tailwind CSS', 'Responsive Design'],
    liveUrl: 'https://www.greendeckafrica.netlify.app',
    longDescription: 'Designed and developed the official website for GreenDeck Africa. The platform serves as a digital hub for showcasing environmental initiatives. Key features include a responsive layout, interactive project galleries, and an optimized user interface for seamless navigation.',
    detailImages: ['https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop']
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
