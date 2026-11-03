import { useState, useEffect } from 'react';
import { Trophy, Users, Globe, Zap, ExternalLink } from 'lucide-react';
import { SPONSORS, FESTIVAL_STATS } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

export default function SponsorsSection() {
  const [counts, setCounts] = useState({
    attendees: 0,
    eventsCount: 0,
    prizePool: 0,
    colleges: 0
  });

  useEffect(() => {
    // Simple count-up animation
    const duration = 2000;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        attendees: Math.floor(FESTIVAL_STATS.attendees * progress),
        eventsCount: Math.floor(FESTIVAL_STATS.eventsCount * progress),
        prizePool: Math.floor(FESTIVAL_STATS.prizePool * progress),
        colleges: Math.floor(FESTIVAL_STATS.colleges * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(FESTIVAL_STATS);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const tiers = ['Title', 'Platinum', 'Gold', 'Tech Partner'];

  return (
    <section id="sponsors" className="relative min-h-screen px-4 sm:px-8 py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Animated Counter Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-2">
            <Users className="w-6 h-6 text-[#00f0ff] mx-auto" />
            <span className="block text-3xl sm:text-4xl font-black font-orbitron text-white tabular-nums">
              {counts.attendees.toLocaleString()}+
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Attendees</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-2">
            <Zap className="w-6 h-6 text-[#ff2e97] mx-auto" />
            <span className="block text-3xl sm:text-4xl font-black font-orbitron text-white tabular-nums">
              {counts.eventsCount}+
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Competitions</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-2">
            <Trophy className="w-6 h-6 text-[#8a2be2] mx-auto" />
            <span className="block text-3xl sm:text-4xl font-black font-orbitron text-white tabular-nums">
              ${counts.prizePool.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Prize Cash Pool</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-2">
            <Globe className="w-6 h-6 text-[#00f0ff] mx-auto" />
            <span className="block text-3xl sm:text-4xl font-black font-orbitron text-white tabular-nums">
              {counts.colleges}+
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Partner Universities</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            <span>04 // INDUSTRY POWERHOUSES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight text-white glow-cyan">
            OFFICIAL SPONSORS & PARTNERS
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Backed by global technology leaders, venture funds, and computing platforms driving the next generation of digital innovation.
          </p>
        </div>

        {/* Sponsor Logos Grid by Tiers */}
        <div className="space-y-10">
          {tiers.map((tier) => {
            const list = SPONSORS.filter((s) => s.tier === tier);
            if (list.length === 0) return null;
            return (
              <div key={tier} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-mono font-bold text-[#00f0ff] tracking-widest uppercase">
                    {tier} SPONSORS
                  </h3>
                  <div className="h-px bg-slate-800 flex-1" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {list.map((sponsor, idx) => (
                    <a
                      key={idx}
                      href={sponsor.url}
                      onMouseEnter={() => soundManager.playHover()}
                      onClick={() => soundManager.playClick()}
                      className="group glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-[#00f0ff]/40 flex flex-col items-center justify-center text-center space-y-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-black font-orbitron text-slate-200 group-hover:text-[#00f0ff] transition-colors tracking-wider flex items-center gap-1">
                        {sponsor.logoText}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{sponsor.category}</span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
