export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;

  keywords?: string | null;

  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date | null;

  coverImage?: string | null;

  views: number;

  createdAt: Date;
  updatedAt: Date;

  category: {
    id: string;
    name: string;
    slug: string;
  };
}
