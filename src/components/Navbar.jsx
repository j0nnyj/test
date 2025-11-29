import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Usa lucide-react invece di react-icons

// Traduzione dei link in Italiano
const navLinks = [
  { title: "La Storia", path: "#about" },
  { title: "Menu", path: "#menu" },
  { title: "Galleria", path: "#galleria" },
  { title: "Contatti", path: "#contatti" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: -5 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.15 
    }
  }
};

const underlineVariants = {
  hidden: { width: 0 },
  hover: {
    width: "100%",
    transition: {
      duration: 0.2, 
      ease: "easeOut"
    }
  }
};

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleNav = () => setNav((prev) => !prev);
  const closeNav = () => setNav(false);

  // Funzione Smart Scroll Ottimizzata
  const handleScroll = (e, path) => {
    e.preventDefault();
    const targetId = path.replace('#', '');
    
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        // CORREZIONE: Rimosso l'offset di -90px.
        // Poiché le sezioni hanno padding interno (py-24), scrollare all'inizio esatto (offset 0)
        // centra perfettamente il contenuto visibile e non taglia il fondo della sezione.
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    closeNav();
  };

  useEffect(() => {
    setIsMounted(true);
    const checkBackground = () => {
      const navbar = document.querySelector('nav');
      if (!navbar) return;
      
      const navbarRect = navbar.getBoundingClientRect();
      // Controlliamo un punto leggermente più in basso per essere sicuri di prendere il colore della sezione
      const pointToCheck = navbarRect.bottom + 10;
      
      const elementBelow = document.elementFromPoint(
        window.innerWidth / 2,
        pointToCheck
      );
      
      if (!elementBelow) return;
      
      const bgColor = getComputedStyle(elementBelow).backgroundColor;
      const isWhite = bgColor === 'rgb(255, 255, 255)' || 
                     elementBelow.closest('[data-white-section="true"]');
      
      setHasWhiteBackground(!!isWhite);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground);
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  return (
    <nav className="z-50 fixed w-full top-0">
      <motion.div 
        className={`absolute inset-0 transition-all duration-300 ${
          hasWhiteBackground 
            ? 'bg-white/90 backdrop-blur-sm shadow-sm' 
            : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-2 relative" 
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
            className="flex items-center cursor-pointer"
            variants={itemVariants}
            onClick={(e) => handleScroll(e, '#hero')}
            >
            <motion.img 
                src="/img/logo2.png" 
                alt="Osteria Odiago Logo"
                className={`h-14 object-contain ${ 
                hasWhiteBackground 
                    ? 'filter brightness-0 opacity-90 hover:opacity-100' 
                    : 'opacity-95 hover:opacity-100'
                }`}
                whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
                }}
            />
            </motion.div>

            {/* Desktop Menu */}
            <motion.div 
            className="hidden md:flex items-center space-x-8 -mt-2"
            variants={containerVariants}
            >
            {navLinks.map((link, index) => (
                <motion.div 
                key={`nav-${index}`}
                className="relative"
                variants={itemVariants}
                whileHover="hover"
                >
                <a
                    href={link.path}
                    onClick={(e) => handleScroll(e, link.path)}
                    className={`text-lg px-3 font-serif uppercase tracking-widest relative ${
                    hasWhiteBackground 
                        ? 'text-gray-800 hover:text-green-700' 
                        : 'text-white hover:text-green-400'
                    } transition-colors duration-200 block`}
                    style={{ minWidth: '80px', textAlign: 'center' }}
                >
                    {link.title}
                    <motion.span
                    className={`absolute bottom-0 left-0 h-[1px] ${ 
                        hasWhiteBackground ? 'bg-green-700' : 'bg-green-400'
                    }`}
                    variants={underlineVariants}
                    initial="hidden"
                    />
                </a>
                </motion.div>
            ))}
            </motion.div>

            {/* Mobile Toggle */}
            <motion.button
            onClick={toggleNav}
            className={`md:hidden focus:outline-none p-2 rounded-full -mt-2 ${
                hasWhiteBackground 
                ? 'text-gray-800 hover:text-green-600' 
                : 'text-white hover:text-green-400'
            }`}
            aria-expanded={nav}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            >
            {nav ? (
                <X size={24} aria-hidden="true" /> 
            ) : (
                <Menu size={24} aria-hidden="true" />
            )}
            </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {nav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center pt-6"
        >
          <motion.img 
            src="/img/logo2.png" 
            alt="Osteria Odiago Logo"
            className="h-16 mb-8 object-contain cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            onClick={(e) => handleScroll(e, '#hero')}
          />
          
          <div className="space-y-6 text-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={`mobile-nav-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.15 + index * 0.08,
                  duration: 0.3
                }}
              >
                <a
                  href={link.path}
                  onClick={(e) => handleScroll(e, link.path)}
                  className="text-2xl font-serif uppercase tracking-widest text-white hover:text-green-400 block py-3 relative group"
                >
                  {link.title}
                  <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1px] bg-green-400 w-0 group-hover:w-3/4 transition-all duration-200"></span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};