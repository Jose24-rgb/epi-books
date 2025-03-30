import React from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from './ThemeContext';

function SingleBook({ book, selectedBookAsin, setSelectedBookAsin }) {
  const { theme } = useTheme();

  const handleSelectBook = () => {
    setSelectedBookAsin(book.asin);
  };

  return (
    <Card
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
      </Card.Body>
    </Card>
  );
}

export default SingleBook;








