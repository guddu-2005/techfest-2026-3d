import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Download, CheckCircle, Shield, QrCode, Cpu } from 'lucide-react';
import { generateTicketCode } from '../utils/festival-data';
import { soundManager } from '../utils/audio';

interface PassModalProps {
  initialTier?: string;
  onClose: () => void;
}

export default function PassModal({ initialTier = 'Hackathon & Competitor', onClose }: PassModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [tier, setTier] = useState(initialTier);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    soundManager.playSuccess();
    const code = generateTicketCode(name, email, tier);
    setTicketCode(code);
    setTicketGenerated(true);
  };

  useEffect(() => {
    if (ticketGenerated && qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw procedural stylized QR code canvas grid
        ctx.fillStyle = '#05060f';
        ctx.fillRect(0, 0, 160, 160);

        ctx.fillStyle = '#00f0ff';
        const tileSize = 8;
        const gridCount = 20;

        // Seeded pseudo-random pattern based on ticketCode string
        let seed = 0;
        for (let i = 0; i < ticketCode.length; i++) seed += ticketCode.charCodeAt(i);

        for (let r = 0; r < gridCount; r++) {
          for (let c = 0; c < gridCount; c++) {
            // Corner position markers
            if (
              (r < 5 && c < 5) ||
              (r < 5 && c >= gridCount - 5) ||
              (r >= gridCount - 5 && c < 5)
            ) {
              if (
                r === 0 || r === 4 || c === 0 || c === 4 ||
                r === gridCount - 5 || r === gridCount - 1 || c === gridCount - 5 || c === gridCount - 1 ||
                (r >= 1 && r <= 3 && c >= 1 && c <= 3) ||
                (r >= 1 && r <= 3 && c >= gridCount - 4 && c <= gridCount - 2) ||
                (r >= gridCount - 4 && r <= gridCount - 2 && c >= 1 && c <= 3)
              ) {
                ctx.fillRect(c * tileSize, r * tileSize, tileSize - 1, tileSize - 1);
              }
            } else {
              const val = Math.sin(r * 12.9898 + c * 78.233 + seed) * 43758.5453;
              if ((val - Math.floor(val)) > 0.45) {
                ctx.fillRect(c * tileSize, r * tileSize, tileSize - 1, tileSize - 1);
              }
            }
          }
        }
      }
    }
  }, [ticketGenerated, ticketCode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#00f0ff]/30 space-y-6">
        {/* Close button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketGenerated ? (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>REGISTRATION FORM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white">
                CLAIM YOUR FESTIVAL PASS
              </h2>
              <p className="text-xs text-slate-400">
                Enter your details to generate your official Techfest 2026 digital QR credential.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex.vance@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">University / Organization</label>
                <input
                  type="text"
                  placeholder="MIT / IIT / Stanford / Self-taught"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Pass Tier Selection</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
                >
                  <option value="General Attendee">General Attendee (FREE)</option>
                  <option value="Hackathon & Competitor">Hackathon & Competitor ($15 USD)</option>
                  <option value="VIP All-Access Pass">VIP All-Access Pass ($49 USD)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-orbitron font-bold text-xs text-black bg-[#00f0ff] hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.7)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              GENERATE HOLOGRAPHIC PASS
            </button>
          </form>
        ) : (
          /* Generated Digital Pass View */
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/40">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>PASS ISSUED SUCCESSFULLY</span>
            </div>

            {/* Pass Ticket Design */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-[#00f0ff]/50 space-y-6 text-left relative overflow-hidden bg-gradient-to-br from-[#0c1226] to-[#05060f]">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">TECHFEST 2026 DIGITAL PASS</span>
                  <h3 className="text-xl font-black font-orbitron text-white">{tier}</h3>
                </div>
                <Cpu className="w-8 h-8 text-[#00f0ff]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7 space-y-3 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">PASS HOLDER</span>
                    <span className="text-base font-bold text-white font-orbitron">{name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">EMAIL</span>
                    <span className="text-xs text-slate-300">{email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">INSTITUTION</span>
                    <span className="text-xs text-slate-300">{college || 'Independent Techie'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CREDENTIAL ID</span>
                    <span className="text-sm font-bold text-[#00f0ff]">{ticketCode}</span>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <canvas ref={qrCanvasRef} width={160} height={160} className="w-32 h-32 rounded-lg" />
                  <span className="text-[9px] font-mono text-slate-400 mt-2 flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-[#00f0ff]" /> SCAN AT ENTRY
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>DATES: NOV 15-17, 2026</span>
                <span>STATUS: VERIFIED</span>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  alert(`Techfest 2026 Pass ${ticketCode} saved! Keep this screenshot or pass code for entry.`);
                }}
                className="flex-1 py-3.5 rounded-xl font-orbitron font-bold text-xs text-black bg-[#00f0ff] hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                SAVE TICKET PASS
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="py-3.5 px-6 rounded-xl font-orbitron text-xs text-slate-300 bg-slate-900 border border-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
