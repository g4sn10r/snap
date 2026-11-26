import { useState, useCallback, useRef, useEffect } from 'react';
import { SnapIcons } from './SnapIcons';

const panelButtons = [
  { id: 'text', label: 'text', Icon: SnapIcons.Text, status: 'Utworzono warstwę Text' },
  { id: 'solid', label: 'solid', Icon: SnapIcons.Solid, status: 'Utworzono Solid dopasowany do zaznaczenia' },
  { id: 'light', label: 'light', Icon: SnapIcons.Light, status: 'Utworzono warstwę Light' },
  { id: 'shape', label: 'shape', Icon: SnapIcons.Shape, status: 'Utworzono warstwę Shape' },
  { id: 'split', label: 'split', Icon: SnapIcons.Split, status: 'Przecięto warstwę na playheadzie' },
  { id: 'null', label: 'null', Icon: SnapIcons.Null, status: 'Utworzono Null Object' },
  { id: 'camera', label: 'camera', Icon: SnapIcons.Camera, status: 'Utworzono warstwę Camera' },
  { id: 'adj', label: 'adj', Icon: SnapIcons.Adj, status: 'Utworzono Adjustment Layer dopasowany do zaznaczenia' },
  { id: 'dup', label: 'dup', Icon: SnapIcons.Dup, status: 'Zduplikowano zaznaczone warstwy' },
  { id: 'comp', label: 'comp', Icon: SnapIcons.Comp, status: 'Utworzono Pre-comp / Nową kompozycję' },
  { id: 'in', label: 'in', Icon: SnapIcons.In, status: 'Przycięto punkt In do playheada' },
  { id: 'out', label: 'out', Icon: SnapIcons.Out, status: 'Przycięto punkt Out do playheada' },
];

export default function SnapPanel3D() {
  const [activeButton, setActiveButton] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: -10, y: 6 });
  const [isHovering, setIsHovering] = useState(false);
  const panelRef = useRef(null);
  const statusBarRef = useRef(null);

  const handleButtonClick = useCallback((btn, e) => {
    e.stopPropagation();
    setActiveButton(btn.id);
    setStatusMessage(btn.status);
    setStatusVisible(true);
    if (statusBarRef.current) {
      statusBarRef.current.classList.remove('hidden');
    }

    setTimeout(() => {
      setStatusVisible(false);
      if (statusBarRef.current) {
        statusBarRef.current.classList.add('hidden');
      }
    }, 3000);

    setTimeout(() => {
      setActiveButton(null);
    }, 3000);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!panelRef.current || isHovering) return;
    const rect = panelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    setRotation({
      x: -10 - deltaY * 6,
      y: 6 + deltaX * 6,
    });
  }, [isHovering]);

  const handleMouseLeave = useCallback(() => {
    if (!isHovering) {
      setRotation({ x: -10, y: 6 });
    }
  }, [isHovering]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={panelRef}
      className="relative panel-3d-wrapper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Interaktywny panel SNAP w 3D"
      style={{ width: '100%', maxWidth: '520px', margin: '0 auto', overflow: 'visible' }}
    >
      <div className="panel-glow" aria-hidden="true" />
      <div className="ground-shadow" aria-hidden="true" />

      <div
        className="panel-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformOrigin: 'center center -30px',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <div className="panel-back" aria-hidden="true" />
        <div className="panel-top" aria-hidden="true" />
        <div className="panel-bottom" aria-hidden="true" />
        <div className="panel-left" aria-hidden="true" />
        <div className="panel-right" aria-hidden="true" />

        <div className="panel-face">
          <div className="panel-inner">
            <div className="panel-header">
              <div className="panel-title">
                <img src="/logo-monogram.svg" alt="" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                <span className="font-display text-[14px] font-semibold tracking-tight text-white/95">SNAP</span>
              </div>
              <span className="panel-version">beta</span>
            </div>

            <div className="panel-grid" role="group" aria-label="Panel SNAP - 12 akcji">
              {panelButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={(e) => handleButtonClick(btn, e)}
                  className={`panel-btn-3d ${activeButton === btn.id ? 'active' : ''}`}
                  aria-label={`${btn.label} - ${btn.status}`}
                  aria-pressed={activeButton === btn.id}
                >
                  <btn.Icon className="panel-btn-icon" />
                  <span className="panel-btn-label">{btn.label}</span>
                </button>
              ))}
            </div>

            <div
              ref={statusBarRef}
              className={`status-bar ${!statusVisible ? 'hidden' : ''}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {statusMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}