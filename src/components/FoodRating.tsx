
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where, deleteDoc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';

interface Comment {
  id: string;
  text: string;
  date: string;
  author: string;
}

interface FoodRatingProps {
  itemId: number;
  initialLikes?: number;
  showCommentsByDefault?: boolean;
}

const FoodRating = ({ itemId, initialLikes = 0, showCommentsByDefault = false }: FoodRatingProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(showCommentsByDefault);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate a unique identifier for the current user/session
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Load liked state and comments from Firebase on initial render
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userId = getUserId();

        // Check if user has liked this item
        const likeDocRef = doc(db, 'likes', `${userId}_${itemId}`);
        const likeDoc = await getDoc(likeDocRef);
        setHasLiked(likeDoc.exists());

        // Get likes count
        const likesQuery = query(collection(db, 'likes'), where('itemId', '==', itemId));
        const likesSnapshot = await getDocs(likesQuery);
        setLikes(likesSnapshot.size);

        // Get comments
        const commentsQuery = query(collection(db, 'comments'), where('itemId', '==', itemId));
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsData = commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as Comment);

        setComments(commentsData);

        // Load previously used author name
        const savedAuthor = localStorage.getItem('commentAuthor') || '';
        setAuthorName(savedAuthor);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erro ao carregar os dados");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  const handleLike = async () => {
    const userId = getUserId();
    const likeId = `${userId}_${itemId}`;
    const likeDocRef = doc(db, 'likes', likeId);

    try {
      if (hasLiked) {
        // Remove like
        await deleteDoc(likeDocRef);
        setLikes(prev => prev - 1);
        setHasLiked(false);
        toast.info('Você removeu sua curtida');
      } else {
        // Add like
        await setDoc(likeDocRef, {
          userId,
          itemId,
          timestamp: new Date().toISOString()
        });
        setLikes(prev => prev + 1);
        setHasLiked(true);
        toast.success('Obrigado pela sua curtida!');
      }
    } catch (error) {
      console.error("Error updating like:", error);
      toast.error("Não foi possível atualizar a curtida");
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Por favor, escreva um comentário antes de enviar.');
      return;
    }

    if (!authorName.trim()) {
      toast.error('Por favor, adicione seu nome.');
      return;
    }

    try {
      setIsLoading(true);

      const comment = {
        itemId,
        text: newComment.trim(),
        author: authorName.trim(),
        timestamp: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'comments'), comment);

      const newCommentWithId: Comment = {
        id: docRef.id,
        text: comment.text,
        date: new Date().toLocaleString('pt-BR'),
        author: comment.author
      };

      setComments(prevComments => [...prevComments, newCommentWithId]);
      setNewComment('');
      localStorage.setItem('commentAuthor', authorName);
      toast.success('Comentário adicionado com sucesso!');
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Não foi possível adicionar o comentário");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 transition-all"
            aria-label={hasLiked ? "Remover curtida" : "Curtir"}
            disabled={isLoading}
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
          disabled={isLoading}
        >
          <MessageCircle size={18} />
          <span className="text-sm">{comments.length > 0 ? comments.length : "Comentar"}</span>
        </button>
      </div>

      {showComments && (
        <div className="bg-secondary rounded-md p-3 mt-2 animate-fade-in space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-restaurant-gold"></div>
            </div>
          ) : (
            <>
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
                    disabled={isLoading}
                  />
                </div>
                <Textarea
                  placeholder="Adicione seu comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] resize-none"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAddComment}
                  size="sm"
                  className="w-full sm:w-auto bg-restaurant-gold hover:bg-restaurant-gold/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Comentário"}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodRating;
