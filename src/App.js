import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import DifficultySelector from './components/DifficultySelector';
import axios from 'axios';
import speakerIcon from './assets/speaker.png';

function App() {
  const [difficulty, setDifficulty] = useState(null);

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const handleBackToDifficultySelection = () => {
    setDifficulty(null);
  };

  const speakText = async (text) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        {
          model: 'tts-1',
          voice: 'nova',
          input: text
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error in text-to-speech:', error);
    }
  };

  return (
    <div className="App">
      <h1>Aaliyah's Flag Quiz</h1>
      {difficulty ? (
        <Quiz
          difficulty={difficulty}
          onBackToDifficultySelection={handleBackToDifficultySelection}
          renderAnswer={(answer, onClick) => (
            <button className="answer-button" onClick={onClick}>
              {answer}
              <img
                src={speakerIcon}
                alt="Speak"
                className="speaker-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(answer);
                }}
              />
            </button>
          )}
        />
      ) : (
        <DifficultySelector onSelect={handleDifficultySelect} />
      )}
    </div>
  );
}

export default App;
