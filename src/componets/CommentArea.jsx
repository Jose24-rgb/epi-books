import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

const CommentArea = ({ bookAsin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmZhMzFlMTQwNjAwMTUzMTRkMzEiLCJpYXQiOjE3NDM0NjcxNzEsImV4cCI6MTc0NDY3Njc3MX0.Rqam_j1qPpqpkr3be5rA4njP_dGgHZ0yjwvdxai18HY';

  useEffect(() => {
    if (!bookAsin) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookAsin}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Errore nel recupero dei commenti');
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [bookAsin]);

  const handleDeleteComment = async (commentId) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'eliminazione del commento');
      }

      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId, updatedComment) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: updatedComment }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del commento');
      }

      const updatedCommentData = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, comment: updatedComment } : comment
        )
      );
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}

      {bookAsin && (
        <AddComment
          bookAsin={bookAsin}
          onCommentAdded={(newComment) =>
            setComments((prevComments) => [newComment, ...prevComments])
          }
        />
      )}

      {bookAsin && (
        <button onClick={toggleCommentsVisibility} className="btn btn-primary my-3">
          {showComments ? 'Nascondi recensioni' : 'Vedi recensioni'}
        </button>
      )}

      {showComments && (
        <CommentList
          comments={comments}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentArea;
















