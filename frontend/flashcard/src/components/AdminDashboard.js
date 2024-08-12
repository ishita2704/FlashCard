import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleAddFlashcard = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/flashcards', newFlashcard);
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ question: '', answer: '' });
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEditFlashcard = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/flashcards/${id}`, editingFlashcard);
      setFlashcards(flashcards.map(fc => (fc.id === id ? response.data : fc)));
      setEditingFlashcard(null);
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      setFlashcards(flashcards.filter(fc => fc.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="add-flashcard">
        <h2>Add New Flashcard</h2>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>

      <div className="flashcard-list">
        <h2>Existing Flashcards</h2>
        {flashcards.map(fc => (
          <div key={fc.id} className="flashcard-item">
            {editingFlashcard?.id === fc.id ? (
              <>
                <input
                  type="text"
                  value={editingFlashcard.question}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, question: e.target.value })}
                />
                <input
                  type="text"
                  value={editingFlashcard.answer}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })}
                />
                <button onClick={() => handleEditFlashcard(fc.id)}>Save</button>
                <button onClick={() => setEditingFlashcard(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Q:</strong> {fc.question}</p>
                <p><strong>A:</strong> {fc.answer}</p>
                <button onClick={() => setEditingFlashcard(fc)}>Edit</button>
                <button onClick={() => handleDeleteFlashcard(fc.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
