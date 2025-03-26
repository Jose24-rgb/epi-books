import React from 'react';
import SingleComment from './SingleComment'; // Importa SingleComment

const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <SingleComment key={index} comment={comment} /> // Renderizza ogni singola recensione
          ))
        ) : (
          <p>Nessun commento ancora.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentList;
