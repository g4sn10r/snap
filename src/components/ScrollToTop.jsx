import { useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const btn = document.getElementById('scroll-to-top');
      if (btn) {
        if (scrollTop > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="scroll-to-top"
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center text-white/70 hover:text-white hover:border-accent-start/50 hover:bg-white/5 transition-all duration-300 opacity-0 invisible pointer-events-none focus-visible:opacity-100 focus-visible:visible focus-visible:pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      aria-label="Przewiń na górę"
      aria-hidden="true"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}