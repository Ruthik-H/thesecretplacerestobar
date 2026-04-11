import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const images = [
  { id: 1, src: '/assets/images/gallery/1775928124676.png', title: 'The Ambiance' },
  { id: 2, src: '/assets/images/gallery/20260407_221753.jpg.jpeg', title: 'Luxury Bites' },
  { id: 3, src: '/assets/images/gallery/IMG_6680.jpg', title: 'Signature Sips' },
  { id: 4, src: '/assets/images/gallery/IMG_4915.jpg', title: 'Golden Hour' },
  { id: 5, src: '/assets/images/gallery/IMG_9723.jpg', title: 'The Crowd' },
  { id: 6, src: '/assets/images/gallery/birthday.jpg', title: 'Celebrations' },
  { id: 7, src: '/assets/images/gallery/unnamed.webp', title: 'Aesthetic' },
  { id: 8, src: '/assets/images/gallery/new.jpg', title: 'New Vibe' },
  { id: 9, src: '/assets/images/gallery/IMG_5991.jpg', title: 'Exclusive' },
  { id: 10, src: '/assets/images/gallery/image.png', title: 'The Atmosphere' },
  { id: 11, src: '/assets/images/gallery/new1.jpeg', title: 'Luxury Bites' },
  { id: 12, src: '/assets/images/gallery/IMG_6654.jpg', title: 'Golden Vibe' },
  { id: 13, src: '/assets/images/gallery/IMG_6681.jpg', title: 'Aesthetic Chill' },
  { id: 14, src: '/assets/images/gallery/new4.jpeg', title: 'Premium Taste' },
  { id: 15, src: '/assets/images/gallery/new10.jpeg', title: 'New Arrival' },
  { id: 16, src: '/assets/images/gallery/IMG_6682.jpg', title: 'Classic Choice' },
  { id: 17, src: '/assets/images/gallery/IMG_9722.jpg', title: 'Vibrant Colors' },
  { id: 18, src: '/assets/images/gallery/unnamed.jpg', title: 'Evening Style' },
  { id: 19, src: '/assets/images/gallery/20260408_152921.jpg.jpeg', title: 'Moments' },
];

export default function Gallery() {
  const [activeId, setActiveId] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="gallery" className="relative py-28 lg:py-40 bg-[#0B0B0B] overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10 px-6"
      >
        <p className="font-sans text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">Capturing Moments</p>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
          The <span className="gold-gradient italic font-semibold">Gallery</span>
        </h2>
        <div className="section-divider mt-6" />
      </motion.div>

      {/* EXPANDING ACCORDION LAYOUT (Desktop) & HORIZONTAL SCROLL (Mobile) */}
      <div className="max-w-[1400px] mx-auto px-0 md:px-8 h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] relative z-10 w-full">
        <div className="flex w-full h-full gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-0">
          {images.map((img) => (
            <motion.div
              key={img.id}
              className="relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer snap-center lg:snap-align-none shrink-0 min-w-[75vw] sm:min-w-[50vw] md:min-w-0 md:w-auto h-full"
              onMouseEnter={() => !isMobile && setActiveId(img.id)}
              onClick={() => setActiveId(img.id)} // Allow clicks on mobile for text visibility without flex reflow
              animate={{ 
                flex: isMobile ? 'none' : (activeId === img.id ? 5 : 1),
                opacity: 1 
              }}
              initial={{ flex: isMobile ? 'none' : 1, opacity: 0 }}
              style={{
                WebkitTransform: 'translateZ(0)',
                willChange: isMobile ? 'transform' : 'flex, transform',
              }}
              transition={{ 
                flex: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.5 }
              }}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out" 
                style={{ 
                  transform: activeId === img.id ? 'scale(1.05) translateZ(0)' : 'scale(1.2) translateZ(0)',
                  WebkitTransform: activeId === img.id ? 'scale(1.05) translateZ(0)' : 'scale(1.2) translateZ(0)',
                  willChange: 'transform'
                }}
              />
              
              {/* Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeId === img.id ? 'bg-gradient-to-t from-black/80 via-black/10 to-transparent' : 'bg-black/40'
                }`} 
              />
              
              {/* Text Info (Visible only when active) */}
              <motion.div
                className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left overflow-hidden min-w-[200px]"
                animate={{ 
                  opacity: activeId === img.id ? 1 : 0,
                  y: activeId === img.id ? 0 : 20 
                }}
                transition={{ duration: 0.5, delay: activeId === img.id ? 0.2 : 0 }}
              >
                <div className="w-10 h-px bg-[#D4AF37] mb-4" />
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-1 shadow-black drop-shadow-md">
                  {img.title}
                </h3>
                <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
                  The Secret Place
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hide scrollbar injected style for this component specifically */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
