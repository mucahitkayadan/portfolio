export interface NavLink {
  id: string;
  title: string;
  isExternal?: boolean;
  path?: string;
}

export interface AboutBullet {
  emoji: string;
  text: string;
  link?: { href: string; label: string };
}

export interface EducationEntry {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  location: string;
  description: string;
  gpa: string;
  points: string[];
}

export interface ExperienceEntry {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  iconInset?: boolean;
  date: string;
  location: string;
  description: string;
  points: string[];
}

export interface AwardEntry {
  title: string;
  type: string;
  icon: string;
  iconBg: string;
  date: string;
  description: string;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link?: string;
  live_project_link?: string;
}

export interface TechItem {
  name: string;
  icon: string;
  url: string;
}

export interface SkillCategory {
  key: string;
  label: string;
  items: TechItem[];
}

export interface PortfolioData {
  displayName: string;
  fullName: string;
  typedItems: string[];
  profilePictureUrl: string;
  linkedin: string | null;
  github: string | null;
  phone: string | null;
  aboutBullets: AboutBullet[];
  education: EducationEntry[];
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  awards: AwardEntry[];
}
