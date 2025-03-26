import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddComment = ({ bookId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_URL = `https://example.com/comments`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      bookId,
      text: commentText,
      rating,
      date: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) throw new Error('Errore nell\'invio del commento');
      const data = await response.json();
      onCommentAdded(data);
      setCommentText('');
      setRating(1);
    } catch (error) {
      console.error('Errore:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button type="submit" disabled={loading}>{loading ? 'Invio...' : 'Invia'}</Button>
    </Form>
  );
};

export default AddComment;

