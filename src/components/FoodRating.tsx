
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';

interface Comment {
  id: string;
  text: string;
  date: string;
  author: string;
}

interface FoodRatingProps {
  itemId: number;
  initialLikes?: number;
}

const FoodRating = ({ itemId, initialLikes = 0 }: FoodRatingProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');

  // Load liked state and comments from localStorage on initial render
  useEffect(() => {
    // Load liked state
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    if (likedItems[itemId]) {
      setHasLiked(true);
    }

    // Load comments
    const storedComments = JSON.parse(localStorage.getItem(`comments_${itemId}`) || '[]');
    setComments(storedComments);

    // Load previously used author name
    const savedAuthor = localStorage.getItem('commentAuthor') || '';
    setAuthorName(savedAuthor);
  }, [itemId]);

  const handleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
    
    if (hasLiked) {
      // Remove like
      setLikes(likes - 1);
      setHasLiked(false);
      delete likedItems[itemId];
      toast.info('Você removeu sua curtida');
    } else {
      // Add like
      setLikes(likes + 1);
      setHasLiked(true);
      likedItems[itemId] = true;
      toast.success('Obrigado pela sua curtida!');
    }
    
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Por favor, escreva um comentário antes de enviar.');
      return;
    }

    if (!authorName.trim()) {
      toast.error('Por favor, adicione seu nome.');
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      date: new Date().toLocaleString('pt-BR'),
      author: authorName.trim()
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${itemId}`, JSON.stringify(updatedComments));
    localStorage.setItem('commentAuthor', authorName);
    setNewComment('');
    toast.success('Comentário adicionado com sucesso!');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
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
        
        <button
          onClick={toggleComments}
          className="flex items-center gap-1.5 text-gray-500 hover:text-restaurant-gold transition-all"
          aria-label="Ver comentários"
        >
          <MessageCircle size={18} />
          <span className="text-sm">{comments.length > 0 ? comments.length : "Comentar"}</span>
        </button>
      </div>

      {showComments && (
        <div className="bg-secondary rounded-md p-3 mt-2 animate-fade-in space-y-3">
          {comments.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto mb-3">
              {comments.map((comment) => (
                <Card key={comment.id} className="bg-white">
                  <CardContent className="p-3 text-left">
                    <p className="text-sm font-medium text-gray-700">{comment.author}</p>
                    <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{comment.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Seu nome"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="flex h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-2 text-sm"
                aria-label="Seu nome"
              />
            </div>
            <Textarea
              placeholder="Adicione seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] resize-none"
            />
            <Button 
              onClick={handleAddComment} 
              size="sm" 
              className="w-full sm:w-auto bg-restaurant-gold hover:bg-restaurant-gold/90"
            >
              Enviar Comentário
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRating;
