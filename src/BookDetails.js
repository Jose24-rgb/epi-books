import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Per ottenere il parametro dalla rotta
import horrorBooks from './horror.json'; // Importa il file JSON con l'array di libri
import { Container, Row, Col, Card } from 'react-bootstrap'; // Componenti Bootstrap per layout

function BookDetails() {
  const { asin } = useParams(); // Ottieni l'ASIN dalla rotta
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    // Trova il libro con l'ASIN corrispondente
    const foundBook = horrorBooks.find(book => book.asin === asin);
    setBookDetails(foundBook); // Salva i dettagli del libro trovato nello stato
  }, [asin]); // Esegui ogni volta che l'ASIN cambia

  if (!bookDetails) {
    return <div>Caricamento...</div>;  // Mostra "Caricamento..." se il libro non è ancora trovato
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          {/* Visualizza i dettagli del libro */}
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
          {/* Sezione per le recensioni */}
          <h3>Recensioni</h3>
          <ul>
            {bookDetails.reviews && bookDetails.reviews.length > 0 ? (
              bookDetails.reviews.map((review, index) => (
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

