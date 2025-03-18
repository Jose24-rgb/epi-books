import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function MyFooter() {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 EpiBooks. Tutti i diritti riservati.</p>
            <p>
              <a href="https://www.example.com" className="text-light">Privacy Policy</a> | 
              <a href="https://www.example.com" className="text-light"> Termini di servizio</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
