import React, { useState } from 'react';
import { Play, Pause, Music, Flame, CheckCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const audioRef = React.useRef(null);

  const SMART_LINK = "https://unitedmasters.com/m/bloodclaat-1";

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const streamingPlatforms = [
    { name: 'UnitedMasters', label: 'All Platforms', icon: '🔥' },
    { name: 'Spotify', label: 'Stream Now', icon: '🎵' },
    { name: 'Apple Music', label: 'Stream Now', icon: '🍎' },
    { name: 'Audiomack', label: 'Stream Now', icon: '🎧' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-radial-at-c from-red-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-black tracking-widest text-red-500 uppercase">
          BallyMan
        </h1>
        <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase animate-pulse">
          <Flame className="w-4 h-4" /> Out Now Worldwide
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center">
        {/* Cover Art Container */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="/cover.jpg"
            alt="Bloodclaat Cover Art"
            className="relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Track Info */}
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
          Bloodclaat
        </h2>
        <p className="text-xl text-neutral-400 font-medium mb-6">
          feat. <span className="text-white font-semibold">I AM</span>
        </p>

        {/* Primary CTA Button */}
        <a
          href={SMART_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-black text-lg uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-red-600/40 transition-all transform hover:scale-105 active:scale-95 mb-8"
        >
          Stream On All Platforms <ExternalLink className="w-5 h-5" />
        </a>

        {/* Snippet Audio Player */}
        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur border border-neutral-800 p-4 rounded-xl mb-8 flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full text-white transition-all transform active:scale-95 shadow-lg shadow-red-600/40"
            aria-label={isPlaying ? 'Pause snippet' : 'Play snippet'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <div className="flex-1 mx-4 text-left">
            <p className="text-sm font-semibold text-white">Preview Snippet</p>
            <p className="text-xs text-neutral-400">Click to listen to preview</p>
          </div>

          <Music className="w-5 h-5 text-neutral-500 animate-bounce" />
          <audio ref={audioRef} src="/audio.mp3" onEnded={() => setIsPlaying(false)} />
        </div>

        {/* Streaming Platforms Grid */}
        <div className="w-full max-w-md mb-12">
          <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4">
            Select Platform
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {streamingPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={SMART_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/50 p-3.5 rounded-xl text-sm font-medium transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span>{platform.icon}</span> {platform.name}
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-red-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Fan Lead Capture */}
        <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-1">Join The BallyMan Squad</h3>
          <p className="text-xs text-neutral-400 mb-4">
            Be the first to hear about upcoming music videos, tour dates, and exclusive merch.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-medium text-sm py-2 bg-green-950/30 border border-green-800/40 rounded-xl">
              <CheckCircle className="w-4 h-4" /> You're on the VIP list!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white placeholder-neutral-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-600 border-t border-neutral-900">
        &copy; {new Date().getFullYear()} BallyMan. All rights reserved.
      </footer>
    </div>
  );
}
