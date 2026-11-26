import { useState } from 'react';
import { Copy, Check, Apple, Monitor, Terminal, FolderOpen } from 'lucide-react';

const EXTENSION_FOLDER = 'com.snap.g4sn10r';

const steps = {
  macos: [
    {
      number: 1,
      title: 'Rozpakuj i skopiuj folder',
      description:
        `Rozpakuj plik ZIP i skopiuj folder <code>${EXTENSION_FOLDER}</code> do katalogu rozszerzeń CEP.`,
      path: '~/Library/Application Support/Adobe/CEP/extensions/',
      command: null,
      icon: FolderOpen,
    },
    {
      number: 2,
      title: 'Włącz tryb debugowania',
      description:
        'W Terminalu wykonaj poniższą komendę (wymagane dla niepodpisanych paneli CEP).',
      path: null,
      command: 'defaults write com.adobe.CSXS.12 PlayerDebugMode 1',
      icon: Terminal,
    },
    {
      number: 3,
      title: 'Zrestartuj After Effects',
      description:
        'Zamknij i otwórz ponownie After Effects. Panel znajdziesz w menu.',
      path: null,
      command: null,
      icon: Apple,
      menuPath: 'Window → Extensions (Legacy) → Snap',
    },
  ],
  windows: [
    {
      number: 1,
      title: 'Rozpakuj i skopiuj folder',
      description:
        `Rozpakuj plik ZIP i skopiuj folder <code>${EXTENSION_FOLDER}</code> do katalogu rozszerzeń CEP.`,
      path: '%APPDATA%\\Adobe\\CEP\\extensions\\',
      command: null,
      icon: FolderOpen,
    },
    {
      number: 2,
      title: 'Włącz tryb debugowania w rejestrze',
      description:
        'Dodaj wartość DWORD <code>PlayerDebugMode = 1</code> w kluczu rejestru. Dla starszych wersji AE numer <code>12</code> może być niższy (np. <code>11</code>).',
      path: 'HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.12',
      command: 'PlayerDebugMode = 1 (DWORD)',
      icon: Terminal,
    },
    {
      number: 3,
      title: 'Zrestartuj After Effects',
      description:
        'Zamknij i otwórz ponownie After Effects. Panel znajdziesz w menu.',
      path: null,
      command: null,
      icon: Monitor,
      menuPath: 'Window → Extensions (Legacy) → Snap',
    },
  ],
};

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
      className="btn-ghost px-3 py-1.5 text-xs gap-1 absolute right-3 top-1/2 -translate-y-1/2"
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

export default function InstallSteps() {
  const [platform, setPlatform] = useState('macos');

  const currentSteps = steps[platform];

  return (
    <section id="install" className="section" aria-labelledby="install-title">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <span className="tag tag-accent mb-4 inline-block">KOMPATYBILNOŚĆ I INSTALACJA</span>
          <h2 id="install-title" className="heading-2 mb-4">
            3 KROKI DO{' '}
            <span className="text-gradient">URUCHOMIENIA</span>
          </h2>
          <p className="body-lg">
            Format rozszerzenia CEP (<code className="mono-base">{EXTENSION_FOLDER}</code>), przetestowane w <strong>After Effects 2026 na macOS</strong>.
            Manifest wspiera CEP 9+ / od CC 2019 wzwyż; opart na HTML/JS, działa również na Windows po włączeniu trybu debugowania.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-center gap-2 mb-10 bg-bg-card rounded-xl p-1 border border-border-subtle" role="tablist" aria-label="Wybierz system operacyjny">
            <button
              role="tab"
              aria-selected={platform === 'macos'}
              onClick={() => setPlatform('macos')}
              className={`tab-btn ${platform === 'macos' ? 'active' : ''}`}
              aria-controls="macos-panel"
              id="macos-tab"
            >
              <Apple className="w-4 h-4 mr-2" aria-hidden="true" />
              macOS
            </button>
            <button
              role="tab"
              aria-selected={platform === 'windows'}
              onClick={() => setPlatform('windows')}
              className={`tab-btn ${platform === 'windows' ? 'active' : ''}`}
              aria-controls="windows-panel"
              id="windows-tab"
            >
              <Monitor className="w-4 h-4 mr-2" aria-hidden="true" />
              Windows
            </button>
          </div>

          <div
            role="tabpanel"
            id={`${platform}-panel`}
            aria-labelledby={`${platform}-tab`}
            className="space-y-6"
          >
            {currentSteps.map((step, index) => (
              <article key={step.number} className="card relative overflow-hidden group animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent-start/20 border border-accent-start/30 flex items-center justify-center">
                    <span className="font-display text-2xl font-semibold text-accent-start">{step.number}</span>
                  </div>
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-center gap-2">
                      <step.icon className={`w-5 h-5 ${platform === 'macos' ? 'text-accent-start' : 'text-orange-400'}`} aria-hidden="true" />
                      <h3 className="heading-4">{step.title}</h3>
                    </div>
                    <p className="body-md">{step.description}</p>

                    {step.path && (
                      <div className="flex items-center gap-3 flex-wrap relative">
                        <div className="flex-1 min-w-[200px] relative pr-24">
                          <code className="mono-base block bg-bg-deep border border-border-subtle rounded-lg px-4 py-3 font-mono text-sm break-all">
                            {step.path}
                          </code>
                          <CopyButton text={step.path} label={`Kopiuj ścieżkę: ${step.path}`} />
                        </div>
                      </div>
                    )}

                    {step.command && (
                      <div className="flex items-center gap-3 flex-wrap relative">
                        <div className="flex-1 min-w-[200px] relative pr-24">
                          <code className="mono-base block bg-bg-deep border border-border-subtle rounded-lg px-4 py-3 font-mono text-sm break-all">
                            {step.command}
                          </code>
                          <CopyButton text={step.command} label={`Kopiuj komendę: ${step.command}`} />
                        </div>
                      </div>
                    )}

                    {step.menuPath && (
                      <div className="flex items-center gap-3 pt-2">
                        <code className="mono-base bg-bg-deep border border-border-subtle rounded-lg px-4 py-2 font-mono text-sm">
                          {step.menuPath}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-bg-card border border-border-subtle animate-fade-in delay-400">
            <h4 className="heading-4 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent-start" aria-hidden="true" />
              Ważne uwagi techniczne
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">• Panel jest <strong>niepodpisany</strong> — dlatego wymagany jest <code className="mono-base">PlayerDebugMode = 1</code>. Bez tego AE nie załaduje rozszerzenia.</li>
              <li className="flex items-start gap-2">• Działa na <strong>After Effects CC 2019+</strong> (CEP 9+). Na starszych wersjach numer wersji CSXS w rejestrze/Terminalu może być niższy (11, 10, 9).</li>
              <li className="flex items-start gap-2">• Na macOS: jeśli Gatekeeper blokuje, w Terminalu: <code className="mono-base">xattr -d com.apple.quarantine ~/Library/Application\\ Support/Adobe/CEP/extensions/{EXTENSION_FOLDER}</code></li>
              <li className="flex items-start gap-2">• Rozszerzenie oparte na HTML/JS (CEP) — nie wymaga UXP ani nowszych wersji AE.</li>
              <li className="flex items-start gap-2">• <strong>Ograniczenia:</strong> Solid/Adjustment nie uwzględnia parentingu ani warstw 3D (fallback: cała kompozycja). Każdy Solid dodaje plik do folderu <code className="mono-base">Solids</code> w panelu Project.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}