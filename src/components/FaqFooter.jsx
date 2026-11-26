import { useState } from 'react';
import { Download, ChevronDown, Check, FileCode, FolderOpen, ExternalLink } from 'lucide-react';

const EXTENSION_FOLDER = 'com.snap.g4sn10r';

const faqs = [
  {
    question: 'Dlaczego muszę włączać PlayerDebugMode?',
    answer:
      'SNAP to niepodpisany panel CEP. Adobe domyślnie blokuje ładowanie niepodpisanych rozszerzeń z powodów bezpieczeństwa. Włączenie <code className="mono-base">PlayerDebugMode = 1</code> mówi AE: "ufaj temu panelowi w trybie deweloperskim". To standardowa procedura dla wszystkich darmowych paneli CEP nieprzesłanych do Adobe Exchange.',
  },
  {
    question: 'Czy SNAP działa na starszych wersjach After Effects (CC 2019, 2020, 2021)?',
    answer:
      'Tak. Manifest panelu wspiera CEP 9+, co oznacza kompatybilność z After Effects CC 2019 (wersja 16.0) i nowszymi. Na starszych wersjach numer w ścieżce rejestru/Terminalu (<code className="mono-base">CSXS.12</code>) może być niższy — np. <code className="mono-base">CSXS.11</code> dla CC 2019, <code className="mono-base">CSXS.10</code> dla CC 2018. Jeśli panel się nie ładuje, spróbuj zmienić numer na mniejszy.',
  },
  {
    question: 'Czy Smart Solid i Adjustment Layer działają z parentingu i warstwami 3D?',
    answer:
      '<strong>Obecnie nie.</strong> Dopasowanie rozmiaru, pozycji, skali i rotacji działa tylko dla transformacji 2D bez parentingu. Jeśli warstwa ma rodzica lub jest warstwą 3D, Solid/Adjustment zostanie utworzony na całą kompozycję (fallback). To znane ograniczenie API CEP/ExtendScript — w przyszłych wersjach postaramy się to poprawić.',
  },
  {
    question: 'Dlaczego każde utworzenie Solida dodaje element do folderu "Solids" w panelu Project?',
    answer:
      'To zachowanie natywnego API After Effects (<code className="mono-base">app.project.items.addSolid()</code>). Każde wywołanie tworzy nowy plik Solid w projekcie. Nie da się tego ominąć w ramach CEP. Jeśli tworzysz dużo solidów, warto czasem posprzątać folder "Solids" — SNAP nie robi tego automatycznie, by nie usuwać przypadkowo używanych assetów.',
  },
  {
    question: 'Czy mogę edytować panel / dodać własne przyciski?',
    answer:
      'Tak! Panel to zwykły HTML/JS/CSS w folderze <code className="mono-base">' + EXTENSION_FOLDER + '</code>. Otwórz <code className="mono-base">index.html</code> i <code className="mono-base">host/host.jsx</code> — możesz dodawać własne przyciski, zmieniać ikony, układ siatki. Kod jest prosty i czytelny. Jeśli stworzisz coś fajnego, ślij PR na GitHub!',
  },
  {
    question: 'Czy SNAP zbiera jakiekolwiek dane / wymaga konta / ma ukryte koszty?',
    answer:
      'Absolutnie nie. SNAP jest <strong>w 100% darmowy</strong>, open source, działa w pełni offline, nie łączy się z internetem, nie wymaga logowania, nie trackuje użytkowania. Zero telemetrii, zero kont, zero subskrypcji. Pobierasz ZIP, instalujesz, używasz.',
  },
];

export default function FaqFooter() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <section id="download" className="section border-y border-border-subtle" aria-labelledby="download-title">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <article className="download-card text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-start/5 via-transparent to-accent-end/5" aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-start to-accent-end" aria-hidden="true" />

              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                  DOSTĘPNY TERAZ
                </div>

                <h2 id="download-title" className="heading-2">
                  SNAP v1.0 — Darmowe rozszerzenie CEP
                </h2>

                <p className="body-lg max-w-xl mx-auto">
                  12 najczęstszych akcji w jednym panelu. Zero skrótów do zapamiętania. Instalacja w 3 minutach.
                </p>

                <a
                  href="./snap-v1.zip"
                  download
                  className="btn-primary group inline-flex"
                >
                  <Download className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  Pobierz SNAP (ZIP)
                </a>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <FileCode className="w-5 h-5" aria-hidden="true" />
                    <span><code className="mono-base">{EXTENSION_FOLDER}</code> folder</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <FolderOpen className="w-5 h-5" aria-hidden="true" />
                    <span>Instrukcja instalacji (TXT)</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                    <span>v1.0.0 · Listopad 2026</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <span className="tag tag-accent mb-4 inline-block">PYTANIA I ODPOWIEDZI</span>
              <h2 id="faq-title" className="heading-2 mb-4">
                FAQ — WSZYSTKO, CO{' '}
                <span className="text-gradient">CHCESZ WIEDZIEĆ</span>
              </h2>
              <p className="body-lg">
                Nie ma pytań głupich. Tylko takie, na które jeszcze nie odpowiedzieliśmy.
              </p>
            </div>

            <div className="space-y-0 animate-slide-up" style={{ animationDelay: '200ms' }} role="region" aria-label="Najczęstsze pytania">
              {faqs.map((faq, index) => (
                <article key={index} className="faq-item">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="faq-question"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="font-ui text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`faq-answer ${openIndex === index ? 'open' : ''}`}
                  >
                    <div className="faq-answer-content">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle bg-bg-deep/50" role="contentinfo">
        <div className="container py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-6">
              <a href="#" className="font-display text-2xl font-semibold uppercase tracking-tighter text-white hover:text-accent-start transition-colors">
                SNAP
              </a>
              <p className="body-md max-w-xs">
                Darmowe rozszerzenie CEP do Adobe After Effects. 12 najczęstszych akcji w jednym panelu. Zero skrótów do zapamiętania.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost p-2" aria-label="GitHub">
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="#download" className="btn-ghost p-2" aria-label="Pobierz">
                  <Download className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                <nav className="space-y-3" aria-label="Nawigacja">
                  <h4 className="label mb-2">NAWIGACJA</h4>
                  <ul className="space-y-2">
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">Funkcje</a></li>
                    <li><a href="#audience" className="body-sm hover:text-white transition-colors">Dla kogo</a></li>
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">Instalacja</a></li>
                    <li><a href="#faq" className="body-sm hover:text-white transition-colors">FAQ</a></li>
                  </ul>
                </nav>

                <nav className="space-y-3" aria-label="Funkcje">
                  <h4 className="label mb-2">FUNKCJE</h4>
                  <ul className="space-y-2">
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">Solid & Adj pod zaznaczenie</a></li>
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">Split na playheadzie</a></li>
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">In / Out Trim</a></li>
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">Nowe warstwy 1-click</a></li>
                    <li><a href="#features" className="body-sm hover:text-white transition-colors">Dup & Comp</a></li>
                  </ul>
                </nav>

                <nav className="space-y-3" aria-label="Kompatybilność">
                  <h4 className="label mb-2">KOMPATYBILNOŚĆ</h4>
                  <ul className="space-y-2">
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">AE 2019+ (CEP 9+)</a></li>
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">macOS 12+</a></li>
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">Windows 10/11</a></li>
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">Niepodpisany panel</a></li>
                  </ul>
                </nav>

                <nav className="space-y-3" aria-label="Pomoc">
                  <h4 className="label mb-2">POMOC</h4>
                  <ul className="space-y-2">
                    <li><a href="#faq" className="body-sm hover:text-white transition-colors">Częste pytania</a></li>
                    <li><a href="#install" className="body-sm hover:text-white transition-colors">Instrukcja instalacji</a></li>
                    <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="body-sm hover:text-white transition-colors flex items-center gap-1">
                      Zgłoś błąd
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a></li>
                    <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="body-sm hover:text-white transition-colors flex items-center gap-1">
                      Kod źródłowy
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="body-sm text-white/40">
              SNAP v1.0 — Darmowe rozszerzenie CEP do Adobe After Effects. Nieoficjalne, niezależne, open source.
            </p>
            <div className="flex items-center gap-6 text-white/30 text-xs font-mono">
              <span>CC 2019+</span>
              <span>CEP 9+</span>
              <span>HTML/JS</span>
              <span className="text-accent-start">100% FREE</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}