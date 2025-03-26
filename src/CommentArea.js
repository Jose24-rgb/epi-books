import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  const API_URL = `https://example.com/comments?bookId=${bookId}`; // Cambia con il tuo backend

  // Fetch dei commenti (GET)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Errore nel recupero commenti:', error);
      }
    };

    fetchComments();
  }, [bookId]);

  // Funzione per aggiungere un nuovo commento alla lista
  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <h4>Recensioni</h4>
      <CommentList comments={comments} />
      <AddComment bookId={bookId} onCommentAdded={addNewComment} />
    </div>
  );
};

export default CommentArea;


