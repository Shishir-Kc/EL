import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import Terminal from './components/Terminal';
import Architecture from './components/Architecture';
import Install from './components/Install';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Features />
      <Terminal />
      <Architecture />
      <Install />
      <Footer />
    </main>
  );
}
