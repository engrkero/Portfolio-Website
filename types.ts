import React from 'react';

export interface Skill {
  name: string;
  // FIX: Changed JSX.Element to React.ReactElement to avoid requiring the JSX namespace.
  icon?: React.ReactElement;
}

export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Project {
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