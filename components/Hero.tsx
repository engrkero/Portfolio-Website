import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { DownloadIcon } from './icons';

const Hero: React.FC = () => {
    const [typedText, setTypedText] = useState('');
    const fullText = "KERO GRAPHICS STUDIO CODE";

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeoutId = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 120); // Typing speed
            return () => clearTimeout(timeoutId);
        }
    }, [typedText]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-[#F0544F]/20 rounded-full animate-[float-fade_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-[#F8B462]/20 rounded-full animate-[float-fade_7s_ease-in-out_infinite_1s]"></div>
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-[#2A324B]/10 rounded-full animate-[float-fade_9s_ease-in-out_infinite_2s]"></div>
        </div>
      <div className="text-center px-6 z-10">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight min-h-[6rem] md:min-h-[5rem]">
            <span className="text-[#2A324B]">{typedText.substring(0, 9)}</span>
            <span className="text-[#F0544F]">{typedText.substring(9, 15)}</span>
            <span className="text-[#F8B462]">{typedText.substring(15, 21)}</span>
            <span className="text-[#2A324B]">{typedText.substring(21)}</span>
            <span className="cursor-blink text-gray-400">|</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={3400}>
          <p className="mt-4 text-lg md:text-2xl font-medium text-gray-600">
            UI/UX Designer | Graphic Designer | Frontend Developer
          </p>
        </AnimatedSection>
        <AnimatedSection delay={3600}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#portfolio"
              onClick={handleSmoothScroll}
              className="px-8 py-3 bg-[#F0544F] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/1CeMtUylms0k4K-nAUdwajK0o60rBKhj_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#F8B462] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <DownloadIcon />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={handleSmoothScroll}
              className="px-8 py-3 bg-white text-[#2A324B] font-semibold rounded-lg shadow-lg ring-1 ring-gray-200 hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;