import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full bg-[#0B0B0B] border-t border-[#D4AF37]/10 px-4 py-16 sm:py-20 overflow-x-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        <img
          src="/assets/images/gallery/IMG_5991.jpg"
          alt="Ambient Texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
      </div>

      {/* CENTER WRAPPER (REAL FIX) */}
      <div className="w-full max-w-[900px] mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-[#111111]/80 backdrop-blur-md border border-[#D4AF37]/20 p-6 sm:p-10 rounded-[2rem] shadow-2xl flex flex-col items-center"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl" />
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">
              Visit Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light">
              Find <span className="italic font-semibold text-[#D4AF37]">The Secret</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto mt-6" />
          </div>

          {/* Content */}
          <div className="w-full flex flex-col gap-12 items-center text-center">

            {/* Location */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                <MapPin size={24} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-xl sm:text-2xl text-white mb-2">Location</h4>
              <a
                href="https://www.google.com/maps/place/The+Secret+Place+Resto+Bar"
                target="_blank"
                rel="noreferrer"
                className="text-[#E8E0CC]/60 text-xs uppercase tracking-wider hover:text-white transition break-words max-w-md"
              >
                No.8/2, behind Mallathahalli Lake Road, near Nagarbhavi,
                Sir M Vishweshwaraiah Layout 8th Block, Muddayanapalya,
                ITI Employees Layout
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                <Clock size={24} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-xl sm:text-2xl text-white mb-2">Hours</h4>
              <p className="text-[#E8E0CC]/60 text-xs uppercase tracking-wider">
                Everyday: 12:00 PM - 1:00 AM
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                <Phone size={24} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-xl sm:text-2xl text-white mb-2">Contact</h4>
              <p className="text-[#E8E0CC]/60 text-xs uppercase tracking-wider">
                +91 73377 87040
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}