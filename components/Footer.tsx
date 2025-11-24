
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ShieldCheckIcon } from './icons';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('kgsc.unical@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#2A324B] text-white py-16 border-t-4 border-[#F0544F]">
      <div className="container mx-auto px-6 text-center">
        
        {/* Logo Section */}
        <div className="mb-10 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter inline-block">
                <span className="text-white">K</span>
                <span className="text-[#F0544F]">G</span>
                <span className="text-[#F8B462]">S</span>
                <span className="text-white">C</span>
            </h2>
        </div>

        {/* Contact Info Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 text-lg font-medium">
            
            {/* Email Pill */}
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 relative group">
               <a href="mailto:kgsc.unical@gmail.com" className="flex items-center gap-3">
                  <span className="text-[#F0544F]">✉️</span>
                  kgsc.unical@gmail.com
               </a>
               <div className="w-[1px] h-5 bg-gray-500 mx-1"></div>
               <button 
                  onClick={handleCopyEmail}
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none"
                  title="Copy email"
               >
                  {copied ? <CheckIcon /> : <CopyIcon />}
               </button>
               {copied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-lg animate-fade-in-up font-bold whitespace-nowrap">
                    Copied!
                  </span>
               )}
            </div>

            {/* Phone Pill */}
            <a href="tel:+2349015183471" className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300">
                <span className="text-[#F8B462]">📞</span>
                +234 901 518 3471
            </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-8 mb-12">
            {SOCIAL_LINKS.map(social => (
                <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name}
                    className="text-gray-400 hover:text-[#F0544F] hover:-translate-y-1 transition-all duration-300 transform"
                >
                    {React.cloneElement(social.icon as React.ReactElement, { className: "w-7 h-7 fill-current" })}
                </a>
            ))}
        </div>
        
        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#F0544F] to-[#F8B462] mx-auto rounded-full mb-10"></div>

        <div className="flex flex-col items-center gap-6 text-sm text-gray-400">
            {/* CAC Verification Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1f2538] border border-gray-700 shadow-inner">
                 <ShieldCheckIcon />
                 <span className="font-semibold tracking-wider text-gray-300">
                    CAC Registered: <span className="text-white font-mono">BN8007907</span>
                 </span>
            </div>

            <div className="space-y-1">
                <p className="font-medium text-gray-300">&copy; {new Date().getFullYear()} KERO GRAPHICS STUDIO CODE.</p>
                <p className="text-xs">Designed & Developed with <span className="text-[#F0544F]">♥</span> in Calabar.</p>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
