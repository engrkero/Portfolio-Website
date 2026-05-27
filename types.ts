import React from 'react';

export interface Skill {
  id?: string;
  name: string;
  // FIX: Changed JSX.Element to React.ReactElement to avoid requiring the JSX namespace.
  icon?: React.ReactElement;
  iconName?: string;
  imageUrl?: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Achievement {
    title: string;
    count: string;
    icon: React.ReactElement;
    delay: number;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatarUrl: string;
    date?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  longDescription?: string;
  detailImages?: string[];
}

export interface SiteSettings {
  id?: string;
  favicon?: string;
  logo?: string;
  ceoImage?: string;
  ceoName: string;
  ceoBio?: string;
}

export interface GraphicsJob {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  createdAt: string;
}