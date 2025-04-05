import React from 'react';

const SingleComment = ({ comment }) => {
  return (
    <li data-testid="single-comment">
      <p>{comment.comment}</p>
      <small>{new Date(comment.date).toLocaleDateString()}</small>
    </li>
  );
};

export default SingleComment;




