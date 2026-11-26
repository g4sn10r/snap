import { useState, useCallback } from 'react';
import { SnapIcons } from './SnapIcons';

const steps = [
  {
    number: '01',
    title: 'Solid i Adjustment pod zaznaczenie',
    description:
      'Tworzą się dokładnie tam, gdzie trzeba: dopasowane do rozmiaru, pozycji, skali i rotacji 2D zaznaczonej warstwy, nad nią i o jej długości. Bez zaznaczenia — na całą kompozycję.',
    icon: SnapIcons.Solid,
    accentColor: 'text-accent-start',
    details: [
      'Dopasowanie boundsów 2D (pozycja, skala, rotacja)',
      'Tworzenie warstwy nad zaznaczeniem, nie na dole stosu',
      'Długość = długość zaznaczonej warstwy',
      'Fallback: pełna kompozycja gdy nic nie jest zaznaczone',
    ],
  },
  {
    number: '02',
    title: 'Split na playheadzie',
    description:
      'Przecina zaznaczone warstwy (nawet wiele naraz) dokładnie w miejscu kursora czasu. Jedno kliknięcie zamiast menu lub skrótu. Jeśli playhead jest poza warstwą — nic się nie dzieje, brak błędu.',
    icon: SnapIcons.Split,
    accentColor: 'text-pink-400',
    details: [
      'Działa na wiele warstw jednocześnie',
      'Playhead musi być wewnątrz in/out warstwy',
      'Tworzy duplikat i dzieli na dwóch kluczach',
      'Zachowuje wszystkie keyframes i efekty',
    ],
  },
  {
    number: '03',
    title: 'In oraz Out — przycinanie do playheada',
    description:
      'Jednym kliknięciem przycinasz początek (In) lub koniec (Out) zaznaczonych warstw do bieżącej klatki. Szybsze niż przeciąganie krawędzi, działa na wiele warstw naraz.',
    icon: SnapIcons.In,
    accentColor: 'text-orange-400',
    details: [
      'In — przesuwa punkt startu do playheada',
      'Out — przesuwa punkt końca do playheada',
      'Działa na wszystkie zaznaczone warstwy',
      'Frame-perfect bez zoomowania osi czasu',
    ],
  },
  {
    number: '04',
    title: 'Nowe warstwy jednym kliknięciem',
    description:
      'Text, Shape, Light, Camera i Null Object — wszystkie pod ręką w siatce 4×3. Zero szukania w górnym menu Layer > New. Tworzysz i od razu pracujesz. Plus dup i comp z jednym cofnięciem.',
    icon: SnapIcons.Layers,
    accentColor: 'text-cyan-400',
    details: [
      'Text / Shape / Light / Camera / Null — 5 typów',
      'dup — duplikuje zaznaczenie (Cmd+D w jednym kliknięciu)',
      'comp — precompose zaznaczenia LUB nowa pusta kompozycja',
      'Każda akcja = 1 wpis w historii (Cmd+Z cofa całość)',
    ],
  },
  {
    number: '05',
    title: 'Jeden krok cofania i komunikaty po polsku',
    description:
      'Każda akcja panelu to pojedynczy wpis w historii undo — Cmd/Ctrl+Z cofa całość, nie krojenie po kawałku. Błędy (brak kompozycji, playhead poza warstwą) wyświetlane są po polsku, nie jako kody błędów.',
    icon: SnapIcons.Dup,
    accentColor: 'text-green-400',
    details: [
      'app.beginUndoGroup / endUndoGroup w każdej funkcji',
      'Cmd+Z cofa całą operację (split, trim, precompose, itd.)',
      'Alerty po polsku: "Zaznacz najpierw kompozycję", "Playhead poza warstwą"',
      'Brak crypticznych błędów ExtendScript dla użytkownika',
    ],
  },
];

const allButtons = [
  { name: 'text', Icon: SnapIcons.Text, label: 'text' },
  { name: 'solid', Icon: SnapIcons.Solid, label: 'solid' },
  { name: 'light', Icon: SnapIcons.Light, label: 'light' },
  { name: 'shape', Icon: SnapIcons.Shape, label: 'shape' },
  { name: 'split', Icon: SnapIcons.Split, label: 'split' },
  { name: 'null', Icon: SnapIcons.Null, label: 'null' },
  { name: 'camera', Icon: SnapIcons.Camera, label: 'camera' },
  { name: 'adj', Icon: SnapIcons.Adj, label: 'adj' },
  { name: 'dup', Icon: SnapIcons.Dup, label: 'dup' },
  { name: 'comp', Icon: SnapIcons.Comp, label: 'comp' },
  { name: 'in', Icon: SnapIcons.In, label: 'in' },
  { name: 'out', Icon: SnapIcons.Out, label: 'out' },
];

const stepTimelines = {
  '01': {
    layers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120, selected: true },
    ],
    playhead: 45,
    action: 'solid',
    afterLayers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120 },
      { id: 2, name: 'Solid', color: '#a855f7', start: 0, duration: 120, selected: true },
    ],
    afterPlayhead: 45,
  },
  '02': {
    layers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120, selected: true },
      { id: 2, name: 'Text Layer', color: '#7c5cff', start: 30, duration: 90, selected: true },
    ],
    playhead: 60,
    action: 'split',
    afterLayers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 60, selected: true },
      { id: 3, name: 'Video_01.mp4 copy', color: '#b58cff', start: 60, duration: 60, selected: true },
      { id: 2, name: 'Text Layer', color: '#7c5cff', start: 30, duration: 30, selected: true },
      { id: 4, name: 'Text Layer copy', color: '#7c5cff', start: 60, duration: 60, selected: true },
    ],
    afterPlayhead: 80,
  },
  '03': {
    layers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120, selected: true },
      { id: 2, name: 'Solid 1', color: '#a855f7', start: 30, duration: 90, selected: true },
    ],
    playhead: 75,
    action: 'trimIn',
    afterLayers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 75, duration: 45, selected: true },
      { id: 2, name: 'Solid 1', color: '#a855f7', start: 75, duration: 45, selected: true },
    ],
    afterPlayhead: 75,
  },
  '04': {
    layers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120 },
    ],
    playhead: 30,
    action: 'text',
    afterLayers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120 },
      { id: 2, name: 'Text', color: '#7c5cff', start: 30, duration: 90, selected: true },
    ],
    afterPlayhead: 30,
  },
  '05': {
    layers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120, selected: true },
      { id: 2, name: 'Text Layer', color: '#7c5cff', start: 30, duration: 90, selected: true },
    ],
    playhead: 45,
    action: 'undo',
    afterLayers: [
      { id: 1, name: 'Video_01.mp4', color: '#b58cff', start: 0, duration: 120, selected: true },
    ],
    afterPlayhead: 45,
  },
};

function MiniTimeline({ layers, playhead, className = '' }) {
  return (
    <div className={`relative aspect-video bg-bg-card border border-border-subtle rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      <div className="absolute left-3 right-3 top-3 h-px bg-white/10" />
      <div className="absolute left-3 right-3 top-3 h-px bg-white/10" style={{ top: '40%' }} />
      <div className="absolute left-3 right-3 top-3 h-px bg-white/10" style={{ top: '70%' }} />

      <div className="absolute left-3 top-3 right-3 bottom-3 flex items-end gap-1.5 p-3 pointer-events-none">
        {layers.map((layer) => {
          const isSelected = layer.selected;
          const widthPercent = (layer.duration / 120) * 100;
          const leftPercent = (layer.start / 120) * 100;
          return (
            <div
              key={layer.id}
              className={`relative h-10 rounded transition-all duration-400 ease-out-expo ${isSelected ? 'opacity-100 ring-2 ring-accent-start/50' : 'opacity-60'}`}
              style={{
                backgroundColor: layer.color,
                width: `${widthPercent}%`,
                marginLeft: `${leftPercent}%`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded" />
              <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] font-mono text-white/80 truncate block">
                {layer.name}
              </span>
              {isSelected && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-start border-1.5 border-bg-card" />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="playhead absolute top-3 bottom-3 w-px bg-accent-start/80 pointer-events-none"
        style={{ left: `calc(3.5% + ${(playhead / 120) * 93}%)` }}
        aria-hidden="true"
      >
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-t-[2px] bg-accent-start rotate-45" />
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-b-[2px] bg-accent-start rotate-45" />
      </div>

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-white/30">
        <span>0:00</span>
        <span>2:00</span>
      </div>
    </div>
  );
}

export default function FeaturesSteps() {
  const [activeStep, setActiveStep] = useState('01');
  const [showAfter, setShowAfter] = useState(false);

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
    setShowAfter(false);
    setTimeout(() => setShowAfter(true), 100);
  };

  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <span className="tag tag-accent mb-4 inline-block">CO DOKŁADNIE ROBI SNAP</span>
          <h2 id="features-title" className="heading-2 mb-4">
            5 FUNKCJI, KTÓRE ZAMIENIĄ{' '}
            <span className="text-gradient">TWÓJ WORKFLOW</span>
          </h2>
          <p className="body-lg">
            Żadnych ustawień, żadnych skrótów do nauki. Panel otwierasz, klikasz, masz efekt.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {steps.map((step, index) => {
            const timelineData = stepTimelines[step.number];
            const isActive = activeStep === step.number;

            return (
              <article
                key={step.number}
                className={`relative animate-slide-up ${isActive ? 'ring-1 ring-accent-start/20' : ''}`}
                style={{ animationDelay: `${(index + 1) * 80}ms` }}
              >
                <div className="absolute -top-4 -left-4 lg:-top-8 lg:-left-8 step-number" aria-hidden="true">
                  {step.number}
                </div>
                <div className="relative grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="step-badge">{step.number}</span>
                      <div className={`icon-wrapper ${step.accentColor}`}>
                        <step.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="heading-3 text-2xl lg:text-3xl font-semibold uppercase tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="body-md text-lg lg:text-base max-w-md">
                      {step.description}
                    </p>
                    <ul className="space-y-3 pt-2 border-t border-border-subtle">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-start/50 mt-2" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleStepClick(step.number)}
                      className={`btn-secondary w-full sm:w-auto mt-4 transition-all ${isActive ? 'bg-accent-start/20 border-accent-start/30' : ''}`}
                    >
                      {isActive ? 'Zobacz w akcji ✓' : 'Zobacz w akcji'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-white/40 text-xs font-mono">
                        <span>Przed</span>
                        <span>{showAfter ? 'Po kliknięciu' : 'Po kliknięciu'}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-4" role="region" aria-label={`Demonstracja: ${step.title}`}>
                        <div className="relative">
                          <MiniTimeline
                            layers={timelineData.layers}
                            playhead={timelineData.playhead}
                            className={isActive ? 'ring-1 ring-accent-start/30' : ''}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-bg-panel/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-mono text-white/50">
                              Kliknij przycisk powyżej
                            </div>
                          </div>
                        </div>
                        {isActive && showAfter && (
                          <div className="relative animate-slide-up" style={{ animationDelay: '150ms' }}>
                            <MiniTimeline
                              layers={timelineData.afterLayers}
                              playhead={timelineData.afterPlayhead}
                              className="ring-1 ring-accent-start/50"
                            />
                            <div className="absolute top-2 right-2 bg-accent-start/20 border border-accent-start/30 text-accent-start text-xs font-mono px-2 py-1 rounded">
                              {timelineData.action === 'undo' ? 'Cmd+Z' : timelineData.action.toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h3 className="heading-4 text-center mb-8">WSZYSTKIE 12 PRZYCISKÓW W JEDNYM MIEJSCU</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3 max-w-4xl mx-auto">
            {allButtons.map((item) => (
              <div
                key={item.name}
                className="panel-btn group p-4 text-center"
                style={{ aspectRatio: '1' }}
              >
                <item.Icon className="panel-btn-icon mx-auto mb-2 group-hover:text-accent-start" />
                <span className="panel-btn-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}