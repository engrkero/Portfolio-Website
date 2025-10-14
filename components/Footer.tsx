import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A324B] text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-4 mb-6">
            {SOCIAL_LINKS.map(social => (
                <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name}
                    className="text-gray-300 hover:text-white transition-transform transform hover:scale-110"
                >
                    {social.icon}
                </a>
            ))}
        </div>
        <p>&copy; 2025 KERO GRAPHIC STUDIO CODE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;