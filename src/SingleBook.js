// SingleBook.js
import React, { useState } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import CommentArea from './CommentArea';
import { useTheme } from './ThemeContext'; // Importiamo il hook useTheme

function SingleBook({ book }) {
  const [selected, setSelected] = useState(false);
  const { theme } = useTheme(); // Otteniamo il tema dal contesto

  const handleSelectBook = () => {
    setSelected(!selected);
  };

  return (
    <Card
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#495057',
        color: theme === 'light' ? 'black' : 'white',
      }}
    >
      <Card.Img
        variant="top"
        src={book.img}
        alt={book.title}
        onClick={handleSelectBook}
        style={{
          cursor: 'pointer',
          border: selected ? '5px solid red' : 'none',
        }}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>Prezzo: ${book.price}</Card.Text>

        {selected && <CommentArea bookId={book.asin} />}
      </Card.Body>
    </Card>
  );
}

export default SingleBook;








