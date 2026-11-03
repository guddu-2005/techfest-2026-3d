import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ThreeSceneManager } from './utils/three-scene';
import { EventItem } from './utils/festival-data';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ScheduleSection from './components/ScheduleSection';
import SponsorsSection from './components/SponsorsSection';
import RegisterSection from './components/RegisterSection';
import EventModal from './components/EventModal';
import PassModal from './components/PassModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [passModalTier, setPassModalTier] = useState('Hackathon & Competitor');

  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<ThreeSceneManager | null>(null);

  // Initialize Three.js Scene and Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return;

    // 1. ThreeScene Setup
    if (canvasMountRef.current && !sceneManagerRef.current) {
      sceneManagerRef.current = new ThreeSceneManager(canvasMountRef.current);
      sceneManagerRef.current.setCallbacks(
        (eventId) => {
          // Raycast click on 3D node opens event modal
          const found = eventId ? import('./utils/festival-data').then(m => {
            const ev = m.EVENTS.find(e => e.id === eventId);
            if (ev) setSelectedEvent(ev);
          }) : null;
        },
        (eventId) => {
          // Hover on 3D node
          sceneManagerRef.current?.highlightNode(eventId);
        }
      );
    }

    // 2. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      if (sceneManagerRef.current) {
        sceneManagerRef.current.setScrollProgress(progress);
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      if (sceneManagerRef.current) {
        sceneManagerRef.current.destroy();
        sceneManagerRef.current = null;
      }
    };
  }, [isLoading]);

  const handleOpenPassModal = (tier: string = 'Hackathon & Competitor') => {
    setPassModalTier(tier);
    setPassModalOpen(true);
  };

  const handleRegisterFromEvent = (eventName: string) => {
    setPassModalTier(`Competitor: ${eventName}`);
    setPassModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05060f] text-slate-100 overflow-x-hidden selection:bg-[#00f0ff] selection:text-black">
      {/* 3D WebGL Fixed Canvas Container */}
      <div
        ref={canvasMountRef}
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Cyber Noise & Radial Backdrop Overlay */}
      <div className="fixed inset-0 z-[1] bg-noise pointer-events-none opacity-40" />

      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Custom Laser Crosshair Cursor */}
          <CustomCursor />

          {/* Top Bar Navigation */}
          <Navbar onRegisterClick={() => handleOpenPassModal('Hackathon & Competitor')} />

          {/* Page Sections */}
          <main className="flex-1">
            <HeroSection
              onExploreClick={() => {
                document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRegisterClick={() => handleOpenPassModal('General Attendee')}
            />

            <AboutSection />

            <EventsSection
              onSelectEvent={(event) => setSelectedEvent(event)}
              onHoverEventNode={(eventId) => {
                sceneManagerRef.current?.highlightNode(eventId);
              }}
            />

            <ScheduleSection />

            <SponsorsSection />

            <RegisterSection onOpenPassForm={(tier) => handleOpenPassModal(tier)} />
          </main>

          {/* Event Detail Modal Overlay */}
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              onRegisterEvent={handleRegisterFromEvent}
            />
          )}

          {/* Ticket Pass Generation Modal Overlay */}
          {passModalOpen && (
            <PassModal
              initialTier={passModalTier}
              onClose={() => setPassModalOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
