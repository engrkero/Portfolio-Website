
import React from 'react';
import type { Skill, TimelineItem, Achievement, Testimonial, Project } from './types';
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon, InstagramIcon, WhatsappIcon, ReactIcon, FigmaIcon, AdobeSuiteIcon, TailwindCssIcon, UiUxIcon, GraphicDesignIcon, CodeIcon, TypescriptIcon, BrainIcon, UsersIcon, ClockIcon, HeartIcon, SmileIcon, BriefcaseIcon, TrophyIcon, BlockchainIcon, GraduationCapIcon, IdCardIcon, ComputerIcon } from './components/icons';

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
    id: 'pg_adm_2025',
    title: 'College Of Postgraduate Studies | Quick Updates',
    status: 'JUST IN',
    description: '2024/2025 ADMISSION LIST IS OUT!:\nCandidate should click Admission Menu and Select Check Admission Status and input their Form Number to check their Admission Status and Print Admission Letter.',
    urgent: true,
    actionLabel: 'Check Admission Status',
    actionUrl: 'https://unicalonline.edu.ng/admission-status/'
  },
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
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/k-g-s-c', icon: React.createElement(LinkedinIcon) },
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

export const PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'Modern E-Commerce Dashboard',
    category: 'UI/UX Design',
    description: 'A comprehensive dashboard for online retailers with real-time analytics.',
    longDescription: 'This project focused on creating a clean, intuitive interface for e-commerce business owners to track sales, manage inventory, and analyze customer behavior. The design emphasizes data visualization and ease of navigation.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    tags: ['Figma', 'React', 'Tailwind CSS', 'Chart.js'],
    liveUrl: '#',
    repoUrl: 'https://github.com/engrkero',
    detailImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: 'proj_2',
    title: 'Fintech Mobile App',
    category: 'UI/UX Design',
    description: 'Secure and user-friendly mobile application for personal finance management.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    tags: ['Mobile Design', 'Prototyping', 'Figma'],
    liveUrl: '#',
    repoUrl: '#',
    detailImages: []
  },
  {
    id: 'proj_3',
    title: 'Corporate Brand Identity',
    category: 'Graphic Design',
    description: 'Complete branding package including logo, stationery, and brand guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2725&auto=format&fit=crop',
    tags: ['Branding', 'Illustrator', 'Photoshop'],
    repoUrl: '#'
  }
];
