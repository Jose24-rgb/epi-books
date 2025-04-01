import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import horrorBooks from '../horror.json';

function BookDetails() {
  const { asin } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY';

  useEffect(() => {
    const fetchBookDetails = async () => {
      const foundBook = horrorBooks.find(book => book.asin === asin);
      setBookDetails(foundBook);

      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setComments(data);
    };

    fetchBookDetails();
  }, [asin]);

  if (!bookDetails) return <div>Caricamento...</div>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={bookDetails.img} alt={bookDetails.title} />
            <Card.Body>
              <Card.Title>{bookDetails.title}</Card.Title>
              <Card.Text><strong>Autore:</strong> {bookDetails.author}</Card.Text>
              <Card.Text><strong>Prezzo:</strong> ${bookDetails.price}</Card.Text>
              <Card.Text>{bookDetails.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>Recensioni</h3>
          <ul>
            {comments.length > 0 ? (
              comments.map((review, index) => (
                <li key={index}>
                  <p><strong>{review.author}:</strong> {review.comment}</p>
                  <p><em>Valutazione: {review.rating} stelle</em></p>
                </li>
              ))
            ) : (
              <p>Nessuna recensione disponibile per questo libro.</p>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetails;



