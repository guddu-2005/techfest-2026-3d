import { Sparkles, Ticket, ShieldCheck, Zap, ArrowRight, Github, Twitter, Globe } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RegisterSectionProps {
  onOpenPassForm: (tier: string) => void;
}

export default function RegisterSection({ onOpenPassForm }: RegisterSectionProps) {

  const tiers = [
    {
      name: 'General Attendee',
      price: 'FREE',
      color: '#00f0ff',
      tagline: 'Access to keynotes, expo, and night concerts',
      features: [
        '3-Day Exhibition Pavilion Access',
        'Keynote & Speaker Sessions',
        'Digital Certificate of Participation',
        'EDM Night & Closing Ceremony'
      ],
      buttonText: 'CLAIM FREE PASS'
    },
    {
      name: 'Hackathon & Competitor',
      price: '$15 USD',
      color: '#ff2e97',
      tagline: 'Full competition entry + 36h food & compute',
      popular: true,
      features: [
        'Entry into 1 Flagship Event (HackMatrix / RoboWars)',
        '36-Hour Continuous Catering & Energy Drinks',
        'GPU Cloud Compute Credits ($200 value)',
        'Techfest 2026 Swag Kit & T-Shirt',
        'Direct Recruiter Mentorship Sessions'
      ],
      buttonText: 'REGISTER AS COMPETITOR'
    },
    {
      name: 'VIP All-Access Pass',
      price: '$49 USD',
      color: '#8a2be2',
      tagline: 'Front-row VIP lounge, workshops & mentor dinner',
      features: [
        'All Competitor & Attendee Benefits',
        'Front-Row Reserved Keynote Seating',
        'Exclusive VIP Networking Lounge Access',
        'Private Dinner with Keynote Speakers & Judges',
        'Priority Workshop Seats'
      ],
      buttonText: 'GET VIP PASS'
    }
  ];

  return (
    <section id="register" className="relative min-h-screen px-4 sm:px-8 py-24 border-t border-slate-900 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Call to Action Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
            <Ticket className="w-3.5 h-3.5" />
            <span>05 // CLAIM YOUR PASS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-orbitron tracking-tight text-white glow-cyan">
            JOIN THE CONVERGENCE
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Secure your official Techfest 2026 festival pass. Instant digital QR pass generated with downloadable NFC pass badge.
          </p>
        </div>

        {/* Pricing & Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`relative glass-panel p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                t.popular
                  ? 'border-[#ff2e97] glass-panel-glow shadow-[0_0_30px_rgba(255,46,151,0.2)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#ff2e97] text-black font-orbitron font-bold text-[10px] tracking-wider uppercase">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold font-orbitron text-white">{t.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{t.tagline}</p>
                  </div>
                </div>

                <div className="text-3xl font-black font-orbitron text-white" style={{ color: t.color }}>
                  {t.price}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300 font-mono">
                  {t.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenPassForm(t.name);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full py-3.5 rounded-xl font-orbitron font-bold text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    backgroundColor: t.color,
                    color: t.color === '#00f0ff' ? '#000' : '#fff'
                  }}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  {t.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Magnetic Banner Call to Action */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff] opacity-10 blur-3xl pointer-events-none rounded-full" />
          <h3 className="text-2xl sm:text-4xl font-bold font-orbitron text-white">
            READY TO HACK THE FUTURE?
          </h3>
          <p className="max-w-xl mx-auto text-slate-300 text-sm">
            Registrations close on November 10, 2026. Limited seats available for RoboWars arena and HackMatrix hacker house.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenPassForm('Hackathon & Competitor');
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-10 py-4 rounded-xl font-orbitron font-bold text-sm text-black bg-[#00f0ff] hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all duration-300 cursor-pointer inline-flex items-center gap-2 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              GENERATE DIGITAL TICKET PASS NOW
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-900 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © 2026 Techfest Innovation Council. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#00f0ff] transition-colors flex items-center gap-1">
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a href="#" className="hover:text-[#00f0ff] transition-colors flex items-center gap-1">
            <Twitter className="w-3.5 h-3.5" />
            Twitter / X
          </a>
          <a href="#" className="hover:text-[#00f0ff] transition-colors flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Vercel Deployment
          </a>
        </div>
      </footer>
    </section>
  );
}
