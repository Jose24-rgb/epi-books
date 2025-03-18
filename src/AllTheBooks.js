import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import SingleBook from './SingleBook'; // Importa il componente SingleBook
import horrorBooks from './horror.json'; // Assicurati che il percorso del file JSON sia corretto

function AllTheBooks() {
  const [books, setBooks] = useState([]);  // Stato per memorizzare i libri
  const [searchQuery, setSearchQuery] = useState('');  // Stato per memorizzare il testo di ricerca

  useEffect(() => {
    // Carica i dati dal file JSON
    setBooks(horrorBooks);  // Imposta i dati dei libri nell'array "books"
  }, []); // Il useEffect viene eseguito una sola volta al caricamento del componente

  // Gestisce il cambiamento nel campo di input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Aggiorna lo stato con il valore dell'input
  };

  // Filtra i libri in base al titolo, mostrando solo quelli che contengono la query di ricerca
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5">
      {/* Input di ricerca */}
      <Form>
        <Form.Group controlId="searchQuery">
          <Form.Label>Cerca per titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cerca un libro..."
            value={searchQuery}  // Imposta il valore dell'input
            onChange={handleSearchChange}  // Gestisce l'evento di cambiamento dell'input
          />
        </Form.Group>
      </Form>

      <Row>
        {/* Renderizza solo i libri filtrati */}
        {filteredBooks.map((book, index) => (
          <Col key={index} sm={12} md={4} lg={3} className="mb-4">
            <SingleBook book={book} />  {/* Passa ogni libro come prop al componente SingleBook */}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTheBooks;




