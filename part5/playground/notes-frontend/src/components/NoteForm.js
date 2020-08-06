import React, { useState } from 'react';

function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('a new note...');

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    });

    setNewNote('');
  };

  return (
    <div className='formDiv'>
      <h2>create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default NoteForm;
