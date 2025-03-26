// AllTheBooks.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook'; // Importa il componente SingleBook
import horrorBooks from './horror.json'; // Assicurati che il percorso del file JSON sia corretto
import { useTheme } from './ThemeContext'; // Importiamo il hook useTheme

function AllTheBooks({ searchQuery }) {
  const [books, setBooks] = useState([]); // Stato per memorizzare i libri
  const { theme } = useTheme(); // Otteniamo il tema dal contesto

  useEffect(() => {
    // Carica i dati dal file JSON
    setBooks(horrorBooks); // Imposta i dati dei libri nell'array "books"
  }, []); // useEffect viene eseguito una sola volta al caricamento del componente

  // Filtra i libri in base al titolo, mostrando solo quelli che contengono la query di ricerca
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5" style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40' }}>
      <Row>
        {/* Renderizza solo i libri filtrati */}
        {filteredBooks.map((book, index) => (
          <Col key={index} sm={12} md={4} lg={3} className="mb-4">
            <SingleBook book={book} /> {/* Passa ogni libro come prop al componente SingleBook */}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTheBooks;






