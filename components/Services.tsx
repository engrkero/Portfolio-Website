import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { SERVICES } from '../constants';

const ServiceCard: React.FC<{ title: string; icon: React.ReactNode; items: string[]; index: number }> = ({ title, icon, items, index }) => (
    <div className="h-full bg-white rounded-xl p-8 relative group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden perspective-1000">
        
        {/* Tech Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(248,180,98,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] group-hover:bg-[position:100%_100%,0_0] transition-[background-position] duration-[1500ms]"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2A324B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        {/* Accent Top Border */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${
            index === 0 ? 'from-blue-400 to-blue-600' :
            index === 1 ? 'from-[#F0544F] to-orange-500' :
            'from-green-400 to-green-600'
        }`}></div>

        <div className="flex flex-col h-full relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110 group-hover:-rotate-6 ${
                index === 0 ? 'bg-blue-50 text-blue-600' :
                index === 1 ? 'bg-orange-50 text-[#F0544F]' :
                'bg-green-50 text-green-600'
            }`}>
               {React.cloneElement(icon as React.ReactElement, { size: 32 })}
            </div>

            <h3 className="text-xl font-bold text-[#2A324B] mb-4 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
            
            <ul className="space-y-3 flex-grow">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm transition-all duration-300 hover:translate-x-1">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125 ${
                             index === 0 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 
                             index === 1 ? 'bg-[#F0544F] shadow-[0_0_8px_rgba(240,84,79,0.5)]' : 
                             'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                        }`}></span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Services: React.FC = () => {
  return (
    <Section id="services" title="KGSC Services" className="bg-gray-50 relative overflow-hidden">
        {/* Floating Tech Particles Background */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedSection>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-gray-200 text-[#2A324B] text-xs font-bold tracking-wider mb-6 shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <span className="w-2 h-2 rounded-full bg-[#F0544F] animate-ping"></span>
                        UNICAL BRANCH
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#2A324B] mb-6 tracking-tight">
                        Your One-Stop Solution for<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0544F] to-[#F8B462] relative inline-block">
                             Academic & Digital Success
                             <svg className="absolute w-full h-2 bottom-0 left-0 text-[#F8B462] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                             </svg>
                        </span>
                    </h2>
                    <p className="text-xl text-gray-500 font-medium">Fast. Reliable. Secure.</p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
                {SERVICES.map((service, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                        <ServiceCard {...service} index={index} />
                    </AnimatedSection>
                ))}
            </div>

            <AnimatedSection delay={400}>
                <div className="mt-16 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#F0544F] to-[#F8B462] rounded-3xl opacity-50 blur-lg transition duration-1000 group-hover:opacity-75 group-hover:blur-xl"></div>
                    <div className="relative bg-[#2A324B] rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 p-2 px-4 bg-yellow-500/20 rounded-lg border border-yellow-500/50 text-yellow-400 font-bold mb-6 animate-[pulse_2s_infinite]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                ATTENTION!
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Admission and Registration Deadlines are closer than you think!</h3>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">Don't risk delays. Let's get your process sorted quickly and affordably.</p>
                            
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                                <a href="tel:+2349015183471" className="flex items-center gap-3 px-8 py-4 bg-white text-[#2A324B] rounded-full font-bold hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                                    <span><i className="fa-solid fa-phone mr-2 text-[#F8B462]"></i>Call Us: 09015183471</span>
                                </a>
                                <a href="mailto:kgsc.unical@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F0544F] to-[#ff7e79] text-white rounded-full font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
                                    <span><i className="fa-solid fa-envelope mr-2"></i>Email: kgsc.unical@gmail.com</span>
                                </a>
                            </div>
                            <p className="mt-8 font-mono text-sm text-gray-500 tracking-widest">#WeSimplifyYourProcess</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
        <style>{`
            .perspective-1000 { perspective: 1000px; }
            .perspective-2000 { perspective: 2000px; }
        `}</style>
    </Section>
  );
};

export default Services;