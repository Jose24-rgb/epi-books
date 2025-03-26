import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentList = ({ comments, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  return (
    <ul>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <li key={comment.id}>
            {editingId === comment.id ? (
              <>
                <Form.Control
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <Button size="sm" onClick={() => { onUpdate(comment.id, editText); setEditingId(null); }}>Salva</Button>
              </>
            ) : (
              <>
                {comment.text} - {new Date(comment.date).toLocaleDateString()}
                <Button variant="danger" size="sm" onClick={() => onDelete(comment.id)}>Elimina</Button>
                <Button size="sm" onClick={() => { setEditingId(comment.id); setEditText(comment.text); }}>Modifica</Button>
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

