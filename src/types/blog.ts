export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: string;
    featured?: boolean;
    published: boolean;
    date: string;
    coverImage?: string;
    readTime: string;
}