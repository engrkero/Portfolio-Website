import React, { useRef, useState, useEffect } from 'react';
import { getSiteSettings, getLocalSettings } from '../firebaseDb';
import type { SiteSettings } from '../types';

const CEOProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<SiteSettings>(getLocalSettings());
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const val = await getSiteSettings();
        setSettings(val);
      } catch (err) {
        console.error("Error loading CEO details for profile card", err);
      }
    }
    fetchSettings();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative position
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Convert to percentage for radial glow
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });

    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 15 degrees tilt
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="py-16 bg-[#2A324B]/5 relative overflow-hidden border-b border-gray-200">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#F0544F]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F8B462]/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#F0544F] uppercase tracking-widest px-3 py-1 bg-[#F0544F]/10 rounded-full mb-3 inline-block">
            Leadership
          </span>
          <h2 className="text-4xl font-extrabold text-[#2A324B] tracking-tight">
            Meet Our CEO
          </h2>
          <div className="w-12 h-1 bg-[#F8B462] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="flex justify-center items-center perspective-1000">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-lg bg-[#2A324B] text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden border border-white/10"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
              boxShadow: isHovered 
                ? '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 40px rgba(240,84,79,0.2)' 
                : '0 20px 40px -20px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D Radial Glow follows mouse pointer */}
            <div 
              className="absolute inset-0 opacity-40 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle 250px at ${glowPosition.x}% ${glowPosition.y}%, rgba(248,180,98,0.25), transparent 70%)`
              }}
            ></div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-6 right-6 font-mono text-[9px] text-[#F8B462]/60 tracking-wider">
              KGSC CORE // LEVEL 01
            </div>

            {/* Internal layout with 3D translation */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6" style={{ transform: 'translateZ(50px)' }}>
              
              {/* Profile Image Frame */}
              <div className="relative group/avatar">
                {/* Image glowing base ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F0544F] to-[#F8B462] rounded-full blur opacity-75 group-hover/avatar:opacity-100 animate-pulse transition duration-1000"></div>
                
                {/* Actual image */}
                <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#2A324B]">
                  <img 
                    src={settings.ceoImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"} 
                    alt={settings.ceoName} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                  />
                </div>

                {/* Verification Badge */}
                <div className="absolute bottom-1 right-2 bg-gradient-to-r from-[#F0544F] to-[#F8B462] text-white p-1.5 rounded-full shadow-lg border border-[#2A324B]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.9L10 .954 17.834 4.9a1 1 0 01.553.894v6.17a8 8 0 01-5.187 7.456l-2.647 1.01a1 1 0 01-.733 0l-2.647-1.01a8 8 0 01-5.187-7.456V5.794a1 1 0 01.553-.894zM10 12.586l3.293-3.293a1 1 0 00-1.414-1.414L10 9.758 8.121 7.879a1 1 0 00-1.414 1.414L10 12.586z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Title Block */}
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-1">
                  {settings.ceoName}
                </h3>
                <p className="text-[#F8B462] font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-ping"></span>
                  Founder & CEO
                </p>
              </div>

              {/* Business Description Bio */}
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                {settings.ceoBio || "Creative Director, developer, and registered digital assets consultant spearheading technological integration spaces in Nigeria."}
              </p>

              {/* Verified CAC badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-[11px] text-gray-400 font-mono tracking-wide">
                <svg className="w-4 h-4 text-[#F8B462]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                CAC BN8007907 REGISTERED
              </div>

              {/* Social Channels inside 3D Card */}
              <div className="flex justify-center gap-4 pt-4">
                <a 
                  href="https://wa.me/+2349015183471" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-[#F0544F] transition-all transform hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.6 1.455 5.4 0 9.8-4.3 9.8-9.8.0-2.6-1-5.1-2.9-6.9-1.9-1.9-4.4-2.9-6.9-2.9-5.4 0-9.8 4.3-9.8 9.8 0 1.8.5 3.5 1.4 4.9l-1 3.5z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/k-g-s-c" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-[#F0544F] transition-all transform hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOProfileCard;
