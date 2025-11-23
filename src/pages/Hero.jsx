import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, ArrowDown, UtensilsCrossed } from 'lucide-react';

// Immagini di sfondo
const heroImages = [
  "/img/sfondo3.jpg",
  "/img/sfondo.jpg", // Assicurati che questa immagine esista in public/img/
  "/img/sfondo2.jpg", // Assicurati che questa immagine esista in public/img/
 
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef(null);
  
  // Parallasse allo scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Gestione Slideshow Sfondo
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Cambio ogni 6 secondi
    return () => clearTimeout(timer);
  }, [currentImage]);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* 1. SLIDESHOW SFONDO (Z-0) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
           <motion.div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url('${heroImages[currentImage]}')` }}
             animate={{ scale: 1.05 }}
             transition={{ duration: 6, ease: "linear" }}
           />
        </motion.div>
      </AnimatePresence>

      {/* 2. LIVELLO CONTRASTO (Z-10) - Oscura l'immagine per far risaltare il testo */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* 3. FILIGRANA ANTICA E TEXTURE (Z-10) */}
      {/* Texture Carta Invecchiata */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/beige-paper.png")` }}>
      </div>
      
      {/* Vignettatura Cinematografica (Ombre ai bordi) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_120%)]"></div>

      {/* Effetto Grain/Rumore Pellicola */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-10 mix-blend-overlay animate-pulse" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}>
      </div>

      {/* 4. CONTENUTO CENTRALE (Z-20) */}
      <motion.div 
        className="container mx-auto px-4 z-20 text-center relative"
        style={{ y, opacity }}
      >
        {/* Etichetta superiore */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-4 text-white font-serif text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-green-400"></span>
          Est. 1905
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400"></span>
        </motion.div>

        {/* Titolo Principale */}
        <h1 className="text-white mb-8 relative drop-shadow-2xl">
           <motion.span 
             className="block font-serif text-5xl md:text-7xl lg:text-9xl font-medium tracking-tight text-stone-100"
             initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1, ease: "easeOut" }}
           >
             Antica Hosteria
           </motion.span>
           
           <motion.span 
             className="block font-serif text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-800 text-6xl md:text-8xl lg:text-[10rem] font-bold mt-[-10px] md:mt-[-25px] drop-shadow-sm"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 1, type: "spring" }}
           >
             Odiago
           </motion.span>
        </h1>

        {/* Sottotitolo */}
        <motion.p 
          className="font-serif italic text-stone-200 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          "Dove la tradizione culinaria incontra l'accoglienza di una volta, 
          <br className="hidden md:block" /> per regalarti sapori che sanno di casa."
        </motion.p>

        {/* Bottoni CTA */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a href="#prenota" className="group relative px-8 py-4 bg-green-800 text-white font-serif font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-green-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-green-700/50">
             <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left"></div>
             <span className="relative z-10 flex items-center gap-2">
               Prenota un Tavolo
               <UtensilsCrossed size={16} />
             </span>
          </a>
          
          <a href="#menu" className="group px-8 py-4 border border-white/20 bg-black/20 backdrop-blur-sm text-white font-serif font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
             Scopri il Menù
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          className="mt-16 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
           <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-300">
             <Instagram size={24} />
           </a>
           <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-300">
             <Facebook size={24} />
           </a>
        </motion.div>

      </motion.div>

      {/* 5. SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-serif">Scorri</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-green-500/80" />
        </motion.div>
      </motion.div>

      {/* Bordo sfumato inferiore */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

    </section>
  );
};