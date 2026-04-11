import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import FoodShowcase from './components/FoodShowcase';
import Vibes from './components/Vibes';
import Menu from './components/Menu/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';

function App() {
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#E8E0CC] font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Required Note regarding image placements at the top (as requested by user) */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vibes />
        <Gallery />
        <FoodShowcase />
        <Menu />
        <Contact />
      </main>
      <FloatingCallButton />
      <Footer />
    </div>
  );
}

export default App;
