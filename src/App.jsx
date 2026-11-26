import HeroPanel from './components/HeroPanel';
import Install from './components/Install';
import Footer from './components/Footer';
import LogoRevealMenu from './components/LogoRevealMenu';

function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--bg-deep)]" />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
        poster="/comp-1.mp4"
      >
        <source src="/comp-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,3,5,0.95)] via-[rgba(3,3,5,0.8)] to-[rgba(3,3,5,0.95)]" />
      <div className="absolute inset-0 bg-radial-top animate-radial-breathe" />
    </div>
  );
}

function App() {
  return (
    <>
      <BackgroundVideo />
      <LogoRevealMenu />
      <main id="main-content" className="relative z-10">
        <HeroPanel />
        <Install />
        <Footer />
      </main>
    </>
  );
}

export default App;