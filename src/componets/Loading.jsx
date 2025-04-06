import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="text-center" style={{ marginTop: '50px' }}>
      <Spinner animation="border" role="status" />
      <span className="sr-only">Caricamento...</span>
    </div>
  );
};

export default Loading;

