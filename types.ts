
export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
}
