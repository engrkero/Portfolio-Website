import React from 'react';
import { WhatsappIcon } from './icons';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/+2349015183471"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[90] bg-[#25D366] text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:bg-[#22c35e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center animate-bounce-slow group"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-6 h-6 md:w-9 md:h-9 group-hover:animate-pulse">
        <WhatsappIcon />
      </div>
       <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
       `}</style>
    </a>
  );
};

export default WhatsAppButton;