import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Preloader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="bg-gray-50 text-gray-800 font-sans transition-colors duration-300 animate-fade-in">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Portfolio />
            <Education />
            <Contact />
          </main>
          <Footer />
          <BackToTopButton />
          <style>{`
            body, .font-sans {
              font-family: 'Poppins', sans-serif;
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.5s ease-in-out;
            }
            @keyframes blink {
              50% { opacity: 0; }
            }
            .cursor-blink {
              animation: blink 1s step-end infinite;
            }
            @keyframes scale-in-out {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes float-fade {
              0% { transform: translateY(0) scale(1); opacity: 0.7; }
              50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
              100% { transform: translateY(0) scale(1); opacity: 0.7; }
            }
            /* Custom Scrollbar for Modal and other elements */
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
            /* For screen readers */
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