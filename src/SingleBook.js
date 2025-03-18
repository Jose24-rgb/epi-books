import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function SingleBook({ book }) {
  // Stato per tenere traccia se il libro è selezionato
  const [selected, setSelected] = useState(false);

  // Funzione per gestire il clic sulla copertina
  const handleSelectBook = () => {
    setSelected(!selected); // Inverte il valore di selected
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={book.img}
        alt={book.title}
        onClick={handleSelectBook} // Aggiungi un onClick per gestire il cambiamento di stato
        style={{
          cursor: 'pointer', // Cambia il cursore per far capire che è cliccabile
          border: selected ? '5px solid red' : 'none', // Aggiungi il bordo rosso se il libro è selezionato
        }}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          Prezzo: ${book.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SingleBook;




