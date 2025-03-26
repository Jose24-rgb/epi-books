import React, { useState } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import CommentArea from './CommentArea';

function SingleBook({ book }) {
  const [selected, setSelected] = useState(false);

  const handleSelectBook = () => {
    setSelected(!selected);
  };

  return (
    <Card>
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







