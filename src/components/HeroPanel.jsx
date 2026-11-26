import { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { SnapIcons } from './SnapIcons';

const panelButtons = [
  { id: 'text', label: 'text', Icon: SnapIcons.Text },
  { id: 'solid', label: 'solid', Icon: SnapIcons.Solid },
  { id: 'light', label: 'light', Icon: SnapIcons.Light },
  { id: 'shape', label: 'shape', Icon: SnapIcons.Shape },
  { id: 'split', label: 'split', Icon: SnapIcons.Split },
  { id: 'null', label: 'null', Icon: SnapIcons.Null },
  { id: 'camera', label: 'camera', Icon: SnapIcons.Camera },
  { id: 'adj', label: 'adj', Icon: SnapIcons.Adj },
  { id: 'dup', label: 'dup', Icon: SnapIcons.Dup },
  { id: 'comp', label: 'comp', Icon: SnapIcons.Comp },
  { id: 'in', label: 'in', Icon: SnapIcons.In },
  { id: 'out', label: 'out', Icon: SnapIcons.Out },
];

export default function HeroPanel() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = useCallback((btn) => {
    setActiveButton(btn.id);
    setTimeout(() => setActiveButton(null), 300);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 lg:py-24" aria-labelledby="hero-title">
      {/* Decorative floating orbs - infinite smooth motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/12 w-64 h-64 rounded-full bg-accent-start/10 blur-[120px] animate-float-slow" />
        <div className="absolute top-3/4 right-1/12 w-48 h-48 rounded-full bg-accent-end/10 blur-[100px] animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-start/5 blur-[150px] animate-float-fast" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8 lg:space-y-12 px-4">
        <h1 id="hero-title" className="heading-1 animate-slide-up leading-tight" style={{ animationDelay: '100ms' }}>
          <span className="block">DWANAŚCIE{' '}
          <span className="text-gradient">NAJCZĘSTSZYCH</span>{' '}
          AKCJI W AFTER EFFECTS</span>
        </h1>

        <p className="body-lg animate-slide-up max-w-xl mx-auto" style={{ animationDelay: '200ms' }}>
          Zero skrótów do zapamiętania. Klikasz — masz efekt.
        </p>

        <div className="animate-slide-up animate-float-card" style={{ animationDelay: '300ms' }}>
          <div className="panel-mockup flex-shrink-0 w-full lg:max-w-[360px] mx-auto">
            <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-snap.png" alt="" className="w-7 h-7" aria-hidden="true" />
                <span className="font-display text-[16px] font-semibold tracking-tight text-white/90">SNAP</span>
              </div>
              <span className="font-mono text-xs text-white/30">v1.0</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-4 gap-3" role="group" aria-label="Panel SNAP - 12 akcji">
                {panelButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleButtonClick(btn)}
                    className={`panel-btn-3d ${activeButton === btn.id ? 'active' : ''}`}
                    aria-label={btn.label}
                    aria-pressed={activeButton === btn.id}
                  >
                    <btn.Icon className="panel-btn-icon" />
                    <span className="panel-btn-label">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '400ms', marginTop: '1.5rem' }}>
          <a
            href="./snap-v1.zip"
            className="btn-primary group inline-flex animate-pulse-subtle"
            download
          >
            <Download className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            <span>Pobierz SNAP (ZIP)</span>
          </a>
        </div>

        <div className="animate-slide-up flex flex-wrap items-center justify-center gap-3 text-white/35 text-sm font-mono animate-float-stagger" style={{ animationDelay: '500ms' }}>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">macOS</span>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">Windows</span>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">After Effects 2019+</span>
        </div>
      </div>
    </section>
  );
}