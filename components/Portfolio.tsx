import React, { useState, useMemo, useEffect } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { GithubIcon, LinkIcon } from './icons';
import ProjectModal from './ProjectModal';

const ProjectCard: React.FC<{ project: Project; onCardClick: (project: Project) => void; }> = ({ project, onCardClick }) => (
  <div 
    onClick={() => onCardClick(project)}
    className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col cursor-pointer"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(project)}
    aria-label={`View details for ${project.title}`}
  >
    <div className="relative w-full h-56 bg-gray-100">
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-bold">{project.category}</span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-[#2A324B] mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="bg-[#F8B462]/20 text-[#D9822B] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-end space-x-4">
        {project.liveUrl && (
          <a onClick={(e) => e.stopPropagation()} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F0544F] transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium">
            <LinkIcon />
            <span>Live Demo</span>
          </a>
        )}
        {project.repoUrl && (
          <a onClick={(e) => e.stopPropagation()} href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2A324B] transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium">
            <GithubIcon />
             <span>Repository</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
    <div className="w-full h-56 bg-gray-200"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-end space-x-4">
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);


const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  const categories = useMemo(() => ['All', ...new Set(PROJECTS.map(p => p.category))], []);

  const projectsFilteredByCategory = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  const availableTags = useMemo(() => {
    return [...new Set(projectsFilteredByCategory.flatMap(p => p.tags))].sort();
  }, [projectsFilteredByCategory]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projectsFilteredByCategory;
    return projectsFilteredByCategory.filter(project => project.tags.includes(activeTag));
  }, [activeTag, projectsFilteredByCategory]);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayProjects(filteredProjects);
      setIsLoading(false);
    }, 500); // Simulate network/filtering delay

    return () => clearTimeout(timer);
  }, [filteredProjects]);


  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveTag(null);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(prev => (prev === tag ? null : tag));
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Section id="portfolio" title="My Work">
        <AnimatedSection>
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-[#F0544F] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 ring-1 ring-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>
        
        {availableTags.length > 0 && (
          <AnimatedSection delay={100}>
            <div className="flex justify-center flex-wrap gap-2 mb-12 border-t border-gray-200 pt-8 mt-8 max-w-3xl mx-auto">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeTag === tag
                      ? 'bg-[#2A324B] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 ring-1 ring-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <ProjectCardSkeleton key={index} />)
          ) : displayProjects.length > 0 ? (
            displayProjects.map((project, index) => (
              <AnimatedSection key={`${activeCategory}-${activeTag || 'all'}-${project.title}`} delay={index * 100}>
                <ProjectCard project={project} onCardClick={handleOpenModal} />
              </AnimatedSection>
            ))
          ) : (
             <div className="md:col-span-2 text-center py-12">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more of my work.</p>
            </div>
          )}
        </div>
      </Section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Portfolio;