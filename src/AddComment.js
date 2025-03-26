import React, { useState } from 'react';

const AddComment = ({ bookId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(1); // Rating da 1 a 5

  const API_URL = `https://example.com/comments`; // Cambia con il tuo backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      bookId,
      text: commentText,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      onCommentAdded(data); // Aggiungi il nuovo commento alla lista
      setCommentText(''); // Pulisce il campo di testo
      setRating(1); // Reset del rating
    } catch (error) {
      console.error('Errore nell\'invio della recensione:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Scrivi una recensione..."
        required
      />
      <div>
        <label>Valutazione:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Invia</button>
    </form>
  );
};

export default AddComment;
