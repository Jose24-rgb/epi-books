import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Spinner, Alert } from 'react-bootstrap';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `https://example.com/comments?bookId=${bookId}`;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
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
  }, [bookId]);

  // DELETE recensione
  const deleteComment = async (id) => {
    try {
      const response = await fetch(`https://example.com/comments/${id}`, {
        method: 'DELETE',
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
      const response = await fetch(`https://example.com/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      <AddComment bookId={bookId} onCommentAdded={(newComment) => setComments([...comments, newComment])} />
    </div>
  );
};

export default CommentArea;



