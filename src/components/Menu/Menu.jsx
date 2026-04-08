import React from 'react';
import { motion } from 'framer-motion';
import DrinksShowcase from './DrinksShowcase';

export default function Menu() {

  const openFoodMenu = () => {
    window.open('/assets/images/menu/new%20food%20menu.pdf', '_blank');
  };

  const openLiquorMenu = () => {
    window.open('/assets/images/menu/LIQ%20MENU%20%20MMMM.pdf', '_blank');
  };

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
          
          {/* FOOD MENU SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT SIDE -> IMAGE */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.6)] aspect-square lg:aspect-[4/3] border border-[#D4AF37]/20 cursor-pointer"
              onClick={openFoodMenu}
            >
              <div className="absolute inset-0 bg-[#0B0B0B]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="/assets/images/menu/food-cover.png" 
                alt="Premium Food Selection" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>

            {/* RIGHT SIDE -> CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 tracking-wide">
                Food Menu
              </h3>
              <p className="font-sans text-[#E8E0CC]/70 text-lg md:text-xl leading-relaxed mb-10 border-l border-[#D4AF37]/50 pl-6">
                Explore a curated selection of flavors crafted to satisfy every craving — from rich Indian delicacies to global favorites, all served in a vibrant and elegant setting.
              </p>
              <div>
                <button
                  onClick={openFoodMenu}
                  className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-sm md:text-base tracking-widest uppercase hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300"
                >
                  View Food Menu (PDF)
                </button>
              </div>
            </motion.div>
          </div>

          {/* LIQUOR MENU SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT SIDE -> IMAGE */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.6)] aspect-square lg:aspect-[4/3] border border-[#D4AF37]/20 cursor-pointer"
              onClick={openLiquorMenu}
            >
              <div className="absolute inset-0 bg-[#0B0B0B]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="/assets/images/menu/liquor-cover.png" 
                alt="Premium Liquor Menu" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>

            {/* RIGHT SIDE -> CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 tracking-wide">
                Liquor Menu
              </h3>
              <p className="font-sans text-[#E8E0CC]/70 text-lg md:text-xl leading-relaxed mb-10 border-l border-[#D4AF37]/50 pl-6">
                Discover an exclusive collection of spirits, brews, and crafted blends — perfectly paired to elevate your experience and set the mood for every occasion.
              </p>
              <div>
                <button
                  onClick={openLiquorMenu}
                  className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-sm md:text-base tracking-widest uppercase hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300"
                >
                  View Liquor Menu (PDF)
                </button>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* SIGNATURE DRINKS SECTION */}
        <DrinksShowcase />

      </div>

    </section>
  );
}
