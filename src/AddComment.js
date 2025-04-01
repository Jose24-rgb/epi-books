import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const AddComment = ({ bookAsin, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = `https://striveschool-api.herokuapp.com/api/comments/${bookAsin}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY'; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: commentText,
      rate: rating,
      elementId: bookAsin,  // Passiamo l'ASIN del libro selezionato
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) throw new Error("Errore nell'invio del commento");

      const data = await response.json();
      onCommentAdded(data);
      setCommentText('');
      setRating(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Control
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Scrivi una recensione..."
        required
      />
      <Form.Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} ⭐</option>
        ))}
      </Form.Select>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Invia'}
      </Button>
    </Form>
  );
};

export default AddComment;








