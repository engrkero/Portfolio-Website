import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';

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
    <footer className="bg-[#2A324B] text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        
        <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 text-gray-300 text-lg">
                
                <div className="flex items-center gap-2 group relative">
                   <a href="mailto:kgsc.unical@gmail.com" className="hover:text-[#F0544F] transition-colors flex items-center justify-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F0544F] transition-colors">✉️</span>
                      kgsc.unical@gmail.com
                   </a>
                   <button 
                      onClick={handleCopyEmail}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none text-gray-400 hover:text-white"
                      title="Copy email"
                      aria-label="Copy email address"
                   >
                      {copied ? <CheckIcon /> : <CopyIcon />}
                   </button>
                   {copied && (
                      <span className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in-up">
                        Copied!
                      </span>
                   )}
                </div>

                <a href="tel:+2349015183471" className="hover:text-[#F8B462] transition-colors flex items-center justify-center gap-2 group">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F8B462] transition-colors">📞</span>
                    +234 901 518 3471
                </a>
            </div>
        </div>

        <div className="w-24 h-1 bg-gray-700 mx-auto rounded-full mb-10"></div>

        <div className="flex justify-center items-center space-x-6 mb-8">
            {SOCIAL_LINKS.map(social => (
                <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name}
                    className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                >
                    {social.icon}
                </a>
            ))}
        </div>
        
        <div className="text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} KERO GRAPHICS STUDIO CODE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;