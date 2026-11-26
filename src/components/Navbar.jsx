import { Download } from 'lucide-react';

export default function Navbar() {
  const navLinks = [
    { href: '#install', label: 'Instalacja' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 bg-bg-deep/80 backdrop-blur-md border border-border-subtle/50 rounded-xl">
          <a href="#" className="font-display text-lg font-semibold uppercase tracking-tighter text-white hover:text-accent-start transition-colors flex items-center gap-2">
            <img src="/logo.svg" alt="" className="w-6 h-6" aria-hidden="true" />
            <span className="font-display text-lg font-semibold uppercase tracking-tighter">SNAP</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-medium uppercase tracking-wider text-white/50 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent-start after:transition-all hover:after:w-full px-1 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="./snap-v1.zip"
            className="btn-primary hidden sm:inline-flex"
            download
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Pobierz SNAP</span>
          </a>
        </div>
      </nav>
    </header>
  );
}