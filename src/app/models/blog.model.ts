export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  thumbnail: string;
  content: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  readTime: number;
  views: number;
  likes: number;
  comments: Comment[];
  status: 'draft' | 'published';
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  email: string;
  text: string;
  createdAt: string;
}

export interface CommentData {
  author: string;
  email: string;
  text: string;
}
