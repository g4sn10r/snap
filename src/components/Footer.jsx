import { Download } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const { ref: downloadRef, isVisible: downloadVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    delay: 0,
  });
  const { ref: copyrightRef, isVisible: copyrightVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    delay: 120,
  });

  return (
    <footer className="section" role="contentinfo">
      <div className="container py-14 lg:py-20">
        <section
          id="download"
          ref={downloadRef}
          className={`max-w-3xl mx-auto text-center mb-14 animate-float-gentle animate-scroll-reveal ${downloadVisible ? '' : ''}`}
          aria-labelledby="download-title"
        >
          <div className="relative space-y-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img src="/logo-snap.png" alt="" className="w-8 h-8 drop-shadow-[0_0_20px_rgba(181,140,255,0.5)]" aria-hidden="true" />
              <h2 id="download-title" className="heading-2">SNAP v1.0</h2>
            </div>

            <p className="body-lg max-w-xl mx-auto">
              12 najczęstszych akcji w jednym panelu. Zero skrótów do zapamiętania.
            </p>

            <a
              href="./snap-v1.zip"
              download
              className="btn-primary group inline-flex animate-pulse-subtle"
            >
              <Download className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              Pobierz SNAP (ZIP)
            </a>
          </div>
        </section>

        <div
          ref={copyrightRef}
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-float-stagger animate-scroll-reveal scroll-reveal-delay-1 ${copyrightVisible ? '' : ''}`}
        >
          <p className="body-sm text-white/25 font-mono tracking-wide">
            Copyright Snap 2026 — projekt non-profit
          </p>
        </div>
      </div>
    </footer>
  );
}