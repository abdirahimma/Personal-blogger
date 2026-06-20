/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Clock, ArrowRight, MessageSquare, ThumbsUp } from 'lucide-react';
import { Post, CategoryType } from '../types';

interface PostCardProps {
  key?: string | number;
  post: Post;
  onClick: (id: string) => void;
  onBookmarkToggle: (id: string, e?: React.MouseEvent) => void;
  onLikeToggle?: (id: string, e?: React.MouseEvent) => void;
}

export default function PostCard({ post, onClick, onBookmarkToggle, onLikeToggle }: PostCardProps) {
  
  // Custom theme accents for categories (editorial sophisitcated palette)
  const getCategoryTheme = (cat: CategoryType) => {
    switch (cat) {
      case 'technology':
        return {
          bg: 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300',
          border: 'border-zinc-200 dark:border-zinc-800'
        };
      case 'newspaper':
        return {
          bg: 'bg-accent/10 border border-accent/20 text-accent',
          border: 'border-accent/20'
        };
      case 'sports':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-900/30'
        };
      case 'culture':
        return {
          bg: 'bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-zinc-300',
          border: 'border-stone-200 dark:border-stone-800'
        };
      default:
        return {
          bg: 'bg-zinc-150 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800',
          border: 'border-zinc-250 dark:border-zinc-850'
        };
    }
  };

  const theme = getCategoryTheme(post.category);

  return (
    <div 
      id={`postcard-${post.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:-translate-y-0.5 h-full"
    >
      <div>
        
        {/* Cover Preview */}
        <div 
          onClick={() => onClick(post.id)}
          className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
        >
          <img
            id={`postcard-img-${post.id}`}
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
          
          {/* Fast overlay indicators */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-zinc-100">
            <Clock className="w-3 h-3 text-zinc-300" />
            <span>{post.readTime} min read</span>
          </div>

          {/* Bookmark Trigger Over Lay */}
          <button
            id={`bookmark-btn-${post.id}`}
            onClick={(e) => onBookmarkToggle(post.id, e)}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md cursor-pointer transition-all hover:scale-108 active:scale-95 shadow-sm ${
              post.isBookmarked
                ? 'bg-red-500 text-white'
                : 'bg-black/45 text-white/90 hover:bg-black/75'
            }`}
            title={post.isBookmarked ? "Remove Bookmark" : "Bookmark Article"}
          >
            <Heart className={`w-3.5 h-3.5 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Metadata */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase ${theme.bg}`}>
              {post.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onClick(post.id)}
            className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent dark:group-hover:text-accent transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {post.title}
          </h3>

          {/* Summary Excerpt */}
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed font-sans">
            {post.summary}
          </p>

        </div>
      </div>

      {/* Footer statistics and author details */}
      <div className="p-4 sm:p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto">
        <div className="flex items-center justify-between gap-2 pt-3">
          
          <div className="flex items-center gap-2">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={post.author}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
              {post.author}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Liked Toggler */}
            {onLikeToggle && (
              <button
                id={`like-btn-${post.id}`}
                onClick={(e) => onLikeToggle(post.id, e)}
                className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-accent dark:text-zinc-500 transition-colors cursor-pointer"
                title="Appreciate post"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{post.likes}</span>
              </button>
            )}

            {post.comments.length > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                <MessageSquare className="w-3 h-3" />
                {post.comments.length}
              </span>
            )}

            <button
              id={`read-story-btn-${post.id}`}
              onClick={() => onClick(post.id)}
              className="p-1 text-zinc-400 dark:text-zinc-500 group-hover:text-accent dark:group-hover:text-accent transition-colors"
              title="Read full article"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
