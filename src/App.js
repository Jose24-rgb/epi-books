// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import MyNav from './MyNav'; // Importa il componente MyNav
import MyFooter from './MyFooter'; // Importa il componente MyFooter
import Welcome from './Welcome'; // Importa il componente Welcome
import AllTheBooks from './AllTheBooks'; // Importa il componente AllTheBooks
import { ThemeProvider } from './ThemeContext'; // Importiamo il ThemeProvider

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Stato globale per il filtro

  return (
    <ThemeProvider>
      <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Navbar con ricerca */}
      <Welcome /> {/* Componente Welcome */}
      <AllTheBooks searchQuery={searchQuery} /> {/* Componente AllTheBooks con filtro */}

      {/* Contenuto principale */}
      <Container className="text-center mt-4">
        <Button variant="primary">Esplora</Button>
      </Container>

      <MyFooter /> {/* Footer */}
    </ThemeProvider>
  );
}

export default App;





