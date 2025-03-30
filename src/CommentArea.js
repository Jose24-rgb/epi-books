import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Spinner, Alert } from 'react-bootstrap';

const CommentArea = ({ bookAsin }) => { // Modificato per accettare l'ASIN
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `https://striveschool-api.herokuapp.com/api/comments/${bookAsin}`; // Usa l'ASIN nel URL
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDMyOTI4NjcsImV4cCI6MTc0NDUwMjQ2N30.oVJJ-RaIoZARyEV9HKXnP_o_cbd8l1ijhDyDrAS3ZXM'; // Token inserito

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Includi il token nell'header
          },
        });
        if (!response.ok) throw new Error('Errore nel recupero dei commenti');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [bookAsin]); // Ricarica quando l'ASIN cambia

  // DELETE recensione
  const deleteComment = async (id) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Includi il token nell'header
        },
      });
      if (!response.ok) throw new Error('Errore nella cancellazione');
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT (Modifica recensione)
  const updateComment = async (id, updatedText) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Includi il token nell'header
        },
        body: JSON.stringify({ text: updatedText }),
      });
      if (!response.ok) throw new Error('Errore nella modifica');
      setComments(comments.map((c) => (c.id === id ? { ...c, text: updatedText } : c)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <CommentList comments={comments} onDelete={deleteComment} onUpdate={updateComment} />
      <AddComment bookAsin={bookAsin} onCommentAdded={(newComment) => setComments([...comments, newComment])} />
    </div>
  );
};

export default CommentArea;






