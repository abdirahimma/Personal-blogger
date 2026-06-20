/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  PenTool, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Heart,
  User,
  Hash,
  LogIn,
  LogOut,
  Shield,
  Lock
} from 'lucide-react';
import { CategoryType, UserAccount } from '../types';

interface NavbarProps {
  activeCategory: CategoryType | 'all' | 'about' | 'contact' | 'dashboard';
  onChangeCategory: (category: CategoryType | 'all' | 'about' | 'contact' | 'dashboard') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDraftPanel: () => void;
  isDraftPanelOpen: boolean;
  bookmarkedCount: number;
  onShowBookmarksToggle: () => void;
  showingBookmarks: boolean;
  activeUser: UserAccount | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({
  activeCategory,
  onChangeCategory,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  onOpenDraftPanel,
  isDraftPanelOpen,
  bookmarkedCount,
  onShowBookmarksToggle,
  showingBookmarks,
  activeUser,
  onLogout,
  onLoginClick
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { id: CategoryType | 'all' | 'about' | 'contact'; label: string }[] = [
    { id: 'all', label: 'All Feed' },
    { id: 'home', label: 'Home' },
    { id: 'technology', label: 'Tech' },
    { id: 'newspaper', label: 'Press' },
    { id: 'sports', label: 'Sports' },
    { id: 'culture', label: 'Culture' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact 📞' }
  ];

  return (
    <header id="app-navbar" className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 border-zinc-100 dark:border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <button 
              id="navbar-logo-btn"
              onClick={() => {
                onChangeCategory('all');
                if (showingBookmarks) onShowBookmarksToggle();
                if (isDraftPanelOpen) onOpenDraftPanel(); // close it
              }}
              className="group flex flex-col items-start cursor-pointer text-left"
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-5 h-5 text-accent group-hover:rotate-6 transition-transform" />
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  The Chronicle
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 ml-6">
                Personal Journal & Perspectives
              </span>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => {
              const active = activeCategory === cat.id && !showingBookmarks && !isDraftPanelOpen;
              return (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => {
                    onChangeCategory(cat.id);
                    if (showingBookmarks) onShowBookmarksToggle(); // reset bookmark view
                  }}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                    active 
                      ? 'text-accent font-semibold' 
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {cat.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search, Actions & Toggles */}
          <div className="hidden sm:flex items-center gap-3 max-w-xs w-full justify-end">
            {/* Search Input */}
            <div className="relative w-full max-w-[180px] lg:max-w-[220px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                id="search-input-desktop"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-sans"
              />
            </div>

            {/* Bookmark Filter Button */}
            <button
              id="bookmark-filter-btn"
              onClick={onShowBookmarksToggle}
              title="Show Bookmarked Articles"
              className={`relative p-2 rounded-lg border transition-all ${
                showingBookmarks
                  ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
              }`}
            >
              <Heart className={`w-4 h-4 ${showingBookmarks ? 'fill-current' : ''}`} />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-zinc-950">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Section without top-right write button */}
            {activeUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => onChangeCategory('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === 'dashboard'
                      ? 'bg-accent text-zinc-950 font-bold shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-350 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                  title="Open Admin Dashboard & Analytics"
                >
                  <Shield className="w-3.5 h-3.5 text-accent" />
                  <span>Admin Desk ⚙️</span>
                </button>
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-accent/40"
                  title={`Author: ${activeUser.name} (${activeUser.role})`}
                  referrerPolicy="no-referrer"
                />
                <button
                  id="desktop-logout-btn"
                  onClick={onLogout}
                  className="p-1 px-2 text-[10px] uppercase font-mono tracking-wider text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all cursor-pointer flex items-center gap-1"
                  title="Log out of this account"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent bg-transparent text-zinc-500 dark:text-zinc-400 cursor-pointer transition-all"
                  title="Access the Admin & Contributor Console"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Console</span>
                </button>
                <button
                  id="desktop-login-btn"
                  onClick={onLoginClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:text-accent rounded-lg text-xs font-semibold tracking-wide bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls Drawer Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Dark Mode Toggle for Mobile Header */}
            <button
              id="dark-mode-toggle-mobile"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Bookmark button for Mobile Header */}
            <button
              onClick={onShowBookmarksToggle}
              className={`p-2 rounded-lg relative ${showingBookmarks ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-400'}`}
            >
              <Heart className={`w-4 h-4 ${showingBookmarks ? 'fill-current' : ''}`} />
              {bookmarkedCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-accent" />
              )}
            </button>

            {/* Menu Trigger */}
            <button
              id="mobile-drawer-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          
          {/* Dashboard and Admin Navigation Shortkey in Mobile */}
          <div className="flex flex-col gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            {activeUser ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img src={activeUser.avatar} alt={activeUser.name} className="w-7 h-7 rounded-full object-cover border border-accent/40" referrerPolicy="no-referrer" />
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    User: <span className="font-semibold text-zinc-950 dark:text-zinc-150">{activeUser.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onChangeCategory('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      activeCategory === 'dashboard'
                        ? 'bg-accent text-zinc-950'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    <span>Desk 📊</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1 px-2 text-[10px] uppercase font-mono tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500 rounded cursor-pointer"
                    title="Sign Out"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Panel</span>
                </button>
                <button
                  id="mobile-drawer-login-btn"
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-accent bg-accent/15 text-accent cursor-pointer"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Log In / Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              id="search-input-mobile"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
            />
          </div>

          {/* Mobile Category Lists */}
          <div className="space-y-1">
            <p className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 px-2 pb-1">
              Categories
            </p>
            {categories.map((cat) => {
              const active = activeCategory === cat.id && !showingBookmarks && !isDraftPanelOpen;
              return (
                <button
                  key={cat.id}
                  id={`nav-cat-mobile-${cat.id}`}
                  onClick={() => {
                    onChangeCategory(cat.id);
                    if (showingBookmarks) onShowBookmarksToggle();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    active
                      ? 'bg-accent/10 text-accent font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  <span className="capitalize">{cat.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
}
