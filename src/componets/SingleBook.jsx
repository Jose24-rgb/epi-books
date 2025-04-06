import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function SingleBook({ book, selectedBookAsin, setSelectedBookAsin }) {
  const { theme } = useTheme();

  const handleSelectBook = () => {
  // Deseleziona il libro se è già selezionato, altrimenti selezionalo
  setSelectedBookAsin((prevAsin) => (prevAsin === book.asin ? null : book.asin));
};


  return (
    <Card
  data-testid="book-card"
  style={{
    backgroundColor: theme === 'light' ? '#ffffff' : '#495057',
    color: theme === 'light' ? 'black' : 'white',
    border: selectedBookAsin === book.asin ? '5px solid red' : 'none',
  }}
>
  <Card.Img
    variant="top"
    src={book.img}
    alt={book.title}
    onClick={handleSelectBook}
    style={{ cursor: 'pointer' }}
  />
  <Card.Body>
    <Card.Title>{book.title}</Card.Title>
    <Card.Text>Prezzo: ${book.price}</Card.Text>
    <Link to={`/book/${book.asin}`}>
      <Button variant="primary">Vedi Dettagli</Button>
    </Link>
  </Card.Body>
</Card>

  );
}

export default SingleBook;













