
import React from 'react';
import { ChefHat } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-restaurant-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-restaurant-brown mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-restaurant-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-heading text-2xl font-bold text-restaurant-brown mb-4">A Passion for Excellence</h3>
            <p className="text-gray-700 mb-6">
              Founded in 1998 by Chef Marco Rossi, Savoria began as a small family restaurant dedicated to authentic cuisine made with locally-sourced ingredients. Over two decades later, our commitment to quality remains unchanged.
            </p>
            <h3 className="font-heading text-2xl font-bold text-restaurant-brown mb-4">Our Philosophy</h3>
            <p className="text-gray-700 mb-6">
              We believe that exceptional food begins with exceptional ingredients. Every dish at Savoria is carefully crafted to showcase the natural flavors of our premium, locally-sourced produce, meats, and seafood.
            </p>
            <div className="flex items-center">
              <ChefHat className="h-12 w-12 text-restaurant-gold mr-4" />
              <div>
                <h4 className="font-heading text-xl font-bold text-restaurant-brown">Chef Marco Rossi</h4>
                <p className="text-gray-600">Executive Chef & Founder</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-restaurant-gold rounded-lg shadow-lg flex items-center justify-center">
              <p className="font-serif text-white text-center font-bold">
                <span className="block text-3xl">25</span>
                <span className="block text-sm">Years of Excellence</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
