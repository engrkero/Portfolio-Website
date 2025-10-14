import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { SKILLS } from '../constants';
import type { Skill } from '../types';

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border-2 border-transparent hover:border-[#F0544F]">
    <div className="flex-shrink-0">{skill.icon}</div>
    <span className="font-medium text-gray-700 text-sm sm:text-base">{skill.name}</span>
  </div>
);

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="My Skills">
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {SKILLS.map((skill, index) => (
          <AnimatedSection key={skill.name} delay={index * 50}>
            <SkillBadge skill={skill} />
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
};

export default Skills;