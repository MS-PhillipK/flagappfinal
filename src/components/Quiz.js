import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Flag from './Flag';
import ResultModal from './ResultModal';
import GameOverModal from './GameOverModal';
import { easyFlags, mediumFlags, hardFlags, extremelyHardFlags } from './data/flagdata.js';
import speakerIcon from '../assets/speaker.png';
import countriesData from './countries.json';
import { displayedFlags, getNewFlag, resetDisplayedFlags, shuffleArray } from '../utils/shuffle';

const Quiz = ({ difficulty, onBackToDifficultySelection }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const { speak, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    newQuestion();
  }, [difficulty]);

  useEffect(() => {
    if (voices.length > 0) {
      const voice = voices.find(voice => voice.name === 'Microsoft Natasha Online (Natural) - English (Australia)');
      if (voice) {
        setSelectedVoice(voice);
      } else {
        console.warn("Voice 'Microsoft Natasha Online (Natural) - English (Australia)' not found. Available voices are:", voices.map(v => v.name).join(", "));
      }
    }
  }, [voices]);

  const getFlags = (difficulty) => {
    switch (difficulty) {
      case 'easy': return easyFlags;
      case 'medium': return mediumFlags;
      case 'hard': return hardFlags;
      case 'extremely-hard': return extremelyHardFlags;
      default: return easyFlags;
    }
  };

  const getRandomFlag = (difficulty) => {
    const flagsToDisplay = getFlags(difficulty);
    const newFlag = getNewFlag(flagsToDisplay);
    if (newFlag) {
      return newFlag;
    } else {
      console.error("No more new flags to display.");
      resetDisplayedFlags();
      return getNewFlag(flagsToDisplay); // Try again after reset
    }
  };

  const getIncorrectAnswers = (correctCountry, difficulty, count) => {
    const flags = getFlags(difficulty);
    return flags
      .filter(flag => flag !== correctCountry)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  const newQuestion = () => {
    const countryCode = getRandomFlag(difficulty);
    if (countryCode) {
      const incorrectAnswers = getIncorrectAnswers(countryCode, difficulty, 3);
      const allAnswers = [countryCode, ...incorrectAnswers];
      setCurrentQuestion(countryCode);
      setShuffledAnswers(shuffleArray(allAnswers));
      console.log('New Question:', countryCode); // Debugging line
    } else {
      console.error("Failed to generate a new question.");
    }
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion;
    if (isCorrect) {
      setScore(score + 1);
      playSound(`${process.env.PUBLIC_URL}/sounds/correct.mp3`);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      playSound(`${process.env.PUBLIC_URL}/sounds/incorrect.mp3`);
      if (newLives <= 0) {
        setShowGameOverModal(true);
        return;
      }
    }

    const flagSrc = `${process.env.PUBLIC_URL}/flags/${currentQuestion.toLowerCase()}.png`;
    setModalContent({
      isCorrect,
      correctAnswer: currentQuestion,
      flagSrc: flagSrc
    });
    setShowModal(true);
  };

  const handleNextQuestion = () => {
    setShowModal(false);
    if (lives > 0) {
      newQuestion();
    }
  };

  const speakText = (text) => {
    if (!selectedVoice) {
      console.error('Selected voice is not available.');
      return;
    }

    speak({
      text,
      voice: selectedVoice
    });
  };

  const playSound = (soundPath) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  const handleReadAll = () => {
    if (!selectedVoice) {
      console.error('Selected voice is not available.');
      return;
    }

    let countriesText = shuffledAnswers.map(answer => countriesData[answer]?.country || answer);
    countriesText = `${countriesText.slice(0, -1).join(", ")} and ${countriesText.slice(-1)}`;
    const text = `The four countries are: ${countriesText}`;
    
    speak({
      text,
      voice: selectedVoice
    });
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div>
      <Flag countryCode={currentQuestion.toLowerCase()} />
      <div className="button-container">
        {shuffledAnswers.map((countryCode, index) => (
          <button key={index} className="answer-button" onClick={() => handleAnswer(countryCode)}>
            {countriesData[countryCode]?.country || countryCode}
            <img
              src={speakerIcon}
              alt="Speak"
              className="speaker-icon"
              onClick={(e) => {
                e.stopPropagation();
                speakText(countriesData[countryCode]?.country || countryCode);
              }}
            />
          </button>
        ))}
      </div>
      <div className="score-lives">
        <span>Score: {score}</span>
        <button className="read-all-button" onClick={handleReadAll}>
          Read All
          <img src={speakerIcon} alt="Speak" className="speaker-icon" />
        </button>
        <span>Lives: {lives}</span>
      </div>
      <ResultModal
        show={showModal}
        onClose={handleNextQuestion}
        result={modalContent}
        countryData={countriesData[currentQuestion]}
        isCorrect={modalContent.isCorrect}
      />
      <GameOverModal
        show={showGameOverModal}
        onClose={onBackToDifficultySelection}
        score={score}
      />
    </div>
  );
};

export default Quiz;
