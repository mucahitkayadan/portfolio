import {
  DEFAULT_PROFILE_PICTURE,
  getAwardIcon,
  getCompanyIcon,
  getProjectImage,
  getProjectTags,
  getSkillMeta,
  slugifyCategory,
} from '../config/assetMap';
import type { AboutBullet, PortfolioData } from '../types/portfolio';
import type { YarbaPortfolioContent } from '../types/yarbaPortfolio';

const ABOUT_EMOJIS = ['👨‍💻', '🎓', '🛠', '🔧', '💡', '📚', '🚀', '🌍'];

const splitSummary = (summary: string): string[] =>
  summary
    .split(/\n+|(?<=[.!?])\s+/)
    .map(part => part.trim())
    .filter(Boolean);

const buildAboutBullets = (content: YarbaPortfolioContent): AboutBullet[] => {
  const bullets: AboutBullet[] = [];
  const summaryParts = splitSummary(content.career_summary.default_summary);
  const lifeStoryParts = content.life_story ? splitSummary(content.life_story) : [];

  [...summaryParts, ...lifeStoryParts].forEach((text, index) => {
    bullets.push({
      emoji: ABOUT_EMOJIS[index % ABOUT_EMOJIS.length],
      text,
    });
  });

  content.publications.forEach((publication, index) => {
    bullets.push({
      emoji: ABOUT_EMOJIS[(bullets.length + index) % ABOUT_EMOJIS.length],
      text: `Published research on "${publication.name}"${publication.time ? ` (${publication.time})` : ''}.`,
      link: publication.link
        ? { href: publication.link, label: publication.publisher || 'View publication' }
        : undefined,
    });
  });

  return bullets;
};

const firstName = (fullName: string | null | undefined): string => {
  if (!fullName?.trim()) {
    return 'there';
  }
  return fullName.trim().split(/\s+/)[0] ?? fullName;
};

export const mapYarbaPortfolio = (content: YarbaPortfolioContent): PortfolioData => {
  const fullName = content.personal.full_name?.trim() || 'Portfolio';
  const typedItems =
    content.career_summary.job_titles.length > 0
      ? content.career_summary.job_titles
      : content.career_summary.default_job_title
        ? [content.career_summary.default_job_title]
        : ['Professional'];

  return {
    displayName: firstName(content.personal.full_name),
    fullName,
    typedItems,
    profilePictureUrl: content.personal.profile_picture_url || DEFAULT_PROFILE_PICTURE,
    linkedin: content.personal.linkedin,
    github: content.personal.github,
    phone: content.personal.phone,
    aboutBullets: buildAboutBullets(content),
    education: content.education.map(edu => {
      const title = [edu.degree_type, edu.degree].filter(Boolean).join(' ').trim() || 'Education';
      return {
        title,
        company_name: edu.university_name,
        icon: getCompanyIcon(edu.university_name),
        iconBg: '#fff',
        date: edu.time,
        location: edu.location,
        description: title,
        gpa: edu.gpa,
        points: edu.transcript,
      };
    }),
    experiences: content.work_experience.map(exp => ({
      title: exp.job_title,
      company_name: exp.company,
      icon: getCompanyIcon(exp.company),
      iconBg: '#fff',
      iconInset: normalizeCompany(exp.company),
      date: exp.time,
      location: exp.location,
      description: exp.responsibilities[0] ?? '',
      points: exp.responsibilities,
    })),
    skillCategories: content.skills.map(category => ({
      key: slugifyCategory(category.category || 'skills'),
      label: category.category || 'Skills',
      items: category.skills.map(skill => {
        const meta = getSkillMeta(skill);
        return {
          name: skill,
          icon: meta.icon,
          url: meta.url,
        };
      }),
    })),
    projects: content.projects.map(project => ({
      name: project.name,
      description: project.bullet_points.join(' '),
      tags: getProjectTags(project.name, project.bullet_points),
      image: getProjectImage(project.name),
      live_project_link: project.link ?? undefined,
      source_code_link: project.link ?? undefined,
    })),
    awards: content.awards.map(award => ({
      title: award.name,
      type: 'Award',
      icon: getAwardIcon(award.name),
      iconBg: '#fff',
      date: '',
      description: award.explanation,
    })),
  };
};

const normalizeCompany = (company: string): boolean => {
  const key = company.toLowerCase();
  return key.includes('virac') || key.includes('radio-astronomy');
};
