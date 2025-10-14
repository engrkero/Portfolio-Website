import React, { useState, useEffect } from 'react';

// FIX: Removed import for 'MenuIcon' (not exported) and unused 'XIcon'. The menu button is CSS-based.

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close menu on link click
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" onClick={handleSmoothScroll} className="text-3xl font-extrabold tracking-tighter z-50">
            <span className="text-[#2A324B]">K</span>
            <span className="text-[#F0544F]">G</span>
            <span className="text-[#F8B462]">S</span>
            <span className="text-[#2A324B]">C</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleSmoothScroll} className="text-gray-600 hover:text-[#F0544F] font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#F0544F] focus:outline-none z-50 transition-transform duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : '-translate-y-1.5 top-1/2'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-1/2'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'translate-y-1.5 top-1/2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 pt-16">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleSmoothScroll}
              className="text-2xl font-semibold text-gray-700 hover:text-[#F0544F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;