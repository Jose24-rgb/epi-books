import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Welcome from './componets/Welcome';
import CommentArea from './componets/CommentArea';
import '@testing-library/jest-dom';
import { ThemeProvider } from './ThemeContext';
import MyNav from './componets/MyNav'; 
import AllTheBooks from './componets/AllTheBooks';
import { MemoryRouter } from 'react-router-dom';







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






jest.mock('./horror.json', () => {
  return [
    {
      "asin": "0345546792",
      "title": "The Silent Corner: A Novel of Suspense (Jane Hawk)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91dDIYze1wL.jpg",
      "price": 7.92,
      "category": "horror"
    },
    {
      "asin": "0735218994",
      "title": "Celtic Empire (Dirk Pitt Adventure)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91xI4GjM7jL.jpg",
      "price": 17.32,
      "category": "horror"
    },
    {
      "asin": "0316334758",
      "title": "The Girl With All the Gifts",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51an6r%2B508L.jpg",
      "price": 6.89,
      "category": "horror"
    },
    {
      "asin": "1455586625",
      "title": "End Game (Will Robie Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/516ykejOh0L.jpg",
      "price": 8.77,
      "category": "horror"
    },
    {
      "asin": "0316405345",
      "title": "Invisible",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61rnkCg2iYL.jpg",
      "price": 25.48,
      "category": "horror"
    },
    {
      "asin": "0525542264",
      "title": "The Lost Ones (A Quinn Colson Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61ZJTk%2BkoGL.jpg",
      "price": 6.79,
      "category": "horror"
    },
    {
      "asin": "1455559822",
      "title": "Memory Man (Amos Decker)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81sIePWJQwL.jpg",
      "price": 13.99,
      "category": "horror"
    },
    {
      "asin": "1455586609",
      "title": "End Game (Will Robie Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/515wWsW%2BWkL.jpg",
      "price": 15.8,
      "category": "horror"
    },
    {
      "asin": "006113922X",
      "title": "Florida Roadkill: A Novel (Serge Storms)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51Xg-CTAszL.jpg",
      "price": 13.52,
      "category": "horror"
    },
    {
      "asin": "0062381652",
      "title": "The Bone Labyrinth: A Sigma Force Novel (Sigma Force Novels)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51SxxMdEk8L.jpg",
      "price": 6.54,
      "category": "horror"
    },
    {
      "asin": "0399575545",
      "title": "The Romanov Ransom (A Sam and Remi Fargo Adventure)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/914x%2Buf40qL.jpg",
      "price": 18.34,
      "category": "horror"
    },
    {
      "asin": "0345548531",
      "title": "Staked: The Iron Druid Chronicles, Book Eight",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91eMFXdhM0L.jpg",
      "price": 7.59,
      "category": "horror"
    },
    {
      "asin": "156975599X",
      "title": "Patriots: A Novel of Survival in the Coming Collapse",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51REczj2RJL.jpg",
      "price": 14.0,
      "category": "horror"
    },
    {
      "asin": "0735219257",
      "title": "A Delicate Touch (A Stone Barrington Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91FAwkAWvRL.jpg",
      "price": 14.94,
      "category": "horror"
    },
    {
      "asin": "1597808709",
      "title": "A Second Chance: The Chronicles of St. Mary's Book Three",
      "img": "https://images-na.ssl-images-amazon.com/images/I/714wSBJshRL.jpg",
      "price": 9.86,
      "category": "horror"
    },
    {
      "asin": "0804178801",
      "title": "Night School",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51nRytR2rbL.jpg",
      "price": 13.25,
      "category": "horror"
    },
    {
      "asin": "1730921825",
      "title": "Crime and Punishment",
      "img": "https://images-na.ssl-images-amazon.com/images/I/413%2BcSdz6bL.jpg",
      "price": 8.16,
      "category": "horror"
    },
    {
      "asin": "0735215251",
      "title": "The Pharaoh's Secret (The NUMA Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71EOFkXiVxL.jpg",
      "price": 6.79,
      "category": "horror"
    },
    {
      "asin": "039957557X",
      "title": "Typhoon Fury (The Oregon Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/A1ErB7w4WML.jpg",
      "price": 20.68,
      "category": "horror"
    },
    {
      "asin": "0062687883",
      "title": "Awakened: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51t7p2JzyJL.jpg",
      "price": 15.64,
      "category": "horror"
    },
    {
      "asin": "1492354252",
      "title": "The Cleaner (John Milton Thrillers)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/41RvGFODgGL.jpg",
      "price": 9.39,
      "category": "horror"
    },
    {
      "asin": "0399574255",
      "title": "The Solomon Curse (A Sam and Remi Fargo Adventure)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/7171aYcIQpL.jpg",
      "price": 9.49,
      "category": "horror"
    },
    {
      "asin": "0399177574",
      "title": "Illidan: World of Warcraft: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81khLUoMKaL.jpg",
      "price": 6.12,
      "category": "horror"
    },
    {
      "asin": "0399574190",
      "title": "Fast and Loose (A Stone Barrington Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/914vewVfTLL.jpg",
      "price": 10.39,
      "category": "horror"
    },
    {
      "asin": "0399575510",
      "title": "Odessa Sea (Dirk Pitt Adventure)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81D2f6zFe9L.jpg",
      "price": 17.39,
      "category": "horror"
    },
    {
      "asin": "0345468260",
      "title": "Timeline: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/918vbcZK1vL.jpg",
      "price": 13.97,
      "category": "horror"
    },
    {
      "asin": "1578562953",
      "title": "Edge of Eternity",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91Ft%2BN5q0sL.jpg",
      "price": 15.19,
      "category": "horror"
    },
    {
      "asin": "0515155691",
      "title": "The Assassination Option (A Clandestine Operations Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/715AQ8YsMaL.jpg",
      "price": 8.99,
      "category": "horror"
    },
    {
      "asin": "1510701990",
      "title": "The Trail Driver: A Western Story",
      "img": "https://images-na.ssl-images-amazon.com/images/I/8129Yu2L8zL.jpg",
      "price": 13.73,
      "category": "horror"
    },
    {
      "asin": "0593104226",
      "title": "Red Metal",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91swIBU7QyL.jpg",
      "price": 27.67,
      "category": "horror"
    },
    {
      "asin": "0312330529",
      "title": "Shantaram: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51hYGaGO76L.jpg",
      "price": 27.36,
      "category": "horror"
    },
    {
      "asin": "0199540241",
      "title": "The Female Quixote: or The Adventures of Arabella (Oxford World's Classics)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51x4zFJVgSL.jpg",
      "price": 6.22,
      "category": "horror"
    },
    {
      "asin": "1629143715",
      "title": "The Man from Battle Flat: A Western Trio",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71GCjmvwIjL.jpg",
      "price": 11.91,
      "category": "horror"
    },
    {
      "asin": "0446564516",
      "title": "Robert Ludlum's (TM) The Janson Command (Janson series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51OyK48ufaL.jpg",
      "price": 9.52,
      "category": "horror"
    },
    {
      "asin": "0451488903",
      "title": "Agent in Place (Gray Man)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91JATxKfMPL.jpg",
      "price": 16.0,
      "category": "horror"
    },
    {
      "asin": "0451414888",
      "title": "Dragon Fate: Book Six of The Age of Fire",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81qAK72OCYL.jpg",
      "price": 8.53,
      "category": "horror"
    },
    {
      "asin": "0425245713",
      "title": "Skeleton Coast (The Oregon Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61iKU1lYrML.jpg",
      "price": 9.19,
      "category": "horror"
    },
    {
      "asin": "0515155616",
      "title": "Top Secret (A Clandestine Operations Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71kRpHaHvQL.jpg",
      "price": 9.49,
      "category": "horror"
    },
    {
      "asin": "1503936562",
      "title": "Hard Road (A Jon Reznick Thriller)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51m7iZY4fuL.jpg",
      "price": 9.58,
      "category": "horror"
    },
    {
      "asin": "1978633017",
      "title": "Agent in Place (Gray Man)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71%2BD-LLUTCL.jpg",
      "price": 13.7,
      "category": "horror"
    },
    {
      "asin": "1786489783",
      "title": "Leave No Trace: An unputdownable thriller packed with suspense and dark family secrets",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81XLjUGLGyL.jpg",
      "price": 11.42,
      "category": "horror"
    },
    {
      "asin": "0199537852",
      "title": "Greenmantle (Oxford World's Classics)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/41Kw7fY5IcL.jpg",
      "price": 8.81,
      "category": "horror"
    },
    {
      "asin": "034542882X",
      "title": "Star Wars, Episode II: Attack of the Clones",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91iYPW9FejL.jpg",
      "price": 7.59,
      "category": "horror"
    },
    {
      "asin": "0062381644",
      "title": "The Bone Labyrinth: A Sigma Force Novel (Sigma Force Novels)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61ZS9pb7S4L.jpg",
      "price": 25.26,
      "category": "horror"
    },
    {
      "asin": "0425226697",
      "title": "Plague Ship (The Oregon Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81y20-oCk0L.jpg",
      "price": 7.92,
      "category": "horror"
    },
    {
      "asin": "0316505382",
      "title": "Blood Oath (Sawbones)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71cLSp4y22L.jpg",
      "price": 15.19,
      "category": "horror"
    },
    {
      "asin": "0345549198",
      "title": "The Fateful Lightning: A Novel of the Civil War",
      "img": "https://images-na.ssl-images-amazon.com/images/I/911Mp0fgjtL.jpg",
      "price": 14.93,
      "category": "horror"
    },
    {
      "asin": "0451467698",
      "title": "No Fortunate Son (A Pike Logan Thriller)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71FDmM4vwdL.jpg",
      "price": 9.49,
      "category": "horror"
    },
    {
      "asin": "0345505492",
      "title": "The Emperor's Tomb",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51r%2BG5HGkzL.jpg",
      "price": 14.93,
      "category": "horror"
    },
    {
      "asin": "0316302775",
      "title": "Shadowborn (Seraphim)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51Vfe9jrxML.jpg",
      "price": 10.94,
      "category": "horror"
    },
    {
      "asin": "0999051407",
      "title": "Blood Memory Society",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71Ht6hq-a8L.jpg",
      "price": 12.67,
      "category": "horror"
    },
    {
      "asin": "1402579373",
      "title": "Lies My Teacher Told Me: Everything Your American History Textbook Got Wrong",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71Y0GoEGz4L.jpg",
      "price": 26.36,
      "category": "horror"
    },
    {
      "asin": "0446519960",
      "title": "Absolute Power",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71QlNyX1VcL.jpg",
      "price": 17.22,
      "category": "horror"
    },
    {
      "asin": "1455559814",
      "title": "Memory Man (Memory Man series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51orhi%2B5XcL.jpg",
      "price": 12.66,
      "category": "horror"
    },
    {
      "asin": "0804179794",
      "title": "The Collected Short Stories of Louis L'Amour, Volume 7: Frontier Stories",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81%2ByT7qClCL.jpg",
      "price": 6.64,
      "category": "horror"
    },
    {
      "asin": "1607065231",
      "title": "Chew, Vol. 5: Major League Chew",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71LZ3cN%2BaaL.jpg",
      "price": 10.57,
      "category": "horror"
    },
    {
      "asin": "1631580973",
      "title": "The Last Flight: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71ifey%2BbcDL.jpg",
      "price": 19.52,
      "category": "horror"
    },
    {
      "asin": "0525590633",
      "title": "The Rising Sea (The NUMA Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91evxyNDiXL.jpg",
      "price": 35.25,
      "category": "horror"
    },
    {
      "asin": "045120865X",
      "title": "Blaze Wyndham",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71Ul8Eoz09L.jpg",
      "price": 22.32,
      "category": "horror"
    },
    {
      "asin": "147898421X",
      "title": "Invisible",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51qrZmTlaAL.jpg",
      "price": 18.07,
      "category": "horror"
    },
    {
      "asin": "0954013751",
      "title": "Nimbus: Hell on Earth",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51E-Y0FGfKL.jpg",
      "price": 9.44,
      "category": "horror"
    },
    {
      "asin": "0345485807",
      "title": "The Charlemagne Pursuit: A Novel (Cotton Malone)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/718s88qpjqL.jpg",
      "price": 9.15,
      "category": "horror"
    },
    {
      "asin": "0892962836",
      "title": "The Big Nowhere (Mr. Men and Little Miss)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/519zfC46zBL.jpg",
      "price": 27.75,
      "category": "horror"
    },
    {
      "asin": "0425272303",
      "title": "Robert B. Parker's Bull River (A Cole and Hitch Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/816odS2mz0L.jpg",
      "price": 9.08,
      "category": "horror"
    },
    {
      "asin": "0735217238",
      "title": "Barely Legal (Herbie Fisher)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91hQGBQFevL.jpg",
      "price": 10.01,
      "category": "horror"
    },
    {
      "asin": "0345503805",
      "title": "The Warded Man: Book One of The Demon Cycle",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91D7n-LlVDL.jpg",
      "price": 27.31,
      "category": "horror"
    },
    {
      "asin": "1478929987",
      "title": "Memory Man (Memory Man series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61WyFDR4KzL.jpg",
      "price": 23.79,
      "category": "horror"
    },
    {
      "asin": "1631402153",
      "title": "Tarzan: The Complete Russ Manning Newspaper Strips Volume 4 (1974-1979)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81qdNdSQpLL.jpg",
      "price": 41.93,
      "category": "horror"
    },
    {
      "asin": "045147306X",
      "title": "Cut and Thrust: A Stone Barrington Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81oyHIq5r2L.jpg",
      "price": 7.53,
      "category": "horror"
    },
    {
      "asin": "0425231453",
      "title": "Arctic Drift (Dirk Pitt)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91tdtjMTf2L.jpg",
      "price": 9.66,
      "category": "horror"
    },
    {
      "asin": "0571295711",
      "title": "Lord of the Flies",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81uc0ffe6xL.jpg",
      "price": 10.25,
      "category": "horror"
    },
    {
      "asin": "1499860846",
      "title": "The Seventh Scroll (2) (The Egyptian Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81j3E4E4lyL.jpg",
      "price": 13.49,
      "category": "horror"
    },
    {
      "asin": "0804163944",
      "title": "Command Authority (A Jack Ryan Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81n8osk6RVL.jpg",
      "price": 26.07,
      "category": "horror"
    },
    {
      "asin": "0143036688",
      "title": "The Memory of Running",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91wnTFWrTTL.jpg",
      "price": 7.99,
      "category": "horror"
    },
    {
      "asin": "0441007155",
      "title": "Stark's War (Stark's War, Book 1)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91eT7F3HaKL.jpg",
      "price": 7.87,
      "category": "horror"
    },
    {
      "asin": "1405861835",
      "title": "Spies (York Notes Advanced)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/614ybf4Od3L.jpg",
      "price": 9.68,
      "category": "horror"
    },
    {
      "asin": "1524762474",
      "title": "The Mountain Between Us (Movie Tie-In): A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91oO1lRHkaL.jpg",
      "price": 10.3,
      "category": "horror"
    },
    {
      "asin": "0316242454",
      "title": "A Dance of Mirrors (Shadowdance 3)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51GWlXfaIbL.jpg",
      "price": 11.14,
      "category": "horror"
    },
    {
      "asin": "0425186709",
      "title": "Mission of Honor (Tom Clancy's Op-Center, Book 9)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81VbCtwOvdL.jpg",
      "price": 7.93,
      "category": "horror"
    },
    {
      "asin": "0345461347",
      "title": "To the Last Man: A Novel of the First World War",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91ml-SnGuPL.jpg",
      "price": 17.47,
      "category": "horror"
    },
    {
      "asin": "0999560247",
      "title": "Conch Republic, Island Stepping with Hemingway",
      "img": "https://images-na.ssl-images-amazon.com/images/I/711K9A702mL.jpg",
      "price": 14.84,
      "category": "horror"
    },
    {
      "asin": "0804192499",
      "title": "Utah Blaine",
      "img": "https://images-na.ssl-images-amazon.com/images/I/816d9nB7r5L.jpg",
      "price": 22.14,
      "category": "horror"
    },
    {
      "asin": "0345539214",
      "title": "The Icarus Agenda: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81gIma2MK3L.jpg",
      "price": 8.89,
      "category": "horror"
    },
    {
      "asin": "1511306718",
      "title": "SeaFire (James Bond Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61gcsZwqhmL.jpg",
      "price": 8.51,
      "category": "horror"
    },
    {
      "asin": "1473671809",
      "title": "The Shout",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71V8EfSgRZL.jpg",
      "price": 4.32,
      "category": "horror"
    },
    {
      "asin": "1524783358",
      "title": "North to the Rails: A Novel (Talon and Chantry)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71r0NaakVfL.jpg",
      "price": 25.71,
      "category": "horror"
    },
    {
      "asin": "1611882672",
      "title": "The Flagler Hunt",
      "img": "https://images-na.ssl-images-amazon.com/images/I/917m3OasiKL.jpg",
      "price": 15.68,
      "category": "horror"
    },
    {
      "asin": "0739323741",
      "title": "The Collected Bowdrie Dramatizations: Volume III (Chuck Bowdrie's Adventures)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/912EUMHHMgL.jpg",
      "price": 27.27,
      "category": "horror"
    },
    {
      "asin": "074902013X",
      "title": "Bright Shiny Things (Hakim & Arnold)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81X4iWbIL5L.jpg",
      "price": 11.18,
      "category": "horror"
    },
    {
      "asin": "0804178321",
      "title": "Half a King (Shattered Sea)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81lCGUkjf7L.jpg",
      "price": 17.85,
      "category": "horror"
    },
    {
      "asin": "0062253832",
      "title": "The Fallen Angel: A Novel (Gabriel Allon)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51Lq6TyXc1L.jpg",
      "price": 13.26,
      "category": "horror"
    },
    {
      "asin": "0553804529",
      "title": "The Collected Short Stories of Louis L'Amour, Volume 3: The Frontier Stories",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71p8msuFWAL.jpg",
      "price": 17.38,
      "category": "horror"
    },
    {
      "asin": "0553578766",
      "title": "Tales from the Empire: Star Wars Legends",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81J45hLh1ML.jpg",
      "price": 7.88,
      "category": "horror"
    },
    {
      "asin": "1608090299",
      "title": "Fly by Night (A Jammer Davis Thriller)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71RiSW6zL2L.jpg",
      "price": 21.07,
      "category": "horror"
    },
    {
      "asin": "1250072689",
      "title": "The Revenant: A Novel of Revenge",
      "img": "https://images-na.ssl-images-amazon.com/images/I/41OGesfH9RL.jpg",
      "price": 11.96,
      "category": "horror"
    },
    {
      "asin": "0316346969",
      "title": "Humans, Bow Down",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51JCvyoNjXL.jpg",
      "price": 12.49,
      "category": "horror"
    },
    {
      "asin": "0307737543",
      "title": "Last of the Breed",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81lFpMN9uXL.jpg",
      "price": 22.09,
      "category": "horror"
    },
    {
      "asin": "0751564885",
      "title": "Let Me Lie: The Number One Sunday Times Bestseller",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51f9wKHtBJL.jpg",
      "price": 9.6,
      "category": "horror"
    },
    {
      "asin": "0316024600",
      "title": "Sail",
      "img": "https://images-na.ssl-images-amazon.com/images/I/716mOr6gg9L.jpg",
      "price": 34.74,
      "category": "horror"
    },
    {
      "asin": "034536161X",
      "title": "Indiana Jones and the Last Crusade",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91%2Bduh1dJsL.jpg",
      "price": 7.74,
      "category": "horror"
    },
    {
      "asin": "1478999225",
      "title": "The Fallen (Memory Man series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81ZKeHIOs9L.jpg",
      "price": 11.49,
      "category": "horror"
    },
    {
      "asin": "1682616126",
      "title": "The Prefect of Panama (The Agency)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81E%2BkP%2B04kL.jpg",
      "price": 24.34,
      "category": "horror"
    },
    {
      "asin": "0735286124",
      "title": "Radigan: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81yNX5v5uAL.jpg",
      "price": 20.44,
      "category": "horror"
    },
    {
      "asin": "0446527017",
      "title": "Standoff",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61vJkp1J64L.jpg",
      "price": 15.23,
      "category": "horror"
    },
    {
      "asin": "0345540700",
      "title": "The High Druid's Blade: The Defenders of Shannara",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91rEIKBITuL.jpg",
      "price": 19.61,
      "category": "horror"
    },
    {
      "asin": "1432849506",
      "title": "The Marshal and the Sinister Still (A Nelson Lane Frontier Mystery)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91wOZCsGdSL.jpg",
      "price": 20.38,
      "category": "horror"
    },
    {
      "asin": "0525494308",
      "title": "Quick & Dirty (A Stone Barrington Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81QlXRjVg4L.jpg",
      "price": 30.74,
      "category": "horror"
    },
    {
      "asin": "1497642418",
      "title": "The Face in the Frost",
      "img": "https://images-na.ssl-images-amazon.com/images/I/516XFxgttiL.jpg",
      "price": 10.84,
      "category": "horror"
    },
    {
      "asin": "145552249X",
      "title": "Robert Ludlum's (TM) The Janson Option (Janson series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81CAhm7dV5L.jpg",
      "price": 32.86,
      "category": "horror"
    },
    {
      "asin": "0399177418",
      "title": "The Memory of Fire (The Waking Land)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91OvCAIaVUL.jpg",
      "price": 21.41,
      "category": "horror"
    },
    {
      "asin": "0804178429",
      "title": "Half the World (Shattered Sea)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51%2BsRzTLvdL.jpg",
      "price": 23.22,
      "category": "horror"
    },
    {
      "asin": "1608090663",
      "title": "Fly by Night (A Jammer Davis Thriller)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71RiSW6zL2L.jpg",
      "price": 12.44,
      "category": "horror"
    },
    {
      "asin": "0345806492",
      "title": "Inferno: En espanol (Spanish Edition)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91vHqD35GOL.jpg",
      "price": 12.53,
      "category": "horror"
    },
    {
      "asin": "1501167154",
      "title": "The Four Legendary Kingdoms (Jack West, Jr.)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81cFEf5fcrL.jpg",
      "price": 15.29,
      "category": "horror"
    },
    {
      "asin": "1489713921",
      "title": "River Divided",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71nt4jhGwUL.jpg",
      "price": 3.23,
      "category": "horror"
    },
    {
      "asin": "0692305475",
      "title": "The Searchers",
      "img": "https://images-na.ssl-images-amazon.com/images/I/415WRSuf5FL.jpg",
      "price": 4.59,
      "category": "horror"
    },
    {
      "asin": "0804127093",
      "title": "The Quick and the Dead",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71EfTDy1sgL.jpg",
      "price": 27.62,
      "category": "horror"
    },
    {
      "asin": "0990846105",
      "title": "Apparition Island (4) (The Windjammer Mystery Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51yDJ5TgDbL.jpg",
      "price": 12.72,
      "category": "horror"
    },
    {
      "asin": "0804121060",
      "title": "Inferno: A Novel (Robert Langdon)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/A1p-6W6vlYL.jpg",
      "price": 23.24,
      "category": "horror"
    },
    {
      "asin": "0525497307",
      "title": "Typhoon Fury (The Oregon Files)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91wyICGOyHL.jpg",
      "price": 29.74,
      "category": "horror"
    },
    {
      "asin": "1480872016",
      "title": "The Shaft: A Supernatural Thriller",
      "img": "https://images-na.ssl-images-amazon.com/images/I/517qmE7PxGL.jpg",
      "price": 18.14,
      "category": "horror"
    },
    {
      "asin": "0875654282",
      "title": "Sins of the Younger Sons",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81sC1XaM7XL.jpg",
      "price": 24.89,
      "category": "horror"
    },
    {
      "asin": "1416509054",
      "title": "Ghost (Paladin of Shadows, Book 1)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51ptwTm04iL.jpg",
      "price": 18.89,
      "category": "horror"
    },
    {
      "asin": "0345514513",
      "title": "The Brotherhood of the Rose: A Novel (Mortalis)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81IFfeULcML.jpg",
      "price": 12.8,
      "category": "horror"
    },
    {
      "asin": "0857387936",
      "title": "Zambezi",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51x4kzKCW%2BL.jpg",
      "price": 15.72,
      "category": "horror"
    },
    {
      "asin": "0307737500",
      "title": "The Walking Drum",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81OzqN3T0FL.jpg",
      "price": 25.86,
      "category": "horror"
    },
    {
      "asin": "125012199X",
      "title": "Maze Master: A Thriller",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51fUTRHizFL.jpg",
      "price": 26.59,
      "category": "horror"
    },
    {
      "asin": "1501264249",
      "title": "Ranger, The (A Quinn Colson Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71PPOsWm2LL.jpg",
      "price": 12.58,
      "category": "horror"
    },
    {
      "asin": "0525531491",
      "title": "The Mountain Between Us (Movie Tie-In): A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91DyWHD5eAL.jpg",
      "price": 19.36,
      "category": "horror"
    },
    {
      "asin": "1590172728",
      "title": "In Hazard (New York Review Books Classics)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/61Bedw%2Bk8WL.jpg",
      "price": 12.04,
      "category": "horror"
    },
    {
      "asin": "0441017851",
      "title": "The Devil's Eye (An Alex Benedict Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91-z5E-Y8QL.jpg",
      "price": 7.99,
      "category": "horror"
    },
    {
      "asin": "1455517089",
      "title": "The Kill Room (Lincoln Rhyme)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51yV8NXO0HL.jpg",
      "price": 12.85,
      "category": "horror"
    },
    {
      "asin": "1644383357",
      "title": "Helen's Crusade",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71FRJ0J56UL.jpg",
      "price": 11.04,
      "category": "horror"
    },
    {
      "asin": "0743250265",
      "title": "Now You See It: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/41Bv93U8qCL.jpg",
      "price": 12.52,
      "category": "horror"
    },
    {
      "asin": "0544242157",
      "title": "Foxfire",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51c8-cGk9-L.jpg",
      "price": 13.97,
      "category": "horror"
    },
    {
      "asin": "1504041399",
      "title": "War Against the Mafia (The Executioner)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/51yPa%2BKfCOL.jpg",
      "price": 11.32,
      "category": "horror"
    },
    {
      "asin": "0345483057",
      "title": "The Fires of Spring: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91mGElaxArL.jpg",
      "price": 15.73,
      "category": "horror"
    },
    {
      "asin": "0425259358",
      "title": "Tom Clancy Presents: Act of Valor",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71nOMAdm-iL.jpg",
      "price": 9.1,
      "category": "horror"
    },
    {
      "asin": "1598531646",
      "title": "Tarzan of the Apes: A Library of America Special Publication",
      "img": "https://images-na.ssl-images-amazon.com/images/I/615EQTEHR4L.jpg",
      "price": 13.26,
      "category": "horror"
    },
    {
      "asin": "1501181858",
      "title": "A Promise to Kill: A Clyde Barr Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71W9GRf9r9L.jpg",
      "price": 8.97,
      "category": "horror"
    },
    {
      "asin": "0553586092",
      "title": "Babylon Rising: The Edge of Darkness",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91BPjFtGDbL.jpg",
      "price": 8.19,
      "category": "horror"
    },
    {
      "asin": "1533233578",
      "title": "The Book Club",
      "img": "https://images-na.ssl-images-amazon.com/images/I/41ph9NDADGL.jpg",
      "price": 10.99,
      "category": "horror"
    },
    {
      "asin": "0143108093",
      "title": "The Last Bookaneer: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91o1OjWX2uL.jpg",
      "price": 10.48,
      "category": "horror"
    },
    {
      "asin": "0451413423",
      "title": "Ralph Compton The Omaha Trail (The Trail Drive Series)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81Rp8ge32eL.jpg",
      "price": 6.64,
      "category": "horror"
    },
    {
      "asin": "125010310X",
      "title": "In the Still of the Night: The Supernaturals II",
      "img": "https://images-na.ssl-images-amazon.com/images/I/91xB0qU71lL.jpg",
      "price": 23.68,
      "category": "horror"
    },
    {
      "asin": "1591140560",
      "title": "Cold is the Sea: A Novel (Bluejacket Books)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/512Q8B2ANXL.jpg",
      "price": 8.31,
      "category": "horror"
    },
    {
      "asin": "1524723495",
      "title": "Fast and Loose (A Stone Barrington Novel)",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81ZdseZ23SL.jpg",
      "price": 24.84,
      "category": "horror"
    },
    {
      "asin": "1524783234",
      "title": "Taggart: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/71uwInuX3FL.jpg",
      "price": 25.94,
      "category": "horror"
    },
    {
      "asin": "161170278X",
      "title": "The Crackerjack",
      "img": "https://images-na.ssl-images-amazon.com/images/I/616z3tDYdmL.jpg",
      "price": 5.57,
      "category": "horror"
    },
    {
      "asin": "0062473409",
      "title": "Dragon Teeth CD: A Novel",
      "img": "https://images-na.ssl-images-amazon.com/images/I/81vEZRynpSL.jpg",
      "price": 10.13,
      "category": "horror"
    }
  ];
});

describe('Test del filtraggio dei libri via navbar', () => {
  it('Filtra i libri secondo la query nel campo di ricerca', () => {
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/Cerca un libro.../i);

    fireEvent.change(searchInput, { target: { value: 'The Silent Corner' } });

    const cards = screen.getAllByTestId('book-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('The Silent Corner');
  });

  it('Resetta la ricerca e mostra tutti i libri di nuovo', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Cerca un libro.../i);
    fireEvent.change(searchInput, { target: { value: 'The Silent Corner' } });

    let cards = screen.getAllByTestId('book-card');
    expect(cards).toHaveLength(1);

    const resetButton = screen.getByLabelText('reset');
    fireEvent.click(resetButton);

    cards = screen.getAllByTestId('book-card');
    expect(cards).toHaveLength(150);
  });
});







describe('MyNav Component', () => {
  it('renderizza i link e il campo di ricerca', () => {
    const setSearchQuery = jest.fn();

    render(
      <ThemeProvider>
        <MyNav searchQuery="" setSearchQuery={setSearchQuery} />
      </ThemeProvider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Cerca un libro/i);
    expect(input).toBeInTheDocument();
  });

  it('aggiorna la ricerca quando scrivi', () => {
    const setSearchQuery = jest.fn();

    render(
      <ThemeProvider>
        <MyNav searchQuery="" setSearchQuery={setSearchQuery} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Cerca un libro/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(setSearchQuery).toHaveBeenCalledWith('test');
  });

  it('resetta il campo di ricerca', () => {
    const setSearchQuery = jest.fn();

    render(
      <ThemeProvider>
        <MyNav searchQuery="qualcosa" setSearchQuery={setSearchQuery} />
      </ThemeProvider>
    );

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(setSearchQuery).toHaveBeenCalledWith('');
  });

  it('cambia tema quando clicchi "Switch"', () => {
    render(
      <ThemeProvider>
        <MyNav searchQuery="" setSearchQuery={() => {}} />
      </ThemeProvider>
    );

    const switchButton = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });

    fireEvent.click(switchButton);

    expect(screen.getByRole('button', {
      name: /switch to light mode/i,
    })).toBeInTheDocument();
  });
});










describe('Test selezione libro (bordo)', () => {
  it('cambia il bordo quando un libro viene selezionato e torna normale quando si seleziona un altro libro', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <AllTheBooks searchQuery="" />
        </MemoryRouter>
      </ThemeProvider>
    );

    const cards = screen.getAllByTestId('book-card');
    const firstCard = cards[0];
    const firstImg = firstCard.querySelector('img');
    
    expect(firstCard).not.toHaveStyle('border: 5px solid red');
    
    fireEvent.click(firstImg);

    expect(firstCard).toHaveStyle('border: 5px solid red');

    const secondCard = cards[1];
    const secondImg = secondCard.querySelector('img');


    expect(secondCard).not.toHaveStyle('border: 5px solid red');
    
    fireEvent.click(secondImg);

    expect(secondCard).toHaveStyle('border: 5px solid red');

    expect(firstCard).not.toHaveStyle('border: 5px solid red');
  });
});








describe('Test iniziale della pagina', () => {
  it('non mostra alcuna istanza di SingleComment all\'avvio della pagina', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <AllTheBooks searchQuery="" />
        </MemoryRouter>
      </ThemeProvider>
    );

    const commentElements = screen.queryAllByTestId('single-comment');
    expect(commentElements).toHaveLength(0);
  });
});









/*global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { _id: '1', comment: 'Ottimo libro!', date: '2025-04-06' },
      { _id: '2', comment: 'Mi è piaciuto molto', date: '2025-04-05' },
    ]),
  })
);

describe('Test della selezione del libro e caricamento recensioni', () => {
  test('verifica che le recensioni siano caricate quando un libro viene selezionato', async () => {
    // Rendering del componente App, che contiene la logica per selezionare un libro
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

  
    const bookCard = await screen.findByTestId('book-card');
    expect(bookCard).toBeInTheDocument();

    
    fireEvent.click(bookCard);

   
    await waitFor(() => {
      const commentsList = screen.getByRole('list');
      expect(commentsList).toBeInTheDocument();
    });

    
    const comment1 = screen.getByText('Ottimo libro!');
    const comment2 = screen.getByText('Mi è piaciuto molto');
    expect(comment1).toBeInTheDocument();
    expect(comment2).toBeInTheDocument();
  });
}); */ /* (NON SONO RIUSCITO CON QUESTO)*/
