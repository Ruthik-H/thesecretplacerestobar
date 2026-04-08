import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '2+',   label: 'Years of Excellence' },
  { value: '200+', label: 'Unique Recipes' },
  { value: '50+',  label: 'Premium Spirits' },
  { value: '★ 4.2', label: 'Guest Rating' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [-30, 80]);

  return (
    <section id="about" className="relative py-28 lg:py-40 overflow-hidden bg-[#0B0B0B]">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/4 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* ── TEXT SIDE ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative z-20"
        >
          <p className="font-sans text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-2 leading-tight">
            A Hidden Gem in
            <br />
            <span className="gold-gradient italic font-semibold">the Heart of Bangalore</span>
          </h2>
          <div className="section-divider ml-0 mt-6 mb-8" />

          <p className="font-sans text-[#E8E0CC]/70 text-base leading-relaxed mb-6">
            Nestled in a serene setting, <strong className="text-[#D4AF37]">The Secret Place Restobar</strong> is surrounded by lush greenery, offering a perfect escape from the city's rush.
          </p>
          <p className="font-sans text-[#E8E0CC]/60 text-base leading-relaxed mb-10">
            Where ambiance meets flavor, every moment is crafted to elevate your experience — because here, good food truly means a good mood.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[#D4AF37] font-sans text-sm tracking-[0.2em] uppercase group"
          >
            <span className="h-px w-8 bg-[#D4AF37] group-hover:w-16 transition-all duration-400" />
            Find Us
          </a>
        </motion.div>

        {/* ── VISUAL SIDE (Floating Parallax Images) ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative h-[500px] md:h-[600px] w-full mt-12 lg:mt-0"
        >
          {/* Main Image */}
          <motion.div 
            style={{ y: img1Y }}
            className="absolute top-0 right-0 w-[80%] h-[70%] z-10 border border-[#2A2A2A] overflow-hidden group hover:border-[#D4AF37]/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[#0B0B0B] opacity-40 z-0" />
            <img 
              src="/assets/images/gallery/10.jpg" 
              alt="The Secret Place Ambience" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 right-6 text-right">
              <p className="font-serif italic text-lg text-[#E8E0CC]/90">"Not just a bar — it's a mood."</p>
              <p className="font-sans text-[10px] text-[#D4AF37] tracking-widest uppercase mt-1">— The Secret Place</p>
            </div>
          </motion.div>

          {/* Secondary Overlay Image */}
          <motion.div 
            style={{ y: img2Y }}
            className="absolute bottom-0 left-0 w-[55%] h-[55%] z-20 border-4 border-[#0B0B0B] shadow-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#0B0B0B] opacity-60 z-0" />
            <img 
              src="/assets/images/gallery/1.jpg" 
              alt="Signature Cocktail" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Elegant corner accent */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/60" />
          </motion.div>
          
          {/* Decorative floating stats box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-1/4 -left-6 z-30 bg-[#161616]/90 backdrop-blur-md border border-[#D4AF37]/20 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-1"
          >
            <span className="gold-gradient font-serif text-3xl font-bold leading-none">4.2</span>
            <span className="font-sans text-[8px] text-[#E8E0CC]/60 tracking-[0.2em] uppercase">Guest Rating</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
