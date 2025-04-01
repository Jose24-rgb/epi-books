import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa il router e i componenti per le rotte
import MyNav from './componets/MyNav'; // Importa il componente MyNav
import MyFooter from './componets/MyFooter'; // Importa il componente MyFooter
import Welcome from './componets/Welcome'; // Importa il componente Welcome
import AllTheBooks from './componets/AllTheBooks'; // Importa il componente AllTheBooks
import BookDetails from './componets/BookDetails'; // Importa il componente per i dettagli del libro
import NotFound from './componets/NotFound'; // Importa il componente NotFound
import { ThemeProvider } from './ThemeContext'; // Importiamo il ThemeProvider

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Stato globale per il filtro

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






