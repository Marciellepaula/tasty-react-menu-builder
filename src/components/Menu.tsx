
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("mains");
  
  const menuItems: Record<string, MenuItem[]> = {
    starters: [
      { id: 1, name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze", price: "$12" },
      { id: 2, name: "Garlic Prawns", description: "Sautéed prawns with garlic, chili, and herb butter", price: "$16", popular: true },
      { id: 3, name: "Wild Mushroom Bruschetta", description: "Toasted sourdough with creamy wild mushrooms and truffle oil", price: "$14" },
      { id: 4, name: "Beef Carpaccio", description: "Thinly sliced raw beef with capers, arugula, and parmesan", price: "$18" }
    ],
    mains: [
      { id: 5, name: "Filet Mignon", description: "8oz beef tenderloin with red wine reduction and truffle mashed potatoes", price: "$38", popular: true },
      { id: 6, name: "Herb-Crusted Salmon", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables", price: "$29" },
      { id: 7, name: "Wild Mushroom Risotto", description: "Creamy arborio rice with assorted wild mushrooms and parmesan", price: "$24" },
      { id: 8, name: "Roasted Duck Breast", description: "With orange-cranberry sauce and root vegetable puree", price: "$34", popular: true }
    ],
    desserts: [
      { id: 9, name: "Tiramisu", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone", price: "$10" },
      { id: 10, name: "Crème Brûlée", description: "Rich custard topped with caramelized sugar", price: "$12", popular: true },
      { id: 11, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center, served with vanilla ice cream", price: "$14" },
      { id: 12, name: "Seasonal Fruit Tart", description: "Buttery pastry with vanilla custard and fresh seasonal fruits", price: "$11" }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-restaurant-brown mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-restaurant-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated menu featuring seasonal ingredients and chef's specialties.
          </p>
        </div>

        <Tabs defaultValue="mains" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-12">
            <TabsTrigger 
              value="starters" 
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Starters
            </TabsTrigger>
            <TabsTrigger 
              value="mains" 
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Main Courses
            </TabsTrigger>
            <TabsTrigger 
              value="desserts" 
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Desserts
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(menuItems).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {menuItems[category].map((item) => (
                  <div key={item.id} className="menu-item-appear border-b pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-xl font-bold text-restaurant-brown flex items-center gap-2">
                        {item.name}
                        {item.popular && (
                          <span className="bg-restaurant-gold text-white text-xs font-sans px-2 py-1 rounded-full">Popular</span>
                        )}
                      </h3>
                      <span className="font-heading text-xl font-bold text-restaurant-gold">{item.price}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;
