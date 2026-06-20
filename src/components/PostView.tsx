/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ThumbsUp, 
  Calendar, 
  Clock, 
  Share2, 
  MessageSquare,
  Send,
  Check,
  Tag,
  Edit
} from 'lucide-react';
import { Post, Comment } from '../types';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  onBookmarkToggle: (id: string) => void;
  onLikeToggle: (id: string) => void;
  onAddComment: (postId: string, comment: Omit<Comment, 'id' | 'date'>) => void;
  onEdit?: (id: string) => void;
  activeUser?: any | null;
}

export default function PostView({ 
  post, 
  onBack, 
  onBookmarkToggle, 
  onLikeToggle,
  onAddComment,
  onEdit,
  activeUser
}: PostViewProps) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const canEdit = activeUser && (post.authorEmail === activeUser.email || post.author === activeUser.name);

  // Handle comment submit
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) return;

    onAddComment(post.id, {
      author: commentAuthor.trim(),
      content: commentContent.trim()
    });

    setCommentContent('');
    // Optionally leave author name filled in for convenience
  };

  // Handle share click
  const handleShare = () => {
    const fakeUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <article id="article-reader-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Article Navigation Header */}
      <div className="flex items-center justify-between gap-4 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <button
          id="reader-back-btn"
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-accent transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Articles</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Edit Article */}
          {canEdit && (
            <button
              id="reader-edit-article-btn"
              onClick={() => onEdit && onEdit(post.id)}
              className="p-2 px-3 rounded-lg border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-zinc-950 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Edit article details and content"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Article</span>
            </button>
          )}

          {/* Share Article */}
          <button
            id="reader-share-btn"
            onClick={handleShare}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              copiedLink 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
            }`}
            title="Copy reference article link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
          </button>

          {/* Bookmark Button */}
          <button
            id="reader-bookmark-btn"
            onClick={() => onBookmarkToggle(post.id)}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              post.isBookmarked
                ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-650 dark:text-red-400'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
            }`}
            title="Bookmark article"
          >
            <Heart className={`w-4 h-4 ${post.isBookmarked ? 'fill-current text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Category Badge */}
      <div className="text-center space-y-4 mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest font-bold uppercase bg-accent/10 border border-accent/20 text-accent">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight max-w-3xl mx-auto">
          {post.title}
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {post.summary}
        </p>
      </div>

      {/* Featured Cover Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-video max-h-[480px] w-full mb-10 shadow-md">
        <img
          id="reader-cover-image"
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Author and Reading Meta block */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-10">
        <div className="flex items-center gap-3">
          {post.authorAvatar && (
            <img
              src={post.authorAvatar}
              alt={post.author}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-accent/20"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{post.author}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">{post.authorRole || "Contributor"}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} mins read
          </span>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <span className="text-accent">{post.views + 1} views</span>
        </div>
      </div>

      {/* Structured Content Column */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <div 
          id="reader-html-content"
          className="font-serif text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-6 blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>

      {/* Tags Panel */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-10 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="flex items-center gap-1 text-xs font-mono text-zinc-400 dark:text-zinc-500 mr-2">
            <Tag className="w-3 h-3" /> Tags:
          </span>
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="bg-zinc-50 dark:bg-zinc-900/60 text-zinc-650 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2.5 py-0.5 rounded text-xs font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Appreciate story section */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl p-5 mb-12 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Enjoyed reading this story?
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Send dynamic appreciation points to the author!
          </p>
        </div>

        <button
          id="reader-like-btn"
          onClick={() => onLikeToggle(post.id)}
          className="cursor-pointer flex items-center gap-2 bg-accent hover:bg-accent-hover text-zinc-950 px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-xs"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Appreciate ({post.likes})</span>
        </button>
      </div>

      {/* Comments Section */}
      <div id="reader-comments-section" className="space-y-8 border-t border-zinc-100 dark:border-zinc-800 pt-8">
        
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" />
            <span>Comments ({post.comments.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-400">Interactive Forum</span>
        </div>

        {/* Comment input form */}
        <form onSubmit={handleSubmitComment} className="space-y-4 bg-white dark:bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-150 dark:border-zinc-800/80">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-sans">
            Add your perspective or ask a question
          </p>

          <div className="grid grid-cols-1 gap-3">
            <input
              id="comment-author-input"
              type="text"
              placeholder="Your name"
              required
              value={commentAuthor}
              onChange={e => setCommentAuthor(e.target.value)}
              className="px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-sans"
            />
            
            <textarea
              id="comment-message-input"
              placeholder="Join the discussion... Be respectful and constructive."
              required
              rows={3}
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              className="px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-sans resize-y"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              id="submit-comment-btn"
              type="submit"
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Submit Comment</span>
            </button>
          </div>
        </form>

        {/* Comment lists */}
        {post.comments.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              No comments shared yet. Be the first to start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {post.comments.map(c => (
              <div 
                key={c.id} 
                className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex gap-3 animate-in fade-in-40 duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-sm font-bold text-accent">
                    {c.author.substring(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250 font-sans">
                      {c.author}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {c.date}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans whitespace-pre-wrap">
                    {c.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </article>
  );
}
