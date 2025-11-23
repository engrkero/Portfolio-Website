import React, { useState, useMemo, useEffect, useRef } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { GithubIcon, LinkIcon } from './icons';
import ProjectModal from './ProjectModal';

const ProjectCard3D: React.FC<{ project: Project; onCardClick: (project: Project) => void; }> = ({ project, onCardClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
        className="perspective-1000 h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onCardClick(project)}
    >
        <div 
            ref={cardRef}
            className="relative h-full bg-white rounded-2xl transition-all duration-100 ease-out preserve-3d cursor-pointer border border-gray-100"
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
                boxShadow: isHovering 
                    ? '0 20px 40px -10px rgba(42, 50, 75, 0.2)' 
                    : '0 10px 20px -10px rgba(0,0,0,0.1)'
            }}
            role="button"
            tabIndex={0}
        >
            {/* Image floating "above" card */}
            <div 
                className="h-56 w-full overflow-hidden rounded-t-2xl bg-gray-100 relative"
                style={{ transform: 'translateZ(20px)' }}
            >
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-white font-bold text-lg px-4 py-2 border-2 border-white rounded-full transform translate-y-4 transition-transform duration-300"
                          style={{ transform: isHovering ? 'translateY(0) translateZ(30px)' : 'translateY(10px)' }}>
                        View Project
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(10px)' }}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#2A324B]">{project.title}</h3>
                    <span className="text-xs font-bold text-[#F0544F] bg-[#F0544F]/10 px-2 py-1 rounded-md">{project.category}</span>
                </div>
                <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
                        {tag}
                    </span>
                    ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-4">
                    {project.liveUrl && (
                        <span className="text-gray-400 hover:text-[#F0544F] transition-colors">
                             <LinkIcon />
                        </span>
                    )}
                    {project.repoUrl && (
                        <span className="text-gray-400 hover:text-[#2A324B] transition-colors">
                             <GithubIcon />
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse h-[400px]">
    <div className="w-full h-56 bg-gray-200"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
    </div>
  </div>
);


const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  const categories = useMemo(() => ['All', ...new Set(PROJECTS.map(p => p.category))], []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = activeCategory === 'All' 
        ? PROJECTS 
        : PROJECTS.filter(p => p.category === activeCategory);
      setDisplayProjects(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <>
      <Section id="portfolio" title="My Work">
        <AnimatedSection>
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none ${
                  activeCategory === category
                    ? 'bg-[#2A324B] text-white shadow-lg shadow-[#2A324B]/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto px-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <ProjectCardSkeleton key={index} />)
          ) : displayProjects.length > 0 ? (
            displayProjects.map((project, index) => (
              <AnimatedSection key={`${activeCategory}-${project.title}`} delay={index * 100}>
                <ProjectCard3D project={project} onCardClick={setSelectedProject} />
              </AnimatedSection>
            ))
          ) : (
             <div className="md:col-span-2 text-center py-12">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Projects Found</h3>
            </div>
          )}
        </div>
      </Section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Portfolio;