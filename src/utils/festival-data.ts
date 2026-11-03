export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Robotics' | 'AI' | 'Gaming' | 'Workshops' | 'Design';
  tagline: string;
  prizePool: string;
  teamSize: string;
  date: string;
  location: string;
  description: string;
  rules: string[];
  schedule: { time: string; activity: string }[];
  tags: string[];
  color: string; // hex accent
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  title: string;
  category: string;
  venue: string;
  speaker?: string;
  description: string;
}

export interface SponsorItem {
  name: string;
  tier: 'Title' | 'Platinum' | 'Gold' | 'Tech Partner';
  logoText: string;
  category: string;
  url: string;
}

export const EVENTS: EventItem[] = [
  {
    id: 'hack-matrix',
    title: 'HackMatrix 2026',
    category: 'Hackathon',
    tagline: '36-hour non-stop flagship hackathon building AI & Web3 applications',
    prizePool: '$20,000',
    teamSize: '2 - 4 Members',
    date: 'Nov 15, 09:00 AM - Nov 16, 09:00 PM',
    location: 'Main Auditorium & Innovation Lab',
    description: 'Solve real-world challenges in Autonomous Agents, Decentralized Infrastructure, Climate Tech, and Healthcare. Mentors from top Silicon Valley and Indian tech firms will guide teams through 36 intense hours of coding.',
    rules: [
      'All code must be written during the hackathon hours.',
      'Use of open-source libraries and APIs is allowed and encouraged.',
      'Each team must present a working prototype and 3-minute pitch deck.',
      'Plagiarism or pre-built complete templates will lead to instant disqualification.'
    ],
    schedule: [
      { time: '09:00 AM', activity: 'Registration & Opening Keynote' },
      { time: '11:00 AM', activity: 'Hackathon Begins & Problem Statements Released' },
      { time: '04:00 PM', activity: 'Mentorship Session 1: Architecture Check' },
      { time: '12:00 AM', activity: 'Midnight Gaming Sprint & Coffee Break' },
      { time: '04:00 PM (Day 2)', activity: 'Final Submission Deadline' },
      { time: '06:00 PM (Day 2)', activity: 'Top 10 Demos & Prize Ceremony' }
    ],
    tags: ['AI Agents', 'Solana/Eth', 'LLM', 'Full-Stack'],
    color: '#00f0ff'
  },
  {
    id: 'robo-wars',
    title: 'RoboWars: Mecha Mayhem',
    category: 'Robotics',
    tagline: 'Heavyweight Combat Robotics Arena Battle (15kg & 60kg bots)',
    prizePool: '$12,000',
    teamSize: '3 - 6 Members',
    date: 'Nov 16, 11:00 AM - 06:00 PM',
    location: 'Central Arena (Outdoor Stadium)',
    description: 'Watch custom steel bots collide, flip, and burn inside a reinforced bulletproof polycarbonate arena. Sparks will fly as mechanical beasts battle for victory.',
    rules: [
      'Bots must adhere strictly to weight limits (15kg featherweight / 60kg heavyweight).',
      'Flamethrower attachments permitted subject to safety inspection.',
      'Autonomous fallback mode awards bonus points.',
      'Standard double-elimination tournament format.'
    ],
    schedule: [
      { time: '09:00 AM', activity: 'Safety Check & Weapon Inspection' },
      { time: '11:00 AM', activity: 'Featherweight Qualifier Round' },
      { time: '02:00 PM', activity: 'Heavyweight Elimination Battles' },
      { time: '05:00 PM', activity: 'Grand Final Showdown' }
    ],
    tags: ['Combat Bots', 'Pneumatics', 'Arduino/ESP32', 'Mechatronics'],
    color: '#ff2e97'
  },
  {
    id: 'ai-genesis',
    title: 'AI Genesis Challenge',
    category: 'AI',
    tagline: 'Build autonomous multimodal agents and computer vision models',
    prizePool: '$8,000',
    teamSize: '1 - 3 Members',
    date: 'Nov 15, 02:00 PM - Nov 16, 04:00 PM',
    location: 'Quantum Compute Center',
    description: 'Test your deep learning skills on synthetic real-time video streams and complex multi-agent reasoning tasks. Access to high-performance GPU clusters provided.',
    rules: [
      'Models evaluated on accuracy, latency (FPS), and parameter efficiency.',
      'Custom fine-tuned architectures get higher weightage than vanilla wrappers.',
      'Live leaderboard updated hourly.'
    ],
    schedule: [
      { time: '02:00 PM', activity: 'Dataset Unveiling & API Keys Issued' },
      { time: '08:00 PM', activity: 'Intermediate Leaderboard Freeze' },
      { time: '02:00 PM (Day 2)', activity: 'Model Submission' },
      { time: '04:00 PM (Day 2)', activity: 'Winner Announcement' }
    ],
    tags: ['PyTorch', 'Gemini API', 'Vision Transformers', 'Multi-Agent'],
    color: '#8a2be2'
  },
  {
    id: 'cyber-clash',
    title: 'CyberClash CTF 2026',
    category: 'Gaming',
    tagline: '24-hour Capture The Flag ethical hacking competition',
    prizePool: '$5,000',
    teamSize: '1 - 4 Members',
    date: 'Nov 15, 12:00 PM - Nov 16, 12:00 PM',
    location: 'Cyber Operations Lab',
    description: 'Exploit binary vulnerabilities, reverse-engineer firmware, solve cryptographic puzzles, and breach industrial control honeypots in a dynamic CTF arena.',
    rules: [
      'Attacking competition infrastructure or other team machines leads to ban.',
      'Flags must be submitted in the format TF26{flag_string}.',
      'First-blood bonuses awarded for tough challenges.'
    ],
    schedule: [
      { time: '12:00 PM', activity: 'CTF Portal Open & Briefing' },
      { time: '06:00 PM', activity: 'Jeopardy Phase Unlock' },
      { time: '06:00 AM', activity: 'Attack-Defense Live Phase' },
      { time: '12:00 PM (Day 2)', activity: 'Flag Submission Ends' }
    ],
    tags: ['Reverse Eng', 'Pwn', 'Crypto', 'Web Security'],
    color: '#00f0ff'
  },
  {
    id: 'drone-prix',
    title: 'FPV Drone Prix & Racing',
    category: 'Workshops',
    tagline: 'High-speed obstacle course racing with micro FPV drones',
    prizePool: '$3,500',
    teamSize: '1 - 2 Members',
    date: 'Nov 17, 10:00 AM - 04:00 PM',
    location: 'Open Quadrangle Air Arena',
    description: 'Pilot lightweight carbon-fiber drones through neon-glowing hoops, hair-pin turns, and vertical dive towers at speeds exceeding 80 km/h.',
    rules: [
      '5.8GHz video transmitter channels allocated by race marshal.',
      'Pilot must wear HD FPV goggles during flight.',
      'Best lap time out of 3 heats qualifies for finals.'
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Track Practice & Frequency Tuning' },
      { time: '12:00 PM', activity: 'Time Trial Qualifiers' },
      { time: '02:30 PM', activity: 'Head-to-Head Knockout Rounds' },
      { time: '04:00 PM', activity: 'Podium Ceremony' }
    ],
    tags: ['FPV Racing', 'Aerodynamics', 'PID Tuning', 'Telemetry'],
    color: '#ff2e97'
  },
  {
    id: 'ui-future',
    title: 'Design Odyssey 3D & Spatial UI',
    category: 'Design',
    tagline: 'Designing immersive 3D/AR user interfaces for future devices',
    prizePool: '$2,500',
    teamSize: '1 - 2 Members',
    date: 'Nov 17, 11:00 AM - 05:00 PM',
    location: 'Design Studio Lab',
    description: 'Craft futuristic HUDs, spatial glass components, and 3D web landing experiences using Figma, Spline, Three.js, and shader concepts.',
    rules: [
      'Design prototypes must include working interaction videos or live code link.',
      'Evaluated on aesthetic originality, usability, motion design, and spatial depth.'
    ],
    schedule: [
      { time: '11:00 AM', activity: 'Briefing & Design Prompt Selection' },
      { time: '01:00 PM', activity: 'Mid-way Design Critique' },
      { time: '04:00 PM', activity: 'Pitch & Interactive Walkthrough' }
    ],
    tags: ['Spatial UX', 'Three.js', 'Figma 3D', 'Neumorphic HUD'],
    color: '#8a2be2'
  }
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: 's1',
    day: 1,
    time: '09:30 AM',
    title: 'Opening Ceremony: Digital Horizons',
    category: 'Keynote',
    venue: 'Grand Auditorium',
    speaker: 'Dr. Elena Rostova (Director of AI Innovation)',
    description: 'Inaugural lighting of the holographic festival lamp and opening address on Quantum Computing.'
  },
  {
    id: 's2',
    day: 1,
    time: '11:00 AM',
    title: 'HackMatrix 36H Hackathon Flagoff',
    category: 'Hackathon',
    venue: 'Innovation Hub',
    description: 'Problem statements unlocked across AI, Web3, and Robotics.'
  },
  {
    id: 's3',
    day: 1,
    time: '02:00 PM',
    title: 'Keynote: The Age of Autonomous Agents',
    category: 'Talk',
    venue: 'Tech Hall A',
    speaker: 'Marcus Vance (VP of Engineering, CyberCore)',
    description: 'Exploring LLM reasoning loops, tool-use, and autonomous multi-agent swarm systems.'
  },
  {
    id: 's4',
    day: 2,
    time: '10:00 AM',
    title: 'RoboWars Featherweight Battles',
    category: 'Robotics',
    venue: 'Central Outdoor Arena',
    description: 'Double elimination rounds for 15kg combat robots.'
  },
  {
    id: 's5',
    day: 2,
    time: '02:30 PM',
    title: 'Workshop: Hands-on WebGPU & Shaders',
    category: 'Workshop',
    venue: 'Lab 402',
    speaker: 'Aria Chen (Creative Technologist)',
    description: 'Writing custom compute shaders and real-time particle simulations with Three.js.'
  },
  {
    id: 's6',
    day: 2,
    time: '06:00 PM',
    title: 'RoboWars Heavyweight Finals & Flame Show',
    category: 'Robotics',
    venue: 'Central Outdoor Arena',
    description: 'High-octane championship match featuring 60kg bots with active pneumatic hammers.'
  },
  {
    id: 's7',
    day: 3,
    time: '10:30 AM',
    title: 'FPV Drone Obstacle Prix',
    category: 'Racing',
    venue: 'Quadrangle Track',
    description: 'Speed heats through neon-lit obstacle rings.'
  },
  {
    id: 's8',
    day: 3,
    time: '02:00 PM',
    title: 'Tech Expo & Start-up Showcase',
    category: 'Exhibition',
    venue: 'Exhibition Pavilion',
    description: 'Interactive booths featuring student inventions, AR/VR demos, and recruiter sessions.'
  },
  {
    id: 's9',
    day: 3,
    time: '05:30 PM',
    title: 'Grand Closing Ceremony & EDM Night',
    category: 'ProNight',
    venue: 'Main Festival Grounds',
    speaker: 'DJ Synthesis & Light Orchestra',
    description: 'Prize distribution ceremony followed by laser lighting show and music concert.'
  }
];

export const SPONSORS: SponsorItem[] = [
  { name: 'Quantum Core Systems', tier: 'Title', logoText: 'QUANTUMCORE', category: 'Deep Tech & Compute', url: '#' },
  { name: 'Nvidia Omniverse', tier: 'Title', logoText: 'NVIDIA', category: 'AI & GPU Sponsor', url: '#' },
  { name: 'CyberSec Labs', tier: 'Platinum', logoText: 'CYBERSEC', category: 'Security Partner', url: '#' },
  { name: 'Solana Foundation', tier: 'Platinum', logoText: 'SOLANA', category: 'Web3 Sponsor', url: '#' },
  { name: 'GitHub Student Pack', tier: 'Gold', logoText: 'GITHUB', category: 'Developer Tools', url: '#' },
  { name: 'Anker Robotics', tier: 'Gold', logoText: 'ANKER ROBOTICS', category: 'Hardware Sponsor', url: '#' },
  { name: 'Red Bull Energy', tier: 'Tech Partner', logoText: 'RED BULL', category: 'Beverage Partner', url: '#' },
  { name: 'Vercel Platform', tier: 'Tech Partner', logoText: 'VERCEL', category: 'Cloud Infrastructure', url: '#' }
];

export const FESTIVAL_STATS = {
  attendees: 10000,
  eventsCount: 45,
  prizePool: 50000,
  colleges: 120
};

export function filterEvents(category: string): EventItem[] {
  if (category === 'All') return EVENTS;
  return EVENTS.filter((e) => e.category === category);
}

export function generateTicketCode(name: string, email: string, tier: string): string {
  const cleanName = (name || 'GUEST').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'GST';
  const tierPrefix = tier.toUpperCase().slice(0, 3);
  const hash = Math.floor(1000 + Math.random() * 9000);
  const charCode = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `TF26-${tierPrefix}-${cleanName}${hash}-${charCode}`;
}

export function getCountdownTime(targetTimestamp: number) {
  const now = Date.now();
  const diff = Math.max(0, targetTimestamp - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, diff };
}
