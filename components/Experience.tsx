import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { EXPERIENCE, TRAININGS } from '../constants';
import type { TimelineItem } from '../types';
import { CertificateIcon, BriefcaseIcon, ChartIcon } from './icons';

const TechBlock: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
  <div className="relative pl-8 md:pl-10 py-4 group">
    {/* Connecting Line (Blockchain style) */}
    <div className="absolute left-[9px] md:left-[11px] top-0 bottom-0 w-[2px] bg-gray-200 group-last:bottom-auto group-last:h-8">
        <div className="absolute inset-0 bg-[#F0544F] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>
    </div>
    
    {/* Node Connector */}
    <div className="absolute left-0 md:left-[2px] top-8 w-5 h-5 md:w-6 md:h-6 rounded-md bg-white border-2 border-gray-300 z-10 group-hover:border-[#F0544F] group-hover:rotate-45 transition-all duration-300 shadow-sm flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-[#F0544F] transition-colors"></div>
    </div>

    {/* Card */}
    <div className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-1">
       <div className="absolute top-0 right-0 px-3 py-1 bg-gray-50 text-[10px] font-mono text-gray-400 rounded-bl-xl rounded-tr-xl border-b border-l border-gray-100">
           BLOCK_{String(index + 1).padStart(3, '0')}
       </div>
       
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 mt-2">
        <h3 className="text-lg md:text-xl font-bold text-[#2A324B] flex items-center gap-2 group-hover:text-[#F0544F] transition-colors">
            {item.title}
        </h3>
        <span className="text-xs font-bold text-[#F0544F] bg-[#F0544F]/5 px-3 py-1 rounded border border-[#F0544F]/20 mt-2 sm:mt-0 tracking-wider font-mono">
            {item.date}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <BriefcaseIcon />
        <span className="border-b border-gray-200 pb-0.5">{item.subtitle}</span>
      </p>
      <p className="text-gray-600 leading-relaxed text-sm font-light">
          {item.description}
      </p>
    </div>
  </div>
);

const TrainingBadge: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
    <div className="group relative bg-white p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:border-blue-100 overflow-hidden">
        {/* Hover Glow Effect */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-200/50">
                <CertificateIcon />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-[#2A324B] text-lg leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                     <span className="text-[10px] font-mono text-gray-300 group-hover:text-blue-300 transition-colors">#{String(index + 1).padStart(2, '0')}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide font-mono">{item.date}</p>
                </div>
                <p className="text-sm text-gray-500 italic mb-2 font-medium border-l-2 border-gray-100 pl-2 group-hover:border-blue-200 transition-colors">{item.subtitle}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
            </div>
        </div>
    </div>
);

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Experience & Training" className="bg-gray-50 relative overflow-hidden">
      {/* Tech Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
        
        {/* Work Experience Column */}
        <div>
            <AnimatedSection>
                <h3 className="text-2xl font-bold mb-8 text-[#2A324B] flex items-center gap-3">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#F0544F] shadow-sm border border-gray-100">
                        <ChartIcon />
                    </span>
                    <span>Career Nodes</span>
                </h3>
                <div className="relative">
                    {EXPERIENCE.map((item, index) => (
                        <AnimatedSection key={index} delay={index * 150}>
                            <TechBlock item={item} index={index} />
                        </AnimatedSection>
                    ))}
                </div>
            </AnimatedSection>
        </div>

        {/* Relevant Training Column */}
        <div>
            <AnimatedSection delay={200}>
                <h3 className="text-2xl font-bold mb-8 text-[#2A324B] flex items-center gap-3">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#F8B462] shadow-sm border border-gray-100">
                        <CertificateIcon />
                    </span>
                    <span>Training Modules</span>
                </h3>
                <div className="space-y-4">
                    {TRAININGS.map((item, index) => (
                        <AnimatedSection key={index} delay={(index * 100) + 200}>
                            <TrainingBadge item={item} index={index} />
                        </AnimatedSection>
                    ))}
                </div>
            </AnimatedSection>
        </div>
      </div>
    </Section>
  );
};

export default Experience;