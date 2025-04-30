
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative h-[80vh] bg-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3270')] bg-cover bg-center opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

      <div className="relative container h-full mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Experience Culinary Excellence
        </h1>
        <p className="font-sans text-lg md:text-xl max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Indulge in a memorable dining experience with our exquisite dishes crafted with passion and the freshest ingredients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button size="lg" className="bg-restaurant-gold hover:bg-restaurant-brown text-white px-8 py-6">
            View Our Menu
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6">
            Book a Table
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
