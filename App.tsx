
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BackToTopButton from './components/BackToTopButton';
import WhatsAppButton from './components/WhatsAppButton';
import LocationAlert from './components/LocationAlert';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
         setLoading(false);
    }, 2500); // Preloader duration

    return () => {
        clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="bg-gray-50 text-gray-800 font-sans transition-colors duration-300 animate-fade-in overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Portfolio />
            <Services />
            <Achievements />
            <Education />
            <Contact />
          </main>
          <Footer />
          <BackToTopButton />
          <WhatsAppButton />
          <LocationAlert />
          <style>{`
            body, .font-sans {
              font-family: 'Poppins', sans-serif;
            }
            
            /* Web3 / 3D Styles */
            .perspective-1000 {
              perspective: 1000px;
            }
            
            .preserve-3d {
              transform-style: preserve-3d;
            }
            
            .glass-panel {
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.5);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
            }
            
            .glass-card-3d {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.6);
              box-shadow: 
                0 10px 30px -10px rgba(42, 50, 75, 0.15),
                inset 0 0 20px rgba(255, 255, 255, 0.5);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            /* Animations */
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.5s ease-in-out;
            }
            
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(2deg); }
            }
            .animate-float-slow {
              animation: float-slow 6s ease-in-out infinite;
            }

            @keyframes float-medium {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-15px) translateX(5px); }
            }
            .animate-float-medium {
              animation: float-medium 4s ease-in-out infinite;
            }
            
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 15px rgba(240, 84, 79, 0.2); }
              50% { box-shadow: 0 0 30px rgba(240, 84, 79, 0.6); }
            }

            .cursor-blink {
              animation: blink 1s step-end infinite;
            }
            @keyframes blink {
              50% { opacity: 0; }
            }
            
            /* Custom Scrollbar */
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #ccc;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #aaa;
            }
            
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default App;
