import React from 'react';

const SingleComment = ({ comment }) => {
  return (
    <li>
      <p>{comment.text}</p>
      <small>{new Date(comment.date).toLocaleDateString()}</small>
    </li>
  );
};

export default SingleComment;

