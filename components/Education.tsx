import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { EDUCATION } from '../constants';
import type { TimelineItem } from '../types';
import { GraduationCapIcon } from './icons';

const EducationCard: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
    <div className="group relative h-full perspective-1000">
        
        <div className="relative h-full bg-white p-8 rounded-2xl flex flex-col transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2 group-hover:rotate-x-2">
            {/* 3D Effect Layer */}
            <div className="absolute inset-x-4 bottom-0 h-4 bg-gray-200 rounded-b-2xl transform translate-y-2 -z-10 group-hover:translate-y-4 transition-transform duration-500"></div>

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                   <span className="transform transition-transform group-hover:rotate-12 block">
                       <GraduationCapIcon />
                   </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-500 group-hover:bg-[#F0544F] group-hover:text-white group-hover:border-transparent transition-all">
                    {item.date}
                </div>
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-[#2A324B] mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-4">
                {item.subtitle}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                {item.description}
            </p>
        </div>
    </div>
  );

const Education: React.FC = () => {
  return (
    <Section id="education" title="Education & Certifications" className="bg-gray-50 relative overflow-hidden">
      {/* Soft Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {EDUCATION.map((item, index) => (
            <AnimatedSection key={index} delay={index * 100} className="h-full">
                <EducationCard item={item} index={index} />
            </AnimatedSection>
            ))}
        </div>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-2 { transform: rotateX(2deg); }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </Section>
  );
};

export default Education;