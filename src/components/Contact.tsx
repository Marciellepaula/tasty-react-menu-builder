
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-restaurant-brown mb-4">Find Us</h2>
          <div className="w-24 h-1 bg-restaurant-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Visit us to experience our welcoming atmosphere and exceptional cuisine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-restaurant-cream p-8 rounded-lg shadow-lg h-full">
              <h3 className="font-heading text-2xl font-bold text-restaurant-brown mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-restaurant-gold mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-restaurant-brown mb-1">Address</h4>
                    <p className="text-gray-600">123 Gourmet Avenue<br />Culinary District<br />Tasty Town, TT 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-restaurant-gold mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-restaurant-brown mb-1">Phone</h4>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-restaurant-gold mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-restaurant-brown mb-1">Email</h4>
                    <p className="text-gray-600">info@savoria.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-restaurant-gold mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-restaurant-brown mb-1">Hours</h4>
                    <div className="text-gray-600">
                      <p><span className="font-medium">Monday - Thursday:</span> 5:00 PM - 10:00 PM</p>
                      <p><span className="font-medium">Friday - Saturday:</span> 5:00 PM - 11:00 PM</p>
                      <p><span className="font-medium">Sunday:</span> 4:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] md:h-auto rounded-lg overflow-hidden shadow-lg">
            {/* In a real application, replace this with an actual Google Maps embed */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=1974" 
                alt="Restaurant location" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
