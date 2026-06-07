export interface YarbaPersonalInfo {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  website: string | null;
  profile_picture_url: string | null;
}

export interface YarbaCareerSummary {
  job_titles: string[];
  default_job_title: string;
  default_summary: string;
  years_of_experience: string;
}

export interface YarbaWorkExperience {
  job_title: string;
  company: string;
  location: string;
  time: string;
  responsibilities: string[];
}

export interface YarbaEducation {
  degree_type: string;
  degree: string;
  university_name: string;
  time: string;
  location: string;
  gpa: string;
  transcript: string[];
}

export interface YarbaSkillCategory {
  category: string;
  skills: string[];
}

export interface YarbaProject {
  name: string;
  bullet_points: string[];
  date: string;
  link: string | null;
}

export interface YarbaAward {
  name: string;
  explanation: string;
}

export interface YarbaPublication {
  name: string;
  publisher: string;
  link: string;
  time: string;
}

export interface YarbaPortfolioContent {
  personal: YarbaPersonalInfo;
  career_summary: YarbaCareerSummary;
  life_story: string | null;
  work_experience: YarbaWorkExperience[];
  education: YarbaEducation[];
  skills: YarbaSkillCategory[];
  projects: YarbaProject[];
  awards: YarbaAward[];
  publications: YarbaPublication[];
}
