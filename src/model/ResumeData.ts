export interface WorkExperience {
  title: string;
  company: string;
  timeSpan: string;
  location: string;
  workItems: string[];
}

export interface Education {
  degree: string;
  institution: string;
  timeSpan: string;
  location: string;
  gpa: string;
  items?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  github: string;
  margin: number;
  leftColumn: string;
  rightColumn: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  achievements: Achievement[];
  projects: Project[];
  projectNoPrintBorderIdx: number[];
}
