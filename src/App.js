import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import MyNav from './MyNav'; // Importa il componente MyNav
import MyFooter from './MyFooter'; // Importa il componente MyFooter
import Welcome from './Welcome'; // Importa il componente Welcome
import AllTheBooks from './AllTheBooks'; // Importa il componente AllTheBooks

function App() {
  return (
    <>
      <MyNav /> {/* Navbar */}
      
      <Welcome /> {/* Componente Welcome */}

      <AllTheBooks /> {/* Componente AllTheBooks che mostra i libri */}
      
      {/* Contenuto principale */}
      <Container className="text-center">
        <Button variant="primary">Esplora</Button>
      </Container>

      <MyFooter /> {/* Footer */}
    </>
  );
}

export default App;




