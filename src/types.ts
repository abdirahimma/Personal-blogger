/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

export type CategoryType = 'home' | 'technology' | 'newspaper' | 'sports' | 'culture';

export interface UserAccount {
  email: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  password?: string;
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: CategoryType;
  date: string;
  author: string;
  authorEmail?: string; // Associated account
  authorRole?: string;
  authorAvatar?: string;
  coverImage: string;
  readTime: number; // in minutes
  isFeatured?: boolean;
  likes: number;
  views: number;
  tags?: string[];
  comments: Comment[];
  isBookmarked?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials: {
    twitter?: string;
    github?: string;
    globe?: string;
  };
}
