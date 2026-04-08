import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Drinks',   href: '#drinks' },
  { label: 'Menu',     href: '#menu' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ── LOGO ── Replace /public/assets/images/logo/logo.png with your actual logo */}
          <a href="#home" onClick={() => handleNav('#home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center group-hover:border-[#D4AF37] transition-all duration-300 overflow-hidden">
              <img
                src="/assets/images/logo/WhatsApp%20Image%202026-04-07%20at%2020.54.39.jpeg"
                alt="The Secret Place Logo"
                className="w-full h-full object-contain scale-[1.5]" /* scaled slightly up since it has dark bg and pads out */
                onError={(e) => {
                  /* Fallback if logo not yet placed */
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="gold-gradient font-serif text-lg font-bold">S</span>';
                }}
              />
            </div>
            <div className="leading-none">
              <p className="gold-gradient font-serif text-base font-semibold tracking-widest uppercase">
                The Secret Place
              </p>
              <p className="text-[#D4AF37]/60 font-sans text-[9px] tracking-[0.3em] uppercase">
                Restobar
              </p>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                    active === link.href
                      ? 'text-[#D4AF37] gold-glow-text'
                      : 'text-[#E8E0CC]/70 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* ── RESERVE BUTTON REMOVED ── */}

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#D4AF37] hover:text-[#F0D060] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-serif text-3xl text-[#E8E0CC] hover:text-[#D4AF37] tracking-widest uppercase transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
            {/* Mobile reserve button removed */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
