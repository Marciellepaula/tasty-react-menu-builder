
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative h-[80vh] bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2340&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

      <div className="relative container h-full mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Experimente a excelência culinária
        </h1>
        <p className="font-sans text-lg md:text-xl max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Desfrute de uma experiência gastronômica memorável com nossos pratos requintados, preparados com paixão e com os ingredientes mais frescos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="bg-restaurant-gold hover:bg-restaurant-brown text-white px-8 py-6">
            Visite nosso Menu
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6">
            Reserve uma mesa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
