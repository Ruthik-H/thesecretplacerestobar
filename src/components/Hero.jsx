import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const isMobile = window.innerWidth < 768;
  const bgImage = isMobile
    ? "/assets/images/hero/hero-mobile.webp"
    : "/assets/images/hero/hero.webp";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* HERO BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat origin-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundColor: '#0B0B0B', /* Fallback while image loads */
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Dark + gold tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />

      {/* Animated gold particles and blurred circular elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating blurred orbs */}
        <motion.div 
          className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]"
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div 
          className="absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]"
          animate={{ x: [0, -80, 40, 0], y: [0, 80, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ bottom: '20%', right: '15%' }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent"
            style={{
              left: `${8 + i * 8}%`,
              top: `${Math.random() * 60 + 10}%`,
            }}
            animate={{ opacity: [0, 1, 0], y: [-20, 20, -20] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Tagline above */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-sans text-xs text-[#D4AF37]/80 tracking-[0.4em] uppercase mb-6"
        >
          ✦ Bangalore's Finest ✦
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight"
        >
          The Secret
          <br />
          <span className="gold-gradient font-semibold italic">Place</span>
        </motion.h1>

        {/* Sub-brand */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-sans text-sm text-[#D4AF37]/60 tracking-[0.5em] uppercase mb-8"
        >
          Restobar
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="section-divider mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-serif italic text-xl sm:text-2xl text-[#E8E0CC]/80 mb-10"
        >
          Where Taste Meets Vibe
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="group px-10 py-4 gold-gradient-bg text-black font-sans text-sm font-semibold tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#D4AF37]/50"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
