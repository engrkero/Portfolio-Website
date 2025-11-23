
import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { GithubIcon } from './icons';

const Portfolio: React.FC = () => {
  return (
    <Section id="portfolio" title="My Work" className="bg-white relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#2A324B_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <AnimatedSection>
        <div className="flex flex-col items-center justify-center py-20 relative z-10">
            {/* Context Text */}
            <div className="max-w-2xl text-center mb-16 space-y-4">
                <p className="text-xl md:text-2xl text-gray-700 font-light">
                    My projects live where code meets creativity.
                </p>
                <p className="text-sm md:text-base text-gray-500">
                    Explore the source code, open-source contributions, and live technical deployments directly on my GitHub repository.
                </p>
            </div>

            {/* The Web3 Button */}
            <a 
                href="https://github.com/engrkero" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center scale-100 hover:scale-105 transition-transform duration-500"
            >
                {/* 1. Animated Gradient Ring Blur */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#2A324B] via-[#F0544F] to-[#F8B462] rounded-full opacity-60 group-hover:opacity-100 blur-lg transition-opacity duration-500 animate-spin-slow"></div>
                
                {/* 2. Sharp Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A324B] via-[#F0544F] to-[#F8B462] rounded-full p-[2px] animate-gradient-xy">
                    <div className="h-full w-full bg-white rounded-full"></div>
                </div>
                
                {/* 3. Button Content */}
                <div className="relative flex items-center gap-6 bg-white text-[#2A324B] px-12 py-6 rounded-full leading-none overflow-hidden">
                    
                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-gray-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                    
                    {/* Icon */}
                    <span className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#2A324B] text-white rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <GithubIcon />
                    </span>
                    
                    {/* Text */}
                    <div className="relative z-10 flex flex-col items-start">
                        <span className="font-bold text-2xl tracking-tight group-hover:text-[#F0544F] transition-colors">
                            Access Repository
                        </span>
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest group-hover:text-[#F8B462] transition-colors">
                            // view_source_code
                        </span>
                    </div>
                    
                    {/* Arrow */}
                    <div className="relative z-10 pl-4 border-l border-gray-100">
                         <svg className="w-6 h-6 text-gray-400 transform group-hover:translate-x-2 group-hover:text-[#2A324B] transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                </div>
            </a>
            
            {/* Decorative Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
        </div>
      </AnimatedSection>

      <style>{`
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 3s ease infinite;
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </Section>
  );
};

export default Portfolio;
