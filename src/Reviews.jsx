import React, { useEffect, useState } from "react";

const Reviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState(""); 

  const API_URL = "https://striveschool-api.herokuapp.com/api/comments/?elementId=${bookAsin}";

  const fetchReviews = () => {
    fetch(`${API_URL}?bookId=${bookId}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Errore nel recupero recensioni:", error));
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      bookId,
      text: reviewText,
      date: new Date().toISOString(),
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then(() => {
        setReviewText("");
        fetchReviews();
      })
      .catch((error) => console.error("Errore nell'invio della recensione:", error));
  };

  return (
    <div>
      <h4>Recensioni</h4>
      {reviews.length === 0 ? <p>Nessuna recensione disponibile.</p> : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              {review.text} - {new Date(review.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Scrivi una recensione..."
          required
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default Reviews;

