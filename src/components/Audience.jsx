import { Smartphone, GraduationCap, ArrowRightLeft, Zap, Brain, MousePointer, Keyboard, Layers, Scissors, Clock } from 'lucide-react';

const audiences = [
  {
    icon: Smartphone,
    title: 'Montażysci krótkich form',
    subtitle: 'TikTok / Reels / Shorts',
    description:
      'Szybkie cięcie, adjustment layery i null objecty bez odrywania ręki od myszki. Kiedy każda sekunda liczy się, SNAP daje Ci przewagę.',
    features: [
      { icon: Zap, text: 'Split na playheadzie w ułamku sekundy' },
      { icon: Layers, text: 'Smart Adjustment Layer pod zaznaczenie' },
      { icon: Clock, text: 'In/Out Trim bez przeciągania krawędzi' },
    ],
    accentColor: 'text-pink-400',
    borderColor: 'border-pink-400/30',
    bgColor: 'bg-pink-400/5',
    iconBg: 'bg-pink-400/10',
  },
  {
    icon: GraduationCap,
    title: 'Początkujący w After Effects',
    subtitle: 'Bez nauki dziesiątek skrótów',
    description:
      'Pełna kontrola nad warstwami bez uczenia się kilkudziesięciu skrótów klawiszowych. Wszystko widoczne, wszystko jedno kliknięcie.',
    features: [
      { icon: Brain, text: 'Zero skrótów do zapamiętania' },
      { icon: MousePointer, text: 'Wszystkie 12 akcji widoczne na raz' },
      { icon: Scissors, text: 'Błędy po polsku, nie kody błędów' },
    ],
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
    bgColor: 'bg-cyan-400/5',
    iconBg: 'bg-cyan-400/10',
  },
  {
    icon: ArrowRightLeft,
    title: 'Przechodzący z Premiere Pro',
    subtitle: 'Brakujące przyciski w AE',
    description:
      'Brakujące w After Effects przyciski szybkiego cięcia (split) i przycinania (in/out) zawsze pod ręką. Pamiętaj tylko, że to nie Premiere — tu działa inaczej.',
    features: [
      { icon: Scissors, text: 'Split = Ctrl+K jak w Premiere' },
      { icon: Keyboard, text: 'In/Out Trim = Q/W intuicyjnie' },
      { icon: Layers, text: 'Null Object i Camera jednym kliknięciem' },
    ],
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-400/30',
    bgColor: 'bg-orange-400/5',
    iconBg: 'bg-orange-400/10',
  },
];

export default function Audience() {
  return (
    <section id="audience" className="section border-y border-border-subtle" aria-labelledby="audience-title">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <span className="tag tag-accent mb-4 inline-block">DLA KOGO JEST SNAP</span>
          <h2 id="audience-title" className="heading-2 mb-4">
            NARZĘDZIE, KTÓRE{' '}
            <span className="text-gradient">DOPASOWUJE SIĘ DO CIEBIE</span>
          </h2>
          <p className="body-lg">
            Nie zmuszasz się do nowego workflow — SNAP wpisuje się w to, które już masz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <article
              key={audience.title}
              className={`card relative overflow-hidden animate-slide-up ${audience.borderColor} ${audience.bgColor}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-transparent via-accent-start/5 to-transparent pointer-events-none" aria-hidden="true" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center ${audience.iconBg} ${audience.accentColor}`}>
                    <audience.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="heading-4">{audience.title}</h3>
                    <p className="text-white/40 text-sm font-mono uppercase tracking-wider">{audience.subtitle}</p>
                  </div>
                </div>
                <p className="body-md">{audience.description}</p>
                <ul className="space-y-3 pt-2 border-t border-border-subtle">
                  {audience.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 ${audience.iconBg} ${audience.accentColor}`}>
                        <feature.icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="body-sm pt-1">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}