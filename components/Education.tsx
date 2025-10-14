import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { EDUCATION } from '../constants';
import type { TimelineItem } from '../types';

const EducationCard: React.FC<{ item: TimelineItem; isLast: boolean }> = ({ item, isLast }) => (
    <div className="flex group">
      <div className="flex flex-col items-center mr-6">
        <div className="w-4 h-4 bg-[#F8B462] rounded-full transition-transform duration-300 group-hover:scale-125"></div>
        {!isLast && <div className="w-px h-full bg-gray-300"></div>}
      </div>
      <div className={`pb-12 w-full transition-all duration-300 transform group-hover:scale-[1.02]`}>
        <p className="mb-1 text-sm font-semibold text-gray-500">{item.date}</p>
        <h3 className="text-xl font-semibold text-[#2A324B]">{item.title}</h3>
        <p className="text-md font-medium text-gray-500 mb-2">{item.subtitle}</p>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );

const Education: React.FC = () => {
  return (
    <Section id="education" title="Education & Certifications" className="bg-white">
      <div className="max-w-3xl mx-auto">
        {EDUCATION.map((item, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <EducationCard item={item} isLast={index === EDUCATION.length - 1} />
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
};

export default Education;