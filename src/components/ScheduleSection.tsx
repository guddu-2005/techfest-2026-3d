import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles } from 'lucide-react';
import { SCHEDULE } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const daySchedule = SCHEDULE.filter((item) => item.day === activeDay);

  const daysInfo = [
    { day: 1, title: 'DAY 1: THE INITIATION', date: 'NOV 15, 2026', subtitle: 'Hackathon Flagoff & Keynotes' },
    { day: 2, title: 'DAY 2: THE CONVERGENCE', date: 'NOV 16, 2026', subtitle: 'RoboWars & Shader Workshops' },
    { day: 3, title: 'DAY 3: THE FINALE', date: 'NOV 17, 2026', subtitle: 'Drone Prix & EDM Night' }
  ];

  return (
    <section id="schedule" className="relative min-h-screen px-4 sm:px-8 py-24 border-t border-slate-900">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8a2be2] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>03 // FESTIVAL TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight text-white glow-violet">
            SCHEDULE & TIMELINE
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Three continuous days of immersive keynotes, high-stakes hardware battles, hands-on workshops, and night concerts.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {daysInfo.map((d) => (
            <button
              key={d.day}
              onClick={() => {
                soundManager.playClick();
                setActiveDay(d.day as 1 | 2 | 3);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-4 rounded-2xl glass-panel text-left transition-all duration-300 cursor-pointer border ${
                activeDay === d.day
                  ? 'border-[#8a2be2] bg-[#8a2be2]/10 shadow-[0_0_20px_rgba(138,43,226,0.3)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="block text-xs font-mono text-[#8a2be2] font-bold">{d.date}</span>
              <span className="block text-base font-bold font-orbitron text-white mt-1">{d.title}</span>
              <span className="block text-xs text-slate-400 mt-1">{d.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Timeline Events List */}
        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8">
          {daySchedule.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Glowing Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#05060f] border-2 border-[#8a2be2] group-hover:border-[#00f0ff] group-hover:scale-125 group-hover:shadow-[0_0_10px_#00f0ff] transition-all duration-300" />

              {/* Event Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-[#8a2be2]/40 transition-all duration-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-[#00f0ff] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#ff2e97]" />
                    {item.venue}
                  </span>
                  {item.speaker && (
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <User className="w-3.5 h-3.5 text-[#00f0ff]" />
                      {item.speaker}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
