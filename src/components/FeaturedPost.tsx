/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, ArrowUpRight, MessageSquare, Flame } from 'lucide-react';
import { Post } from '../types';

interface FeaturedPostProps {
  post: Post;
  onClick: (id: string) => void;
}

export default function FeaturedPost({ post, onClick }: FeaturedPostProps) {
  return (
    <article 
      id={`featured-card-${post.id}`}
      className="group relative overflow-hidden rounded-2xl border border-zinc-150 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/40 p-4 sm:p-6 lg:p-8 transition-all hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-xl hover:-translate-y-0.5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        {/* Cover Image with Zoom Effect */}
        <div className="lg:col-span-7 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 aspect-video lg:aspect-[16/10] relative">
          <img
            id={`featured-img-${post.id}`}
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-accent text-zinc-950 rounded-full text-[10px] font-semibold tracking-wider uppercase shadow-md font-sans">
            <Flame className="w-3 h-3 animate-pulse" />
            <span>Featured story</span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white rounded-md text-[10px] font-mono">
            <Clock className="w-3 h-3 text-accent" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Story Metadata & Content */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="space-y-3">
            
            {/* Meta Pill */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold bg-accent/10 border border-accent/20 text-accent">
                {post.category}
              </span>
              <span className="text-zinc-300 dark:text-zinc-750">•</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {post.date}
              </span>
            </div>

            {/* Title */}
            <button
              onClick={() => onClick(post.id)}
              className="text-left block cursor-pointer hover:text-accent focus:text-accent transition-colors"
            >
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                {post.title}
              </h1>
            </button>

            {/* Summary */}
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              {post.summary}
            </p>
          </div>

          {/* Author info & Read link */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-3">
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-50 dark:ring-zinc-900"
                />
              )}
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {post.author}
                </p>
                {post.authorRole && (
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                    {post.authorRole}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onClick(post.id)}
              className="group/btn flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              <span>Read Story</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-accent" />
            </button>
          </div>

          {/* Stat Footer */}
          <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500 text-[11px] font-mono">
            <span>{post.views} views</span>
            <span>•</span>
            <span>{post.likes} appreciation counts</span>
            {post.comments.length > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-accent">
                  <MessageSquare className="w-3 h-3" />
                  {post.comments.length}
                </span>
              </>
            )}
          </div>

        </div>

      </div>
    </article>
  );
}
