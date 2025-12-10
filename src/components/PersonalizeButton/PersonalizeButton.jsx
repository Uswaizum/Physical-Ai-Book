import React, { useState } from 'react';
import styles from './PersonalizeButton.module.css';

const PersonalizeButton = ({ chapterId }) => {
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [format, setFormat] = useState('text');
  const [showOptions, setShowOptions] = useState(false);

  const personalizeContent = async () => {
    if (!chapterId) return;

    setIsPersonalizing(true);

    try {
      const response = await fetch('/api/v1/personalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapter_id: chapterId,
          user_id: localStorage.getItem('user_id') || 'anonymous',
          difficulty_level: difficulty,
          preferred_format: format,
        }),
      });

      const data = await response.json();

      // In a real implementation, this would update the page content
      // For now, we'll just show an alert
      alert('Content would be personalized based on your preferences!');

      // In a real app, you would update the page content here
      // For example: document.getElementById('content').innerHTML = data.personalized_content;
    } catch (error) {
      console.error('Error personalizing content:', error);
      alert('Error personalizing content. Please try again.');
    } finally {
      setIsPersonalizing(false);
      setShowOptions(false);
    }
  };

  return (
    <div className={styles.personalizeContainer}>
      <button
        className={styles.personalizeButton}
        onClick={() => setShowOptions(!showOptions)}
        title="Personalize this content for your learning level"
      >
        🎯 Personalize
      </button>

      {showOptions && (
        <div className={styles.optionsPanel}>
          <div className={styles.optionGroup}>
            <label>Difficulty Level:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={styles.select}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className={styles.optionGroup}>
            <label>Preferred Format:</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className={styles.select}
            >
              <option value="text">Text</option>
              <option value="visual">Visual</option>
              <option value="code">Code Examples</option>
              <option value="examples">Practical Examples</option>
            </select>
          </div>

          <button
            onClick={personalizeContent}
            disabled={isPersonalizing}
            className={styles.applyButton}
          >
            {isPersonalizing ? 'Applying...' : 'Apply'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizeButton;