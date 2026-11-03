import { useState } from 'react';
import { Cpu, Bot, Shield, Layers, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'ai',
      icon: Cpu,
      title: 'AI & Autonomous Agents',
      color: '#00f0ff',
      tagline: 'Generative Models, Neural Swarms & Vision Transformers',
      description: 'Explore state-of-the-art multi-agent workflows, local LLM fine-tuning, and real-time computer vision applications. Push the boundary of artificial intelligence.',
      specs: ['Gemini 2.5 Multi-modal', 'PyTorch & CUDA Acceleration', 'Autonomous Swarm Robotics', 'Real-time Edge Vision']
    },
    {
      id: 'robotics',
      icon: Bot,
      title: 'Mechatronics & Robotics',
      color: '#ff2e97',
      tagline: 'Heavyweight Combat Arena & Micro FPV Aerial Drones',
      description: 'Engage with metal-clashing heavy metal combat bots, high-speed micro FPV drone races, and precision pneumatic mechatronics engineered by top colleges.',
      specs: ['60kg Combat Arena', '80km/h FPV Racing Track', 'Custom ESP32 / Arduino Rigs', 'Pneumatic Hammer Systems']
    },
    {
      id: 'cyber',
      icon: Shield,
      title: 'Cyber Security & Web3',
      color: '#8a2be2',
      tagline: 'Capture The Flag (CTF) & Decentralized Infrastructure',
      description: 'Test ethical hacking instincts in 24-hour binary exploitation CTF matches and build high-throughput Solana and Ethereum Smart Contract applications.',
      specs: ['24-Hour Live Attack-Defense', 'Binary Exploitation & Pwn', 'Solana & EVM Architectures', 'Zero-Knowledge Proofs']
    },
    {
      id: 'spatial',
      icon: Layers,
      title: 'Spatial UI & 3D Web',
      color: '#00f0ff',
      tagline: 'Three.js, WebGL Shaders & Immersive Design',
      description: 'Discover the future of digital interaction. Craft custom WebGL shader materials, glassmorphic HUD components, and interactive 3D web applications.',
      specs: ['Three.js & WebGPU Shaders', 'GLSL Particle Physics', 'Figma 3D Spatial Systems', 'Neumorphic HUDs']
    }
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Section Kicker & Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // THE DIGITAL UNIVERSE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron tracking-tight text-white glow-cyan">
            REDEFINING TECH FESTIVALS
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Techfest 2026 brings together over 10,000 innovators, researchers, and hackers for 3 days of high-octane engineering, groundbreaking keynotes, and live arena battles.
          </p>
        </div>

        {/* Pillars Interactive Segmented Tabs */}
        <div className="glass-panel p-2 rounded-2xl max-w-4xl mx-auto border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(idx);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-orbitron font-semibold text-xs transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-lg border border-[#00f0ff]/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: pillar.color }} />
                <span className="truncate">{pillar.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card Showcase */}
        <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-slate-800 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-slate-700" style={{ color: pillars[activeTab].color }}>
              {pillars[activeTab].tagline}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-orbitron text-white">
              {pillars[activeTab].title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {pillars[activeTab].description}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-4">
              {pillars[activeTab].specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center border border-slate-700" style={{ color: pillars[activeTab].color }}>
              {(() => {
                const Icon = pillars[activeTab].icon;
                return <Icon className="w-10 h-10" />;
              })()}
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400">Pillar Category</p>
              <p className="text-lg font-bold font-orbitron text-white">TRACK 0{activeTab + 1}</p>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff2e97]" style={{ width: `${(activeTab + 1) * 25}%` }} />
            </div>
          </div>
        </div>

        {/* Global Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <Globe className="w-6 h-6 text-[#00f0ff]" />
            <h4 className="text-lg font-bold font-orbitron text-white">Global Reach</h4>
            <p className="text-xs text-slate-400">Delegates representing over 120 premier institutes and international tech hubs.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <Cpu className="w-6 h-6 text-[#8a2be2]" />
            <h4 className="text-lg font-bold font-orbitron text-white">Industry Mentors</h4>
            <p className="text-xs text-slate-400">Direct mentorship sessions with principal architects from top tech organizations.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
            <Sparkles className="w-6 h-6 text-[#ff2e97]" />
            <h4 className="text-lg font-bold font-orbitron text-white">Live Demos & Expo</h4>
            <p className="text-xs text-slate-400">Hands-on showcase of autonomous hardware, flying drone tech, and VR spaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
