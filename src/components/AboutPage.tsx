import React from 'react';
import { BookOpen, Sparkles, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div id="about-page" className="max-w-4xl mx-auto py-8 px-4 sm:px-6 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="text-center space-y-4 mb-16">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest font-bold uppercase bg-accent/10 border border-accent/20 text-accent">
          Our Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          Crafting Narrative in an Age of Instant Noise
        </h1>
        <div className="h-[2px] w-24 bg-accent mx-auto mt-4" />
        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto italic font-serif">
          &ldquo;The Chronicle is an independent canvas dedicated to deep investigation, cultural presence, physical friction, and slow reading.&rdquo;
        </p>
      </div>

      {/* Feature section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-zinc-950 dark:text-zinc-100">
            A Sanctuary for Ideas
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In a media climate overwhelmed by algorithms, clickbait titles, and immediate dopamine feedback, we choose slow journalism. We focus on premium content, aesthetic layout, structural integrity, and architectural honesty.
          </p>
          <p className="text-sm text-zinc-650 dark:text-zinc-450 leading-relaxed">
            Every story here is curated to support intellectual exploration. We explore topics matching our core categories: tech-forward ambient computing, community local newspaper archives, ultra-endurance athlete safety, and traditional cultural reflections.
          </p>
          
          <div className="space-y-3 pt-2">
            {[
              "100% independent writer collective",
              "Zero attention-monetizing advertisements",
              "Slow reading intervals designed for cognitive presence"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-accent fill-accent/5 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl group">
          <img 
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80" 
            alt="Narrative studio"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
            Chronicle editorial headquarters
          </div>
        </div>
      </div>

      {/* Our core commitments */}
      <div className="p-8 sm:p-10 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-850 mb-16 space-y-8">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-100 text-center">
          Editorial Commitments
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              Verbatim Integrity
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We never fabricate accounts, statistics, or expert profiles. We champion granular primary details and historic archives.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              Aesthetic Restraint
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Our interface is styled intentionally with deep slate tones, classic serifs, and high-contrast lines. Elegant reading first.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              Author Authorship
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Every personal log and investigative study maps directly to authenticated, real accounts on the timeline feed.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
