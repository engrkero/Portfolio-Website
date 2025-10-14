import React, { useEffect, useState, useRef } from 'react';
import type { Project } from '../types';
import { GithubIcon, LinkIcon, XIcon } from './icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const allImages = [project.imageUrl, ...(project.detailImages || [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    // --- Meta Tag Management ---
    const originalTitle = document.title;
    const getMetaContent = (selector: string): string => {
        const element = document.querySelector(selector) as HTMLMetaElement;
        return element ? element.content : '';
    };
    const setMetaContent = (selector: string, content: string): void => {
        const element = document.querySelector(selector) as HTMLMetaElement;
        if (element) {
            element.content = content;
        }
    };
    const originalMeta = {
        description: getMetaContent('meta[name="description"]'),
        ogTitle: getMetaContent('meta[property="og:title"]'),
        ogDescription: getMetaContent('meta[property="og:description"]'),
        ogImage: getMetaContent('meta[property="og:image"]'),
        twitterTitle: getMetaContent('meta[property="twitter:title"]'),
        twitterDescription: getMetaContent('meta[property="twitter:description"]'),
        twitterImage: getMetaContent('meta[property="twitter:image"]'),
    };
    const newTitle = `${project.title} | Kero Graphics Studio Code`;
    const newDescription = project.longDescription || project.description;
    document.title = newTitle;
    setMetaContent('meta[name="description"]', newDescription);
    setMetaContent('meta[property="og:title"]', newTitle);
    setMetaContent('meta[property="og:description"]', newDescription);
    setMetaContent('meta[property="og:image"]', project.imageUrl);
    setMetaContent('meta[property="twitter:title"]', newTitle);
    setMetaContent('meta[property="twitter:description"]', newDescription);
    setMetaContent('meta[property="twitter:image"]', project.imageUrl);
    
    // --- Accessibility & Event Handling ---
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), textarea, input, select'
          );
          if (!focusableElements) return;
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) { // Shift + Tab
              if (document.activeElement === firstElement) {
                  lastElement.focus();
                  event.preventDefault();
              }
          } else { // Tab
              if (document.activeElement === lastElement) {
                  firstElement.focus();
                  event.preventDefault();
              }
          }
      }

      if (allImages.length > 1) {
        const currentIndex = allImages.indexOf(activeImage);
        if (event.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % allImages.length;
            setActiveImage(allImages[nextIndex]);
        }
        if (event.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            setActiveImage(allImages[prevIndex]);
        }
      }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollTop = scrollContainerRef.current.scrollTop;
            if (window.innerWidth >= 1024) { 
                setParallaxOffset(scrollTop * 0.15);
            }
        }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
        scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      if (scrollEl) {
          scrollEl.removeEventListener('scroll', handleScroll);
      }
      
      document.title = originalTitle;
      setMetaContent('meta[name="description"]', originalMeta.description);
      setMetaContent('meta[property="og:title"]', originalMeta.ogTitle);
      setMetaContent('meta[property="og:description"]', originalMeta.ogDescription);
      setMetaContent('meta[property="og:image"]', originalMeta.ogImage);
      setMetaContent('meta[property="twitter:title"]', originalMeta.twitterTitle);
      setMetaContent('meta[property="twitter:description"]', originalMeta.twitterDescription);
      setMetaContent('meta[property="twitter:image"]', originalMeta.twitterImage);

      lastFocusedElementRef.current?.focus();
    };
  }, [project, onClose, allImages, activeImage]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transform transition-transform duration-300 scale-95 animate-scale-in custom-scrollbar focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={scrollContainerRef} className="h-full">
            <button
            onClick={onClose}
            className="sticky top-2 right-2 sm:top-4 sm:right-4 float-right text-gray-400 hover:text-[#F0544F] transition-colors duration-200 z-20 p-1 bg-white/60 backdrop-blur-sm rounded-full"
            aria-label="Close project details"
            >
            <XIcon />
            </button>

            <div className="p-6 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 lg:items-start">
                    {/* Left side: Images */}
                    <div 
                        className="flex flex-col gap-4 lg:sticky lg:top-8"
                        style={{ transform: `translateY(${parallaxOffset}px)` }}
                    >
                        <div className="w-full aspect-video rounded-lg shadow-md border overflow-hidden relative">
                            <img 
                                src={activeImage} 
                                alt={`${project.title} screenshot`} 
                                className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-105" 
                            />
                             <div className="sr-only" aria-live="polite" aria-atomic="true">
                                {`Showing image ${allImages.indexOf(activeImage) + 1} of ${allImages.length}: ${project.title}`}
                            </div>
                        </div>
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Image gallery controls">
                                {allImages.map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveImage(img)} 
                                        aria-label={`View image ${index + 1}`}
                                        aria-current={activeImage === img ? 'true' : 'false'}
                                        className={`w-full aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? 'border-[#F0544F] scale-105' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side: Details */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#F0544F] mb-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{project.category}</span>
                        <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-[#2A324B] mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{project.title}</h2>
                        
                        <div className="text-gray-600 leading-relaxed space-y-3 mb-6 flex-grow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <p>{project.longDescription || project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            {project.tags.map(tag => (
                            <span key={tag} className="bg-[#F8B462]/20 text-[#D9822B] text-xs font-semibold px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            {project.liveUrl && (
                            <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex-1 text-center px-6 py-3 bg-[#F0544F] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transform hover:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <LinkIcon />
                                <span>Live Demo</span>
                            </a>
                            )}
                            {project.repoUrl && (
                            <a 
                                href={project.repoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex-1 text-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transform hover:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <GithubIcon />
                                <span>Repository</span>
                            </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
       <style>{`
            @keyframes fade-in-fast {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in-fast {
              animation: fade-in-fast 0.3s ease-out forwards;
            }
            @keyframes scale-in {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-scale-in {
                animation: scale-in 0.3s ease-out forwards;
            }
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(1rem); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                opacity: 0; /* Initial state */
                animation: fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `}</style>
    </div>
  );
};

export default ProjectModal;