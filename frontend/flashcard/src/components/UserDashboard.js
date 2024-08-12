import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  if (flashcards.length === 0) return <p>Loading flashcards...</p>;

  return (
    <div className="user-dashboard">
      <div className="flashcard" onClick={handleFlip}>
        <div className="flashcard-header">
          <h3>{showAnswer ? 'ANSWER' : 'QUESTION'}</h3>
        </div>
        <div className="flashcard-content">
          <p className="flashcard-text">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </p>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default UserDashboard;
