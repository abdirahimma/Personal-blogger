/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_POSTS, 
  DEFAULT_PROFILE 
} from './data/defaultPosts';
import { Post, CategoryType, UserProfile, Comment, UserAccount } from './types';
import Navbar from './components/Navbar';
import FeaturedPost from './components/FeaturedPost';
import PostCard from './components/PostCard';
import PostView from './components/PostView';
import DraftComposer from './components/DraftComposer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import { 
  User, 
  Heart, 
  BookOpen, 
  Settings, 
  Instagram, 
  Twitter, 
  Github, 
  Terminal,
  Grid,
  Info,
  Edit2,
  BookmarkCheck,
  Award
} from 'lucide-react';

export default function App() {
  // --- STATE ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all' | 'about' | 'contact' | 'dashboard'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isDraftPanelOpen, setIsDraftPanelOpen] = useState(false);
  const [showingBookmarks, setShowingBookmarks] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // Authentication & Editing States
  const [activeUser, setActiveUser] = useState<UserAccount | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  // Profile forms
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editBio, setEditBio] = useState('');

  // --- INITIAL LOAD & LOCALSTORAGE SYNCING ---
  useEffect(() => {
    // Load logged in user
    const savedUser = localStorage.getItem('current_logged_in_user');
    if (savedUser) {
      try {
        setActiveUser(JSON.parse(savedUser));
      } catch (e) {
        setActiveUser(null);
      }
    }

    // Load registered users list
    const savedUsers = localStorage.getItem('registered_blog_users');
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (e) {
        setRegisteredUsers([]);
      }
    }

    // Determine light/dark preference
    const savedTheme = localStorage.getItem('blogger_dark_mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme !== null ? savedTheme === 'true' : systemPrefersDark;
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load custom profile
    const savedProfile = localStorage.getItem('blogger_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setEditName(parsed.name);
        setEditRole(parsed.role);
        setEditBio(parsed.bio);
      } catch (e) {
        // Fallback to default
        setProfile(DEFAULT_PROFILE);
        setEditName(DEFAULT_PROFILE.name);
        setEditRole(DEFAULT_PROFILE.role);
        setEditBio(DEFAULT_PROFILE.bio);
      }
    } else {
      setEditName(DEFAULT_PROFILE.name);
      setEditRole(DEFAULT_PROFILE.role);
      setEditBio(DEFAULT_PROFILE.bio);
    }

    // Load articles list
    const savedPosts = localStorage.getItem('personal_blogger_posts');
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts) as Post[];
        // Sanitize to make sure they have a comments array
        const sanitized = parsed.map(p => ({
          ...p,
          comments: p.comments || []
        }));
        setPosts(sanitized);
      } catch (e) {
        setPosts(DEFAULT_POSTS);
      }
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem('personal_blogger_posts', JSON.stringify(DEFAULT_POSTS));
    }
  }, []);

  // --- HELPER WRITER/SYNC STATE TO LOCAL STORAGE ---
  const savePostsCollection = (updated: Post[]) => {
    setPosts(updated);
    localStorage.setItem('personal_blogger_posts', JSON.stringify(updated));
  };

  // --- ACTIONS ---
  const handleToggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem('blogger_dark_mode', String(nextMode));
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle Bookmarks Toggle on Cards
  const handleBookmarkToggle = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updated = posts.map(post => {
      if (post.id === id) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    });
    savePostsCollection(updated);
  };

  // Handle Article Likes/Appreciation
  const handleLikeToggle = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updated = posts.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    savePostsCollection(updated);
  };

  // Add Comment interaction
  const handleAddComment = (postId: string, commentDetails: Omit<Comment, 'id' | 'date'>) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: commentDetails.author,
      content: commentDetails.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...(post.comments || [])]
        };
      }
      return post;
    });
    savePostsCollection(updated);
  };

  // Create or update article draft and save to list
  const handlePublishNewPost = (editedOrNewPost: Post) => {
    let updated: Post[];
    if (postToEdit) {
      updated = posts.map(p => p.id === editedOrNewPost.id ? editedOrNewPost : p);
    } else {
      updated = [editedOrNewPost, ...posts];
    }
    savePostsCollection(updated);
    setIsDraftPanelOpen(false); // Close drafting mode
    setPostToEdit(null); // Clear editing states
    setActiveCategory(editedOrNewPost.category);
    setShowingBookmarks(false);
    setSelectedPostId(editedOrNewPost.id); // Read it immediately!
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setActiveUser(user);
    localStorage.setItem('current_logged_in_user', JSON.stringify(user));
    // Load registered users list
    const savedUsers = localStorage.getItem('registered_blog_users');
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (e) {
        setRegisteredUsers([]);
      }
    }
    // Automatically route the newly logged in user to the main all-feed
    setActiveCategory('all');
  };

  const handleLogout = () => {
    setActiveUser(null);
    localStorage.removeItem('current_logged_in_user');
    setIsDraftPanelOpen(false);
    setPostToEdit(null);
    setSelectedPostId(null);
  };

  const handleEditPostRequest = (postId: string) => {
    const target = posts.find(p => p.id === postId);
    if (target) {
      setPostToEdit(target);
      setIsDraftPanelOpen(true);
      setSelectedPostId(null); // Exit readers screen
    }
  };

  const handleDeletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    savePostsCollection(updated);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    });
    savePostsCollection(updated);
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: p.comments.filter(c => c.id !== commentId)
        };
      }
      return p;
    });
    savePostsCollection(updated);
  };

  // Save profile edits
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      ...profile,
      name: editName.trim() || profile.name,
      role: editRole.trim() || profile.role,
      bio: editBio.trim() || profile.bio
    };
    setProfile(updatedProfile);
    localStorage.setItem('blogger_profile', JSON.stringify(updatedProfile));
    setEditingProfile(false);
  };

  // --- QUERY FILTER LOGIC ---
  // Step 1: Category filter
  let filtered = posts;
  if (activeCategory !== 'all' && !showingBookmarks) {
    filtered = posts.filter(p => p.category === activeCategory);
  }

  // Step 2: Bookmarked filter
  if (showingBookmarks) {
    filtered = posts.filter(p => p.isBookmarked);
  }

  // Step 3: Search filter
  if (searchQuery.trim().length > 0) {
    const lowercase = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(lowercase) ||
      p.summary.toLowerCase().includes(lowercase) ||
      p.tags?.some(tag => tag.toLowerCase().includes(lowercase))
    );
  }

  // Featured article is the top post or the one flagged isFeatured
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  
  // Calculate aggregate stats for personal use statistics layout
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);
  const bookmarkedCount = posts.filter(p => p.isBookmarked).length;

  // Active reading story
  const readingPost = posts.find(p => p.id === selectedPostId);

  if (!activeUser) {
    return (
      <div id="blogger-theme-container" className="min-h-screen bg-zinc-950 text-zinc-50 font-sans tracking-tight flex flex-col justify-between selection:bg-accent selection:text-zinc-950 relative overflow-hidden transition-all text-left">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Header toolbar */}
        <header className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-zinc-900/60 z-10">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white animate-pulse">The Chronicle</span>
            <span className="px-1.5 py-0.5 rounded bg-accent/15 border border-accent/30 text-[9px] font-mono font-bold uppercase tracking-wider text-accent leading-none">Gated Portal ⌛</span>
          </div>
          <button
            onClick={handleToggleDarkMode}
            className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1 font-mono"
            title="Toggle color theme"
          >
            <span>{darkMode ? '🌙 Dark Active' : '☀️ Light Active'}</span>
          </button>
        </header>

        {/* Immersive core screen */}
        <main className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-8 z-10 my-4 text-center">
          
          <div className="w-full max-w-md space-y-3 mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
              An Independent <span className="text-accent underline decoration-accent/30 underline-offset-4">Narrative Space</span>
            </h1>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs mx-auto">
              Welcome to the Chronicle. Register your profile or sign in using writer credentials to explore resources, draft stories, and post custom commentaries.
            </p>
          </div>

          <LoginModal
            showCloseButton={false}
            onLoginSuccess={handleLoginSuccess}
          />

        </main>

        {/* Bottom credits info */}
        <footer className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center border-t border-zinc-900/40 text-[10px] font-mono text-zinc-500 z-10">
          Chronicle Narrative Hub © 2026 • Security Gatekeeper Online 🛡️
        </footer>

      </div>
    );
  }

  return (
    <div id="blogger-theme-container" className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans tracking-tight transition-colors selection:bg-accent selection:text-zinc-950">
      
      {/* Editorial Navbar Header */}
      <Navbar
        activeCategory={activeCategory}
        onChangeCategory={(cat) => {
          if (cat === 'dashboard' && !activeUser) {
            setIsLoginModalOpen(true);
            return;
          }
          setActiveCategory(cat);
          setIsDraftPanelOpen(false);
          setSelectedPostId(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (selectedPostId) setSelectedPostId(null);
          if (isDraftPanelOpen) setIsDraftPanelOpen(false);
        }}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenDraftPanel={() => {
          setIsDraftPanelOpen(!isDraftPanelOpen);
          setSelectedPostId(null);
          setShowingBookmarks(false);
        }}
        isDraftPanelOpen={isDraftPanelOpen}
        bookmarkedCount={bookmarkedCount}
        onShowBookmarksToggle={() => {
          setShowingBookmarks(!showingBookmarks);
          setIsDraftPanelOpen(false);
          setSelectedPostId(null);
        }}
        showingBookmarks={showingBookmarks}
        activeUser={activeUser}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: Reader mode */}
        {selectedPostId && readingPost ? (
          <PostView
            post={readingPost}
            onBack={() => setSelectedPostId(null)}
            onBookmarkToggle={(id) => handleBookmarkToggle(id)}
            onLikeToggle={(id) => handleLikeToggle(id)}
            onAddComment={handleAddComment}
            onEdit={handleEditPostRequest}
            activeUser={activeUser}
          />
        ) : isDraftPanelOpen ? (
          /* VIEW 2: Drafting workspace */
          <DraftComposer
            onPublish={handlePublishNewPost}
            onClose={() => {
              setIsDraftPanelOpen(false);
              setPostToEdit(null);
            }}
            authorDefaultName={profile.name}
            authorDefaultRole={profile.role}
            postToEdit={postToEdit}
            activeUser={activeUser}
          />
        ) : activeCategory === 'about' ? (
          /* VIEW 3: About Page */
          <AboutPage />
        ) : activeCategory === 'contact' ? (
          /* VIEW 4: Contact Page */
          <ContactPage />
        ) : activeCategory === 'dashboard' ? (
          /* VIEW 4.5: Admin Dashboard */
          <AdminDashboard
            posts={posts}
            activeUser={activeUser}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPostRequest}
            onAddPostClick={() => {
              setPostToEdit(null);
              setIsDraftPanelOpen(true);
            }}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onToggleFeatured={handleToggleFeatured}
            onDeleteComment={handleDeleteComment}
            registeredUsers={registeredUsers}
          />
        ) : (
          /* VIEW 5: Dashboard Grid Explorer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Portal Space (Articles, Spotlights, and Excerpts) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Category label / Search Header banner */}
              {(showingBookmarks || searchQuery.trim() || activeCategory !== 'all') && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-accent/20 dark:border-accent/10 bg-accent/5 dark:bg-accent/5 mb-2">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                      Active Portal Filtering
                    </p>
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {showingBookmarks ? (
                        <span className="flex items-center gap-1.5">
                          Showing Bookmarked Stories ({filtered.length})
                        </span>
                      ) : searchQuery ? (
                        <span>Search results for &ldquo;{searchQuery}&rdquo; ({filtered.length})</span>
                      ) : (
                        <span>Articles filed in class &ldquo;<span className="capitalize font-bold text-accent">{activeCategory}</span>&rdquo;</span>
                      )}
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                      setShowingBookmarks(false);
                    }}
                    className="text-xs text-accent hover:underline cursor-pointer font-bold"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Spotlight Featured Area (Only on unfiltered Home) */}
              {activeCategory === 'all' && !showingBookmarks && !searchQuery && featuredPost && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-2">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Spotlight Story
                    </h2>
                  </div>
                  <FeaturedPost 
                    post={featuredPost} 
                    onClick={(id) => setSelectedPostId(id)} 
                  />
                </div>
              )}

              {/* Standard grids of match articles */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-850 pb-2">
                  <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {activeCategory === 'all' && !showingBookmarks && !searchQuery ? "Latest Stories" : "Filtered Articles"}
                  </h2>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                    {filtered.length} {filtered.length === 1 ? "article" : "articles"} listed
                  </span>
                </div>

                 {filtered.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-850 rounded-2xl bg-white dark:bg-zinc-950/20 p-8">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-3 text-zinc-400">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-zinc-850 dark:text-zinc-300">
                      No matching articles found
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1 max-w-sm mx-auto">
                      Adjust your search keyword or write a new custom article draft to fill the category space.
                    </p>
                    <button
                      onClick={() => setIsDraftPanelOpen(true)}
                      className="mt-4 inline-block bg-accent hover:bg-accent-hover text-zinc-950 rounded-lg text-xs font-semibold px-4 py-2 cursor-pointer"
                    >
                      Write new draft article
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filtered
                      // Skip rendering the main featured post on home only to prevent repeating content!
                      .filter(p => !((activeCategory === 'all' && !showingBookmarks && !searchQuery) && p.id === featuredPost?.id))
                      .map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onClick={(id) => setSelectedPostId(id)}
                          onBookmarkToggle={handleBookmarkToggle}
                          onLikeToggle={handleLikeToggle}
                        />
                      ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Profile & Stats Column Panel */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
              
              {/* Writer Persona details Card */}
              <div className="rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 p-5 sm:p-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-accent" />
                
                {editingProfile ? (
                  /* Profile form edit mode */
                  <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                    <p className="text-xs font-bold font-mono text-accent uppercase">
                      Edit Personal Signature
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Writer Name</label>
                        <input
                          id="edit-profile-name"
                          type="text"
                          required
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Role Title</label>
                        <input
                          id="edit-profile-role"
                          type="text"
                          required
                          value={editRole}
                          onChange={e => setEditRole(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Bio Text</label>
                        <textarea
                          id="edit-profile-bio"
                          rows={3}
                          required
                          value={editBio}
                          onChange={e => setEditBio(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 resize-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProfile(false)}
                        className="px-2.5 py-1 text-[10px] rounded hover:bg-zinc-105 dark:hover:bg-zinc-900 text-zinc-500"
                      >
                        Cancel
                      </button>
                      <button
                        id="save-profile-btn"
                        type="submit"
                        className="px-3 py-1 text-[10px] rounded bg-accent text-zinc-950 font-bold"
                      >
                        Save Signature
                      </button>
                    </div>

                  </form>
                ) : (
                  /* Standard static view with edit launcher */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                        About The Writer
                      </h4>
                      <button
                        id="edit-profile-trigger"
                        onClick={() => {
                          setEditName(profile.name);
                          setEditRole(profile.role);
                          setEditBio(profile.bio);
                          setEditingProfile(true);
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-accent transition-colors cursor-pointer"
                        title="Edit writer credentials"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20"
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
                          {profile.name}
                        </h3>
                        <p className="text-[10px] text-accent font-mono">
                          {profile.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans">
                      {profile.bio}
                    </p>

                    {/* Social networks presets */}
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-zinc-400 dark:text-zinc-500">
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-450">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Personal blogger analytics widget counts */}
              <div className="rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 p-5 shadow-xs">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-850">
                  Journal Hub Analytics
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">Articles</span>
                    <span className="block text-xl font-serif font-black text-accent">
                      {posts.length}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">Appreciation</span>
                    <span className="block text-xl font-serif font-black text-emerald-600 dark:text-emerald-450">
                      {totalLikes}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">Comments</span>
                    <span className="block text-xl font-serif font-black text-amber-500">
                      {totalComments}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">Bookmarked</span>
                    <span className="block text-xl font-serif font-black text-rose-500">
                      {bookmarkedCount}
                    </span>
                  </div>

                </div>

                {/* Micro guidelines notice */}
                <div className="mt-4 flex gap-2 items-start p-2.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30">
                  <Info className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    This front-end console operates securely offline. Draft articles, bookmarks, and comments remain active inside your browser cache.
                  </p>
                </div>

              </div>

              {/* Quick links helpful hints list */}
              <div className="rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 p-5 space-y-3.5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Editorial Guidelines
                </h4>
                
                <ul className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-400 font-sans">
                  <li className="flex gap-2 items-start">
                    <span className="text-zinc-400 font-bold">•</span>
                    <span><strong>Keep titles focused:</strong> Deliver deep descriptive non-visual headers for high reader engagement rates.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-zinc-400 font-bold">•</span>
                    <span><strong>Use preset visual tags:</strong> Categorize strictly to keep the homepage news, technology, sports feeds balanced.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-zinc-400 font-bold">•</span>
                    <span><strong>Friction brings style:</strong> Honor classical typography. Pair Space Grotesk size ratios with Playfair Serif paragraphs.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Structured Footer */}
      <footer id="app-footer" className="mt-20 border-t border-zinc-100 dark:border-zinc-850 bg-white dark:bg-zinc-950 transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50">The Chronicle</span>
              <span className="text-xs text-zinc-400 font-mono">| © 2026 Personal Blog Portal</span>
            </div>

            <div className="flex items-center gap-5 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              <button 
                onClick={() => { setActiveCategory('all'); setSelectedPostId(null); setIsDraftPanelOpen(false); }}
                className="hover:text-accent transition-colors"
              >
                Home Feed
              </button>
              <span>•</span>
              <button 
                onClick={() => { setIsDraftPanelOpen(true); setSelectedPostId(null); }}
                className="hover:text-accent transition-colors"
              >
                Write Workspace
              </button>
              <span>•</span>
              <a href="https://example.com" className="hover:text-accent transition-colors">
                Public Portals
              </a>
            </div>

          </div>
        </div>
      </footer>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
