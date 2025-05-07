
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-restaurant-cream sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-restaurant-brown">
              <span className="font-serif text-2xl font-bold">Bom Sabor Massas</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-restaurant-brown hover:text-restaurant-darkBrown"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-restaurant-brown hover:text-restaurant-gold transition-colors duration-300 font-medium">Home</a>
            <a href="#about" className="text-restaurant-brown hover:text-restaurant-gold transition-colors duration-300 font-medium">Sobre</a>
            <a href="#menu" className="text-restaurant-brown hover:text-restaurant-gold transition-colors duration-300 font-medium">Menu</a>
            <a href="#contact" className="text-restaurant-brown hover:text-restaurant-gold transition-colors duration-300 font-medium">Contato</a>
            <Button className="bg-restaurant-gold hover:bg-restaurant-brown text-white">Book a Table</Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 pt-2 pb-4 px-2">
              <a href="#home" className="text-restaurant-brown hover:text-restaurant-gold px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Home</a>
              <a href="#about" className="text-restaurant-brown hover:text-restaurant-gold px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Sobre</a>
              <a href="#menu" className="text-restaurant-brown hover:text-restaurant-gold px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Menu</a>
              <a href="#contact" className="text-restaurant-brown hover:text-restaurant-gold px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Contato</a>
              <Button className="bg-restaurant-gold hover:bg-restaurant-brown text-white w-full">Book a Table</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
