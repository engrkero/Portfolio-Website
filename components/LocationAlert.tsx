import React, { useState, useEffect } from 'react';
import { UNICAL_LOCATION, LATEST_UPDATES } from '../constants';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const LocationAlert: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Proactively check location on mount. 
    // We do NOT store persistence in localStorage to ensure it shows again upon reloading if location matches.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const distance = calculateDistance(
              latitude,
              longitude,
              UNICAL_LOCATION.latitude,
              UNICAL_LOCATION.longitude
            );
    
            // Check if user is within the radius
            if (distance <= UNICAL_LOCATION.radiusKm) {
              setShowModal(true);
            }
          },
          (error) => {
            console.error('Error retrieving location:', error);
          }
        );
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-24 z-[60] animate-slide-up-float perspective-1000">
      <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-white/50 transform transition-transform hover:scale-[1.02] duration-300 max-h-[85vh] flex flex-col ring-1 ring-white/60">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A324B] to-[#1a1f2e] px-5 py-4 flex justify-between items-center border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0544F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F0544F]"></span>
                </span>
                <div>
                    <h3 className="text-white font-bold text-sm tracking-wide uppercase">Unical Campus Hub</h3>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Location Verified
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full focus:outline-none"
                aria-label="Close alert"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

        {/* Content */}
        <div className="p-5 bg-white/95 backdrop-blur-md overflow-y-auto custom-scrollbar flex-grow">
            <p className="text-xs text-gray-600 mb-5 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                <strong className="text-[#2A324B] block mb-1">👋 Hello Neighbor!</strong> 
                We detected you are around the University of Calabar. Here are the active registration statuses you should know about:
            </p>
            <div className="space-y-4">
                {LATEST_UPDATES.map((update) => (
                    <div key={update.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${update.urgent ? 'bg-[#F0544F]' : 'bg-[#F8B462]'}`}></div>
                        
                        <div className="pl-2">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-[#2A324B] text-sm">{update.title}</h4>
                                {update.urgent && (
                                    <div className="flex items-center gap-1.5 text-[#F0544F] text-[10px] font-semibold uppercase tracking-wider">
                                        <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0544F] opacity-40"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F0544F]"></span>
                                        </span>
                                        Active
                                    </div>
                                )}
                            </div>
                            <div className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line">
                                {update.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                <a 
                    href="https://wa.me/+2349015183471?text=Hi,%20I%20am%20at%20Unical%20and%20need%20help%20with%20registration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-[#2A324B] to-[#1a1f2e] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                    <span>Start Registration Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                
                <button 
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 text-xs text-gray-400 hover:text-[#F0544F] transition-colors font-medium"
                >
                    Don't show again
                </button>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up-float {
            0% { transform: translateY(50px) rotateX(10deg); opacity: 0; }
            100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
        }
        .animate-slide-up-float {
            animation: slide-up-float 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LocationAlert;