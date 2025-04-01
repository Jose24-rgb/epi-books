import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNav from './componets/MyNav';
import MyFooter from './componets/MyFooter';
import Welcome from './componets/Welcome';
import AllTheBooks from './componets/AllTheBooks';
import BookDetails from './componets/BookDetails';
import NotFound from './componets/NotFound';
import { ThemeProvider } from './ThemeContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider>
      <Router>
        {/* Navbar */}
        <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Rotte dell'applicazione */}
        <Routes>
          <Route path="/" element={<AllTheBooks searchQuery={searchQuery} />} /> {/* Homepage */}
          <Route path="/book/:asin" element={<BookDetails />} /> {/* Dettagli del libro */}
          <Route path="*" element={<NotFound />} /> {/* Rotta di fallback per le pagine non trovate */}
        </Routes>

        {/* Altri contenuti */}
        <Welcome />
        <Container className="text-center mt-4">
          <Button variant="primary">Esplora</Button>
        </Container>

        {/* Footer */}
        <MyFooter />
      </Router>
    </ThemeProvider>
  );
}

export default App;






