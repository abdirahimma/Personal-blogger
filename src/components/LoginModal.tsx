import React, { useState } from 'react';
import { X, Lock, Mail, User, Info, Image as ImageIcon, Briefcase, LogIn } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginModalProps {
  onClose?: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  showCloseButton?: boolean;
}

export default function LoginModal({ onClose, onLoginSuccess, showCloseButton = true }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Registration and Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Contributor');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please specify both email and password.');
      return;
    }

    // Load registered accounts
    const savedUsersRaw = localStorage.getItem('registered_blog_users');
    let registeredUsers: UserAccount[] = [];
    if (savedUsersRaw) {
      try {
        registeredUsers = JSON.parse(savedUsersRaw);
      } catch (err) {
        registeredUsers = [];
      }
    }

    if (isRegister) {
      // Sign Up flow
      if (!name.trim()) {
        setErrorMsg('Please specify your profile name.');
        return;
      }

      // Check if user already exists
      const exists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setErrorMsg('An account with this email already exists.');
        return;
      }

      const newUser: UserAccount = {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim() || "Chronicle contributor exploring modern narratives.",
        avatar: avatar.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        password: password.trim() // store plain text simulator for local database ease
      };

      // Save to mock database
      registeredUsers.push(newUser);
      localStorage.setItem('registered_blog_users', JSON.stringify(registeredUsers));

      setSuccessMsg('Account registered successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose?.();
      }, 1000);

    } else {
      // Login flow
      // Search from registered list or check Alara (default)
      const testEmail = email.trim().toLowerCase();
      
      // Default Account
      if (testEmail === 'alara@chronicle.com' && password === 'admin') {
        const alaraUser: UserAccount = {
          email: 'alara@chronicle.com',
          name: 'Alara Thorne',
          role: 'Lead Editor & Storyteller',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          bio: 'Exploring the intersections of culture, futuristic technology, and modern society. Writing from a cozy micro-studio in London.'
        };
        onLoginSuccess(alaraUser);
        onClose?.();
        return;
      }

      const user = registeredUsers.find(u => u.email.toLowerCase() === testEmail && u.password === password);
      if (user) {
        onLoginSuccess(user);
        onClose?.();
      } else {
        setErrorMsg('Invalid email or password. Feel free to Create an Account tab if you need to register!');
      }
    }
  };

  if (!showCloseButton) {
    return (
      <div 
        id="login-auth-dialog" 
        className="relative w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in fade-in duration-300 text-left"
      >
        {/* Header logo / details */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex w-10 h-10 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent">
            <LogIn className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {isRegister ? 'Register Chronclist' : 'Access Writer Desk'}
          </h2>
          <p className="text-xs text-zinc-400">
            {isRegister 
              ? 'Join our independent narrative group to post blog articles' 
              : 'Log in to write new stories, append insights, and edit your posts'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
            className={`py-1.5 rounded-md cursor-pointer transition-colors text-center ${!isRegister ? 'bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-xs font-bold' : 'text-zinc-400'}`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
            className={`py-1.5 rounded-md cursor-pointer transition-colors text-center ${isRegister ? 'bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-xs font-bold' : 'text-zinc-400'}`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success logs */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium font-sans">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 font-medium font-sans">
            {successMsg}
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleActionSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-zinc-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. name@chronicle.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>Secret Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent font-sans"
            />
          </div>

          {/* Registration Extra Fields */}
          {isRegister && (
            <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-900 animate-in fade-in duration-300 font-sans">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3 h-3 text-zinc-400" />
                  <span>Profile Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jean-Luc"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-zinc-400" />
                  <span>Your Editorial Role</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visual Artist, Investigative Contributor"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-zinc-400" />
                  <span>Brief Writer Biography</span>
                </label>
                <textarea
                  placeholder="Tell our readers a little bit about yourself..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-zinc-400" />
                  <span>Avatar Image URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Paste Unsplash or direct image URL..."
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors shadow-md mt-4 font-sans"
          >
            <span>{isRegister ? 'Create Credentials' : 'Access Editorial Deck'}</span>
          </button>

          {!isRegister && (
            <div className="flex gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 justify-center pt-2 font-mono">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Tip: Enter <strong>alara@chronicle.com</strong> / password <strong>admin</strong> to log in as head editor!</span>
            </div>
          )}

        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Modal Box */}
      <div 
        id="login-auth-dialog" 
        className="relative w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header logo / details */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex w-10 h-10 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent">
            <LogIn className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {isRegister ? 'Register Chronclist' : 'Access Writer Desk'}
          </h2>
          <p className="text-xs text-zinc-400">
            {isRegister 
              ? 'Join our independent narrative group to post blog articles' 
              : 'Log in to write new stories, append insights, and edit your posts'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
            className={`py-1.5 rounded-md cursor-pointer transition-colors text-center ${!isRegister ? 'bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-xs font-bold' : 'text-zinc-400'}`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
            className={`py-1.5 rounded-md cursor-pointer transition-colors text-center ${isRegister ? 'bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-xs font-bold' : 'text-zinc-400'}`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success logs */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 font-medium">
            {successMsg}
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleActionSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-zinc-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. name@chronicle.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>Secret Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Registration Extra Fields */}
          {isRegister && (
            <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-900 animate-in fade-induration-300">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3 h-3 text-zinc-400" />
                  <span>Profile Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jean-Luc"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-zinc-400" />
                  <span>Your Editorial Role</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visual Artist, Investigative Contributor"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-zinc-400" />
                  <span>Brief Writer Biography</span>
                </label>
                <textarea
                  placeholder="Tell our readers a little bit about yourself..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-zinc-400" />
                  <span>Avatar Image URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Paste Unsplash or direct image URL..."
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors shadow-md mt-4"
          >
            <span>{isRegister ? 'Create Credentials' : 'Access Editorial Deck'}</span>
          </button>

          {!isRegister && (
            <div className="flex gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 justify-center pt-2">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Tip: Enter <strong>alara@chronicle.com</strong> password <strong>admin</strong> to log in as head editor!</span>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
