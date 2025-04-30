
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users } from 'lucide-react';

const Reservation = () => {
  return (
    <section className="py-20 bg-restaurant-brown text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Reserve a Table</h2>
          <div className="w-24 h-1 bg-restaurant-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-200">
            Book your dining experience at Savoria. For larger parties or special occasions, please call us directly.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" className="bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter your phone number" className="bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-restaurant-gold" />
                  <Input id="date" type="date" className="pl-10 bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-restaurant-gold" />
                  <Select>
                    <SelectTrigger className="pl-10 bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="18:30">6:30 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="19:30">7:30 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="20:30">8:30 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-restaurant-gold" />
                  <Select>
                    <SelectTrigger className="pl-10 bg-white/10 border-restaurant-gold/50 focus:border-restaurant-gold text-white">
                      <SelectValue placeholder="Select party size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5">5 People</SelectItem>
                      <SelectItem value="6">6 People</SelectItem>
                      <SelectItem value="7+">7+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="notes">Special Requests</Label>
              <textarea 
                id="notes" 
                placeholder="Any special requirements or requests" 
                className="w-full h-24 px-3 py-2 rounded-md bg-white/10 border border-restaurant-gold/50 focus:border-restaurant-gold text-white resize-none"
              ></textarea>
            </div>
            
            <div className="md:col-span-2 text-center">
              <Button className="bg-restaurant-gold hover:bg-white hover:text-restaurant-brown text-white px-8 py-6 mt-4">
                Book My Table
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
