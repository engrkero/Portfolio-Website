import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { EXPERIENCE, TRAININGS } from '../constants';
import type { TimelineItem } from '../types';

const TimelineCard: React.FC<{ item: TimelineItem; isLast: boolean }> = ({ item, isLast }) => (
  <div className="flex group">
    <div className="flex flex-col items-center mr-6">
      <div className="w-4 h-4 bg-[#F0544F] rounded-full transition-transform duration-300 group-hover:scale-125"></div>
      {!isLast && <div className="w-px h-full bg-gray-300"></div>}
    </div>
    <div className={`pb-12 w-full transition-all duration-300 transform group-hover:scale-[1.02]`}>
      <p className="mb-1 text-sm font-semibold text-[#F0544F]">{item.date}</p>
      <h3 className="text-xl font-semibold text-[#2A324B]">{item.title}</h3>
      <p className="text-md font-medium text-gray-500 mb-2">{item.subtitle}</p>
      <p className="text-gray-600">{item.description}</p>
    </div>
  </div>
);

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Experience & Trainings" className="bg-white">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
           <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">Work Experience</h3>
           {EXPERIENCE.map((item, index) => (
            <AnimatedSection key={index} delay={index * 100}>
             <TimelineCard item={item} isLast={index === EXPERIENCE.length - 1} />
            </AnimatedSection>
           ))}
        </AnimatedSection>
         <AnimatedSection delay={200}>
           <div className="mt-16">
             <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">Relevant Trainings</h3>
             {TRAININGS.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
               <TimelineCard item={item} isLast={index === TRAININGS.length - 1} />
              </AnimatedSection>
             ))}
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
};

export default Experience;