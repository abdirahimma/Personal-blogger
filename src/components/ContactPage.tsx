import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div id="contact-page" className="max-w-5xl mx-auto py-8 px-4 sm:px-6 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="text-center space-y-4 mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest font-bold uppercase bg-accent/10 border border-accent/20 text-accent">
          Reach Our Desk
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          Letters to the Editor
        </h1>
        <div className="h-[2px] w-24 bg-accent mx-auto mt-4" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Submit prompts, correction mandates, manuscript proposals, or general inquiries to our editorial team below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Contact Cards */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-850 space-y-6">
            <h2 className="font-serif text-xl font-bold text-zinc-950 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              Desk Channels
            </h2>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono text-zinc-450 uppercase tracking-wide">Electronic Mail</p>
                <a href="mailto:editor@thechronicle.com" className="text-sm text-zinc-800 dark:text-zinc-200 hover:text-accent font-medium">
                  editor@thechronicle.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono text-zinc-450 uppercase tracking-wide">Editorial Hot-Wire</p>
                <span className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                  +44 (0) 20 7946 0192
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono text-zinc-450 uppercase tracking-wide">Press Room Address</p>
                <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-normal">
                  48 Wardour Street, Soho<br />
                  London W1D 4QB, United Kingdom
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-850 space-y-4">
            <h2 className="font-serif text-lg font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
              <MessageSquareCode className="w-4 h-4 text-accent" />
              <span>Response Protocol</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We review correspondence on a rolling basis every Wednesday morning. For high-priority editorial corrections, please clearly specify &ldquo;CORRECTION REQUEST&rdquo; in the subject line.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-400">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Letter Dispatched
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  We have received your message. Your letter has been catalogued in our communications queue.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
                >
                  Post another letter
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-2">
                  Dispatch a Message
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-[10px] font-mono text-zinc-400 uppercase font-bold">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Jean-Luc"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-[10px] font-mono text-zinc-400 uppercase font-bold">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. email@domain.com"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="block text-[10px] font-mono text-zinc-400 uppercase font-bold">
                    Subject / Category
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Article feedback, Manuscripts, General"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-[10px] font-mono text-zinc-400 uppercase font-bold">
                    Letter Body *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Compose your correspondence here..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-sans resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-zinc-950 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Correspondence'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
