import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-28 bg-[#0B0B0B] border-t border-[#D4AF37]/10" ref={ref}>
      {/* Visual Ambient Background for Contact */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
        <img src="/assets/images/gallery/IMG_5991.jpg" alt="Ambient Texture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto items-center">
          
          {/* Contact Details Standalone Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-[#111111]/80 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
            
            <div className="text-center mb-12">
              <p className="font-sans text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">Visit Us</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
                Find <span className="gold-gradient italic font-semibold">The Secret</span>
              </h2>
              <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <div className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <MapPin size={24} className="text-[#D4AF37]" />
                </div>
                <h4 className="font-serif text-2xl text-white mb-2">Location</h4>
                <a 
                  href="https://www.google.com/maps/place/The+Secret+Place+Resto+Bar/@12.9685422,77.4928679,902m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bae3d4a189f2867:0xbecc0ac2d2d6f79a!8m2!3d12.9685422!4d77.4928679!16s%2Fg%2F11k3czvhty?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-sans text-[#E8E0CC]/60 leading-loose text-xs uppercase tracking-wider hover:text-white transition-colors underline decoration-[#D4AF37]/50 underline-offset-4"
                >
                  No.8/2, behind Mallathahalli Lake Road, near Nagarbhavi,
                  Sir M Vishweshwaraiah Layout 8th Block, Muddayanapalya,
                  ITI Employees Layout
                </a>
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Clock size={24} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-2xl text-white mb-2">Hours</h4>
                  <p className="font-sans text-[#E8E0CC]/60 leading-loose text-xs uppercase tracking-wider">
                    Everyday: 12:00 PM - 1:00 AM
                  </p>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Phone size={24} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-2xl text-white mb-2">Contact</h4>
                  <p className="font-sans text-[#E8E0CC]/60 leading-loose text-xs uppercase tracking-wider">
                    +91 73377 87040
                  </p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
