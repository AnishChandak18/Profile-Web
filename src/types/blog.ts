export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: number;
  tags: string[];
  url: string;
}