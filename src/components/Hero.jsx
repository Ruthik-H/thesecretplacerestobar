import { useEffect } from 'react';

export default function Hero() {

  const handleScrollToMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bgImage = isMobile
    ? "/assets/images/hero/hero-mobile.webp"
    : "/assets/images/hero/hero.webp";

  return (
    <section id="home" className="hero-entrance-section">
      
      {/* ── INSIDE THE PUB (Background & Atmosphere) ── */}
      <div className="hero-inside-world">
        <img
          src={bgImage}
          fetchpriority="high"
          alt="The Secret Place pub background"
          className="hero-inside-bg"
        />
        <div className="hero-inside-overlay" />
        
        {/* Atmosphere: Moving gold light beams & haze */}
        <div className="light-beam beam-1" />
        <div className="light-beam beam-2" />
        <div className="light-haze" />

        {/* The Text made of Glowing Gold Light Rays */}
        <div className="hero-inside-content">
          <div className="neon-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`particle p-${i}`} />
            ))}
          </div>
          
          <h1 className="light-ray-text">
            <span>The Secret</span>
            <br />
            <span className="light-ray-accent">Place</span>
          </h1>
          <p className="light-ray-sub">Restobar</p>
          
          <a href="#menu" className="hero-enter-btn" onClick={handleScrollToMenu}>
            Enter the Experience
          </a>
        </div>
      </div>

      {/* ══════════ STYLES ══════════ */}
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Base Section ── */
        .hero-entrance-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #030201; /* Fallback */
          overflow: hidden;
        }

        /* ── Background World (Inside) ── */
        .hero-inside-world {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-inside-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          transform: scale(1.1);
          filter: brightness(0.6) contrast(1.2) sepia(0.3) saturate(1.5);
        }
        .hero-inside-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 10%, rgba(3,2,1,0.9) 100%);
        }

        /* ── Dynamic Gold Lighting & Beams ── */
        .light-beam {
          position: absolute;
          top: -30%;
          width: 25vh;
          height: 150vh;
          background: linear-gradient(to bottom, rgba(212,175,55,0.25), transparent);
          filter: blur(25px);
          mix-blend-mode: screen;
          transform-origin: top center;
          opacity: 0.5;
        }
        .beam-1 {
          left: 15%;
          transform: rotate(20deg);
          animation: sweepBeam 9s infinite alternate ease-in-out;
        }
        .beam-2 {
          right: 20%;
          background: linear-gradient(to bottom, rgba(245,226,126,0.15), transparent);
          transform: rotate(-25deg);
          animation: sweepBeam 12s infinite alternate-reverse ease-in-out;
        }
        @keyframes sweepBeam {
          0% { transform: rotate(10deg) scaleY(1); opacity: 0.3; }
          100% { transform: rotate(30deg) scaleY(1.1); opacity: 0.7; }
        }

        .light-haze {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 50%;
          background: radial-gradient(ellipse at bottom, rgba(212,175,55,0.12) 0%, transparent 70%);
          filter: blur(50px);
          animation: hazePulse 5s infinite alternate;
        }
        @keyframes hazePulse {
          0% { opacity: 0.4; transform: scaleY(1); }
          100% { opacity: 0.9; transform: scaleY(1.2); }
        }

        /* ── Inside Typography (Gold Rays) ── */
        .hero-inside-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 10;
          opacity: 0;
          animation: entranceFadeUp 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes entranceFadeUp {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .light-ray-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 300;
          line-height: 1.1;
          
          /* Golden made-of-light effect */
          background: linear-gradient(120deg, #F5E27E, #D4AF37, #B8952E, #FFF2B2, #F5E27E);
          background-size: 200% auto;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmerColors 5s linear infinite;

          text-shadow: 
            0 0 10px rgba(212,175,55,0.5),
            0 0 30px rgba(245,226,126,0.3),
            0 0 60px rgba(184,149,46,0.2);
        }
        .light-ray-accent {
          font-style: italic;
          font-weight: 700;
          text-shadow: 
            0 0 20px rgba(245,226,126,0.7),
            0 0 50px rgba(212,175,55,0.5),
            0 0 100px rgba(184,149,46,0.3);
        }

        .light-ray-sub {
          font-family: sans-serif;
          font-size: clamp(0.7rem, 2vw, 1rem);
          letter-spacing: 0.6em;
          text-transform: uppercase;
          margin-top: 1.5rem;
          color: rgba(245,226,126,0.9);
          text-shadow: 0 0 10px rgba(212,175,55,0.7), 0 0 20px rgba(245,226,126,0.4);
        }

        /* Golden Particles floating around text */
        .neon-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #FFF;
          animation: floatUp 4s infinite ease-in;
          opacity: 0;
        }
        ${[...Array(15)].map((_, i) => `
          .p-${i} {
            left: ${10 + Math.random() * 80}%;
            top: ${40 + Math.random() * 40}%;
            animation-duration: ${3 + Math.random() * 4}s;
            animation-delay: ${Math.random() * 3}s;
            box-shadow: 0 0 ${10+Math.random()*15}px ${2+Math.random()*5}px ${['#D4AF37','#F5E27E','#B8952E'][i%3]};
          }
        `).join('')}
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }

        /* ── ENTER BUTTON (Smooth Scroll) ── */
        .hero-enter-btn {
          display: inline-block;
          margin-top: 3.5rem;
          padding: 1rem 3rem;
          font-family: sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #111;
          border: 1px solid rgba(212,175,55,0.6);
          background: linear-gradient(135deg, #D4AF37, #F5E27E, #B8952E);
          box-shadow: 0 0 20px rgba(212,175,55,0.3);
          transition: all 0.4s;
          text-decoration: none;
          cursor: pointer;
        }
        .hero-enter-btn:hover {
          box-shadow: 0 0 30px rgba(245,226,126,0.6);
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        /* Responsive constraints */
        @media (max-width: 768px) {
          .light-ray-text { font-size: clamp(2.5rem, 12vw, 4rem); }
          .light-beam { width: 30vw; }
        }
      `}} />
    </section>
  );
}
