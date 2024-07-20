import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './ResultModal.css';
import speakerIcon from '../assets/speaker.png'; // Adjust the path as necessary

const ResultModal = ({ show, onClose, result, countryData, isCorrect }) => {
  const [loading, setLoading] = useState(false);
  const { speak, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState(null);

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

  if (!show) return null;

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isCorrect ? "You were Correct!" : "Sorry, that was Incorrect!"}</h2>
        <img src={result.flagSrc} alt={countryData.country} className="flag-image" />
        <div className="country-info">
          <p>
            <strong>Country:</strong> {countryData.country}
            <img
              src={speakerIcon}
              alt="Speak"
              onClick={() => speakText(countryData.country)}
              className="speaker-icon"
            />
          </p>
          <p>
            <strong>Capital City:</strong> {countryData.capitalCity}
            <img
              src={speakerIcon}
              alt="Speak"
              onClick={() => speakText(countryData.capitalCity)}
              className="speaker-icon"
            />
          </p>
          <p>
            <strong>Continent:</strong> {countryData.continent}
            <img
              src={speakerIcon}
              alt="Speak"
              onClick={() => speakText(countryData.continent)}
              className="speaker-icon"
            />
          </p>
          <p>
            <strong>Native Language:</strong> {countryData.language}
            <img
              src={speakerIcon}
              alt="Speak"
              onClick={() => speakText(countryData.language)}
              className="speaker-icon"
            />
          </p>
          <p>
            <strong>How to say Hello:</strong> {countryData.hello}
            <img
              src={speakerIcon}
              alt="Speak"
              onClick={() => speakText(countryData.hello)}
              className="speaker-icon"
            />
          </p>
        </div>
        <button className="continue-button" onClick={onClose} disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
