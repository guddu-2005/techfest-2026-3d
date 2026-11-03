import { useState, useEffect } from 'react';
import { Cpu, Zap, Shield, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Quantum Core...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const statuses = [
      'Initializing Quantum Core...',
      'Compiling WebGL Shaders...',
      'Synthesizing Particle Matrix...',
      'Loading Spatial Assets...',
      'Establishing Cyber Network...',
      'Techfest 2026 System Ready.'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText(statuses[statuses.length - 1]);
          setIsReady(true);
          return 100;
        }
        const index = Math.min(statuses.length - 2, Math.floor((next / 100) * (statuses.length - 1)));
        setStatusText(statuses[index]);
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    soundManager.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060f] text-white px-4 cyber-grid">
      {/* Center glowing logo symbol */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#00f0ff] opacity-20 blur-xl animate-pulse" />
        <div className="w-24 h-24 rounded-2xl glass-panel-glow flex items-center justify-center border border-[#00f0ff]/40 text-[#00f0ff]">
          <Cpu className="w-12 h-12 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-3xl sm:text-5xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#8a2be2] to-[#ff2e97] mb-2 glow-cyan">
        TECHFEST 2026
      </h1>
      <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase mb-8">
        Annual International Digital Festival
      </p>

      {/* Progress Box */}
      <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
            {statusText}
          </span>
          <span className="text-[#00f0ff] font-bold">{progress}%</span>
        </div>

        {/* Bar */}
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#8a2be2] to-[#ff2e97] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* System Diagnostics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-400 text-center">
          <div className="flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>GPU: ONLINE</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00f0ff]" />
            <span>3D: READY</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>V2026.4</span>
          </div>
        </div>
      </div>

      {/* Enter Button */}
      {isReady && (
        <button
          onClick={handleEnter}
          onMouseEnter={() => soundManager.playHover()}
          className="mt-8 px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm text-black bg-[#00f0ff] hover:bg-white hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          ENTER DIGITAL UNIVERSE
        </button>
      )}
    </div>
  );
}
