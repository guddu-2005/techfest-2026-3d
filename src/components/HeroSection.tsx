import { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin, ArrowRight, Trophy, Users } from 'lucide-react';
import { getCountdownTime } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRegisterClick: () => void;
}

export default function HeroSection({ onExploreClick, onRegisterClick }: HeroSectionProps) {
  // Festival target date: November 15, 2026 09:00 AM
  const targetDate = new Date('2026-11-15T09:00:00').getTime();
  const [countdown, setCountdown] = useState(getCountdownTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownTime(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-28 pb-16">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f0ff] opacity-10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8a2be2] opacity-10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Date & Location Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
            Nov 15 - 17, 2026
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#ff2e97]" />
            Innovation Campus Arena
          </span>
        </div>

        {/* Main Title with Glitch & Gradient */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black font-orbitron tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff2e97] glow-cyan">
          TECHFEST <span className="text-[#00f0ff]">2026</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light tracking-wide leading-relaxed">
          Architects of the Digital Universe. Experience 36-hour hackathons, combat robotics, AI agent challenges, and spatial web design in a 3D immersive world.
        </p>

        {/* Countdown Timer */}
        <div className="pt-4 pb-2">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Festival Launch Countdown</p>
          <div className="inline-grid grid-cols-4 gap-3 sm:gap-6 glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800">
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-4xl font-bold font-orbitron text-[#00f0ff] tabular-nums">
                {String(countdown.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">Days</span>
            </div>
            <div className="text-center px-2 border-l border-slate-800">
              <span className="block text-2xl sm:text-4xl font-bold font-orbitron text-white tabular-nums">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">Hours</span>
            </div>
            <div className="text-center px-2 border-l border-slate-800">
              <span className="block text-2xl sm:text-4xl font-bold font-orbitron text-[#8a2be2] tabular-nums">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">Mins</span>
            </div>
            <div className="text-center px-2 border-l border-slate-800">
              <span className="block text-2xl sm:text-4xl font-bold font-orbitron text-[#ff2e97] tabular-nums">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">Secs</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onExploreClick();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-orbitron font-bold text-sm text-black bg-[#00f0ff] hover:bg-white hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            EXPLORE EVENTS
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onRegisterClick();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-orbitron font-bold text-sm text-slate-100 glass-panel border border-slate-700 hover:border-[#ff2e97] hover:text-[#ff2e97] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            GET FESTIVAL PASS
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-10 max-w-3xl mx-auto text-left">
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400">Prize Pool</p>
              <p className="text-base font-bold font-orbitron text-white">$50,000 USD</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#8a2be2]/10 text-[#8a2be2]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400">Attendees</p>
              <p className="text-base font-bold font-orbitron text-white">10,000+ Techies</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#ff2e97]/10 text-[#ff2e97]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400">Competitions</p>
              <p className="text-base font-bold font-orbitron text-white">45+ Flagships</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
