import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { ACHIEVEMENTS } from '../constants';

const Counter: React.FC<{ end: string; duration?: number }> = ({ end, duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const targetNumber = parseInt(end.replace(/\D/g, ''), 10);
  const suffix = end.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(ease * targetNumber);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, targetNumber, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const Achievements: React.FC = () => {
  return (
    <Section id="achievements" title="Impact Statistics" className="bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {ACHIEVEMENTS.map((item, index) => (
            <AnimatedSection key={index} delay={item.delay}>
              <div className="group relative perspective-1000">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(240,84,79,0.15)]"></div>
                
                <div className="relative p-6 md:p-8 flex flex-col items-center text-center border border-gray-100 rounded-2xl bg-white/80 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-gray-200">
                    
                    {/* Tech Ring Icon */}
                    <div className="relative mb-4">
                        <div className="absolute inset-0 rounded-full border-2 border-gray-100 group-hover:border-[#F0544F] border-t-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-[#2A324B] group-hover:text-[#F0544F] transition-colors duration-300">
                            {React.cloneElement(item.icon as React.ReactElement, { className: "w-7 h-7" })}
                        </div>
                    </div>
                    
                    <div className="font-black text-4xl md:text-5xl text-[#2A324B] mb-2 font-mono tracking-tighter">
                        <Counter end={item.count} />
                    </div>
                    
                    <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#F0544F] transition-colors duration-300">
                        {item.title}
                    </p>
                    
                    {/* Decorative corner accents */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gray-200 group-hover:border-[#F8B462] transition-colors"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gray-200 group-hover:border-[#F8B462] transition-colors"></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </Section>
  );
};

export default Achievements;