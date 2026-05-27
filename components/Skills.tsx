import React, { useState, useEffect } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { subscribeSkills, getLocalSkills } from '../firebaseDb';
import type { Skill } from '../types';
import { 
  UiUxIcon, 
  GraphicDesignIcon, 
  CodeIcon, 
  ReactIcon, 
  TypescriptIcon, 
  TailwindCssIcon, 
  FigmaIcon, 
  AdobeSuiteIcon, 
  BrainIcon, 
  UsersIcon, 
  ClockIcon, 
  HeartIcon 
} from './icons';

const ICON_MAP: Record<string, React.ReactNode> = {
  UiUxIcon: <UiUxIcon />,
  GraphicDesignIcon: <GraphicDesignIcon />,
  CodeIcon: <CodeIcon />,
  ReactIcon: <ReactIcon />,
  TypescriptIcon: <TypescriptIcon />,
  TailwindCssIcon: <TailwindCssIcon />,
  FigmaIcon: <FigmaIcon />,
  AdobeSuiteIcon: <AdobeSuiteIcon />,
  BrainIcon: <BrainIcon />,
  UsersIcon: <UsersIcon />,
  ClockIcon: <ClockIcon />,
  HeartIcon: <HeartIcon />,
};

const SkillToken: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const renderedIcon = skill.imageUrl ? (
    <img 
      src={skill.imageUrl} 
      alt={skill.name} 
      className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-xl"
    />
  ) : (
    skill.iconName && ICON_MAP[skill.iconName] ? ICON_MAP[skill.iconName] : <CodeIcon />
  );

  return (
    <div 
      className="group relative w-full aspect-square perspective-1000"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-full h-full transition-all duration-500 preserve-3d group-hover:rotate-y-12 group-hover:scale-110">
          {/* Token Body */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:shadow-[0_20px_40px_-10px_rgba(240,84,79,0.2)] group-hover:border-[#F0544F]/30 animate-float-slow">
              
              {/* Icon Container */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-50 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:shadow-lg transition-all">
                  <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 flex items-center justify-center">
                      {renderedIcon}
                  </div>
              </div>
              
              {/* Text */}
              <span className="font-bold text-gray-700 text-xs md:text-sm text-center px-2 group-hover:text-[#2A324B] line-clamp-1">
                  {skill.name}
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
      </div>
      <style>{`
          .rotate-y-12 { transform: rotateY(12deg); }
      `}</style>
    </div>
  );
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(getLocalSkills());

  useEffect(() => {
    const unsubscribe = subscribeSkills((loaded) => {
      if (loaded && loaded.length > 0) {
        setSkills(loaded);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Section id="skills" title="My Tech Stack">
      <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8">
        {skills.map((skill, index) => (
          <AnimatedSection key={skill.id || skill.name} delay={index * 50}>
            <SkillToken skill={skill} index={index} />
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
