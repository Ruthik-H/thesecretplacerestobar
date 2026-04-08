import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a 
        href="tel:7337787040"
        className="relative flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-300 group"
      >
        {/* Pulsing ring behind */}
        <div className="absolute inset-0 rounded-full bg-[#D4AF37]/50 animate-ping opacity-75"></div>
        
        {/* Icon */}
        <Phone className="w-8 h-8 text-black relative z-10 group-hover:scale-110 transition-transform duration-300" />
      </a>
    </motion.div>
  );
}
