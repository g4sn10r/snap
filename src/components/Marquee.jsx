const marqueeItems = [
  { text: '1 KLIKNIĘCIE ZAMIAST MENU', icon: '⌘' },
  { text: 'JEDEN KROK COFANIA (CMD/CTRL+Z)', icon: '↶' },
  { text: 'SMART SOLID & ADJUSTMENT', icon: '▣' },
  { text: 'SZYBKI SPLIT & TRIM', icon: '✂' },
  { text: '100% DARMOWY', icon: '★' },
  { text: 'ZERO SKRÓTÓW DO ZAPAMIĘTANIA', icon: '○' },
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-border-subtle py-4 bg-bg-deep/50" aria-hidden="true">
      <div className="animate-marquee flex whitespace-nowrap will-change-transform">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="marquee-content px-8">
            <span className="marquee-item">
              <span className="marquee-dot" aria-hidden="true" />
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}