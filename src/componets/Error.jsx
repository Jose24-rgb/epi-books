import React from 'react';
import { Alert } from 'react-bootstrap';

const Error = () => {
  return (
    <div className="text-center" style={{ marginTop: '50px' }}>
      <Alert variant="danger">
        Si è verificato un errore durante il caricamento dei commenti.
      </Alert>
    </div>
  );
};

export default Error;