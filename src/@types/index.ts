export interface Trail {
  title: string;
  slug: string;
  postsCount: number;
  lines: Line[];
}

export interface Line {
  id: string;
  title: string;
  slug: string;
  color?: string;
  firstPostSlug?: string;
  trail: Trail;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  order: number;
  coverImage: string;
  author: string;
  date: string;
  tags: string;
  line: Line;
  createdAt: string;
  updatedAt?: string;
}

export interface TrailSummary {
  id: string;
  title: string;
  lines: {
    title: string;
    slug: string;
    firstPostSlug?: string;
  }[];
  slug: string;
  linesCount: number;
  postsCount: number;
}
