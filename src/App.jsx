import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, Sparkles, Send, Check, Globe, Share2 } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Audio Ref
  const audioRef = useRef(null);

  // Target release date set to October 31, 2026
  const targetDate = new Date('2026-10-31T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 8, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Play / Pause Toggle Handler
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Form Submit Handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative overflow-hidden">
      {/* Hidden HTML5 Audio Element */}
      <audio 
        ref={audioRef} 
        src="/audio.mp3" 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-rose-600 to-transparent" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/50 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500">
          BALLYMAN
        </div>
        <a 
          href="#squad"
          className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-amber-500/20"
        >
          Pre-Save Single
        </a>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
        
        {/* Release Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-8">
          <Sparkles className="w-4 h-4 animate-pulse" />
          Official Single Announcement
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
          NEW MUSIC <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500">
            DROPPING SOON
          </span>
        </h1>
        <p className="text-neutral-400 max-w-xl text-lg mb-10 leading-relaxed">
          Get ready for BallyMan’s biggest release yet. Turn up your speakers, pre-save across all streaming platforms, and join the movement.
        </p>

        {/* Cover Art + Interactive Audio Player Card */}
        <div className="relative group w-full max-w-md bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl mb-12">
          
          {/* Cover Art Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-800 mb-6 group-hover:scale-[1.01] transition-transform duration-300 shadow-2xl border border-neutral-800">
            <img 
              src="/cover.jpg" 
              alt="BallyMan - Bloodclaat Cover Art" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent z-10" />

            {/* Audio Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute bottom-4 right-4 z-20 bg-amber-400 hover:bg-amber-300 text-neutral-950 p-4 rounded-full shadow-xl transition-all scale-100 hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
          </div>

          {/* Track Info */}
          <div className="text-left flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-rose-500 uppercase tracking-widest font-bold">New Single Drop</p>
              <h3 className="text-2xl font-black tracking-tight">Bloodclaat <span className="text-sm font-normal text-neutral-400">ft. I AM</span></h3>
            </div>
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-amber-400 animate-bounce' : 'text-neutral-500'}`} />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-2xl mb-16">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-6">Countdown To Release (October 31)</h2>
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-2xl flex flex-col items-center shadow-inner">
                <span className="text-3xl md:text-5xl font-black text-amber-400">{String(item.value).padStart(2, '0')}</span>
                <span className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message / Sensitization Section */}
        <section className="w-full max-w-3xl bg-neutral-900/40 border border-neutral-800/80 rounded-3xl p-8 md:p-10 mb-16 text-left relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Music className="w-40 h-40 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-amber-400">Message From BallyMan</h3>
          <p className="text-neutral-300 leading-relaxed mb-6">
            "This project represents a new era of sound and energy. We built this track for everyone who moves to their own beat. Get ready to stream, share, and make this single global."
          </p>
          <div className="border-l-2 border-amber-400 pl-4 py-1 italic text-neutral-400">
            "Turn the volume up. The movement starts now." — BallyMan
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="squad" className="w-full max-w-xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-2">Join The BallyMan Squad</h3>
          <p className="text-neutral-400 text-sm mb-6">
            Be the first to get the private listening link 1 hour before global release.
          </p>

          {subscribed ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center justify-center gap-2 font-medium text-sm">
              <Check className="w-5 h-5" />
              <span>You're in! We'll send you the exclusive link before drop time.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-6 py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
              >
                Join Squad <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 px-6 py-8 text-center text-xs text-neutral-600 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-neutral-400">
          <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><Globe className="w-4 h-4" /> Official Website</a>
          <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Share Drop</a>
        </div>
        <p>© {new Date().getFullYear()} BallyMan Music. All rights reserved.</p>
      </footer>
    </div>
  );
}