import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import horrorBooks from './horror.json';
import { useTheme } from './ThemeContext';

function AllTheBooks({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    setBooks(horrorBooks);
  }, []);

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
                <SingleBook book={book} selectedBookAsin={selectedBookAsin} setSelectedBookAsin={setSelectedBookAsin} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea bookId={selectedBookAsin} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllTheBooks;






