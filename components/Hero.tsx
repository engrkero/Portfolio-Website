import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import { DownloadIcon } from './icons';

const Hero: React.FC = () => {
    const [typedText, setTypedText] = useState('');
    const fullText = "KERO GRAPHICS STUDIO CODE";
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Performance: Use ref instead of state to avoid re-renders on every mouse move
    const mouseRef = useRef({ x: 0, y: 0 });

    // Typing Effect
    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeoutId = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [typedText]);

    // Mouse Move Listener - Optimized to just update ref
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Calculate normalized coordinates (-1 to 1)
            const x = (e.clientX / innerWidth - 0.5) * 2; 
            const y = (e.clientY / innerHeight - 0.5) * 2; 
            mouseRef.current = { x, y };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Consolidated Animation Loop (Canvas + DOM Transforms)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Brand colors but very subtle for white theme
        const colors = ['rgba(42, 50, 75, 0.3)', 'rgba(240, 84, 79, 0.25)', 'rgba(248, 180, 98, 0.25)', 'rgba(200, 200, 200, 0.3)'];
        const particleCount = window.innerWidth < 768 ? 30 : 80; // Reduced count for performance
        
        class Particle {
            x: number;
            y: number;
            size: number;
            color: string;
            speedX: number;
            speedY: number;
            baseX: number;
            baseY: number;
            density: number;
            angle: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.density = (Math.random() * 30) + 1;
                this.angle = Math.random() * 360;
            }

            update() {
                // Autonomous breathing motion
                this.angle += 0.02;
                const breatheX = Math.sin(this.angle) * 0.5;
                const breatheY = Math.cos(this.angle) * 0.5;

                this.x += this.speedX + breatheX;
                this.y += this.speedY + breatheY;

                // Wrap around screen
                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const drawConnections = () => {
            // Optimization: Only check a subset or reduce checks if needed
            // For now, standard N^2 check is fine for < 100 particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    
                    // Optimization: Manhattan distance check first to avoid sqrt
                    if (Math.abs(dx) > 120 || Math.abs(dy) > 120) continue;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / 120})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        let animationId: number;
        
        // Main Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // 1. Update Canvas Particles
            const mouseX = mouseRef.current.x * 20; // Scale effect
            const mouseY = mouseRef.current.y * 20;

            particles.forEach(p => {
                // Apply slight parallax to particles based on mouse
                p.x += (mouseX * 0.02); 
                p.y += (mouseY * 0.02);
                p.update();
                p.draw(ctx);
            });
            drawConnections();
            
            // 2. Direct DOM Manipulation for 3D Elements (High Performance)
            // This avoids React renders for the parallax effect
            if (parallaxRef.current) {
                const rotX = -mouseRef.current.y * 15; // Max degrees
                const rotY = mouseRef.current.x * 15;
                parallaxRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            }

            if (contentRef.current) {
                const rotX = -mouseRef.current.y * 5;
                const rotY = mouseRef.current.x * 5;
                contentRef.current.style.transform = `translateZ(30px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this only mounts ONCE

  return (
    <section 
        id="home" 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden perspective-1000"
    >
        {/* Canvas Particle Background */}
        <canvas 
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* 3D Floating Elements - Enhanced for Web3 Feel */}
        <div 
            ref={parallaxRef}
            className="absolute inset-0 z-0 pointer-events-none preserve-3d will-change-transform"
        >
            {/* Cosmic Glows */}
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60 animate-pulse" 
                 style={{ transform: `translateZ(-50px)` }}></div>
            
            <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 animate-float-slow" 
                 style={{ transform: `translateZ(-80px)` }}></div>

            {/* Floating 3D Prisms/Shapes */}
            <div className="absolute top-[15%] right-[20%] hidden md:block preserve-3d"
                 style={{ transform: `translateZ(60px)` }}>
                <div className="w-24 h-24 border border-gray-200/50 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl animate-float-medium animate-breathe"></div>
            </div>
            
            <div className="absolute bottom-[25%] left-[15%] hidden md:block preserve-3d"
                 style={{ transform: `translateZ(80px)` }}>
                 <div className="w-16 h-16 border border-[#F0544F]/20 rounded-xl bg-white/20 backdrop-blur-md shadow-xl animate-float-slow animate-breathe-delayed"></div>
            </div>
            
             {/* Additional depth elements */}
             <div className="absolute top-[40%] left-[5%] w-8 h-8 rounded-full bg-[#F8B462]/10 blur-sm animate-float-slow"
                  style={{ transform: `translateZ(30px)` }}></div>
                 
            {/* Geometric Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]"
                 style={{ transform: `translateZ(-100px) scale(1.5)` }}></div>
        </div>

      <div 
           ref={contentRef}
           className="text-center px-6 z-10 relative preserve-3d will-change-transform"
      >
        <AnimatedSection>
          <div className="relative inline-block">
             {/* Dynamic Halo behind text */}
             <div className="absolute -inset-10 bg-gradient-to-r from-[#2A324B]/5 via-[#F0544F]/5 to-[#F8B462]/5 blur-3xl rounded-full opacity-80 animate-pulse-slow"></div>
             
             <h1 className="relative text-4xl md:text-7xl font-extrabold tracking-tight min-h-[6rem] md:min-h-[5rem] drop-shadow-sm transform transition-transform duration-200"
                 style={{ transform: `translateZ(60px)` }}>
                <span className="text-[#2A324B] inline-block hover:scale-105 transition-transform">{typedText.substring(0, 9)}</span>
                <span className="text-[#F0544F] inline-block hover:scale-105 transition-transform">{typedText.substring(9, 15)}</span>
                <span className="text-[#F8B462] inline-block hover:scale-105 transition-transform">{typedText.substring(15, 21)}</span>
                <span className="text-[#2A324B] inline-block hover:scale-105 transition-transform">{typedText.substring(21)}</span>
                <span className="cursor-blink text-gray-400 font-light">|</span>
            </h1>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={400}>
          <div className="glass-panel inline-block px-8 py-3 rounded-full mt-4 transform transition-all hover:scale-105 duration-500 border border-white shadow-lg hover:shadow-xl backdrop-blur-lg animate-float-slow"
               style={{ transform: `translateZ(50px)` }}>
            <p className="text-lg md:text-2xl font-medium text-gray-700 bg-clip-text bg-gradient-to-r from-[#2A324B] to-gray-600">
                UI/UX Designer • Graphic Designer • Frontend Developer
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="mt-12 flex flex-wrap justify-center gap-5 preserve-3d" style={{ transform: `translateZ(60px)` }}>
            <a
              href="#portfolio"
              onClick={handleSmoothScroll}
              className="group relative px-8 py-3.5 bg-[#F0544F] text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(240,84,79,0.5)] overflow-hidden transform transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_30px_-10px_rgba(240,84,79,0.6)] border-b-4 border-[#c03a35] active:border-b-0 active:translate-y-0"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10">View My Work</span>
            </a>
            
            <a
              href="https://drive.google.com/file/d/1CeMtUylms0k4K-nAUdwajK0o60rBKhj_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-3.5 bg-[#2A324B] text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(42,50,75,0.5)] transform transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_30px_-10px_rgba(42,50,75,0.6)] flex items-center gap-2 border-b-4 border-[#1a2138] active:border-b-0 active:translate-y-0"
            >
              <DownloadIcon />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              onClick={handleSmoothScroll}
              className="px-8 py-3.5 bg-white text-[#2A324B] font-bold rounded-xl border border-gray-200 shadow-lg transform transition-all hover:translate-y-[-4px] hover:border-[#F8B462] hover:text-[#F8B462] border-b-4 border-gray-300 active:border-b-0 active:translate-y-0"
            >
              Get In Touch
            </a>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
        @keyframes breathe {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.05) rotate(1deg); }
        }
        @keyframes breathe-delayed {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.08) rotate(-2deg); }
        }
        .animate-breathe {
            animation: breathe 5s ease-in-out infinite;
        }
        .animate-breathe-delayed {
            animation: breathe-delayed 6s ease-in-out infinite;
            animation-delay: 1s;
        }
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;