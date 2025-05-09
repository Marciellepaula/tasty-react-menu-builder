
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
      { id: 1, name: "Calabresa", description: "Deliciosa pizza com calabresa fatiada, cebola, molho de tomate especial e queijo derretido", price: "R$42", likes: 0, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000" },
      { id: 2, name: "Carne De Sol", description: "Pizza com carne de sol desfiada, cebola roxa, molho de tomate e queijo coalho gratinado", price: "R$46", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000" },
      { id: 3, name: "Portuguesa", description: "Clássica pizza com presunto, ovos, cebola, ervilha, queijo e azeitonas pretas", price: "R$44", likes: 0, image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=1000" },
      { id: 4, name: "Frango com Catupiry original", description: "Suculenta pizza com frango desfiado, catupiry cremoso e orégano fresco", price: "R$48", likes: 0, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000" }
    ],
    mains: [
      { id: 5, name: "Churrasco com fritas e aroz a la grega", description: "Suculento corte de picanha grelhada com arroz a grega, fritas crocantes e molho especial", price: "R$58", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000" },
      { id: 6, name: "Parmegiana", description: "Filé mignon empanado coberto com molho de tomate caseiro, queijo derretido e acompanhado de arroz e batatas", price: "R$49", likes: 0, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000" },
      { id: 7, name: "Frango a Passarinha", description: "Crocantes asinhas de frango temperadas com especiarias, servidas com molho barbecue caseiro", price: "R$44", likes: 0, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1000" },
    ],
    massa: [
      { id: 9, name: "Lasanha", description: "Camadas de massa fresca, molho bolonhesa caseiro, presunto e queijo derretido em perfeita harmonia", price: "R$40", likes: 0, image: "https://images.unsplash.com/photo-1619895092538-128f6e4f56b5?q=80&w=1000" },
      { id: 10, name: "Macarronada", description: "Espaguete al dente com molho de tomate caseiro, manjericão fresco e parmesão ralado", price: "R$42", popular: true, likes: 0, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000" },
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
    <section id="menu" className="py-24 bg-restaurant-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-restaurant-brown mb-4">Nosso Cardápio</h2>
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
                    <div className="h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
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
