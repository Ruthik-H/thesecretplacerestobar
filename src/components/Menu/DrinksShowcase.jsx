import React from 'react';
import { motion } from 'framer-motion';

// Distinct mocktail descriptions 
const mocktailDescs = [
  "Fresh. Vibrant. Pure refreshment.",
  "A splash of flavor without limits.",
  "Cool. Invigorating. Elevating.",
  "Zero limits. Maximum vibes.",
  "Classic nostalgia in every sip."
];

// Distinct cocktail descriptions
const cocktailDescs = [
  "Bold blends crafted to perfection.",
  "Where every sip tells a story.",
  "A signature fuse of fire and ice.",
  "Timeless taste, unmatched aesthetic.",
  "Your night's perfect catalyst."
];

// Dynamically load images via Vite glob from the public folder
const mocktailImgModules = import.meta.glob('/public/assets/images/mocktails/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const cocktailImgModules = import.meta.glob('/public/assets/images/cocktails/*.{jpg,jpeg,png,webp,avif}', { eager: true });

// Convert absolute import paths to public serving paths by stripping away '/public'
const mocktailsList = Object.keys(mocktailImgModules).map((filePath, index) => ({
  imgUrl: filePath.replace('/public', ''),
  desc: mocktailDescs[index % mocktailDescs.length]
}));

const cocktailsList = Object.keys(cocktailImgModules).map((filePath, index) => ({
  imgUrl: filePath.replace('/public', ''),
  desc: cocktailDescs[index % cocktailDescs.length]
}));

const ShowcaseCard = ({ item }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="relative min-w-[280px] max-w-[320px] h-[400px] rounded-2xl overflow-hidden group border border-[#D4AF37]/30 shadow-lg cursor-pointer"
  >
    {/* Dynamic Image */}
    <img 
      src={item.imgUrl} 
      alt="Signature Drink" 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      onError={(e) => {
        // Fallback styling if image doesn't exist
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
    <div className="hidden absolute inset-0 bg-[#1a1a1a] items-center justify-center font-sans text-[#D4AF37]/30 text-sm italic">
      Image unavailable
    </div>

    {/* Glassmorphism Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300"></div>
    
    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <div className="w-10 h-0.5 bg-[#D4AF37] mb-4 group-hover:w-16 transition-all duration-300"></div>
      <p className="text-xl font-sans text-white tracking-wide pr-4 leading-relaxed font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        "{item.desc}"
      </p>
    </div>
  </motion.div>
);

export default function DrinksShowcase() {
  return (
    <div className="flex flex-col gap-16 mt-32 overflow-hidden py-4 border-t border-[#D4AF37]/10 pt-16">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <p className="font-sans text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-4">The Bar Experience</p>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
          Signature <span className="gold-gradient italic font-semibold">Drinks</span>
        </h2>
      </motion.div>

      {/* 1. MOCKTAILS SECTION (Moved to top) */}
      {mocktailsList.length > 0 && (
        <div className="relative">
          <h3 className="font-serif text-3xl font-light italic text-white mb-2 pl-4 border-l-2 border-[#D4AF37]">
            Handcrafted <span className="gold-gradient font-semibold">Mocktails</span>
          </h3>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37]/60 mb-8 pl-4">
            A splash of flavor without limits.
          </p>
          
          <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x hide-scrollbar">
            {mocktailsList.map((item, idx) => (
              <div key={idx} className="snap-start shrink-0">
                <ShowcaseCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. COCKTAILS SECTION */}
      {cocktailsList.length > 0 && (
        <div className="relative">
          <h3 className="font-serif text-3xl font-light italic text-white mb-2 pl-4 border-l-2 border-[#D4AF37]">
            Premium <span className="gold-gradient font-semibold">Cocktails</span>
          </h3>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37]/60 mb-8 pl-4">
            Bold blends crafted to perfection.
          </p>
          
          <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x hide-scrollbar">
            {cocktailsList.map((item, idx) => (
              <div key={idx} className="snap-start shrink-0">
                <ShowcaseCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback */}
      {cocktailsList.length === 0 && mocktailsList.length === 0 && (
        <div className="p-8 border border-[#D4AF37]/20 rounded-xl text-center mx-auto w-full max-w-lg">
          <p className="text-[#D4AF37]/80 font-sans tracking-widest text-sm">Drink images will appear here once added to the respective folders.</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
