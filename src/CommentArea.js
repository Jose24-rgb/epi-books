import React, { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import CommentList from './CommentList';
import AddComment from './AddComment';

const CommentArea = ({ bookAsin }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://striveschool-api.herokuapp.com/api/comments/?elementId=${bookAsin}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY';

  useEffect(() => {
    if (!bookAsin) return;  // Non fare la fetch se non c'è un libro selezionato

    const fetchComments = async () => {
      try {
        setLoading(true); // Impostiamo lo stato di caricamento

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Errore nel recupero dei commenti. Status code: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setComments(data);
        } else {
          throw new Error('Nessun commento disponibile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();  // Esegui la fetch ogni volta che cambia `bookAsin`
  }, [bookAsin]);

  // Funzione per eliminare un commento
  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'eliminazione del commento');
      }

      // Rimuoviamo il commento dalla lista localmente
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per aggiornare un commento
  const handleUpdateComment = async (commentId, updatedText) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: updatedText }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del commento');
      }

      const updatedComment = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onUpdate={handleUpdateComment}
      />
      <AddComment bookAsin={bookAsin} onCommentAdded={(newComment) => setComments([...comments, newComment])} />
    </div>
  );
};

export default CommentArea;











