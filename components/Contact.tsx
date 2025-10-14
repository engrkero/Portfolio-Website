import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-lg text-gray-600 mb-8">
            I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
          </p>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <ContactForm />
        </AnimatedSection>
      </div>
    </Section>
  );
};

export default Contact;