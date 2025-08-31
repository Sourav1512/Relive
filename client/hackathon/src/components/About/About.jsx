import React from 'react';

const About = () => {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">About Us</h2>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Welcome to our <span className="font-semibold">Organ Donation & Transplant Matching Platform</span>.  
        Our mission is to connect life-saving organ donors with patients in need, 
        making the process transparent, reliable, and compassionate.  
      </p>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        This website is built with the vision to spread awareness about organ donation 
        and to create a bridge between donors and recipients. By leveraging technology, 
        we ensure faster matches, better accessibility, and hope for those waiting 
        for a second chance at life.  
      </p>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        Together, we believe that small contributions can lead to 
        <span className="font-semibold"> big changes</span>. 
        Let’s join hands to save lives and build a community of compassion.
      </p>
    </section>
  );
};

export default About;
