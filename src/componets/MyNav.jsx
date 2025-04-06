import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';

function MyNav({ searchQuery, setSearchQuery }) {
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <Navbar
      bg={theme === 'light' ? 'light' : 'dark'}
      variant={theme === 'light' ? 'light' : 'dark'}
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          EpiBooks
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>

          <Form className="d-flex ms-3">
            <Form.Control
              type="text"
              placeholder="Cerca un libro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button
              variant="outline-secondary"
              onClick={handleReset}
              aria-label="reset"
              className="ms-2"
            >
              Reset
            </Button>
          </Form>

          <Button
            variant={theme === 'light' ? 'dark' : 'light'}
            onClick={toggleTheme}
            className="ms-3"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;



