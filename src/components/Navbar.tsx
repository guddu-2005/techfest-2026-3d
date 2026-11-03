import { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = soundManager.toggleMute();
    setIsMuted(!active);
  };

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between gap-8 border border-slate-800/80">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="text-lg sm:text-xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff2e97] whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] inline-block shadow-[0_0_8px_#00f0ff]" />
          TECHFEST '26
        </a>

        {/* Zone 2: 4-5 Concise Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('about')}
            onMouseEnter={() => soundManager.playHover()}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('events')}
            onMouseEnter={() => soundManager.playHover()}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick('schedule')}
            onMouseEnter={() => soundManager.playHover()}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => handleNavClick('sponsors')}
            onMouseEnter={() => soundManager.playHover()}
            className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sponsors
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Utility Tools */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundManager.playHover()}
            title={isMuted ? 'Unmute Futuristic Audio' : 'Mute Audio'}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00f0ff]" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              soundManager.playClick();
              onRegisterClick();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-orbitron font-bold text-black bg-[#00f0ff] hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            REGISTER NOW
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-[#00f0ff] transition-colors"
            >
              About Techfest
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className="text-left py-2 hover:text-[#00f0ff] transition-colors"
            >
              Competitions & Events
            </button>
            <button
              onClick={() => handleNavClick('schedule')}
              className="text-left py-2 hover:text-[#00f0ff] transition-colors"
            >
              Festival Timeline
            </button>
            <button
              onClick={() => handleNavClick('sponsors')}
              className="text-left py-2 hover:text-[#00f0ff] transition-colors"
            >
              Partners & Stats
            </button>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRegisterClick();
            }}
            className="w-full py-3 rounded-xl font-orbitron font-bold text-xs text-black bg-[#00f0ff] hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            REGISTER PASS
          </button>
        </div>
      )}
    </header>
  );
}
