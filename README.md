# TECHFEST 2026 — 3D Interactive Scroll-Driven Web Experience

> An immersive, 3D scroll-driven web application built for **Techfest 2026** (Annual International Digital & Tech Festival). Featuring real-time Three.js scene morphing, WebGL shader lighting, particle starfield, interactive 3D event nodes, GSAP & Lenis smooth scroll, and instant digital QR pass generation.

---

## 🌟 Key Features

1. **3D Scroll-Driven Universe**
   - Fixed WebGL background rendering a glowing 3D wireframe icosahedron, quantum core, orbital rings, and particle starfield.
   - Camera smoothly flies along an interpolated 3D spline trajectory through 5 key festival sections as the user scrolls.
   - Software WebGL fallback guard (`isSoftwareGl`) for headless/VDI environments.

2. **Interactive Raycasting Event Nodes**
   - Hover and click 3D floating nodes directly on the WebGL canvas.
   - Card tilt and glow synchronization between DOM cards and 3D objects.

3. **6 Flagship Competitions & Rulebooks**
   - Detailed event cards for HackMatrix (36H Hackathon), RoboWars (Combat Bots), AI Genesis (Multimodal Agents), CyberClash CTF, Drone Prix, and Design Odyssey.
   - Interactive rulebook and agenda popups for each event.

4. **Dynamic Festival Schedule & Timeline**
   - Day 1, Day 2, and Day 3 interactive tabs with venue, speaker, category, and session descriptions.

5. **Animated Counter Statistics & Sponsors Grid**
   - Real-time animated counters for 10,000+ Attendees, 45+ Events, $50,000 Prize Pool, and 120+ Partner Universities.
   - Categorized sponsor grid (Title, Platinum, Gold, Tech Partners).

6. **Instant Digital QR Pass Generator**
   - Select General Attendee, Hackathon Competitor, or VIP All-Access Pass.
   - Generates a procedural QR code canvas and unique credential ID (`TF26-VIP-JOH8492-X`).

7. **Futuristic Sound & Sci-Fi Cursor**
   - Custom crosshair laser cursor with trailing ring effect.
   - Web Audio API synthesizer generating hover/click sfx and ambient hum (zero missing `.mp3` dependencies).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **3D Engine**: Three.js (r170+)
- **Smooth Scroll**: Lenis (`lenis`)
- **Animations & Icons**: Lucide React + Tailwind CSS v4
- **Audio**: HTML5 Web Audio API synthesizer
- **Testing**: Node.js Test Runner (`node:test`) + `npx tsx --test`

---

## 📁 Project Structure

```
├── index.html              # Entry HTML with Orbitron & Space Grotesk fonts
├── metadata.json           # Applet name & capabilities
├── package.json            # Dependencies & build scripts
├── README.md               # Project documentation & deployment guide
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Tailwind v4, glassmorphism & neon glow utilities
│   ├── components/
│   │   ├── LoadingScreen.tsx   # Preloader with progress bar & diagnostics
│   │   ├── Navbar.tsx          # 3-Zone top navigation contract + audio toggle
│   │   ├── HeroSection.tsx     # Hero countdown timer & CTA
│   │   ├── AboutSection.tsx    # 4 Tech pillars & global impact
│   │   ├── EventsSection.tsx   # Filterable 3D event cards & node sync
│   │   ├── ScheduleSection.tsx # Day 1, Day 2, Day 3 festival timeline
│   │   ├── SponsorsSection.tsx # Animated stat counters & sponsor grid
│   │   ├── RegisterSection.tsx # Ticket pass options & magnetic CTA
│   │   ├── EventModal.tsx      # Comprehensive event rulebook modal
│   │   ├── PassModal.tsx       # Digital pass generator with QR canvas
│   │   └── CustomCursor.tsx    # Sci-fi laser crosshair tracker
│   └── utils/
│       ├── audio.ts font/synth  # Web Audio API sound synthesizer
│       ├── festival-data.ts     # Event dataset, schedule, ticket logic
│       ├── festival-data.test.ts # Unit tests for business logic
│       └── three-scene.ts       # Three.js WebGL canvas controller & camera path
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ and `npm`

### Step-by-Step
1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/techfest-2026-3d.git
   cd techfest-2026-3d
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Unit Tests**:
   ```bash
   npx --yes tsx --test src/utils/festival-data.test.ts
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Instructions

### 1. GitHub Repository Setup
```bash
git init
git add .
git commit -m "Initial release of Techfest 2026 3D Website"
git branch -M main
git remote add origin https://github.com/your-username/techfest-2026-3d.git
git push -u origin main
```

### 2. Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `techfest-2026-3d` repository.
4. Keep framework preset as **Vite**.
5. Click **Deploy**. Vercel will build and host your 3D app instantly with free SSL!

### 3. Deploy to Netlify
1. Log into [Netlify](https://netlify.com) and click **"Add new site"** > **"Import from Git"**.
2. Select your repository.
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Click **Deploy Site**.

---

## 📄 License
Licensed under the Apache-2.0 License.
