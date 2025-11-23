
import React, { useEffect, useState, useRef } from 'react';
import type { Project } from '../types';
import { GithubIcon, LinkIcon, XIcon } from './icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const allImages = [project.imageUrl, ...(project.detailImages || [])];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex];
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  
  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Navigation handlers
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };


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
    // Focus the close button or the first focusable element ideally, but the container works for context.
    // We'll check for focusable elements and focus the first one (close button usually)
    const firstFocusable = modalRef.current?.querySelector('button');
    if (firstFocusable) firstFocusable.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
          const focusableElementsSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsSelector);
          
          if (focusableElements && focusableElements.length > 0) {
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
          } else {
              event.preventDefault();
          }
      }

      if (allImages.length > 1) {
        if (event.key === 'ArrowRight') {
            handleNext();
        }
        if (event.key === 'ArrowLeft') {
            handlePrev();
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
  }, [project, onClose, allImages.length]); 

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in-fast"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-desc"
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transform transition-transform duration-300 scale-95 animate-scale-in custom-scrollbar focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={scrollContainerRef} className="h-full">
            <button
              onClick={onClose}
              className="sticky top-2 right-2 sm:top-4 sm:right-4 float-right text-gray-400 hover:text-[#F0544F] transition-colors duration-200 z-20 p-1 bg-white/60 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#F0544F]"
              aria-label="Close project details"
            >
              <XIcon />
            </button>

            <div className="p-6 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 lg:items-start">
                    {/* Left side: Images Carousel */}
                    <div 
                        className="flex flex-col gap-4 lg:sticky lg:top-8"
                        style={{ transform: `translateY(${parallaxOffset}px)` }}
                    >
                        <div 
                          className="w-full aspect-video rounded-lg shadow-md border overflow-hidden relative group touch-pan-y bg-gray-100"
                          onTouchStart={onTouchStart}
                          onTouchMove={onTouchMove}
                          onTouchEnd={onTouchEnd}
                        >
                            <img 
                                key={activeImage} // Key change forces animation restart
                                src={activeImage} 
                                alt={`${project.title} view ${activeIndex + 1}`} 
                                className="w-full h-full object-cover animate-fade-in-fast" 
                                loading="eager"
                            />
                            {/* Carousel Navigation Arrows */}
                            {allImages.length > 1 && (
                              <>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white z-10"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeftIcon />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white z-10"
                                  aria-label="Next image"
                                >
                                  <ChevronRightIcon />
                                </button>
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {allImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white ${idx === activeIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                            aria-current={idx === activeIndex ? 'true' : 'false'}
                                        />
                                    ))}
                                </div>
                              </>
                            )}
                        </div>
                         <div className="sr-only" aria-live="polite" aria-atomic="true">
                            {`Showing image ${activeIndex + 1} of ${allImages.length}: ${project.title}`}
                        </div>
                        
                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Image gallery thumbnails">
                                {allImages.map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveIndex(index)} 
                                        aria-label={`View image ${index + 1}`}
                                        aria-current={index === activeIndex ? 'true' : 'false'}
                                        className={`w-full aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F0544F] ${index === activeIndex ? 'border-[#F0544F] ring-2 ring-[#F0544F]' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'}`}
                                    >
                                        <img 
                                          src={img} 
                                          alt={`Thumbnail ${index + 1}`} 
                                          className="w-full h-full object-cover" 
                                          loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side: Details */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#F0544F] mb-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{project.category}</span>
                        <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-[#2A324B] mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{project.title}</h2>
                        
                        <div id="project-modal-desc" className="text-gray-600 leading-relaxed space-y-3 mb-6 flex-grow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
                                className="flex-1 text-center px-6 py-3 bg-[#F0544F] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transform hover:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0544F]"
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
                                className="flex-1 text-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transform hover:translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
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
