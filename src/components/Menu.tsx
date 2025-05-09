
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoodRating from './FoodRating';
import FoodDetails from './FoodDetails';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  likes?: number;
  image?: string;
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("mains");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({
    pizza: [
      { id: 1, name: "Calabresa", description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze", price: "R$12", likes: 0, image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1000" },
      { id: 2, name: "Carne De Sol", description: "Sautéed prawns with garlic, chili, and herb butter", price: "$16", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1000" },
      { id: 3, name: "Portuguesa", description: "Toasted sourdough with creamy wild mushrooms and truffle oil", price: "R$14", likes: 0, image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?q=80&w=1000" },
      { id: 4, name: "Frango com Catupiry original", description: "Thinly sliced raw beef with capers, arugula, and parmesan", price: "$18", likes: 0, image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?q=80&w=1000" }
    ],
    mains: [
      { id: 5, name: "Churrasco com fritas e aroz a la grega", description: "8oz beef tenderloin with red wine reduction and truffle mashed potatoes", price: "R$38", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000" },
      { id: 6, name: "Parmegiana", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables", price: "R$29", likes: 0, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000" },
      { id: 7, name: "Frango a Passarinha", description: "Creamy arborio rice with assorted wild mushrooms and parmesan", price: "R$24", likes: 0, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000" },
    ],
    massa: [
      { id: 9, name: "Lasanha", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone", price: "R$10", likes: 0, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000" },
      { id: 10, name: "Macarranoda", description: "Rich custard topped with caramelized sugar", price: "$12", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1000" },
    ]
  });
  const navigate = useNavigate();

  // Fetch likes count for all menu items
  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const likesCollection = collection(db, 'likes');
        const likesSnapshot = await getDocs(likesCollection);
        
        // Create a map of itemId -> likes count
        const likesCountMap: Record<number, number> = {};
        likesSnapshot.forEach(doc => {
          const data = doc.data();
          const itemId = data.itemId;
          likesCountMap[itemId] = (likesCountMap[itemId] || 0) + 1;
        });
        
        // Update menu items with likes count
        const updatedMenuItems = { ...menuItems };
        
        Object.keys(updatedMenuItems).forEach(category => {
          updatedMenuItems[category] = updatedMenuItems[category].map(item => ({
            ...item,
            likes: likesCountMap[item.id] || 0
          }));
        });
        
        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error("Error fetching likes count:", error);
      }
    };
    
    fetchLikesCount();
  }, []);

  const handleItemClick = (item: MenuItem) => {
    navigate(`/dish/${item.id}`, { state: { item } });
  };

  const handleQuickView = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-restaurant-brown mb-4">Nosso Cardápio</h2>
          <div className="w-24 h-1 bg-restaurant-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore nosso menu cuidadosamente elaborado com ingredientes sazonais e especialidades do chef.
          </p>
        </div>

        <Tabs defaultValue="mains" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-12">
            <TabsTrigger
              value="pizza"
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Pizzas
            </TabsTrigger>
            <TabsTrigger
              value="mains"
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Pratos Principais
            </TabsTrigger>
            <TabsTrigger
              value="massa"
              className="font-serif text-lg data-[state=active]:text-restaurant-gold data-[state=active]:border-b-2 data-[state=active]:border-restaurant-gold"
            >
              Massas
            </TabsTrigger>
          </TabsList>

          {Object.keys(menuItems).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {menuItems[category].map((item) => (
                  <div
                    key={item.id}
                    className="menu-item-appear border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-xl font-bold text-restaurant-brown flex items-center gap-2">
                          {item.name}
                          {item.popular && (
                            <span className="bg-restaurant-gold text-white text-xs font-sans px-2 py-1 rounded-full">Popular</span>
                          )}
                        </h3>
                        <span className="font-heading text-xl font-bold text-restaurant-gold">{item.price}</span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <div onClick={(e) => e.stopPropagation()}>
                          <FoodRating itemId={item.id} initialLikes={item.likes} />
                        </div>
                        <button
                          onClick={(e) => handleQuickView(e, item)}
                          className="text-sm text-restaurant-gold hover:underline font-medium"
                        >
                          Visão rápida
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <FoodDetails
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          item={selectedItem}
        />
      </div>
    </section>
  );
};

export default Menu;
