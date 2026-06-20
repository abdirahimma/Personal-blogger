/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Plus, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Image as ImageIcon,
  Check, 
  X,
  UserCheck,
  Bold,
  Italic,
  Underline,
  Heading2,
  List,
  Quote,
  Link as LinkIcon,
  Code
} from 'lucide-react';
import { Post, CategoryType } from '../types';

interface DraftComposerProps {
  onPublish: (newPost: Post) => void;
  onClose: () => void;
  authorDefaultName: string;
  authorDefaultRole: string;
  postToEdit?: Post | null;
  activeUser?: any | null;
}

// Solid curated photo collections for easier cover selection
const PRESET_COVERS = [
  {
    name: "Modern Workstation (Tech)",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Journal & Fountain Pen (Editorial)",
    url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Retro Vinyl Player (Culture)",
    url: "https://images.unsplash.com/photo-1484755560695-a4c748721c85?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Coastal Trail Running (Sports)",
    url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Typewriter & Books (Press)",
    url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80"
  }
];

export default function DraftComposer({ 
  onPublish, 
  onClose,
  authorDefaultName,
  authorDefaultRole,
  postToEdit = null,
  activeUser = null
}: DraftComposerProps) {
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
  const [summary, setSummary] = useState(postToEdit ? postToEdit.summary : '');
  const [category, setCategory] = useState<CategoryType>(postToEdit ? postToEdit.category : 'home');
  const [contentHtmlInput, setContentHtmlInput] = useState(postToEdit ? postToEdit.content : '');
  const [author, setAuthor] = useState(postToEdit ? postToEdit.author : (activeUser ? activeUser.name : authorDefaultName));
  const [authorRole, setAuthorRole] = useState(postToEdit ? (postToEdit.authorRole || '') : (activeUser ? activeUser.role : authorDefaultRole));
  const [coverUrl, setCoverUrl] = useState(postToEdit ? postToEdit.coverImage : PRESET_COVERS[0].url);
  const [customCoverUrl, setCustomCoverUrl] = useState(postToEdit && !PRESET_COVERS.some(p => p.url === postToEdit.coverImage) ? postToEdit.coverImage : '');
  const [readTime, setReadTime] = useState(postToEdit ? postToEdit.readTime : 4);
  const [tagInput, setTagInput] = useState(postToEdit ? (postToEdit.tags || []).join(', ') : '');
  const [previewMode, setPreviewMode] = useState(false);

  // Sync author attributes if activeUser changes of if editing a post
  useEffect(() => {
    if (!postToEdit && activeUser) {
      setAuthor(activeUser.name);
      setAuthorRole(activeUser.role);
    }
  }, [activeUser, postToEdit]);

  // Parse tag strings to array
  const getTags = (): string[] => {
    return tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  // Convert raw textarea value to standard formatted paragraphs safely
  const formContentHtml = (rawText: string) => {
    // If they used raw html tags like <p>, <h2>, etc. do not auto-wrap everything
    if (rawText.includes('<p>') || rawText.includes('<h2>') || rawText.includes('<strong>') || rawText.includes('<blockquote>')) {
      return rawText;
    }
    // Else map double carriage return to paragraph tags
    return rawText
      .split(/\n\n+/)
      .map(para => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
      .join('\n');
  };

  // Helper function to insert Rich Text/Styling Tags at cursor position in text box
  const insertFormat = (tagOpen: string, tagClose: string = '') => {
    const textarea = document.getElementById('article-body-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = tagOpen + (selected || "text") + tagClose;
    const newState = text.substring(0, start) + replacement + text.substring(end);
    setContentHtmlInput(newState);

    // Re-focus and restore position nicely
    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + tagOpen.length;
      const selectionEnd = start + tagOpen.length + (selected || "text").length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 50);
  };

  const handlePublishClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !contentHtmlInput.trim()) {
      alert("Please fill out the Title, Summary, and Article Body before publishing.");
      return;
    }

    const compiledPost: Post = {
      id: postToEdit ? postToEdit.id : `custom-post-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      content: formContentHtml(contentHtmlInput),
      category: category,
      date: postToEdit ? postToEdit.date : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: author.trim() || "Independent Contributor",
      authorEmail: postToEdit ? postToEdit.authorEmail : (activeUser ? activeUser.email : 'alara@chronicle.com'),
      authorRole: authorRole.trim() || "Creative Writer",
      authorAvatar: postToEdit ? postToEdit.authorAvatar : (activeUser ? activeUser.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"),
      coverImage: customCoverUrl.trim() || coverUrl,
      readTime: Number(readTime) || 3,
      likes: postToEdit ? postToEdit.likes : 0,
      views: postToEdit ? postToEdit.views : 0,
      tags: getTags(),
      comments: postToEdit ? postToEdit.comments : []
    };

    onPublish(compiledPost);
  };

  return (
    <div id="draft-composer-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Studio Header */}
      <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4 mb-8">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span>Journal Studio</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Write, review, customize details, and append your story to your personal timeline instantly.
          </p>
        </div>

        <button
          id="close-composer-btn"
          onClick={onClose}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          title="Back to portal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Toggles */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setPreviewMode(false)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border cursor-pointer transition-colors ${
            !previewMode 
              ? 'bg-accent text-zinc-950 border-accent font-bold' 
              : 'bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border-zinc-250 dark:border-zinc-800'
          }`}
        >
          Editor Form
        </button>
        <button
          type="button"
          onClick={() => setPreviewMode(true)}
          disabled={!title.trim() && !contentHtmlInput.trim()}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border cursor-pointer transition-colors ${
            previewMode 
              ? 'bg-accent text-zinc-950 border-accent font-bold' 
              : 'bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border-zinc-250 dark:border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          title={(!title.trim() && !contentHtmlInput.trim()) ? "Fill title + body to preview" : ""}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Split Preview</span>
        </button>
      </div>

      {previewMode ? (
        /* Dynamic Live Preview Panel */
        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-zinc-50/20 dark:bg-zinc-950/40 relative">
          <div className="absolute top-4 right-4 bg-zinc-900/10 dark:bg-white/10 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest pointer-events-none">
            Live Interactive Rendering
          </div>

          <div id="draft-live-preview-box" className="prose max-w-none pt-6 font-serif">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest font-bold uppercase bg-accent/10 border border-accent/20 text-accent">
              {category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mt-3 mb-4">
              {title || "Untitled Masterpiece"}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mb-6 italic">
              {summary || "Enter a summary to preview its placement here..."}
            </p>

            {/* Simulated cover image */}
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-8">
              <img
                src={customCoverUrl.trim() || coverUrl}
                alt="Story Cover preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author bar info */}
            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-400 flex items-center justify-center font-bold">
                {author.substring(0, 2).toUpperCase() || "ME"}
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{author}</p>
                <p className="text-[10px] text-zinc-400 font-mono">{authorRole}</p>
              </div>
              <div className="ml-auto text-[10px] font-mono text-zinc-400">
                {readTime} mins read estimate
              </div>
            </div>

            {/* Render formatted html block */}
            <div 
              className="blog-content font-serif text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: formContentHtml(contentHtmlInput) || "Write some rich article body content back in editor form to see it rendered seamlessly here..." }}
            />

            {/* Render tags */}
            {getTags().length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-zinc-50 dark:border-zinc-850">
                {getTags().map(tag => (
                  <span key={tag} className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded text-xs font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Actual Editor Input Form */
        <form onSubmit={handlePublishClick} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Left Input panel */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Title field */}
            <div className="space-y-1.5">
              <label htmlFor="article-title" className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Article Title
              </label>
              <input
                id="article-title"
                type="text"
                placeholder="The Emergence of Cybernetic Ink Systems"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-serif text-lg sm:text-xl font-bold"
              />
            </div>

            {/* Summary Excerpt */}
            <div className="space-y-1.5">
              <label htmlFor="article-summary" className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Article Summary & Excerpt
              </label>
              <textarea
                id="article-summary"
                placeholder="A high-level sentence summarizing your piece to capture the reader's immediate focus inside the news dashboard feed."
                required
                rows={2}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-sans text-sm resize-none"
              />
            </div>

            {/* Curated Background Cover selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Choose Cover Image</span>
              </label>

              {/* Grid of presets */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PRESET_COVERS.map((preset) => {
                  const active = coverUrl === preset.url && !customCoverUrl;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setCoverUrl(preset.url);
                        setCustomCoverUrl(''); // override custom
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden bg-zinc-150 border-2 cursor-pointer group transition-all text-left ${
                        active 
                          ? 'border-accent scale-102 ring-2 ring-accent/25'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:scale-101'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[8px] font-mono text-white truncate text-center">
                        {preset.name.split(' (')[0]}
                      </div>
                      {active && (
                        <div className="absolute top-1 right-1 bg-accent rounded-full p-0.5 text-zinc-950">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Cover override url input */}
              <div className="relative">
                <input
                  id="custom-cover-url"
                  type="url"
                  placeholder="Paste any custom Unsplash URL to override..."
                  value={customCoverUrl}
                  onChange={e => setCustomCoverUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
                {customCoverUrl.trim() && (
                  <span className="absolute right-3.5 top-2.5 text-[9px] font-mono font-bold text-emerald-500 flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Custom active
                  </span>
                )}
              </div>
            </div>

            {/* Main Article Prose Writer Area */}
            <div className="space-y-1.5 animate-in fade-in-50 duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="article-body-textarea" className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                  Article Body Text
                </label>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                  Separate paragraphs using <strong>double enter key</strong>
                </div>
              </div>
              
              {/* Rich Text Editor Formatting Bar */}
              <div id="rich-text-editor-toolbar" className="flex flex-wrap gap-1 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-inner">
                <button
                  type="button"
                  title="Bold (<strong>)"
                  onClick={() => insertFormat('<strong>', '</strong>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1 font-bold"
                >
                  <Bold className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Bold</span>
                </button>
                <button
                  type="button"
                  title="Italic (<em>)"
                  onClick={() => insertFormat('<em>', '</em>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1 italic"
                >
                  <Italic className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Italic</span>
                </button>
                <button
                  type="button"
                  title="Underline (<u>)"
                  onClick={() => insertFormat('<u>', '</u>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1 underline"
                >
                  <Underline className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Underline</span>
                </button>
                <button
                  type="button"
                  title="Heading 2 (<h2>)"
                  onClick={() => insertFormat('<h2>', '</h2>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Heading2 className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Heading</span>
                </button>
                <button
                  type="button"
                  title="Quote (<blockquote>)"
                  onClick={() => insertFormat('<blockquote>\n  ', '\n</blockquote>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Quote className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Quote</span>
                </button>
                <button
                  type="button"
                  title="List (<ul>)"
                  onClick={() => insertFormat('<ul>\n  <li>', '</li>\n  <li></li>\n</ul>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <List className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">List</span>
                </button>
                <button
                  type="button"
                  title="Author Link (<a>)"
                  onClick={() => insertFormat('<a href="#" class="text-accent underline">', '</a>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Hyperlink</span>
                </button>
                <button
                  type="button"
                  title="Code Box (<pre><code>)"
                  onClick={() => insertFormat('<pre><code class="font-mono text-xs text-zinc-550 border rounded p-2 bg-zinc-50 dark:bg-zinc-900 block my-2">', '</code></pre>')}
                  className="p-1 px-2.5 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent text-zinc-850 dark:text-zinc-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Code className="w-3 h-3" />
                  <span className="sr-only sm:not-sr-only text-[10px]">Code</span>
                </button>
              </div>

              <textarea
                id="article-body-textarea"
                placeholder="Write your article copy here... Select text and tap the formatting buttons above to auto-wrap elements, or type raw HTML if desired!"
                required
                rows={14}
                value={contentHtmlInput}
                onChange={e => setContentHtmlInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-401 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-serif text-base leading-relaxed"
              />
            </div>

          </div>

          {/* Configuration Right Sidebar panels */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Category selection */}
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-4 space-y-3">
              <label className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Publish Category
              </label>
              
              <div className="space-y-1.5">
                {(['home', 'technology', 'newspaper', 'sports', 'culture'] as CategoryType[]).map((cat) => {
                  const active = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border capitalize cursor-pointer transition-all ${
                        active
                          ? 'bg-accent text-zinc-950 border-accent font-bold shadow-xs'
                          : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span>{cat}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author details card */}
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-zinc-400" />
                <label className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                  Author Signature
                </label>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">Author Name</span>
                  <input
                    id="author-name"
                    type="text"
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">Contributor Role</span>
                  <input
                    id="author-role"
                    type="text"
                    value={authorRole}
                    onChange={e => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            {/* Estimate read speed & tags tag input */}
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-4 space-y-5">
              
              {/* Average read time slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                  <span>Reading Speed</span>
                  <span className="text-accent text-xs font-bold">{readTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <input
                    id="read-time-slider"
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={readTime}
                    onChange={e => setReadTime(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              {/* Comma-separated tag strings */}
              <div className="space-y-2">
                <label htmlFor="tag-input" className="block text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                  Tags (Comma separated)
                </label>
                <input
                  id="tag-input"
                  type="text"
                  placeholder="Design, Ambient, Hardware, 2026"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
                />
                <p className="text-[10px] text-zinc-400">
                  Separate using simple commas (e.g., Apple, Silicon)
                </p>
              </div>

            </div>

            {/* Complete Release Publication button */}
            <button
              id="publish-draft-btn"
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-zinc-950 px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Publish To Timeline</span>
            </button>

          </div>

        </form>
      )}

    </div>
  );
}
