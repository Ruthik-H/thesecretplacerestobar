import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DrinksShowcase from './DrinksShowcase';

/* ── Menu page images generated from PDFs ── */
const FOOD_PAGES   = [
  '/assets/images/menu/food-menu-page1.jpg',
  '/assets/images/menu/food-menu-page2.jpg',
];
const LIQUOR_PAGES = [
  '/assets/images/menu/liquor-menu-page1.jpg',
  '/assets/images/menu/liquor-menu-page2.jpg',
];

/* ────────────────────────────────────────────────────────── */
/*  Menu Lightbox                                              */
/* ────────────────────────────────────────────────────────── */
function MenuLightbox({ pages, startIndex = 0, onClose }) {
  const [idx, setIdx]     = useState(startIndex);
  const touchStartX       = useRef(null);

  const prev = useCallback(() => setIdx((i) => (i - 1 + pages.length) % pages.length), [pages]);
  const next = useCallback(() => setIdx((i) => (i + 1) % pages.length), [pages]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50)  next();
    if (delta < -50) prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="mlb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* image */}
      <motion.div
        key={idx}
        className="mlb-img-wrap"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={pages[idx]}
          alt={`Menu page ${idx + 1}`}
          className="mlb-img"
          draggable={false}
        />
      </motion.div>

      {/* Close */}
      <button className="mlb-btn mlb-close" onClick={onClose} aria-label="Close">✕</button>

      {/* Prev / Next — only show if more than 1 page */}
      {pages.length > 1 && (
        <>
          <button className="mlb-btn mlb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
          <button className="mlb-btn mlb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
        </>
      )}

      {/* Counter */}
      {pages.length > 1 && (
        <div className="mlb-counter">Page {idx + 1} of {pages.length}</div>
      )}

      {/* Dots */}
      {pages.length > 1 && (
        <div className="mlb-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`mlb-dot${i === idx ? ' mlb-dot-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            />
          ))}
        </div>
      )}

      <style>{`
        .mlb-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.96);
          display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .mlb-img-wrap {
          position: relative;
          max-width: 92vw;
          max-height: 90vh;
          display: flex; align-items: center; justify-content: center;
          cursor: default;
        }
        .mlb-img {
          max-width: 92vw;
          max-height: 90vh;
          width: auto; height: auto;
          object-fit: contain;
          border-radius: 0.75rem;
          box-shadow: 0 0 80px rgba(212,175,55,0.15);
          display: block;
          user-select: none;
        }
        .mlb-btn {
          position: fixed;
          background: rgba(30,30,30,0.88);
          border: 1px solid rgba(212,175,55,0.35);
          color: #D4AF37; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          z-index: 10001;
        }
        .mlb-btn:hover { background: rgba(212,175,55,0.18); }
        .mlb-close {
          top: 1.2rem; right: 1.4rem;
          width: 42px; height: 42px; border-radius: 50%;
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .mlb-prev, .mlb-next {
          top: 50%; transform: translateY(-50%);
          width: 48px; height: 64px; font-size: 2rem; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          border-radius: 0.5rem;
        }
        .mlb-prev:hover { transform: translateY(-50%) scale(1.08); }
        .mlb-next:hover { transform: translateY(-50%) scale(1.08); }
        .mlb-prev { left: 1rem; }
        .mlb-next { right: 1rem; }
        .mlb-counter {
          position: fixed; top: 1.3rem; left: 50%; transform: translateX(-50%);
          color: rgba(212,175,55,0.75); font-family: sans-serif;
          font-size: 0.8rem; letter-spacing: 0.15em; z-index: 10001;
        }
        .mlb-dots {
          position: fixed; bottom: 1.4rem; left: 50%; transform: translateX(-50%);
          display: flex; gap: 0.5rem; z-index: 10001;
        }
        .mlb-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(212,175,55,0.3);
          border: none; cursor: pointer; padding: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .mlb-dot-active { background: #D4AF37; transform: scale(1.4); }
        @media (max-width: 560px) {
          .mlb-prev { left: 0.4rem; }
          .mlb-next { right: 0.4rem; }
        }
      `}</style>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Menu Section                                               */
/* ────────────────────────────────────────────────────────── */
export default function Menu() {
  const [activeLb, setActiveLb] = useState(null); // 'food' | 'liquor' | null

  return (
    <section id="menu" className="relative py-28 lg:py-40 bg-[#0B0B0B] overflow-hidden border-t border-[#D4AF37]/10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">A Taste of Luxury</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
            Menu <span className="gold-gradient italic font-semibold">Experience</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="flex flex-col gap-24 lg:gap-32">

          {/* ── FOOD MENU ── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Cover image — opens lightbox */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.6)] aspect-square lg:aspect-[4/3] border border-[#D4AF37]/20 cursor-pointer"
              onClick={() => setActiveLb('food')}
            >
              <div className="absolute inset-0 bg-[#0B0B0B]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src="/assets/images/menu/food-cover.png"
                alt="Food Menu Preview"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-[#D4AF37]/50 text-[#D4AF37] font-sans text-sm tracking-widest uppercase">
                  View Menu
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 tracking-wide">Food Menu</h3>
              <p className="font-sans text-[#E8E0CC]/70 text-lg md:text-xl leading-relaxed mb-10 border-l border-[#D4AF37]/50 pl-6">
                Explore a curated selection of flavors crafted to satisfy every craving — from rich Indian delicacies to global favorites, all served in a vibrant and elegant setting.
              </p>
              <div>
                <button
                  onClick={() => setActiveLb('food')}
                  className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-sm md:text-base tracking-widest uppercase hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300"
                >
                  View Food Menu
                </button>
              </div>
            </motion.div>
          </div>

          {/* ── LIQUOR MENU ── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Cover image — opens lightbox */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.6)] aspect-square lg:aspect-[4/3] border border-[#D4AF37]/20 cursor-pointer"
              onClick={() => setActiveLb('liquor')}
            >
              <div className="absolute inset-0 bg-[#0B0B0B]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src="/assets/images/menu/liquor-cover.png"
                alt="Liquor Menu Preview"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-[#D4AF37]/50 text-[#D4AF37] font-sans text-sm tracking-widest uppercase">
                  View Menu
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 tracking-wide">Liquor Menu</h3>
              <p className="font-sans text-[#E8E0CC]/70 text-lg md:text-xl leading-relaxed mb-10 border-l border-[#D4AF37]/50 pl-6">
                Discover an exclusive collection of spirits, brews, and crafted blends — perfectly paired to elevate your experience and set the mood for every occasion.
              </p>
              <div>
                <button
                  onClick={() => setActiveLb('liquor')}
                  className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-sm md:text-base tracking-widest uppercase hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300"
                >
                  View Liquor Menu
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* SIGNATURE DRINKS SECTION */}
        <DrinksShowcase />
      </div>

      {/* ── Lightboxes ── */}
      <AnimatePresence>
        {activeLb === 'food' && (
          <MenuLightbox
            key="food-lb"
            pages={FOOD_PAGES}
            startIndex={0}
            onClose={() => setActiveLb(null)}
          />
        )}
        {activeLb === 'liquor' && (
          <MenuLightbox
            key="liquor-lb"
            pages={LIQUOR_PAGES}
            startIndex={0}
            onClose={() => setActiveLb(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
