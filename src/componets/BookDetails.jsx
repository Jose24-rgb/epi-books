import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import horrorBooks from '../horror.json';

function BookDetails() {
  const { asin } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', comment: '', rating: 1 });
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY';

  useEffect(() => {
    const fetchBookDetails = async () => {
      const foundBook = horrorBooks.find(book => book.asin === asin);
      setBookDetails(foundBook);

      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setComments(data);
    };

    fetchBookDetails();
  }, [asin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    setNewComment({ author: '', comment: '', rating: 1 });
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);

  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setNewComment(comments[index]);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const updatedComments = comments.map((comment, index) =>
      index === editingCommentIndex ? newComment : comment
    );
    setComments(updatedComments);

    setEditingCommentIndex(null);
    setNewComment({ author: '', comment: '', rating: 1 });
  };

  if (!bookDetails) return <div>Caricamento...</div>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={bookDetails.img} alt={bookDetails.title} />
            <Card.Body>
              <Card.Title>{bookDetails.title}</Card.Title>
              <Card.Text><strong>Autore:</strong> {bookDetails.author}</Card.Text>
              <Card.Text><strong>Prezzo:</strong> ${bookDetails.price}</Card.Text>
              <Card.Text>{bookDetails.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3>Recensioni</h3>
          <ul>
            {comments.length > 0 ? (
              comments.map((review, index) => (
                <li key={index}>
                  <p><strong>{review.author}:</strong> {review.comment}</p>
                  <p><em>Valutazione: {review.rating} stelle</em></p>
                  <Button variant="danger" onClick={() => handleDeleteComment(index)}>Elimina</Button>
                  <Button variant="warning" onClick={() => handleEditComment(index)}>Modifica</Button>
                </li>
              ))
            ) : (
              <p>Nessuna recensione disponibile per questo libro.</p>
            )}
          </ul>

          <h3>{editingCommentIndex === null ? 'Aggiungi una recensione' : 'Modifica recensione'}</h3>
          <Form onSubmit={editingCommentIndex === null ? handleSubmitComment : handleUpdateComment}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newComment.author}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Commento</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={newComment.comment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Valutazione</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={newComment.rating}
                onChange={handleInputChange}
                required
              >
                {[1, 2, 3, 4, 5].map(star => (
                   <option key={star} value={star}>{star} ⭐</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant={editingCommentIndex === null ? 'primary' : 'warning'}>
              {editingCommentIndex === null ? 'Aggiungi Commento' : 'Aggiorna Commento'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetails;




