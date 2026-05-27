import React, { useState, useEffect } from 'react';
import { getGraphicsJobs } from '../firebaseDb';
import type { GraphicsJob } from '../types';

const CATEGORIES = ['All', 'Flyer Design', 'Logo', 'Branding', 'Banner Design', 'Poster', 'Others'];

const GraphicsGallery: React.FC = () => {
  const [jobs, setJobs] = useState<GraphicsJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeJob, setActiveJob] = useState<GraphicsJob | null>(null);

  // Load custom jobs from database
  useEffect(() => {
    let active = true;
    async function fetchJobs() {
      try {
        const list = await getGraphicsJobs();
        if (active) {
          setJobs(list);
        }
      } catch (err) {
        console.error("Error loading graphics jobs", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    fetchJobs();
    return () => {
      active = false;
    };
  }, []);

  const filteredJobs = selectedCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(job.category.toLowerCase()));

  return (
    <section id="graphics" className="py-20 bg-gray-100/60 relative overflow-hidden border-t border-gray-200">
      {/* Visual Accents */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#F8B462]/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#F0544F]/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-[#F0544F] uppercase tracking-widest px-3 py-1 bg-[#F0544F]/10 rounded-full mb-3 inline-block">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A324B] tracking-tight mb-4">
            Graphics Design Gallery
          </h2>
          <div className="w-16 h-1 bg-[#F0544F] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Explore premium visual identity assets, print media setups, and creative digital designs hand-crafted for corporate clients and students in Calabar.
          </p>
        </div>

        {/* Categories Tab Pill Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 transform active:scale-95 ${
                selectedCategory === category
                  ? 'bg-[#2A324B] text-white border-transparent shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#2A324B] hover:text-[#2A324B]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#F0544F] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-mono text-xs">LOADING GALLERY NODES...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-lg mx-auto">
            <span className="text-4xl mb-4 block">🎨</span>
            <p className="text-[#2A324B] font-bold mb-1">No Jobs Registered</p>
            <p className="text-gray-500 text-xs px-6">There are currently no assets registered under the "{selectedCategory}" category in our database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, idx) => (
              <div
                key={job.id || idx}
                id={`job-card-${job.id}`}
                onClick={() => setActiveJob(job)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden flex-shrink-0">
                  <img
                    src={job.imageUrl}
                    alt={job.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Category Accent */}
                  <span className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-white/95 text-[#2A324B] rounded-md shadow-sm border border-gray-100">
                    {job.category}
                  </span>
                  {/* Overlap Gradient Tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-bold flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore Visual Code
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#2A324B] mb-2 group-hover:text-[#F0544F] transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {job.description || "Custom high-quality graphic designing item developed to support corporate representations and institutional systems."}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block border-t border-gray-100 pt-3">
                    Registered: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Overlay */}
      {activeJob && (
        <div 
          onClick={() => setActiveJob(null)}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col lg:flex-row animate-scale-in"
          >
            {/* Visual Frame */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-0">
              <img
                src={activeJob.imageUrl}
                alt={activeJob.title}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-full object-contain"
              />
            </div>
            {/* Description Meta */}
            <div className="lg:w-2/5 p-8 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F0544F] px-2.5 py-1 bg-[#F0544F]/10 rounded-md">
                      {activeJob.category}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#2A324B] mt-3 tracking-tight">
                      {activeJob.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveJob(null)}
                    className="p-1 px-2.5 bg-gray-100 text-[#2A324B] hover:bg-[#F0544F] hover:text-white rounded-lg font-bold transition-all text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>

                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                  {activeJob.description || "This piece was meticulously crafted with the absolute best visual paradigms to convey structure, information density, and brand prestige safely."}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="font-mono">Catalog Date:</span>
                  <span className="font-bold">
                    {activeJob.createdAt ? new Date(activeJob.createdAt).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : 'N/A'}
                  </span>
                </div>
                <a
                  href={`https://wa.me/+2349015183471?text=Hi,%20I%27m%20interested%20in%20a%20graphics%20design%20job%20similar%20to%20%22${encodeURIComponent(activeJob.title)}%22.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#F0544F] text-white py-3.5 rounded-xl font-bold hover:bg-[#d64642] transform hover:-translate-y-0.5 transition-all text-sm shadow-md"
                >
                  Order Design Like This
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicsGallery;
