import React from 'react';
import { WhatsappIcon } from './icons';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/+2349015183471"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center animate-bounce-slow group"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-8 h-8 group-hover:animate-pulse">
        <WhatsappIcon />
      </div>
       <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
       `}</style>
    </a>
  );
};

export default WhatsAppButton;