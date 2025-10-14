import React from 'react';
import Section from './Section';
import AnimatedSection from './AnimatedSection';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me" className="bg-white">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center text-gray-600 text-lg leading-relaxed space-y-4">
          <p>
            I'm a passionate and versatile creative professional, bridging the gap between stunning visuals and seamless user experiences. With a strong foundation in both graphic design and frontend development, I transform complex ideas into beautiful, intuitive, and functional digital solutions.
          </p>
          <p>
            My goal is to create products that not only look amazing but are also a joy to use. Whether it's crafting a memorable brand identity, designing a pixel-perfect user interface, or writing clean, efficient code, I bring a commitment to excellence and a user-first mindset to every project. Let's collaborate to bring your vision to life!
          </p>
        </div>
      </AnimatedSection>
    </Section>
  );
};

export default About;