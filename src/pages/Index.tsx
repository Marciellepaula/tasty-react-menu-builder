
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Statistics from '@/components/Statistics';
import Reservation from '@/components/Reservation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Menu />
      <Statistics />
      <About />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
