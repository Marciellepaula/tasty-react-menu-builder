
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FoodRatingProps {
  itemId: number;
  initialLikes?: number;
}

const FoodRating = ({ itemId, initialLikes = 0 }: FoodRatingProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  // Carregar estado de curtida do localStorage ao iniciar
  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    if (likedItems[itemId]) {
      setHasLiked(true);
    }
  }, [itemId]);

  const handleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    
    if (hasLiked) {
      // Remover curtida
      setLikes(likes - 1);
      setHasLiked(false);
      delete likedItems[itemId];
      toast.info('Você removeu sua curtida');
    } else {
      // Adicionar curtida
      setLikes(likes + 1);
      setHasLiked(true);
      likedItems[itemId] = true;
      toast.success('Obrigado pela sua curtida!');
    }
    
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleLike}
        className="flex items-center gap-1 transition-all"
        aria-label={hasLiked ? "Remover curtida" : "Curtir"}
      >
        <Heart
          className={`transition-all duration-300 transform ${hasLiked ? "fill-restaurant-gold text-restaurant-gold scale-110" : "text-gray-400 hover:text-restaurant-gold"}`}
          size={20}
        />
      </button>
      <span className="text-sm text-gray-500">{likes}</span>
    </div>
  );
};

export default FoodRating;
