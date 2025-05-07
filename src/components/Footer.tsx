
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-restaurant-darkBrown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Bom Sabor Massas</h3>
            <p className="text-gray-300 mb-6">
              Experiências gastronômicas excepcionais com sabores autênticos e hospitalidade calorosa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-restaurant-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-restaurant-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-restaurant-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Links rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-restaurant-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-restaurant-gold transition-colors">Sobre Nós</a></li>
              <li><a href="#menu" className="hover:text-restaurant-gold transition-colors">Menu</a></li>
              <li><a href="#contact" className="hover:text-restaurant-gold transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on special events and promotions.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-restaurant-gold"
              />
              <button className="bg-restaurant-gold hover:bg-white hover:text-restaurant-brown text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bom Sabor Restaurante. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
