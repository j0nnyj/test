import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Sun, Sparkles, Wine, Utensils, Snowflake } from 'lucide-react';

export const Menu = () => {
  // IMPOSTAZIONE MENU INIZIALE
  // 0 = Classico
  // 1 = Natale
  // 2 = Estate
  // 3 = Gala
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [direction, setDirection] = useState(0);

  const menus = [
    {
      id: 0,
      theme: 'classic',
      title: "Degustazione Tradizione",
      subtitle: "Maggio - Giugno 2025",
      price: "35€",
      note: "Bevande escluse",
      courses: [
        { type: "Antipasto", name: "Tagliere dell'Hosteria", desc: "Selezione di salumi nostrani, giardiniera fatta in casa in agrodolce e formaggi delle valli orobiche" },
        { type: "Primo", name: "Casoncelli alla Bergamasca", desc: "Fatti a mano secondo la ricetta della nonna, con burro di malga, salvia croccante e pancetta" },
        { type: "Secondo", name: "Guancialino Brasato", desc: "Cotto 12 ore nel Valcalepio Rosso, servito su letto di polenta taragna macinata a pietra" },
        { type: "Dolce", name: "Tiramisù del 1905", desc: "La nostra ricetta storica con savoiardi artigianali e caffè espresso" }
      ]
    },
    {
      id: 1,
      theme: 'christmas',
      title: "Pranzo di Natale 2025",
      subtitle: "25 Dicembre",
      price: "65€",
      note: "Tutto compreso",
      courses: [
        { 
          type: "Benvenuto", 
          name: "Aperitivo dell'Hosteria", 
          desc: "Bollicina di benvenuto con polpettine fritte e sfoglia al formaggio" 
        },
        { 
          type: "Antipasto", 
          name: "Il Natale in Hosteria", 
          desc: "Salame e pancetta nostrani, Prosciutto di Parma, Insalata russa, Peperoni tonnati ripieni, Giardiniera rustica e Gorgonzola di capra con confettura" 
        },
        { 
          type: "Primi", 
          name: "La Tradizione", 
          desc: "Scarpinocc fatti a mano burro e salvia e Risotto mantecato con Taleggio DOP, pere e polvere di noci" 
        },
        { 
          type: "Secondi", 
          name: "Carni e Polenta", 
          desc: "Faraona ripiena ai Porcini e Guanciale arrosto a lunga cottura con Polenta Taragna" 
        },
        { 
          type: "Dolce", 
          name: "Panettone Artigianale", 
          desc: "Con mela candita, cannella e crema montata. Accompagnato da spumante" 
        },
        {
          type: "Cantina",
          name: "Selezione Vini Inclusa",
          desc: "Rosso 'Tenuta l’Arco', Sauvignon 'Attems', Prosecco 'San Giuseppe', Moscato 'Saracco'"
        }
      ]
    },
    {
      id: 2,
      theme: 'summer', 
      title: "Gran Galà di Ferragosto",
      subtitle: "Speciale 15 Agosto",
      price: "55€",
      note: "Prenotazione obbligatoria",
      courses: [
        { type: "Entrée", name: "Benvenuto dello Chef", desc: "Tartare di gambero rosso di Mazara con scorzetta di lime e menta fresca" },
        { type: "Antipasto", name: "Mare e Orto", desc: "Insalatina di mare tiepida con verdure croccanti julienne e olio al basilico" },
        { type: "Primo", name: "Risotto allo Champagne", desc: "Mantecato con scampi freschi, polvere di agrumi e fiori eduli" },
        { type: "Secondo", name: "Branzino al Sale", desc: "Filetto di pescato del giorno servito con patate novelle al rosmarino e salsa vergine" },
        { type: "Dessert", name: "Sinfonia d'Estate", desc: "Semifreddo al frutto della passione con cuore di mango e crumble al cocco" }
      ]
    },
    {
      id: 3,
      theme: 'gala',
      title: "Cena a Lume di Candela",
      subtitle: "Evento Esclusivo",
      price: "70€",
      note: "Wine Pairing Incluso",
      courses: [
        { type: "Apertura", name: "Ostriche e Bollicine", desc: "Fine de Claire n.3 con calice di Franciacorta Satèn Millesimato" },
        { type: "Primo", name: "Tagliolini al Tartufo", desc: "Tartufo nero pregiato scorzone su pasta all'uovo 30 tuorli tirata a mano" },
        { type: "Secondo", name: "Filetto alla Rossini", desc: "Cuore di filetto con scaloppa di foie gras, tartufo nero e riduzione al Madeira" },
        { type: "Finale", name: "Oro e Cioccolato", desc: "Lingotto al cioccolato Valrhona, foglia d'oro 24k e lamponi freschi" }
      ]
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % menus.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? menus.length - 1 : prev - 1));
  };

  // --- LOGICA SWIPE ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    }
  };
  // --------------------

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100, // Aumentato leggermente per effetto entrata più marcato
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
      scale: 0.95,
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100, // Coerente con la direzione dello swipe
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" }
    })
  };

  const getThemeStyles = (theme) => {
    switch(theme) {
      case 'christmas':
        return {
          wrapper: "bg-[#fff5f5] border-2 border-[#c62828]",
          border: "border border-[#b91c1c] border-opacity-30",
          accent: "text-[#991b1b]",
          subAccent: "text-[#b91c1c]", 
          text: "text-stone-700",
          icon: <Snowflake className="w-8 h-8 text-[#c62828] animate-pulse" />,
          btn: "bg-gradient-to-r from-[#991b1b] to-[#ef4444] text-white shadow-red-200",
          decor: "bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-red-100 via-transparent to-transparent"
        };
      case 'summer':
        return {
          wrapper: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
          border: "border-double border-4 border-orange-200",
          accent: "text-orange-700",
          subAccent: "text-orange-600/70",
          text: "text-stone-700",
          icon: <Sun className="w-8 h-8 text-orange-500 animate-[spin_10s_linear_infinite]" />,
          btn: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-200",
          decor: "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-200/20 via-transparent to-transparent"
        };
      case 'gala':
        return {
          wrapper: "bg-[#1a1a1a] border border-stone-800",
          border: "border border-[#d4af37]",
          accent: "text-[#d4af37]",
          subAccent: "text-[#d4af37]/60",
          text: "text-stone-300",
          icon: <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />,
          btn: "bg-gradient-to-r from-[#d4af37] to-[#b49020] text-black font-bold shadow-[#d4af37]/20",
          decor: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-transparent to-transparent"
        };
      default: // Classic
        return {
          wrapper: "bg-[#fffbf0]",
          border: "border-double border-4 border-[#006400]/20",
          accent: "text-[#006400]",
          subAccent: "text-[#006400]/60",
          text: "text-stone-600",
          icon: <Utensils className="w-6 h-6 text-[#006400]/40" />,
          btn: "bg-[#006400] text-white shadow-green-900/10",
          decor: "bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"
        };
    }
  };

  const theme = getThemeStyles(menus[currentIndex].theme);

  return (
    <section id="menu" className="relative py-24 bg-stone-100 overflow-hidden" data-white-section="true">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/subtle-white-feathers.png")` }}>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Sezione */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="font-serif text-5xl md:text-7xl text-[#006400] mb-4 relative z-10">
              Menù Stagionali
            </h2>
            <div className="h-1 w-1/2 mx-auto bg-[#006400]/30 rounded-full mt-2"></div>
            {/* Indicazione per mobile - appare solo su schermi piccoli */}
            <p className="md:hidden text-xs uppercase tracking-widest text-stone-400 mt-4 animate-pulse">
              ← Scorri per vedere i menu →
            </p>
          </motion.div>
        </div>

        {/* Navigazione (Freccie visibili su desktop, nascoste o meno rilevanti su mobile ma utili) */}
        <div className="flex justify-center items-center gap-8 mb-10">
           <button 
             onClick={prevSlide}
             className="p-4 rounded-full bg-white shadow-lg hover:bg-stone-50 text-stone-600 transition-all border border-stone-100 group hover:-translate-x-1"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           
           <div className="flex gap-2">
             {menus.map((_, idx) => (
               <div 
                 key={idx}
                 onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                 }}
                 className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#006400]' : 'bg-stone-300 hover:bg-stone-400'}`}
               />
             ))}
           </div>

           <button 
             onClick={nextSlide}
             className="p-4 rounded-full bg-white shadow-lg hover:bg-stone-50 text-stone-600 transition-all border border-stone-100 group hover:translate-x-1"
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>

        {/* AREA CARD */}
        <div className="max-w-4xl mx-auto min-h-[700px] relative perspective-[2000px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              // PROPRIETÀ DRAG AGGIUNTE
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className={`w-full rounded-sm shadow-2xl overflow-hidden relative ${theme.wrapper} cursor-grab active:cursor-grabbing`}
            >
              {/* Decorazione Sfondo Specifica per Tema */}
              <div className={`absolute inset-0 pointer-events-none ${theme.decor} opacity-50`}></div>
              
              {/* Bordo Interno Decorativo */}
              <div className={`absolute inset-3 md:inset-5 pointer-events-none ${theme.border}`}></div>

              {/* CONTENUTO MENU */}
              <div className="relative p-8 md:p-12 lg:p-16 h-full flex flex-col items-center text-center select-none"> {/* select-none per evitare selezione testo durante drag */}
                 
                 {/* Icona o Decorazione Top */}
                 <div className="mb-6 opacity-80">
                   {theme.icon}
                 </div>

                 {/* Titoli */}
                 <h3 className={`font-serif text-3xl md:text-5xl lg:text-6xl font-medium mb-3 tracking-tight ${theme.accent}`}>
                   {menus[currentIndex].title}
                 </h3>
                 <p className={`font-sans uppercase tracking-[0.2em] text-xs md:text-sm font-bold opacity-80 mb-8 ${theme.text}`}>
                   {menus[currentIndex].subtitle}
                 </p>
                 
                 {/* LISTA PIATTI */}
                 <div className="w-full space-y-8 md:space-y-10 my-4 text-left md:text-center max-w-2xl">
                   {menus[currentIndex].courses.map((course, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 + (idx * 0.1) }}
                       className="relative group"
                     >
                        <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme.subAccent}`}>
                          {course.type}
                        </div>
                        <h4 className={`font-serif text-xl md:text-2xl font-medium mb-2 ${theme.text} group-hover:${theme.accent} transition-colors`}>
                          {course.name}
                        </h4>
                        <p className={`font-serif italic opacity-70 text-sm md:text-base leading-relaxed ${theme.text}`}>
                          {course.desc}
                        </p>
                        
                        {/* Divisore sottile tra i piatti (tranne l'ultimo) */}
                        {idx !== menus[currentIndex].courses.length - 1 && (
                          <div className="w-12 h-[1px] bg-current opacity-10 mx-auto mt-6 hidden md:block"></div>
                        )}
                     </motion.div>
                   ))}
                 </div>

                 {/* FOOTER PREZZO */}
                 <div className="mt-auto pt-12 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 border-t border-current border-opacity-10">
                    <div className="text-center md:text-left">
                       <span className={`block text-xs uppercase tracking-widest opacity-60 mb-1 ${theme.text}`}>Prezzo a Persona</span>
                       <div className="flex items-baseline gap-2 justify-center md:justify-start">
                         <span className={`font-serif text-5xl font-bold ${theme.accent}`}>{menus[currentIndex].price}</span>
                         {menus[currentIndex].theme === 'gala' && <Wine className="w-5 h-5 opacity-50" />}
                         {menus[currentIndex].theme === 'christmas' && <Star className="w-5 h-5 opacity-50" />}
                       </div>
                       <p className={`text-xs mt-2 opacity-60 italic ${theme.text}`}>{menus[currentIndex].note}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-10 py-4 rounded shadow-lg font-bold uppercase tracking-widest text-sm transition-all hover:shadow-xl ${theme.btn}`}
                    >
                      Prenota Ora
                    </motion.button>
                 </div>

              </div>

              {/* Decorazioni Angolari Vintage (Solo Classic e Christmas) */}
              {(menus[currentIndex].theme === 'classic' || menus[currentIndex].theme === 'christmas') && (
                <>
                  <svg className={`absolute top-4 left-4 w-12 h-12 opacity-20 pointer-events-none ${menus[currentIndex].theme === 'christmas' ? 'text-red-800' : 'text-[#006400]'}`} viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0 0v40h10V10h30V0H0z" />
                    <path d="M10 10v20h20V10H10z" opacity="0.5"/>
                  </svg>
                  <svg className={`absolute bottom-4 right-4 w-12 h-12 opacity-20 pointer-events-none rotate-180 ${menus[currentIndex].theme === 'christmas' ? 'text-red-800' : 'text-[#006400]'}`} viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0 0v40h10V10h30V0H0z" />
                    <path d="M10 10v20h20V10H10z" opacity="0.5"/>
                  </svg>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};