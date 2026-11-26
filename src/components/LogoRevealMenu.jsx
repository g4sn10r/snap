import { useState, useRef, useEffect, useCallback } from 'react';

const navItems = [
  { href: '#hero', label: 'HOME', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )},
  { href: '#install', label: 'INSTALACJA', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )},
  { href: './snap-v1.zip', label: 'POBIERZ', download: true, icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )},
];

export default function LogoRevealMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const logoRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu]);

  // Prevent close when clicking inside menu
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed top-6 left-6 md:left-8 z-50" role="navigation" aria-label="Nawigacja główna">
      <div
        ref={menuRef}
        className="relative"
        onClick={handleMenuClick}
      >
        {/* Pill/Dock Container - starts narrow (logo only), expands rightward */}
        <div className={`flex items-center gap-2 bg-bg-deep/70 backdrop-blur-xl rounded-full px-3 py-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(31,31,35,0.3)] transition-all duration-500 ease-out-expo ${isOpen ? 'animate-dock-expand' : 'animate-dock-collapse'}`}>

          {/* LOGO - FIRST item on far LEFT, stays in place, rotates 90° */}
          <button
            ref={logoRef}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-accent-start/15 to-accent-end/15 transition-all duration-500 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep group"
            aria-expanded={isOpen}
            aria-controls="logo-menu"
            aria-label={isOpen ? 'Zamknij nawigację' : 'Otwórz nawigację'}
            type="button"
          >
            <img
              src="/logo-snap.png"
              alt=""
              className={`w-7 h-7 md:w-8 md:h-8 drop-shadow-[0_0_20px_rgba(181,140,255,0.5)] transition-transform duration-400 ease-out-expo transform-origin-center ${isOpen ? 'animate-logo-rotate-90' : 'animate-logo-rotate-0'}`}
              aria-hidden="true"
            />
            {/* Hover/focus glow on logo - only on hover/focus-visible, no permanent glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 bg-gradient-to-r from-purple-500/20 via-purple-500/30 to-purple-500/20" aria-hidden="true" />
          </button>

          {/* NAV ICONS - revealed to the RIGHT of logo when open */}
          <div className="flex items-center gap-1.5 overflow-hidden" style={{ width: isOpen ? 'auto' : '0', minWidth: isOpen ? 'auto' : '0' }}>
            {navItems.map((item, index) => (
              <div key={item.label} className="relative">
                <a
                  href={item.href}
                  download={item.download}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={closeMenu}
                  className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-bg-panel/50 backdrop-blur-md transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 ${isOpen ? 'animate-icon-reveal' : 'animate-icon-hide'}`}
                  style={{
                    transitionDelay: `${isOpen ? 40 + index * 40 : 0}ms`,
                    transformOrigin: 'center left'
                  }}
                  aria-label={item.label}
                >
                  <span className="text-white/60 group-hover:text-white group-focus-visible:text-white transition-colors duration-200 drop-shadow-[0_0_0_rgba(168,85,247,0)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] group-focus-visible:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all duration-300 ease-out-expo">
                    {item.icon}
                  </span>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}