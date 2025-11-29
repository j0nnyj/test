import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Snowflake, Sun, Sparkles, Utensils, ArrowRight } from 'lucide-react';

export const Menu = () => {
  const [activeTab, setActiveTab] = useState(0);

  const menus = [
    {
      id: 0,
      theme: 'classic',
      label: "Tradizione",
      title: "Degustazione Tradizione",
      subtitle: "I Classici 1905",
      price: "35",
      currency: "€",
      note: "Bevande escluse",
      // Immagine verticale/ritratto per il layout
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      courses: [
        { type: "Antipasto", name: "Tagliere dell'Hosteria", desc: "Salumi nostrani e giardiniera fatta in casa" },
        { type: "Primo", name: "Casoncelli alla Bergamasca", desc: "Fatti a mano con burro, salvia e pancetta" },
        { type: "Secondo", name: "Guancialino Brasato", desc: "Cotto nel Valcalepio con polenta taragna" },
        { type: "Dolce", name: "Tiramisù del 1905", desc: "Ricetta storica con savoiardi artigianali" }
      ]
    },
    {
      id: 1,
      theme: 'christmas',
      label: "Natale",
      title: "Pranzo di Natale",
      subtitle: "25 Dicembre 2025",
      price: "65",
      currency: "€",
      note: "Tutto compreso",
      image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      courses: [
        { type: "Benvenuto", name: "Aperitivo Natalizio", desc: "Bollicina con sfizi caldi dell'Hosteria" },
        { type: "Antipasto", name: "Il Gran Tagliere", desc: "Salumi, Insalata russa e Gorgonzola DOP" },
        { type: "Primi", name: "Tradizione in Tavola", desc: "Scarpinocc fatti a mano e Risotto al Taleggio" },
        { type: "Secondi", name: "Arrosto delle Feste", desc: "Faraona ai Porcini con Polenta Taragna" },
        { type: "Dolce", name: "Panettone Artigianale", desc: "Con crema al mascarpone e spumante" }
      ]
    },
    {
      id: 2,
      theme: 'summer',
      label: "Ferragosto", 
      title: "Gran Galà Estivo",
      subtitle: "Speciale 15 Agosto",
      price: "55",
      currency: "€",
      note: "Su prenotazione",
      image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      courses: [
        { type: "Entrée", name: "Benvenuto dello Chef", desc: "Tartare di gambero e lime" },
        { type: "Antipasto", name: "Mare e Orto", desc: "Insalatina di mare con verdure croccanti" },
        { type: "Primo", name: "Risotto allo Champagne", desc: "Con scampi freschi e agrumi" },
        { type: "Secondo", name: "Branzino al Sale", desc: "Pescato del giorno con patate novelle" },
        { type: "Dessert", name: "Sinfonia d'Estate", desc: "Semifreddo al frutto della passione" }
      ]
    },
    {
      id: 3,
      theme: 'gala',
      label: "Gala",
      title: "Cena a Lume di Candela",
      subtitle: "Evento Esclusivo",
      price: "70",
      currency: "€",
      note: "Vini inclusi",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      courses: [
        { type: "Apertura", name: "Ostriche e Bollicine", desc: "Fine de Claire con Franciacorta" },
        { type: "Primo", name: "Tagliolini al Tartufo", desc: "Tartufo nero su pasta 30 tuorli" },
        { type: "Secondo", name: "Filetto alla Rossini", desc: "Con foie gras e tartufo nero" },
        { type: "Finale", name: "Oro e Cioccolato", desc: "Lingotto Valrhona e oro 24k" }
      ]
    }
  ];

  const getThemeColor = (theme) => {
    switch(theme) {
      case 'christmas': return 'text-red-800 border-red-800 bg-red-800';
      case 'summer': return 'text-orange-600 border-orange-600 bg-orange-600';
      case 'gala': return 'text-amber-500 border-amber-500 bg-amber-500';
      default: return 'text-emerald-800 border-emerald-800 bg-emerald-800';
    }
  };

  const getThemeIcon = (theme) => {
    switch(theme) {
      case 'christmas': return <Snowflake className="w-4 h-4" />;
      case 'summer': return <Sun className="w-4 h-4" />;
      case 'gala': return <Sparkles className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const themeColors = getThemeColor(menus[activeTab].theme);
  const textColor = themeColors.split(' ')[0];
  const borderColor = themeColors.split(' ')[1];
  const bgColor = themeColors.split(' ')[2];

  // Varianti Animazione ottimizzate
  const variants = {
    enter: (direction) => ({
      x: 20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction) => ({
      x: -20,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    })
  };

  return (
    // CAMBIATO: min-h-screen (altezza minima ma flessibile) e padding aumentato (py-24 lg:py-32)
    <section id="menu" className="relative min-h-screen w-full overflow-x-hidden bg-[#fdfbf7] flex flex-col justify-center py-24 lg:py-32" data-white-section="true">
      
      {/* Texture Sfondo */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* Header Sezione */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-stone-800 mb-6 tracking-tight"
          >
            I Nostri Menù
          </motion.h2>
          
          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-5xl mx-auto">
            {menus.map((menu, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative px-5 py-3 md:px-8 md:py-3 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 border border-transparent rounded-sm
                  ${activeTab === idx 
                    ? `bg-white shadow-xl scale-105 ${getThemeColor(menu.theme).split(' ')[0]}` 
                    : 'text-stone-400 hover:text-stone-600 hover:bg-white/50'
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  {getThemeIcon(menu.theme)}
                  {menu.label}
                </span>
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTabLine"
                    className={`absolute bottom-0 left-0 right-0 h-[3px] ${getThemeColor(menu.theme).split(' ')[2]}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="relative w-full overflow-visible"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              // CAMBIATO: max-w-7xl per allargare la sezione
              className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center max-w-7xl mx-auto w-full"
            >
              
              {/* COLONNA FOTO (Destra) - Più grande */}
              <div className="w-full lg:w-1/2 relative group cursor-pointer max-w-lg lg:max-w-none">
                 <div className={`absolute -inset-3 md:-inset-5 border ${borderColor} opacity-60 transition-all duration-500 group-hover:inset-0 group-hover:opacity-100 z-0`}></div>
                 
                 {/* CAMBIATO: Rimosso max-height restrittivo per far crescere l'immagine */}
                 <div className="relative z-10 bg-stone-200 overflow-hidden aspect-[3/4] shadow-2xl w-full">
                    <motion.img 
                      src={menus[activeTab].image}
                      alt={menus[activeTab].title}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
                         style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}>
                    </div>

                    {/* Prezzo - Ingrandito */}
                    <div className="absolute bottom-0 right-0 bg-white p-5 md:p-8 shadow-none border-t border-l border-stone-100">
                       <div className={`flex items-start leading-none ${textColor}`}>
                          <span className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                            {menus[activeTab].price}
                          </span>
                          <span className="font-serif text-xl md:text-3xl mt-2 ml-1">{menus[activeTab].currency}</span>
                       </div>
                       <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mt-2 text-right">
                         a persona
                       </p>
                    </div>
                 </div>
              </div>

              {/* COLONNA TESTO (Sinistra) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-2 md:px-0">
                 {/* Header Menu */}
                 <div className="mb-8 lg:mb-12 border-l-4 pl-6 lg:pl-8 border-stone-200">
                   <span className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block ${textColor}`}>
                     {menus[activeTab].subtitle}
                   </span>
                   <h3 className={`font-serif text-3xl md:text-5xl lg:text-7xl leading-[0.9] ${textColor}`}>
                     {menus[activeTab].title}
                   </h3>
                 </div>

                 {/* Lista piatti - Spaziatura aumentata */}
                 <div className="space-y-6 lg:space-y-8 pl-6 lg:pl-8">
                   {menus[activeTab].courses.map((course, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.1 + (idx * 0.05) }}
                       className="relative group"
                     >
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-3">
                            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 w-20 shrink-0 ${textColor}`}>
                              {course.type}
                            </span>
                            {/* Titoli Piatti più grandi */}
                            <h4 className={`font-serif text-xl md:text-3xl transition-colors cursor-default ${textColor} brightness-90 group-hover:brightness-110 truncate`}>
                              {course.name}
                            </h4>
                          </div>
                          <p className="font-serif text-stone-500 italic text-sm md:text-base leading-relaxed pl-24 border-l border-stone-200 ml-[1.1rem] mt-1">
                            {course.desc}
                          </p>
                        </div>
                     </motion.div>
                   ))}
                 </div>

                 {/* Footer */}
                 <div className="mt-12 lg:mt-16 pl-6 lg:pl-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                   <button className={`group flex items-center gap-4 px-10 py-4 text-white font-sans text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl ${bgColor} hover:brightness-110`}>
                     Prenota questo tavolo
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <p className="text-xs text-stone-400 italic">
                     * {menus[activeTab].note}
                   </p>
                 </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};