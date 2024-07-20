import React from 'react';

const DifficultySelector = ({ onSelect }) => {
  return (
    <div>
      <h2>Select Difficulty</h2>
      <button onClick={() => onSelect('easy')}>Easy</button>
      <button onClick={() => onSelect('medium')}>Medium</button>
      <button onClick={() => onSelect('hard')}>Hard</button>
      <button onClick={() => onSelect('extremely-hard')}>Extremely Hard</button>
    </div>
  );
};

export default DifficultySelector;
