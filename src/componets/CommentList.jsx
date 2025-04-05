import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentList = ({ comments, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');

  return (
    <ul>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <li key={comment.id}>
            {editingId === comment.id ? (
              <>
                <Form.Control
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <Button 
                  size="sm" 
                  onClick={() => { 
                    onUpdate(comment.id, editComment); 
                    setEditingId(null); 
                  }}
                >
                  Salva
                </Button>
              </>
            ) : (
              <>
                <p>{comment.comment} - {new Date(comment.createdAt).toLocaleDateString()}</p>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => onDelete(comment.id)}
                >
                  Elimina
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => { 
                    setEditingId(comment.id); 
                    setEditComment(comment.comment); 
                  }}
                >
                  Modifica
                </Button>
              </>
            )}
          </li>
        ))
      ) : (
        <p>Nessun commento ancora.</p>
      )}
    </ul>
  );
};

export default CommentList;



