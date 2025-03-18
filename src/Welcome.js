import React from 'react';
import { Alert, Container } from 'react-bootstrap';

function Welcome() {
  return (
    <Container className="mt-5 text-center">
      {/* Alert di Bootstrap */}
      <Alert variant="success">
        Benvenuto su EpiBooks! Scopri la nostra vasta collezione di libri.
      </Alert>

      {/* Titolo dell'app */}
      <h1>EpiBooks</h1>
    </Container>
  );
}

export default Welcome;
