import { X, Trophy, Users, Calendar, MapPin, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { EventItem } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterEvent: (eventName: string) => void;
}

export default function EventModal({ event, onClose, onRegisterEvent }: EventModalProps) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 border"
              style={{ color: event.color, borderColor: `${event.color}40` }}
            >
              {event.category}
            </span>
            <span className="text-xs font-mono text-slate-400">ID: {event.id}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-orbitron text-white">
            {event.title}
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#00f0ff]" /> Prize Pool
            </span>
            <span className="block text-base font-bold font-orbitron text-white">{event.prizePool}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#ff2e97]" /> Team Size
            </span>
            <span className="block text-base font-bold font-orbitron text-white">{event.teamSize}</span>
          </div>
          <div className="col-span-2 sm:col-span-1 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8a2be2]" /> Schedule Date
            </span>
            <span className="block text-xs font-semibold text-slate-200 truncate">{event.date}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
          <MapPin className="w-4 h-4 text-[#ff2e97] shrink-0" />
          <span>Venue: {event.location}</span>
        </div>

        {/* Rulebook */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" />
            Official Event Rules
          </h3>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-[#00f0ff] font-bold">{idx + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule timeline */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8a2be2]" />
            Event Agenda
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {event.schedule.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[#00f0ff] font-bold block">{item.time}</span>
                <span className="text-slate-200 block">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
              onRegisterEvent(event.title);
            }}
            className="flex-1 py-3.5 rounded-xl font-orbitron font-bold text-xs text-black bg-[#00f0ff] hover:bg-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            REGISTER FOR THIS EVENT NOW
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-3.5 px-6 rounded-xl font-orbitron text-xs text-slate-400 bg-slate-900 border border-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
