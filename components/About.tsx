import React, { useRef, useState, useEffect } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Throttle via requestAnimationFrame
    cancelAnimationFrame(frameRef.current);
    
    const { clientX, clientY } = e;
    const rect = cardRef.current.getBoundingClientRect();
    
    frameRef.current = requestAnimationFrame(() => {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        setRotation({ x: rotateX, y: rotateY });
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frameRef.current);
    setRotation({ x: 0, y: 0 });
  };
  
  // Cleanup
  useEffect(() => {
      return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <Section id="about" title="About Me" className="bg-gray-50 relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] right-[5%] w-40 h-40 bg-[#F8B462]/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-[10%] left-[5%] w-60 h-60 bg-[#2A324B]/5 rounded-full blur-3xl"></div>
       </div>

      <AnimatedSection>
        <div className="perspective-1000 flex justify-center">
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="glass-card-3d max-w-4xl mx-auto p-8 md:p-12 rounded-3xl transform transition-transform duration-100 ease-out will-change-transform"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {/* Reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-50 rounded-3xl pointer-events-none"></div>
                
                <div className="relative z-10 text-center space-y-6">
                    <div className="w-20 h-1 bg-gradient-to-r from-[#F0544F] to-[#F8B462] mx-auto rounded-full"></div>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
                        I'm a <span className="font-semibold text-[#2A324B]">passionate and versatile creative professional</span>, bridging the gap between stunning visuals and seamless user experiences. With a strong foundation in both <span className="text-[#F0544F]">graphic design</span> and <span className="text-[#2A324B]">frontend development</span>, I transform complex ideas into beautiful, intuitive, and functional digital solutions.
                    </p>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
                        My goal is to create products that not only look amazing but are also a joy to use. Whether it's crafting a memorable brand identity, designing a pixel-perfect user interface, or writing clean, efficient code, I bring a commitment to excellence and a <span className="font-semibold text-[#F8B462]">user-first mindset</span> to every project. Let's collaborate to bring your vision to life!
                    </p>
                </div>
            </div>
        </div>
      </AnimatedSection>
    </Section>
  );
};

export default About;