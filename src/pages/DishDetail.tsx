
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FoodRating from '@/components/FoodRating';
import { ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  likes?: number;
  image?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  allergens?: string[];
  prepTime?: string;
}

const DishDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Try to get the item from location state first
    if (location.state && location.state.item) {
      setDish(location.state.item);
    } else if (id) {
      // If no state is available, we would fetch the dish data based on ID
      // For now, we'll use hardcoded data
      const allDishes = [
        // Starters
        { id: 1, name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze", price: "$12", likes: 24, image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1000", ingredients: ["Fresh mozzarella", "Heirloom tomatoes", "Basil leaves", "Extra virgin olive oil", "Balsamic glaze", "Sea salt", "Black pepper"], prepTime: "15 minutes", allergens: ["Dairy"] },
        { id: 2, name: "Garlic Prawns", description: "Sautéed prawns with garlic, chili, and herb butter", price: "$16", popular: true, likes: 42, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1000", ingredients: ["Tiger prawns", "Garlic", "Red chili", "Butter", "Parsley", "Lemon", "Sourdough bread"], prepTime: "20 minutes", allergens: ["Shellfish", "Dairy"] },
        { id: 3, name: "Wild Mushroom Bruschetta", description: "Toasted sourdough with creamy wild mushrooms and truffle oil", price: "$14", likes: 18, image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?q=80&w=1000", ingredients: ["Sourdough bread", "Mixed wild mushrooms", "Garlic", "Thyme", "Cream", "Truffle oil", "Parmesan cheese"], prepTime: "25 minutes", allergens: ["Gluten", "Dairy"] },
        { id: 4, name: "Beef Carpaccio", description: "Thinly sliced raw beef with capers, arugula, and parmesan", price: "$18", likes: 31, image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?q=80&w=1000", ingredients: ["Prime beef tenderloin", "Arugula", "Capers", "Parmesan shavings", "Lemon juice", "Olive oil", "Black pepper"], prepTime: "20 minutes", allergens: ["Dairy"] },
        
        // Mains
        { id: 5, name: "Filet Mignon", description: "8oz beef tenderloin with red wine reduction and truffle mashed potatoes", price: "$38", popular: true, likes: 56, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000", ingredients: ["Beef tenderloin", "Red wine", "Shallots", "Beef stock", "Butter", "Potatoes", "Truffle oil", "Seasonal vegetables"], prepTime: "35 minutes", allergens: ["Dairy"] },
        { id: 6, name: "Herb-Crusted Salmon", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables", price: "$29", likes: 37, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000", ingredients: ["Atlantic salmon fillet", "Herbs (dill, parsley, chives)", "Panko breadcrumbs", "Dijon mustard", "Lemon", "Butter", "Seasonal vegetables"], prepTime: "30 minutes", allergens: ["Fish", "Dairy", "Gluten"] },
        { id: 7, name: "Wild Mushroom Risotto", description: "Creamy arborio rice with assorted wild mushrooms and parmesan", price: "$24", likes: 29, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000", ingredients: ["Arborio rice", "Mixed wild mushrooms", "Shallots", "Garlic", "White wine", "Vegetable stock", "Butter", "Parmesan cheese", "Truffle oil"], prepTime: "40 minutes", allergens: ["Dairy"] },
        { id: 8, name: "Roasted Duck Breast", description: "With orange-cranberry sauce and root vegetable puree", price: "$34", popular: true, likes: 44, image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?q=80&w=1000", ingredients: ["Duck breast", "Oranges", "Cranberries", "Star anise", "Cinnamon", "Root vegetables (parsnip, carrot, celeriac)", "Butter", "Cream"], prepTime: "45 minutes", allergens: ["Dairy"] },
        
        // Desserts
        { id: 9, name: "Tiramisu", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone", price: "$10", likes: 38, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000", ingredients: ["Ladyfinger biscuits", "Espresso coffee", "Mascarpone cheese", "Eggs", "Sugar", "Cocoa powder", "Marsala wine (optional)"], prepTime: "30 minutes (plus 4 hours chilling)", allergens: ["Dairy", "Eggs", "Gluten"] },
        { id: 10, name: "Crème Brûlée", description: "Rich custard topped with caramelized sugar", price: "$12", popular: true, likes: 49, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1000", ingredients: ["Heavy cream", "Vanilla bean", "Egg yolks", "Sugar"], prepTime: "45 minutes (plus cooling time)", allergens: ["Dairy", "Eggs"] },
        { id: 11, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center, served with vanilla ice cream", price: "$14", likes: 52, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000", ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla ice cream"], prepTime: "25 minutes", allergens: ["Dairy", "Eggs", "Gluten"] },
        { id: 12, name: "Seasonal Fruit Tart", description: "Buttery pastry with vanilla custard and fresh seasonal fruits", price: "$11", likes: 33, image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1000", ingredients: ["Shortcrust pastry", "Vanilla custard", "Seasonal fruits", "Apricot jam"], prepTime: "50 minutes (plus cooling time)", allergens: ["Dairy", "Eggs", "Gluten"] }
      ];

      const foundDish = allDishes.find(dish => dish.id === parseInt(id));
      setDish(foundDish || null);
    }
  }, [location, id]);

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl mb-4">Dish not found</h2>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-restaurant-gold hover:text-restaurant-brown"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-restaurant-brown">
                {dish.name}
                {dish.popular && (
                  <Badge className="ml-3 bg-restaurant-gold text-white border-none">
                    Popular
                  </Badge>
                )}
              </h1>
              <span className="font-heading text-2xl font-bold text-restaurant-gold">{dish.price}</span>
            </div>
            <p className="mt-4 text-gray-600 text-lg">{dish.description}</p>
          </div>
          
          <div>
            <FoodRating itemId={dish.id} initialLikes={dish.likes} showCommentsByDefault={true} />
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-restaurant-brown mb-2 text-lg">Ingredients</h3>
                <ul className="list-disc pl-5 text-gray-600 grid grid-cols-2 gap-2">
                  {dish.ingredients?.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-restaurant-brown mb-2 text-lg">Preparation</h3>
                  <p className="text-gray-600">Time: {dish.prepTime || "30-45 minutes"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-restaurant-brown mb-2 text-lg">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {dish.allergens?.map((allergen, idx) => (
                      <Badge key={idx} variant="outline" className="text-restaurant-brown">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
