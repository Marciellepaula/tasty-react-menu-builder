
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import FoodRating from './FoodRating';

interface FoodDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    name: string;
    description: string;
    price: string;
    popular?: boolean;
    likes?: number;
    ingredients?: string[];
    nutritionalInfo?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
    };
    allergens?: string[];
    prepTime?: string;
  } | null;
}

const FoodDetails = ({ isOpen, onClose, item }: FoodDetailsProps) => {
  if (!item) return null;

  // Dados fictícios para enriquecer a visualização
  const ingredients = item.ingredients || [
    "Ingredientes frescos de alta qualidade",
    "Ervas aromáticas selecionadas",
    "Temperos exclusivos do chef"
  ];

  const allergens = item.allergens || ["Pode conter glúten", "Pode conter laticínios"];
  const prepTime = item.prepTime || "25-30 minutos";
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-2xl text-restaurant-brown">
            {item.name}
            {item.popular && (
              <Badge variant="outline" className="bg-restaurant-gold text-white border-none ml-2">
                Popular
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-lg font-serif text-restaurant-gold">
            {item.price}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-secondary/50 p-4 rounded-md">
            <p className="text-gray-700">{item.description}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-restaurant-brown mb-2">Ingredientes</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-restaurant-brown mb-2">Informações</h3>
              <p className="text-gray-600">Tempo de preparo: {prepTime}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-restaurant-brown mb-2">Alergênicos</h3>
              <ul className="text-gray-600 space-y-1">
                {allergens.map((allergen, idx) => (
                  <li key={idx}>{allergen}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <FoodRating itemId={item.id} initialLikes={item.likes} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetails;
