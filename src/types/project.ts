export interface Project {
  title: string;
  description: string;
  screenshots: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  category: 'frontend' | 'web3';
}
