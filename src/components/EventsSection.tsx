import { useState } from 'react';
import { Sparkles, Trophy, Users, Calendar, ArrowUpRight, Flame } from 'lucide-react';
import { EVENTS, filterEvents, EventItem } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

interface EventsSectionProps {
  onSelectEvent: (event: EventItem) => void;
  onHoverEventNode: (eventId: string | null) => void;
}

export default function EventsSection({ onSelectEvent, onHoverEventNode }: EventsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Hackathon', 'Robotics', 'AI', 'Gaming', 'Workshops', 'Design'];

  const filtered = filterEvents(activeCategory);

  return (
    <section id="events" className="relative min-h-screen px-4 sm:px-8 py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff2e97] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>02 // FLAGSHIP COMPETITIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight text-white glow-pink">
            FESTIVAL EVENTS & CHALLENGES
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Compete for a combined prize pool of $50,000 USD across flagship engineering and computing arenas. Click any card for full rulebook and registration.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto p-1.5 glass-panel rounded-2xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid with 3D Tilt & Glow Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                soundManager.playClick();
                onSelectEvent(event);
              }}
              onMouseEnter={() => {
                soundManager.playHover();
                onHoverEventNode(event.id);
              }}
              onMouseLeave={() => {
                onHoverEventNode(null);
              }}
              className="group relative glass-panel p-6 rounded-3xl border border-slate-800 hover:border-[#00f0ff]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            >
              {/* Top Accent Stripe */}
              <div
                className="absolute top-0 left-8 right-8 h-1 rounded-b-full transition-all duration-300 opacity-60 group-hover:opacity-100"
                style={{ backgroundColor: event.color }}
              />

              <div className="space-y-4 pt-2">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                    {event.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold font-orbitron text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/20">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{event.prizePool}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-[#00f0ff] transition-colors flex items-center justify-between">
                    <span>{event.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-[#00f0ff] transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {event.tagline}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      Team Size:
                    </span>
                    <span className="text-slate-200 font-semibold">{event.teamSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Date:
                    </span>
                    <span className="text-slate-200 font-semibold truncate max-w-[170px]">{event.date.split(',')[0]}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {event.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Call to Action */}
              <div className="pt-6">
                <button className="w-full py-2.5 rounded-xl font-orbitron text-xs font-bold text-white bg-slate-900 group-hover:bg-[#00f0ff] group-hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                  VIEW DETAILS & RULES
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
