import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import horrorBooks from './horror.json';
import { useTheme } from './ThemeContext';

function AllTheBooks({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [selectedBookAsin, setSelectedBookAsin] = useState(null); // Gestione centrale dello stato
  const { theme } = useTheme();

  useEffect(() => {
    setBooks(horrorBooks);
  }, []);

  // Filtraggio dei libri in base alla ricerca
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5" style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40' }}>
      <Row>
        <Col md={8}>
          <Row>
            {filteredBooks.map((book) => (
              <Col key={book.asin} sm={12} md={4} lg={3} className="mb-4">
                <SingleBook
                  book={book}
                  selectedBookAsin={selectedBookAsin} // Passiamo l'asin selezionato
                  setSelectedBookAsin={setSelectedBookAsin} // Passiamo la funzione per aggiornare
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea
            bookAsin={selectedBookAsin} // Passiamo l'asin selezionato a CommentArea
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AllTheBooks;








