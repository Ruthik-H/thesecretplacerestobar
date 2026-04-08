export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16 border-b border-[#2A2A2A] pb-16">
          
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* ── LOGO ── Replace /public/assets/images/logo/logo.png with your actual logo */}
            <div className="w-16 h-16 mb-4 rounded-full border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden">
               <img
                src="/assets/images/logo/WhatsApp%20Image%202026-04-07%20at%2020.54.39.jpeg"
                alt="The Secret Place Logo"
                className="w-full h-full object-contain scale-[1.5]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="gold-gradient font-serif text-3xl font-bold">S</span>';
                }}
              />
            </div>
            <h2 className="font-serif text-2xl text-white mb-1 tracking-wider uppercase">
              The Secret <span className="gold-gradient">Place</span>
            </h2>
            <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-6">
              Restobar
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/thesecretplacerestobar" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#E8E0CC]/60 hover:text-[#D4AF37] transition-all group">
                <div className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center font-sans text-xs tracking-widest group-hover:border-[#D4AF37]">
                  IG
                </div>
                <span className="font-sans text-xs tracking-[0.2em] uppercase">@thesecretplacerestobar</span>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs text-[#D4AF37] tracking-widest uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Gallery', 'Menus'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="font-sans text-sm text-[#E8E0CC]/60 hover:text-[#D4AF37] tracking-widest uppercase transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left max-w-xs">
            <h4 className="font-sans text-xs text-[#D4AF37] tracking-widest uppercase mb-6">Contact</h4>
            <p className="font-sans text-sm text-[#E8E0CC]/60 leading-loose uppercase tracking-wider mb-4">
              No.8/2, behind Mallathahalli Lake Road, near Nagarbhavi
            </p>
            <p className="font-sans text-sm text-[#D4AF37] tracking-wider">
              +91 73377 87040
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="font-sans text-[10px] text-[#E8E0CC]/40 tracking-widest uppercase">
            © {new Date().getFullYear()} The Secret Place Restobar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-[10px] text-[#E8E0CC]/40 hover:text-[#D4AF37] tracking-widest uppercase transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-[10px] text-[#E8E0CC]/40 hover:text-[#D4AF37] tracking-widest uppercase transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
