import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import AllTheBooks from './componets/AllTheBooks';






describe('main rendering tests', () => {
  it('renders Welcome component', () => {
    render(<App />);
    const mainHeader = screen.getByRole('heading', {
      name: /epibooks/i,
    });
    expect(mainHeader).toBeInTheDocument(); 
  });

  it('renders CommentArea component with input', async () => {
    render(<App />);
    const bookCards = await screen.findAllByTestId('book-card');
    fireEvent.click(bookCards[0]);
    const loader = await screen.findByRole('status');
    expect(loader).toBeInTheDocument();
  });
});

describe('books rendering and filtering', () => {
  it('renders all the books (mocked length)', async () => {
    render(<App />);
    const cards = await screen.findAllByTestId('book-card');
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBe(150);
  });

  it("filters books with word 'The Silent Corner'", async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(searchInput, { target: { value: 'The Silent Corner' } });
  
    const filteredBooks = await screen.findAllByTestId('book-card');
    expect(filteredBooks.length).toBeGreaterThan(0);
  });
  
  it('shows no book if search does not match anything', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(searchInput, { target: { value: 'abcdefgh' } });

    const filteredBooks = screen.queryAllByTestId('book-card');
    expect(filteredBooks.length).toBe(0);
  });

  it('filters books by category (horror)', async () => {
    render(<App />);
    const horrorCategoryButton = screen.getByRole('button', { name: /horror/i });
    fireEvent.click(horrorCategoryButton);

    const filteredBooks = await screen.findAllByTestId('book-card');
    filteredBooks.forEach((book) => {
      expect(book).toHaveTextContent('horror'); 
    });
  });
});

describe('book selection and border behavior', () => {
  it('changes border color on book click', async () => {
    render(<AllTheBooks searchQuery="" />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);
    await waitFor(() => {
      expect(books[0]).toHaveStyle('border: 5px solid red');
    });
  });
  
  it('removes border when book is deselected', async () => {
    render(<AllTheBooks searchQuery="" />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);
    fireEvent.click(books[0]);
    await waitFor(() => {
      expect(books[0]).not.toHaveStyle('border: 5px solid red');
    });
  });

  it('removes border color when deselecting a book', async () => {
    render(<App />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);
    fireEvent.click(books[0]);
    expect(books[0]).not.toHaveStyle('border: 5px solid red');
  });
});

describe('comments handling', () => {
  it('has no SingleComment on first load', () => {
    render(<App />);
    const comments = screen.queryAllByTestId('single-comment');
    expect(comments).toHaveLength(0);
  });

  it('loads comments correctly when book is clicked', async () => {
    render(<App />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);
    const comments = await screen.findAllByTestId('single-comment');
    expect(comments.length).toBeGreaterThan(0);
  });

  it('loads comments correctly when book has reviews', async () => {
    render(<App />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);

    const comments = await screen.findAllByTestId('single-comment');
    expect(comments.length).toBeGreaterThan(0);
    comments.forEach((comment) => {
      expect(comment).toHaveTextContent('author');
      expect(comment).toHaveTextContent('comment text');
    });
  });

  it('allows adding a comment to a book', async () => {
    render(<App />);
    const books = await screen.findAllByTestId('book-card');
    fireEvent.click(books[0]);
  

    const inputField = screen.getByPlaceholderText(/scrivi una recensione/i);
    fireEvent.change(inputField, { target: { value: 'This is a test comment' } });
    fireEvent.click(screen.getByRole('button', { name: /invia/i }));
  
   
    const comments = await screen.findAllByTestId('single-comment');
    expect(comments).toHaveLength(1);  
    expect(comments[0]).toHaveTextContent('This is a test comment'); 
  });  
});

describe('other interactions', () => {
  it('resets the search input when the reset button is clicked', async () => {
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/cerca un libro/i);
  
    
    fireEvent.change(searchInput, { target: { value: 'The Silent Corner' } });
  
   
    expect(searchInput.value).toBe('The Silent Corner');
  
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
  
   
    expect(searchInput.value).toBe('');
  });

  it('loads without crashing and displays book cards', async () => {
    render(<App />);
    const books = await screen.findAllByTestId('book-card');
    expect(books).toHaveLength(150);
  });
});



