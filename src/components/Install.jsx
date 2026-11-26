import { useState } from 'react';
import { Copy, Check, Terminal, FolderOpen } from 'lucide-react';
import { useStaggeredScrollReveal } from '../hooks/useScrollReveal';

const EXTENSION_FOLDER = 'com.snap.g4sn10r';

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-ghost px-3 py-1.5 text-xs gap-1.5 absolute right-2 top-1/2 -translate-y-1/2"
      aria-label={label}
    >
      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
          <span>Skopiowano</span>
        </>
      ) : (
        'Kopiuj'
      )}
    </button>
  );
}

export default function Install() {
  const stepCount = 3;
  const { refs, visibilities } = useStaggeredScrollReveal(stepCount, {
    stagger: 80,
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  });

  return (
    <section id="install" className="section" aria-labelledby="install-title">
      <div className="container">
        <div className={`text-center max-w-3xl mx-auto mb-16 animate-scroll-reveal ${visibilities[0] ? '' : ''}`}>
          <span className="tag tag-accent mb-4 inline-block">INSTALACJA</span>
          <h2 id="install-title" className="heading-2 mb-4">
            3 KROKI DO{' '}
            <span className="text-gradient">URUCHOMIENIA</span>
          </h2>
          <p className="body-lg">
            Folder <code className="mono-base">{EXTENSION_FOLDER}</code> — macOS i Windows, After Effects 2019+.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5">
          {[
            {
              number: 1,
              icon: FolderOpen,
              title: 'Rozpakuj i skopiuj folder',
              desc: `Rozpakuj ZIP i skopiuj folder <code className="mono-base">{EXTENSION_FOLDER}</code> do katalogu rozszerzeń CEP.`,
              codes: [
                { text: '~/Library/Application Support/Adobe/CEP/extensions/', label: 'Kopiuj ścieżkę macOS' },
                { text: '%APPDATA%\\Adobe\\CEP\\extensions\\', label: 'Kopiuj ścieżkę Windows' },
              ],
              note: null,
            },
            {
              number: 2,
              icon: Terminal,
              title: 'Włącz tryb debugowania (PlayerDebugMode)',
              desc: 'Panel jest niepodpisany — After Effects wymaga trybu deweloperskiego.',
              codes: [
                { text: 'defaults write com.adobe.CSXS.12 PlayerDebugMode 1', label: 'Kopiuj komendę macOS' },
                { text: 'HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.12 → PlayerDebugMode = 1 (DWORD)', label: 'Kopiuj ścieżkę rejestru Windows' },
              ],
              note: <p className="body-sm text-white/35"><strong>Uwaga:</strong> Dla starszych wersji AE numer <code className="mono-base">12</code> może być niższy (np. <code className="mono-base">11</code> dla CC 2019).</p>,
            },
            {
              number: 3,
              icon: FolderOpen,
              title: 'Zrestartuj After Effects',
              desc: 'Zamknij i otwórz ponownie After Effects. Panel znajdziesz w menu.',
              codes: [
                { text: 'Window → Extensions (Legacy) → Snap', label: null },
              ],
              note: null,
            },
          ].map((step, index) => (
            <article
              key={step.number}
              ref={refs(index)}
              className={`relative group rounded-xl p-5 lg:p-6 transition-all duration-500 animate-float-gentle animate-scroll-reveal scroll-reveal-delay-${index + 1} ${visibilities[index] ? '' : ''}`}
              style={{ animationDelay: visibilities[index] ? '0ms' : undefined }}
            >
              <div className="flex items-start gap-5">
                <span className="step-badge flex-shrink-0">{step.number}</span>
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-center gap-2">
                    <step.icon className="w-5 h-5 text-accent-start" aria-hidden="true" />
                    <h3 className="heading-4">{step.title}</h3>
                  </div>
                  <p className="body-md">{step.desc}</p>
                  <div className="space-y-3">
                    {step.codes.map((code, codeIndex) => (
                      <div key={codeIndex} className="relative">
                        <code className="mono-base block bg-black/40 border border-border-subtle rounded-lg px-4 py-3 font-mono text-sm break-all pr-20">
                          {code.text}
                        </code>
                        {code.label && (
                          <CopyButton text={code.text} label={code.label} />
                        )}
                      </div>
                    ))}
                  </div>
                  {step.note}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}