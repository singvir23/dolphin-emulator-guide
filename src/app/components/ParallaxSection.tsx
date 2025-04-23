'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section} from '../page'; // Adjust path if needed

interface ParallaxSectionProps {
  section: Section;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

type TransformRange = [number, number];
type OpacityRange = [number, number, number, number];

const ParallaxSection = ({ section, index, containerRef }: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const [yRange, setYRange] = useState<TransformRange>([0, 1000]);
  const [opacityRange, setOpacityRange] = useState<OpacityRange>([0, 300, 700, 1000]);

  // Effect to calculate offsetTop (runs on client) - No changes here
  useEffect(() => {
    if (sectionRef.current && containerRef.current) {
      const updateOffsetTop = () => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollYPos = window.scrollY || document.documentElement.scrollTop;
            const elementTopRelativeToDocument = rect.top + scrollYPos;
            setOffsetTop(elementTopRelativeToDocument);
        }
      };

      updateOffsetTop();
      const observer = new ResizeObserver(updateOffsetTop);
      observer.observe(document.body);
      window.addEventListener('resize', updateOffsetTop);
      window.addEventListener('scroll', updateOffsetTop);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateOffsetTop);
        window.removeEventListener('scroll', updateOffsetTop);
      };
    }
  }, [containerRef, section.id]);

  // Effect to calculate ranges based on offsetTop and window.innerHeight - No changes here
  useEffect(() => {
    const calculateRanges = () => {
      if (typeof window !== 'undefined' && offsetTop > 0) {
        const vpHeight = window.innerHeight;
        setYRange([offsetTop - vpHeight * 1.2, offsetTop + vpHeight * 0.8]);
        setOpacityRange([
          offsetTop - vpHeight * 0.6,
          offsetTop - vpHeight * 0.2,
          offsetTop + vpHeight * 0.3,
          offsetTop + vpHeight * 0.7,
        ]);
      }
    };
    calculateRanges();
    window.addEventListener('resize', calculateRanges);
    return () => {
      window.removeEventListener('resize', calculateRanges);
    };
  }, [offsetTop, section.id]);

  const { scrollY } = useScroll();

  // Parallax and Opacity Transforms - No changes here
  const y = useTransform(scrollY, yRange, [80, -80], { clamp: false });
  const opacity = useTransform(scrollY, opacityRange, [0, 1, 1, 0], { clamp: true });

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-tech"
      style={{ zIndex: 10 - index }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${section.bg})`,
          y,
          willChange: 'transform',
          // Added blur(4px) to the filter
          filter: 'brightness(0.7) contrast(0.9)',
        }}
      />

      {/* Darker, Simpler Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Area */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 py-16 max-w-5xl"
        style={{ opacity }}
      >
        {/* Section Title */}
        <div className="mb-10 text-center">
           {/* Removed // from title */}
           <motion.h2
            className="text-4xl md:text-5xl font-medium mb-3 text-green-300 tracking-wide"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {section.title}
          </motion.h2>
           <motion.div
            className="h-px w-20 mx-auto bg-green-700/60"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>

        {/* Grid for Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {section.content.map((item, itemIndex) => (
            <motion.div
              key={`${section.id}-${item.step}`}
              className="group bg-black/50 border border-green-800/60 rounded-sm overflow-hidden backdrop-blur-sm transition-colors duration-300 hover:border-green-600/80"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.08 * itemIndex + 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="p-5 flex items-start gap-4">
                 {/* Simpler Step Indicator */}
                 <div className={`flex-shrink-0 mt-1 w-6 h-6 flex items-center justify-center border rounded-full text-xs font-bold ${item.step === '!' ? 'border-red-500 text-red-400' : 'border-green-600 text-green-400'}`}>
                  {item.step}
                </div>
                 {/* Content */}
                 <div>
                  <h3 className="text-lg font-medium text-green-300 mb-1.5 group-hover:text-green-200 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-green-400/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;