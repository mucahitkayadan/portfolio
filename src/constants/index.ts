import type { NavLink } from '../types/portfolio';

export type {
  AboutBullet,
  AwardEntry,
  EducationEntry,
  ExperienceEntry,
  NavLink,
  PortfolioData,
  ProjectEntry,
  ProjectTag,
  SkillCategory,
  TechItem,
} from '../types/portfolio';

export const navLinks: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'education', title: 'Education' },
  { id: 'work', title: 'Work' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
  {
    id: 'blog',
    title: 'Blog',
    isExternal: true,
    path: 'https://blog.mujakayadan.com',
  },
];
