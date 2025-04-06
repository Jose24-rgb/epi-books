import React from 'react';
import { Alert, Container } from 'react-bootstrap';

function Welcome() {
  return (
    <Container className="mt-5 text-center">
     
      <Alert variant="success">
        Benvenuto su EpiBooks! Scopri la nostra vasta collezione di libri.
      </Alert>

     
      <h1>EpiBooks</h1>
    </Container>
  );
}

export default Welcome;
