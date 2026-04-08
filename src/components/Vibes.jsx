import React from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, PartyPopper, CalendarDays, Wine } from 'lucide-react';

const vibesFeatures = [
  {
    icon: <Music className="w-8 h-8 text-[#D4AF37]" />,
    title: "Live Music",
    desc: "Every Saturday & Sunday"
  },
  {
    icon: <Disc className="w-8 h-8 text-[#D4AF37]" />,
    title: "Dance Floor Experience",
    desc: "Let loose to the best beats"
  },
  {
    icon: <PartyPopper className="w-8 h-8 text-[#D4AF37]" />,
    title: "Private Celebrations",
    desc: "Exclusive party spaces"
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-[#D4AF37]" />,
    title: "Event Bookings",
    desc: "Birthdays & special events"
  },
  {
    icon: <Wine className="w-8 h-8 text-[#D4AF37]" />,
    title: "Premium Ambience",
    desc: "Luxury night vibe guaranteed"
  }
];

export default function Vibes() {
  return (
    <section className="relative py-28 lg:py-40 bg-[#080808] border-t border-[#D4AF37]/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* LEFT COMPOSITION (40%) */}
        <motion.div 
          className="lg:col-span-5 w-full relative sm:px-12 lg:px-0 mt-12 lg:mt-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
            {/* Main Image — slight tilt, hardware accelerated via will-change */}
            <div
              className="absolute inset-0 z-10 rounded-[2rem] overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-[#111]"
              style={{ transform: 'rotate(-3deg)', willChange: 'transform' }}
            >
              <img
                src="/assets/images/vibes/vibe1.jpeg"
                alt="The Secret Place Vibe"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
            </div>

            {/* Top Left Floating Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-10 -left-6 md:-left-12 w-[55%] aspect-square z-20 rounded-[1.5rem] overflow-hidden border-[4px] border-[#080808] shadow-2xl bg-[#111]"
            >
              <img
                src="/assets/images/vibes/vibe2.jpeg"
                alt="Cocktails and Friends"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bottom Right Floating Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-10 -right-6 md:-right-12 w-[55%] aspect-square z-20 rounded-[1.5rem] overflow-hidden border-[4px] border-[#080808] shadow-2xl bg-[#111]"
            >
              <img
                src="/assets/images/vibes/vibe3.jpeg"
                alt="Nightlife Ambiance"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT (60%) */}
        <div className="lg:col-span-7 w-full flex flex-col z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center lg:text-left"
          >
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#D4AF37]/80 mb-4">Experience the Magic</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide mb-6">
              Weekend Vibes &<br/>
              <span className="gold-gradient font-semibold italic">Private Celebrations</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]/40 lg:ml-0 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {vibesFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`p-8 rounded-[1.5rem] border border-[#D4AF37]/10 bg-[#121212]/60 backdrop-blur-sm flex flex-col items-center lg:items-start text-center lg:text-left group transition-all duration-300 hover:bg-[#1a1a1a] hover:scale-[1.02] hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] ${
                  idx === 4 ? "sm:col-span-2 sm:max-w-md sm:justify-self-center lg:justify-self-start lg:col-span-1" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-2xl text-white tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-[#E8E0CC]/60 text-sm tracking-widest uppercase">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
