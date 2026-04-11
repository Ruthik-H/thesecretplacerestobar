import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const foodPhotos = [
  { id: 1,  src: '/assets/images/foodshowcase/food1.webp' },
  { id: 2,  src: '/assets/images/foodshowcase/food2.webp' },
  { id: 3,  src: '/assets/images/foodshowcase/food3.webp' },
  { id: 4,  src: '/assets/images/foodshowcase/food4.webp' },
  { id: 5,  src: '/assets/images/foodshowcase/food5.webp' },
  { id: 6,  src: '/assets/images/foodshowcase/food6.webp' },
  { id: 7,  src: '/assets/images/foodshowcase/food7.webp' },
  { id: 8,  src: '/assets/images/foodshowcase/food8.webp' },
  { id: 9,  src: '/assets/images/foodshowcase/food9.webp' },
  { id: 10, src: '/assets/images/foodshowcase/new1.webp' },
  { id: 11, src: '/assets/images/foodshowcase/new2.webp' },
  { id: 12, src: '/assets/images/foodshowcase/new3.webp' },
  { id: 13, src: '/assets/images/foodshowcase/new4.webp' },
  { id: 14, src: '/assets/images/foodshowcase/new5.webp' },
  { id: 15, src: '/assets/images/foodshowcase/new6.webp' },
  { id: 16, src: '/assets/images/foodshowcase/new7.webp' },
];

/* ────────────────────────────────────────────────────────── */
/*  Lightbox with swipe + keyboard navigation                 */
/* ────────────────────────────────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = foodPhotos[index];

  /* touch-swipe */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50)  onNext();
    if (delta < -50) onPrev();
    touchStartX.current = null;
  };

  /* keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, onClose]);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="lb-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* image container — stops click propagation so clicking image doesn't close */}
        <motion.div
          className="lb-img-wrap"
          key={index}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={`Food image ${index + 1}`}
            className="lb-img"
            draggable={false}
          />
        </motion.div>

        {/* Close */}
        <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Prev */}
        <button
          className="lb-btn lb-prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >‹</button>

        {/* Next */}
        <button
          className="lb-btn lb-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >›</button>

        {/* Counter */}
        <div className="lb-counter">{index + 1} / {foodPhotos.length}</div>

        {/* Dot indicators */}
        <div className="lb-dots">
          {foodPhotos.map((_, i) => (
            <button
              key={i}
              className={`lb-dot${i === index ? ' lb-dot-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); /* jump handled via onPrev/onNext chain */ }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Single grid card                                           */
/* ────────────────────────────────────────────────────────── */
function FoodCard({ photo, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [hovered, setHovered] = useState(false);

  const directions = [
    { x: -60, y: 0 }, { x: 60,  y: 0 }, { x: 0,   y: 50 },
    { x: -60, y: 0 }, { x: 60,  y: 0 }, { x: 0,   y: 50 },
    { x: -60, y: 0 }, { x: 60,  y: 0 }, { x: 0,   y: 40 },
  ];
  const dir = directions[index] ?? { x: 0, y: 40 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="food-card-wrapper"
      onClick={() => onOpen(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="food-card-img-wrap">
        <motion.img
          src={photo.src}
          alt={`Food image ${index + 1}`}
          loading="lazy"
          decoding="async"
          animate={{ scale: hovered ? 1.07 : 1, z: 0 }}
          style={{ WebkitTransform: 'translateZ(0)' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="food-card-img"
        />
        <div className="food-card-vignette" />
        <motion.div
          className="food-card-glow"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        {/* zoom hint icon */}
        <motion.div
          className="food-card-zoom-hint"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >⊕</motion.div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Section                                                    */
/* ────────────────────────────────────────────────────────── */
export default function FoodShowcase() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openAt  = useCallback((i) => setLightboxIndex(i), []);
  const closeLb = useCallback(() => setLightboxIndex(null), []);
  const prevImg = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + foodPhotos.length) % foodPhotos.length), []);
  const nextImg = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % foodPhotos.length), []);

  return (
    <section id="food-showcase" ref={sectionRef} className="food-showcase-section">

      <motion.div className="food-blob food-blob-1" style={{ y: bgY }} />
      <motion.div className="food-blob food-blob-2" style={{ y: bgY }} />

      {/* ── Header ── */}
      <motion.div
        ref={headRef}
        className="food-header"
        initial={{ opacity: 0, y: 40 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <p className="food-eyebrow">Delicious &amp; Fresh</p>
        <h2 className="food-heading">
          Good Food,{' '}
          <span className="food-heading-accent">
            Good Mood
            <svg className="food-underline-svg" viewBox="0 0 300 18" preserveAspectRatio="none">
              <path d="M0,14 Q75,0 150,10 Q225,20 300,6" stroke="#D4AF37" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </h2>
        <p className="food-subtext">
          Every plate tells a story. Savour the craft behind every bite at The Secret Place.
        </p>
        <div className="food-divider">
          <span className="food-divider-line" />
          <span className="food-divider-icon">✦</span>
          <span className="food-divider-line" />
        </div>
      </motion.div>

      {/* ── Bento Grid ── */}
      <div className="food-grid">
        {foodPhotos.map((photo, i) => (
          <FoodCard key={photo.id} photo={photo} index={i} onOpen={openAt} />
        ))}
      </div>

      {/* ── Footer quote ── */}
      <motion.p
        className="food-quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        "Where every meal is a memory."
      </motion.p>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLb}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}

      <style>{`
        /* ── Section ── */
        .food-showcase-section {
          position: relative;
          padding: 4rem 1.5rem 3.5rem;
          background: #080808;
          overflow: hidden;
        }

        /* ── Blobs ── */
        .food-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none; z-index: 0;
        }
        .food-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
          top: -100px; right: -100px;
        }
        .food-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
          bottom: 0; left: -80px;
        }

        /* ── Header ── */
        .food-header {
          position: relative; z-index: 1; text-align: center;
          margin-bottom: 2.5rem; max-width: 700px;
          margin-left: auto; margin-right: auto;
        }
        .food-eyebrow {
          font-family: sans-serif; font-size: 0.65rem;
          letter-spacing: 0.42em; text-transform: uppercase;
          color: #D4AF37; margin-bottom: 0.9rem;
        }
        .food-heading {
          font-family: serif; font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 300; color: #fff; letter-spacing: 0.02em;
          line-height: 1.15; margin-bottom: 0.9rem;
        }
        .food-heading-accent {
          position: relative; display: inline-block;
          font-style: italic; font-weight: 600;
          background: linear-gradient(135deg, #D4AF37 0%, #F5E27E 50%, #B8952E 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .food-underline-svg {
          position: absolute; bottom: -8px; left: 0;
          width: 100%; height: 18px; overflow: visible;
        }
        .food-subtext {
          font-family: sans-serif; font-size: 0.9rem;
          color: rgba(232,224,204,0.65); line-height: 1.7;
          max-width: 480px; margin: 0 auto 1.4rem;
        }
        .food-divider {
          display: flex; align-items: center; justify-content: center; gap: 0.8rem;
        }
        .food-divider-line {
          display: block; width: 60px; height: 1px;
          background: linear-gradient(to right, transparent, #D4AF37, transparent);
        }
        .food-divider-icon { color: #D4AF37; font-size: 0.65rem; }

        /* ── Bento Grid ── */
        .food-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 180px;
          gap: 0.6rem;
          max-width: 960px;
          margin: 0 auto;
        }
        .food-grid > div:nth-child(1) { grid-column: span 2; }
        .food-grid > div:nth-child(2) { grid-column: span 1; }
        .food-grid > div:nth-child(3) { grid-column: span 1; }
        .food-grid > div:nth-child(4) { grid-column: span 1; }
        .food-grid > div:nth-child(5) { grid-column: span 1; }
        .food-grid > div:nth-child(6) { grid-column: span 2; }
        .food-grid > div:nth-child(7) { grid-column: span 1; }
        .food-grid > div:nth-child(8) { grid-column: span 1; }
        .food-grid > div:nth-child(9) { grid-column: span 2; }
        .food-grid > div:nth-child(10) { grid-column: span 1; }
        .food-grid > div:nth-child(11) { grid-column: span 1; }
        .food-grid > div:nth-child(12) { grid-column: span 1; }
        .food-grid > div:nth-child(13) { grid-column: span 2; }
        .food-grid > div:nth-child(14) { grid-column: span 1; }
        .food-grid > div:nth-child(15) { grid-column: span 1; }
        .food-grid > div:nth-child(16) { grid-column: span 2; }

        /* ── Card ── */
        .food-card-wrapper {
          position: relative; border-radius: 0.75rem;
          overflow: hidden; cursor: pointer; background: #111;
        }
        .food-card-img-wrap { position: absolute; inset: 0; }
        .food-card-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; will-change: transform;
        }
        .food-card-vignette {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%);
          pointer-events: none;
        }
        .food-card-glow {
          position: absolute; inset: 0; border-radius: 0.75rem;
          box-shadow: inset 0 0 0 2px rgba(212,175,55,0.65);
          pointer-events: none;
        }
        .food-card-zoom-hint {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem; color: rgba(212,175,55,0.85);
          pointer-events: none; text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }

        /* ── Lightbox ── */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.95);
          display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .lb-img-wrap {
          position: relative;
          max-width: 92vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .lb-img {
          max-width: 92vw;
          max-height: 90vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 0.75rem;
          box-shadow: 0 0 80px rgba(212,175,55,0.12);
          display: block;
          user-select: none;
        }

        /* nav / close buttons */
        .lb-btn {
          position: fixed;
          background: rgba(30,30,30,0.85);
          border: 1px solid rgba(212,175,55,0.35);
          color: #D4AF37;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          z-index: 10001;
        }
        .lb-btn:hover { background: rgba(212,175,55,0.18); transform: scale(1.08); }

        .lb-close {
          top: 1.2rem; right: 1.4rem;
          width: 42px; height: 42px;
          border-radius: 50%;
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .lb-prev, .lb-next {
          top: 50%; transform: translateY(-50%);
          width: 48px; height: 64px;
          font-size: 2rem; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          border-radius: 0.5rem;
        }
        .lb-prev:hover { transform: translateY(-50%) scale(1.08); }
        .lb-next:hover { transform: translateY(-50%) scale(1.08); }
        .lb-prev { left: 1rem; }
        .lb-next { right: 1rem; }

        /* counter */
        .lb-counter {
          position: fixed; top: 1.3rem; left: 50%; transform: translateX(-50%);
          color: rgba(212,175,55,0.7);
          font-family: sans-serif; font-size: 0.8rem; letter-spacing: 0.15em;
          z-index: 10001;
        }

        /* dot indicators */
        .lb-dots {
          position: fixed; bottom: 1.4rem; left: 50%; transform: translateX(-50%);
          display: flex; gap: 0.45rem; z-index: 10001;
        }
        .lb-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(212,175,55,0.3);
          border: none; cursor: pointer; padding: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .lb-dot-active {
          background: #D4AF37;
          transform: scale(1.4);
        }

        /* ── Quote ── */
        .food-quote {
          position: relative; z-index: 1; text-align: center;
          font-family: serif; font-style: italic;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: rgba(212,175,55,0.6); margin-top: 2rem; letter-spacing: 0.04em;
        }

        /* ── Responsive — Tablet ── */
        @media (max-width: 900px) {
          .food-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
          }
          .food-grid > div:nth-child(1) { grid-column: span 2; }
          .food-grid > div:nth-child(2) { grid-column: span 1; }
          .food-grid > div:nth-child(3) { grid-column: span 1; }
          .food-grid > div:nth-child(4) { grid-column: span 1; }
          .food-grid > div:nth-child(5) { grid-column: span 1; }
          .food-grid > div:nth-child(6) { grid-column: span 2; }
          .food-grid > div:nth-child(7) { grid-column: span 1; }
          .food-grid > div:nth-child(8) { grid-column: span 1; }
          .food-grid > div:nth-child(9) { grid-column: span 2; }
          .food-grid > div:nth-child(10) { grid-column: span 1; }
          .food-grid > div:nth-child(11) { grid-column: span 1; }
          .food-grid > div:nth-child(12) { grid-column: span 1; }
          .food-grid > div:nth-child(13) { grid-column: span 2; }
          .food-grid > div:nth-child(14) { grid-column: span 1; }
          .food-grid > div:nth-child(15) { grid-column: span 1; }
          .food-grid > div:nth-child(16) { grid-column: span 2; }
        }

        /* ── Responsive — Mobile ── */
        @media (max-width: 560px) {
          .food-showcase-section { padding: 3rem 0.75rem 2.5rem; }
          .food-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 130px;
            gap: 0.4rem;
          }
          .food-grid > div:nth-child(1) { grid-column: span 2; }
          .food-grid > div:nth-child(2) { grid-column: span 1; }
          .food-grid > div:nth-child(3) { grid-column: span 1; }
          .food-grid > div:nth-child(4) { grid-column: span 1; }
          .food-grid > div:nth-child(5) { grid-column: span 1; }
          .food-grid > div:nth-child(6) { grid-column: span 2; }
          .food-grid > div:nth-child(7) { grid-column: span 1; }
          .food-grid > div:nth-child(8) { grid-column: span 1; }
          .food-grid > div:nth-child(9) { grid-column: span 2; }
          .food-grid > div:nth-child(10) { grid-column: span 1; }
          .food-grid > div:nth-child(11) { grid-column: span 1; }
          .food-grid > div:nth-child(12) { grid-column: span 1; }
          .food-grid > div:nth-child(13) { grid-column: span 2; }
          .food-grid > div:nth-child(14) { grid-column: span 1; }
          .food-grid > div:nth-child(15) { grid-column: span 1; }
          .food-grid > div:nth-child(16) { grid-column: span 2; }
          .food-header { margin-bottom: 1.5rem; }
          .food-quote  { margin-top: 1.5rem; }
          .lb-prev { left: 0.4rem; }
          .lb-next { right: 0.4rem; }
        }
      `}</style>
    </section>
  );
}
