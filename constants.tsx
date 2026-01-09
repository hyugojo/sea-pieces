
import React from 'react';
import { Project, SocialLink, UserProfile } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "SEA PIECE",
  bio: "Master of the Seven Digital Seas. Crafting codes and plundering bugs since the dawn of time.",
  avatar: "https://picsum.photos/seed/sea-piece/200/200"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "The Golden Script",
    description: "A legendary artifact that automates the most treacherous tasks.",
    url: "https://github.com",
    category: "Artifacts",
    icon: "📜"
  },
  {
    id: "2",
    title: "Blackbeard's UI",
    description: "A dark theme so powerful it keeps the kraken at bay.",
    url: "https://github.com",
    category: "Armor",
    icon: "🏴‍☠️"
  }
];

export const INITIAL_SOCIALS: SocialLink[] = [
  { id: "s1", platform: "GitHub", url: "https://github.com", icon: "🐙" },
  { id: "s2", platform: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
  { id: "s3", platform: "Twitter", url: "https://twitter.com", icon: "🐦" }
];

export const ICONS = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2001/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2001/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  Compass: () => (
    <svg xmlns="http://www.w3.org/2001/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  ),
  Anchor: () => (
    <svg xmlns="http://www.w3.org/2001/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5V2m0 11V7m0 6a3 3 0 01-3 3 3 3 0 01-3-3m6 0a3 3 0 003 3 3 3 0 003-3m-6 3v2a3 3 0 01-3 3H5m14-3a3 3 0 01-3 3h-4" />
    </svg>
  ),
  Magic: () => (
    <svg xmlns="http://www.w3.org/2001/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4V2m0 12v-2m0 8v-2M8 8V6M8 21v-2m12-5h-2M4 14H2" />
    </svg>
  )
};
