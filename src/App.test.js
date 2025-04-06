import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Welcome from './componets/Welcome';
import CommentArea from './componets/CommentArea';
import '@testing-library/jest-dom';





describe('Welcome Component', () => {
  it('dovrebbe montare correttamente e mostrare il messaggio di benvenuto', () => {
    render(<Welcome />);
    const alertMessage = screen.getByText(/Benvenuto su EpiBooks/i);
    expect(alertMessage).toBeInTheDocument();
    const title = screen.getByRole('heading', { name: /EpiBooks/i });
    expect(title).toBeInTheDocument();
  });
});




jest.mock('./horror.json', () => {
  const books = [];
  for (let i = 1; i <= 150; i++) {
    books.push({
      asin: `asin-${i}`,
      title: `Libro ${i}`,
      author: `Autore ${i}`,
      price: (10 + i).toFixed(2),
      img: `https://via.placeholder.com/150?text=Book+${i}`,
      description: `Descrizione del libro ${i}`,
    });
  }
  return books;
});

it('renders all the 150 books', () => {
  render(<App />); 
  const allTheBookCards = screen.getAllByTestId('book-card');
  expect(allTheBookCards).toHaveLength(150);
});





jest.mock('./componets/AddComment', () => ({ onCommentAdded }) => (
  <form>
    <input
      placeholder="Scrivi una recensione..."
      onChange={() => {}}
    />
    <button onClick={() => onCommentAdded({ id: 'new', comment: 'New comment' })}>
      Add Comment
    </button>
  </form>
));


it('renders CommentArea component', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: '1', comment: 'First comment' }]),
    })
  );

  render(<CommentArea bookAsin="123" />);

  expect(screen.getByText(/Caricamento.../i)).toBeInTheDocument();


  const commentText = await screen.findByText((content, element) =>
    content.includes("First comment") && element.tagName === 'P'
  );
  expect(commentText).toBeInTheDocument();


  const reviewInputField = await screen.findByPlaceholderText(/scrivi una recensione.../i);
  expect(reviewInputField).toBeInTheDocument();
});






