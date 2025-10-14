import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-5xl font-extrabold tracking-tighter flex">
        {'KGSC'.split('').map((letter, index) => (
          <span
            key={index}
            className="animate-[scale-in-out_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {letter === 'K' || letter === 'C' ? <span className="text-[#2A324B]">{letter}</span> : ''}
            {letter === 'G' ? <span className="text-[#F0544F]">{letter}</span> : ''}
            {letter === 'S' ? <span className="text-[#F8B462]">{letter}</span> : ''}
          </span>
        ))}
      </div>
      <div className="flex space-x-2 mt-6">
          <div className="w-2.5 h-2.5 bg-[#F0544F] rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2.5 h-2.5 bg-[#F8B462] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2.5 h-2.5 bg-[#2A324B] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        .animate-pulse {
            animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;