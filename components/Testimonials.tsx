import React, { useState, useEffect } from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import { TESTIMONIALS } from '../constants';
import { PlusIcon, XIcon, SpinnerIcon, QuillIcon } from './icons';
import type { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load initial data + local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('kgsc_testimonials');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      setTestimonials(TESTIMONIALS);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.quote.trim()) newErrors.quote = 'Testimonial message is required';
    else if (formData.quote.trim().length < 10) newErrors.quote = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role,
        company: formData.company,
        quote: formData.quote,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };

      const updatedTestimonials = [newTestimonial, ...testimonials];
      setTestimonials(updatedTestimonials);
      localStorage.setItem('kgsc_testimonials', JSON.stringify(updatedTestimonials));

      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ name: '', role: '', company: '', quote: '' }); // Reset form
    }, 800);
  };

  return (
    <Section id="testimonials" title="Testimonials" className="bg-gray-50 relative">
      <div className="absolute top-4 right-4 md:top-20 md:right-20 z-10">
         <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#F0544F] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#d64642] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F0544F] focus:ring-offset-2"
            aria-label="Add your testimonial"
         >
            <QuillIcon />
            <span className="hidden sm:inline text-sm font-medium">Write a Review</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        {testimonials.map((testimonial, index) => (
          <AnimatedSection key={testimonial.id || index} delay={index * 100}>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full relative">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F0544F] mr-4 flex-shrink-0 bg-gray-200">
                   <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#2A324B] text-lg leading-tight">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}, {testimonial.company}</p>
                  {testimonial.date && (
                    <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                  )}
                </div>
              </div>
              <blockquote className="text-gray-600 italic flex-grow relative pl-4 border-l-4 border-[#F8B462]">
                 "{testimonial.quote}"
              </blockquote>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-fast">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 animate-scale-in">
                <div className="bg-[#2A324B] px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white text-xl font-bold flex items-center gap-2">
                        <PlusIcon /> Add Your Testimonial
                    </h3>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-300 hover:text-white focus:outline-none transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0544F] transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                <input 
                                    type="text" 
                                    id="role" 
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0544F] transition-colors ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="CEO, Developer, etc."
                                />
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input 
                                    type="text" 
                                    id="company" 
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0544F] transition-colors ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Company Name"
                                />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
                            <textarea 
                                id="quote" 
                                name="quote" 
                                rows={4}
                                value={formData.quote}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0544F] transition-colors ${errors.quote ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Share your experience working with me..."
                            ></textarea>
                            {errors.quote && <p className="text-red-500 text-xs mt-1">{errors.quote}</p>}
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2 bg-[#F0544F] text-white font-semibold rounded-lg shadow-md hover:bg-[#d64642] focus:outline-none focus:ring-2 focus:ring-[#F0544F] focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <SpinnerIcon /> : 'Submit Review'}
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-center text-gray-400">
                        Note: This is a demo. Your review is saved locally in your browser.
                    </p>
                </form>
            </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out; }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </Section>
  );
};

export default Testimonials;