import React from 'react';
import './GameOverModal.css'; // Create and style this CSS file as needed

const GameOverModal = ({ show, onClose, score }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Game Over</h2>
        <p>Aaliyah, you have run out of lives.</p>
        <p>Your final score is: {score}</p>
        <button className="continue-button" onClick={onClose}>
          Back to Difficulty Selection
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
