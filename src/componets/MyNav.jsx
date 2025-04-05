import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';

function MyNav({ searchQuery, setSearchQuery }) {
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    setSearchQuery(''); // Reset the search query
  };

  return (
    <Navbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme === 'light' ? 'light' : 'dark'} expand="lg">
      <Container>
        <Navbar.Brand href="#">EpiBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>
          {/* Input di ricerca nella navbar */}
          <Form className="d-flex ms-3">
            <Form.Control
              type="text"
              placeholder="Cerca un libro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Pulsante di reset */}
            <Button 
              variant="outline-secondary" 
              onClick={handleReset} 
              aria-label="reset"
              className="ms-2"
            >
              Reset
            </Button>
          </Form>
          {/* Pulsante per cambiare tema */}
          <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme} className="ms-3">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;



