import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading'; // Importa il componente Loading
import Error from './Error';     // Importa il componente Error

const CommentArea = ({ bookAsin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const API_URL = `https://striveschool-api.herokuapp.com/api/comments/?elementId=${bookAsin}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY';

  useEffect(() => {
    if (!bookAsin) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setIsError(false); // Resetta gli errori ad ogni nuovo fetch

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Errore nel recupero dei commenti');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setComments(data);
        } else {
          throw new Error('Nessun commento disponibile');
        }
      } catch (err) {
        setIsError(true); // Imposta l'errore se qualcosa va storto
        console.error(err);
      } finally {
        setIsLoading(false); // Al termine, ferma il loading
      }
    };

    fetchComments();
  }, [bookAsin]);

  const handleDeleteComment = async (commentId) => {
    setIsLoading(true);
    setIsError(false);

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

      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId, updatedComment) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: updatedComment }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del commento');
      }

      const updatedCommentData = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, comment: updatedComment } : comment
        )
      );
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
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














