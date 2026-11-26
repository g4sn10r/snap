import { Download } from 'lucide-react';
import SnapPanel3D from './SnapPanel3D';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 lg:py-24" aria-labelledby="hero-title">
      {/* Video background - FIXED position, full viewport, dark fallback prevents white flash */}
      <div className="fixed inset-0 z-0 bg-[var(--bg-deep)] pointer-events-none" aria-hidden="true" />
      <video
        className="fixed inset-0 z-0 w-screen h-screen object-cover opacity-40 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        poster="/comp-1.mp4"
        aria-hidden="true"
      >
        <source src="/comp-1.mp4" type="video/mp4" />
      </video>
      {/* Subtle gradient overlay for text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[rgba(3,3,5,0.9)] via-[rgba(3,3,5,0.7)] to-[rgba(3,3,5,0.9)] pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 z-0 bg-radial-top animate-radial-breathe pointer-events-none" aria-hidden="true" />

      {/* Decorative floating orbs - infinite smooth motion */}
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/12 w-64 h-64 rounded-full bg-accent-start/10 blur-[120px] animate-float-slow" />
        <div className="absolute top-3/4 right-1/12 w-48 h-48 rounded-full bg-accent-end/10 blur-[100px] animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-start/5 blur-[150px] animate-float-fast" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8 lg:space-y-12 px-4">
        <div className="animate-slide-up animate-float-gentle" style={{ animationDelay: '100ms' }}>
          <img
            src="/logo-snap.png"
            alt=""
            className="mx-auto mb-6 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 drop-shadow-[0_0_40px_rgba(181,140,255,0.4)] animate-pulse-glow"
            aria-hidden="true"
          />
        </div>

        <h1 id="hero-title" className="heading-1 animate-slide-up leading-tight" style={{ animationDelay: '200ms' }}>
          <span className="block">DWANAŚCIE AKCJI.</span>
          <span className="block text-gradient"> JEDEN PANEL.</span>
        </h1>

        <p className="body-lg animate-slide-up max-w-xl mx-auto" style={{ animationDelay: '300ms' }}>
          Zero skrótów do zapamiętania. Klikasz — masz efekt.
        </p>

        <div className="animate-slide-up animate-float-card" style={{ animationDelay: '400ms' }}>
          <SnapPanel3D />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '500ms', marginTop: '1.5rem' }}>
          <a
            href="./snap-v1.zip"
            className="btn-primary group inline-flex animate-pulse-subtle"
            download
          >
            <Download className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            <span>Pobierz SNAP (ZIP)</span>
          </a>
        </div>

        <div className="animate-slide-up flex flex-wrap items-center justify-center gap-3 text-white/35 text-sm font-mono animate-float-stagger" style={{ animationDelay: '600ms' }}>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">macOS</span>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">Windows</span>
          <span className="px-3 py-1.5 bg-white/3 rounded-full border border-white/5 whitespace-nowrap">After Effects 2019+</span>
        </div>
      </div>
    </section>
  );
}