import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Heart, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Award, 
  Search, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  FileText,
  Bookmark,
  Shield,
  Briefcase,
  Mail,
  UserCheck
} from 'lucide-react';
import { Post, UserAccount, Comment } from '../types';

interface AdminDashboardProps {
  posts: Post[];
  activeUser: UserAccount | null;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string) => void;
  onAddPostClick: () => void;
  onLoginClick: () => void;
  onToggleFeatured: (id: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  registeredUsers: UserAccount[];
}

export default function AdminDashboard({
  posts,
  activeUser,
  onDeletePost,
  onEditPost,
  onAddPostClick,
  onLoginClick,
  onToggleFeatured,
  onDeleteComment,
  registeredUsers
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'comments' | 'users'>('overview');
  const [postSearch, setPostSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Trigger banner countdown helper
  const triggerSuccessBanner = (msg: string) => {
    setSuccessBanner(msg);
    setTimeout(() => {
      setSuccessBanner(null);
    }, 4000);
  };

  // Compute stats
  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  
  // Flatten all comments
  const allComments: { postId: string; postTitle: string; comment: Comment }[] = [];
  posts.forEach(p => {
    if (p.comments) {
      p.comments.forEach(c => {
        allComments.push({
          postId: p.id,
          postTitle: p.title,
          comment: c
        });
      });
    }
  });
  const totalComments = allComments.length;

  // Filter posts
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
    p.author.toLowerCase().includes(postSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(postSearch.toLowerCase())
  );

  // Filter users
  const filteredUsers = registeredUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Default active user email is alara if not logged in but let's prevent access first
  if (!activeUser) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 text-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl shadow-xl animate-in fade-in duration-300">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-center justify-center text-red-650 dark:text-red-400">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          Editorial Station Restricted
        </h2>
        <p className="max-w-lg mx-auto text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          Access to the Central Publishing Dashboard & Post Admin Suite is restricted to registered contributors and editors. Log in or create an account to start contributing, editing, and managing reader discussions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={onLoginClick}
            className="w-full sm:w-auto px-6 py-2.5 bg-accent hover:bg-accent/90 text-zinc-950 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>AUTHENTICATE DESK</span>
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400 font-mono flex items-center justify-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-accent" />
          <span>Tip: Default Head Editor: <strong>alara@chronicle.com</strong> / password: <strong>admin</strong></span>
        </div>
      </div>
    );
  }

  // Check if current user is Lead Editor (alara@chronicle.com)
  const isSuperAdmin = activeUser.email.toLowerCase() === 'alara@chronicle.com';

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300" id="admin-suite-panel">
      
      {/* Top Banner Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/20 text-[10px] font-bold text-accent uppercase font-mono tracking-widest flex items-center gap-1">
              <Shield className="w-3 h-3 text-accent" />
              <span>{isSuperAdmin ? 'Lead Editorial Office' : 'Contributor Desk'}</span>
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Publishing Portal & Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back, <strong className="text-zinc-805 dark:text-zinc-200 font-semibold">{activeUser.name}</strong> • managing your articles and engagement metrics.
          </p>
        </div>

        {/* Dashboard Actions */}
        <button
          onClick={onAddPostClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-zinc-950 rounded-xl text-xs font-bold tracking-wider transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE NEW ARTICLE</span>
        </button>
      </div>

      {/* Success banner if any */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-505 dark:text-emerald-400 font-mono flex items-center gap-2.5 shadow-sm animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="font-semibold">{successBanner}</span>
        </div>
      )}

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="dashboard-metriccards">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Total Stories</span>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 text-accent">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-55">{totalPosts}</h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1">Live blog posts</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Cumulative Views</span>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 text-amber-500">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-55">{totalViews.toLocaleString()}</h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1">Reader impressions</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Reader Hearts</span>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 text-red-500">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-55">{totalLikes.toLocaleString()}</h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1 font-semibold">Like notifications</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Discussion Threads</span>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 text-sky-500">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-55">{totalComments}</h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1">Reader responses</p>
          </div>
        </div>
      </div>

      {/* REGISTRATION & LOGIN ACCOUNT TACTICAL CALLOUT */}
      <div className="p-4 sm:p-5 rounded-2xl border border-accent bg-accent/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 font-mono">Simulate User Accounts & Registrations</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Logout and register dynamic new authors! Try publishing or deleting from multiple profiles.
            </p>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 p-2 rounded-xl text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-800">
          Currently Mocking: <span className="text-accent underline font-bold">{registeredUsers.length} Registration profiles</span>
        </div>
      </div>

      {/* MAIN TABBED CONTROLS */}
      <div className="space-y-6">
        <div className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 pb-px gap-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'overview' ? 'text-accent border-b-2 border-accent font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Performance Overview
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-1 text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'posts' ? 'text-accent border-b-2 border-accent font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Manage Blog Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`pb-3 px-1 text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'comments' ? 'text-accent border-b-2 border-accent font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Moderate Comments ({totalComments})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-1 text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'users' ? 'text-accent border-b-2 border-accent font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Registrants Bench ({registeredUsers.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & INSIGHTS */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
            
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Category Share Distribution graph */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-205 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">Category Analytics Breakdown</h3>
                    <p className="text-xs text-zinc-400">Total posts published across the Chronicle segments</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>

                <div className="space-y-3 pt-2">
                  {(['home', 'technology', 'newspaper', 'sports', 'culture'] as const).map(cat => {
                    const count = posts.filter(p => p.category === cat).length;
                    const percentage = posts.length > 0 ? (count / posts.length) * 105 : 0;
                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="capitalize font-mono text-zinc-700 dark:text-zinc-300 font-semibold">{cat}</span>
                          <span className="font-mono text-zinc-400 font-semibold">{count} posts ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80">
                          <div 
                            className="bg-accent h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top View Count Board */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">Top Performing Spotlights</h3>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {posts.slice(0, 3).map((post, idx) => (
                    <div key={post.id} className="flex items-center justify-between py-3 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-mono text-xs font-bold text-accent">#0{idx + 1}</span>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{post.title}</h4>
                          <p className="text-[10px] text-zinc-400">by {post.author} • {post.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs shrink-0 font-mono">
                        <span className="flex items-center gap-1 text-zinc-500"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                        <span className="flex items-center gap-1 text-red-500"><Heart className="w-3.5 h-3.5 text-red-500" /> {post.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Contributor Card Side column */}
            <div className="md:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
                <Shield className="w-8 h-8 text-accent mx-auto" />
                <div>
                  <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">Editorial Desk Credentials</h4>
                  <p className="text-xs text-zinc-400 mt-1">Authenticated using standard user schemas.</p>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-2.5 text-left text-xs">
                  <div className="flex items-center gap-2">
                    <img src={activeUser.avatar} alt="Desk avatar" className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-zinc-800 dark:text-zinc-200">{activeUser.name}</p>
                      <p className="text-[10px] text-zinc-400">{activeUser.role}</p>
                    </div>
                  </div>
                  <div className="border-t border-zinc-100 dark:border-zinc-900 pt-2 space-y-1 text-[10px] text-zinc-400 font-mono">
                    <p>Email: {activeUser.email}</p>
                    <p className="line-clamp-2">Bio: {activeUser.bio}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: POSTS MANAGEMENT TABLE */}
        {activeTab === 'posts' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">Articles Management Console</h3>
                <p className="text-xs text-zinc-400">Publish, modify details, delete content, or pin articles quickly.</p>
              </div>
              
              <div className="relative w-full sm:max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-400">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Search live stories..."
                  value={postSearch}
                  onChange={e => setPostSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 dark:text-zinc-650">No articles match your queries. Try altering filters or Compose a New Post.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/20 text-zinc-400 font-mono uppercase tracking-wider">
                      <th className="py-2.5 px-3">Title & Summary</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Author</th>
                      <th className="py-2.5 px-3">Engagement</th>
                      <th className="py-2.5 px-3 text-right">Actions Suite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {filteredPosts.map(post => {
                      const isOwner = (post.authorEmail && post.authorEmail.toLowerCase() === activeUser.email.toLowerCase()) || post.author === activeUser.name;
                      
                      return (
                        <tr key={post.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-all">
                          <td className="py-3 px-3 max-w-sm sm:max-w-md">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                {post.isFeatured && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wide bg-amber-500/10 border border-amber-500/20 text-amber-500">Pinned</span>
                                )}
                                <span className="font-semibold text-zinc-850 dark:text-zinc-100 line-clamp-1">{post.title}</span>
                              </div>
                              <p className="text-[10px] text-zinc-400 line-clamp-1">{post.summary}</p>
                            </div>
                          </td>
                          <td className="py-3 px-3 capitalize font-mono text-zinc-500">{post.category}</td>
                          <td className="py-3 px-3 font-medium text-zinc-700 dark:text-zinc-300">{post.author}</td>
                          <td className="py-3 px-3 font-mono text-zinc-400">
                            <div className="flex items-center gap-2">
                              <span>Views: {post.views}</span>
                              <span>•</span>
                              <span>Hearts: {post.likes}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Toggle pin feature */}
                              <button
                                onClick={() => {
                                  onToggleFeatured(post.id);
                                  triggerSuccessBanner(`Story "${post.title.substring(0, 15)}..." featured status toggled!`);
                                }}
                                className={`p-1.5 rounded transition-all cursor-pointer border ${
                                  post.isFeatured 
                                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800' 
                                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/40'
                                }`}
                                title="Pin or Unpin Article"
                              >
                                <Award className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Article */}
                              <button
                                onClick={() => onEditPost(post.id)}
                                className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 hover:bg-accent border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-zinc-950 transition-all cursor-pointer text-zinc-500"
                                title="Edit properties and body"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Article */}
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${post.title}"? This cannot be undone.`)) {
                                    onDeletePost(post.id);
                                    triggerSuccessBanner(`Story "${post.title.substring(0, 15)}..." deleted successfully!`);
                                  }
                                }}
                                className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 text-zinc-400 cursor-pointer transition-all"
                                title="Delete Article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMENTS MODERATION */}
        {activeTab === 'comments' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 animate-in fade-in duration-200 font-sans">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">Discussion Threads Moderator</h3>
              <p className="text-xs text-zinc-400">Review, flag, or remove reader comments across all published articles.</p>
            </div>

            {allComments.length === 0 ? (
              <div className="text-center py-12 text-zinc-400">No reader comments are logged to any of your articles yet.</div>
            ) : (
              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                {allComments.map(({ postId, postTitle, comment }) => (
                  <div key={comment.id} className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex items-start gap-3 justify-between">
                    <div className="flex items-start gap-2.5">
                      <img 
                        src={comment.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"} 
                        alt="Author" 
                        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <strong className="text-zinc-800 dark:text-zinc-250 font-semibold">{comment.author}</strong>
                          <span className="text-[10px] text-zinc-400 font-mono">{comment.date}</span>
                          <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest pl-1 bg-accent/5 px-1.5 rounded">
                            post: {postTitle.substring(0, 30)}...
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">"{comment.content}"</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm("Do you want to drop or moderate this reader comment?")) {
                          onDeleteComment(postId, comment.id);
                          triggerSuccessBanner('Reader comment successfully moderated!');
                        }
                      }}
                      className="p-1.5 rounded-lg border border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-zinc-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                      title="Moderate Comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: USERS DATABASE MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">Registered Contributors Directory</h3>
                <p className="text-xs text-zinc-400">View profiles of authors registered during this browser session.</p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-400">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Filter registrants..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Default Lead Admin Column */}
              <div className="p-4 rounded-xl border border-accent bg-accent/5 space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex h-5 items-center justify-center rounded bg-accent px-1.5 text-[9px] font-bold text-zinc-950 font-mono tracking-wider uppercase">Default Admin</div>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Alara" className="w-10 h-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">Alara Thorne</h4>
                    <p className="text-[10px] text-accent font-semibold font-mono">Lead Editor & Storyteller</p>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 italic mt-2">"Exploring the intersections of culture, futuristic technology, and modern society with style."</p>
                <div className="pt-2 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span>alara@chronicle.com</span>
                </div>
              </div>

              {filteredUsers.map(user => (
                <div key={user.email} className="p-4 rounded-xl border border-zinc-250 dark:border-zinc-850 bg-zinc-50/20 dark:bg-zinc-900/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{user.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 italic mt-2">"{user.bio || 'Independent post contributor.'}"</p>
                  <div className="pt-2 text-[10px] font-mono text-zinc-400 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-zinc-400" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <p className="text-center text-xs text-zinc-400 py-4">No custom user registrations logged yet during this session.</p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
