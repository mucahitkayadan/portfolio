import type { YarbaPortfolioContent } from '../types/yarbaPortfolio';

export const mockYarbaPortfolioContent: YarbaPortfolioContent = {
  personal: {
    full_name: 'Muja Kayadan',
    email: 'mujakayadan@outlook.com',
    phone: '(641) 233-9607',
    linkedin: 'https://www.linkedin.com/in/muja-kayadan/',
    github: 'https://github.com/mucahitkayadan',
    website: 'https://mujakayadan.com',
    profile_picture_url: null,
  },
  career_summary: {
    job_titles: ['Software Engineer', 'Machine Learning Engineer'],
    default_job_title: 'Software Engineer',
    default_summary:
      "I'm a Software Engineer with experience in software development, machine learning, and computer vision.",
    years_of_experience: '4+',
  },
  life_story: null,
  work_experience: [
    {
      job_title: 'AI/ML Engineer',
      company: 'Tesla Inc.',
      location: 'Palo Alto, CA',
      time: 'Aug 2025 - Present',
      responsibilities: ['Building perception systems for in-cabin driver monitoring.'],
    },
  ],
  education: [
    {
      degree_type: "Master's Degree in",
      degree: 'Computer Science',
      university_name: 'Maharishi International University',
      time: '2023 - 2025',
      location: 'Iowa, USA',
      gpa: '3.83',
      transcript: ['Machine Learning', 'Cloud Computing'],
    },
  ],
  skills: [
    {
      category: 'programming_languages',
      skills: ['Python', 'Java', 'C++'],
    },
  ],
  projects: [
    {
      name: 'Yet Another Resume Builder App (YARBA)',
      bullet_points: ['FastAPI backend with MongoDB and React frontend.'],
      date: '2024',
      link: 'https://www.yarba.app/',
    },
  ],
  awards: [
    {
      name: 'Chess Championship',
      explanation: 'Regional chess championship winner.',
    },
  ],
  publications: [],
};
