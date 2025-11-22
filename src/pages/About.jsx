import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="bg-white py-24 lg:py-32 relative overflow-hidden" data-white-section="true">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* COLONNA SINISTRA: TIPOGRAFIA */}
          <div className="w-full lg:w-5/12 z-10 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                {/* BLOCCO TITOLO GIGANTE */}
                <div className="font-serif text-[#006400] leading-[0.8] mb-12 select-none">
                    {/* Riga 1: DAL 1905 ... AL */}
                    <div className="flex items-end gap-4 mb-2">
                        <span className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight">
                            DAL 1905
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl font-light italic mb-1">
                            AL
                        </span>
                    </div>
                    
                    {/* Riga 2: VOSTRO */}
                    <div className="text-[5rem] md:text-[7rem] lg:text-[8.5rem] font-bold tracking-tighter -ml-1">
                        VOSTRO
                    </div>
                    
                    {/* Riga 3: SERVIZIO */}
                    <div className="text-[5rem] md:text-[7rem] lg:text-[8.5rem] font-light tracking-tighter -ml-1">
                        SERVIZIO
                    </div>
                </div>

                {/* SOTTOTITOLO */}
                <h3 className="font-serif text-[#006400] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6 border-b border-green-200 pb-2 inline-block">
                    LA NOSTRA STORIA
                </h3>
                
                {/* TESTO */}
                <div className="font-serif text-stone-600 text-lg leading-relaxed space-y-6 font-light max-w-md">
                    <p>
                        <span className="text-4xl float-left mr-2 mt-[-8px] font-serif text-[#006400]">F</span>
                        ondata nel 1905, la nostra osteria ha servito generazioni di avventori con piatti che rispecchiano la tradizione locale.
                    </p>
                    <p>
                        Da piccolo locale di paese a rinomata meta gastronomica, mantenendo intatta l'autenticità delle ricette originali.
                    </p>
                </div>
            </motion.div>
          </div>

          {/* COLONNA DESTRA: IMMAGINE E CORNICE */}
          <div className="w-full lg:w-7/12 relative mt-8 lg:mt-0">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               // AGGIUNTO lg:ml-12 per spostare tutto il blocco verso destra su desktop
               className="relative pl-8 pt-8 max-w-lg lg:ml-32" 
             >
                 {/* CORNICE A "L" VERDE */}
                 <div className="absolute top-0 left-0 w-1/2 h-[80%] border-t-[8px] border-l-[8px] border-[#006400] z-0"></div>
                 
                 {/* CONTENITORE IMMAGINE */}
                 <div className="relative z-10 ml-6 mt-6">
                    {/* Immagine con effetto bianco e nero granuloso */}
                    <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl">
                        <img 
                            src="/img/storica.jpg" 
                            onError={(e) => {e.target.src = "/img/storia.jpg";}}
                            alt="Facciata storica 1920"
                            className="w-full h-auto object-cover contrast-125 brightness-90" 
                        />
                        {/* Overlay leggera texture vintage */}
                        <div className="absolute inset-0 bg-sepia-0 mix-blend-overlay opacity-20 pointer-events-none"></div>
                    </div>
                 </div>
                 
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};