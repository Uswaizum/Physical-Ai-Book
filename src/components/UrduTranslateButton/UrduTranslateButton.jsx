import React, { useState } from 'react';
import styles from './UrduTranslateButton.module.css';

const UrduTranslateButton = ({ chapterId }) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [originalContent, setOriginalContent] = useState(null);

  // Store original content when component mounts
  React.useEffect(() => {
    const contentElement = document.querySelector('[data-content="main-content"]');
    if (contentElement) {
      setOriginalContent(contentElement.innerHTML);
    }
  }, []);

  const translateContent = async () => {
    if (!chapterId) return;

    setIsTranslating(true);

    try {
      const response = await fetch('/api/v1/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapter_id: chapterId,
          target_language: 'ur',
          use_cache: true,
        }),
      });

      const data = await response.json();

      // In a real implementation, this would replace the page content with the translation
      // For now, we'll just show an alert
      alert('Content would be translated to Urdu!');

      // In a real app, you would update the page content here
      // For example: document.querySelector('[data-content="main-content"]').innerHTML = data.translated_content;

      setIsTranslated(true);
    } catch (error) {
      console.error('Error translating content:', error);
      alert('Error translating content. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleTranslation = () => {
    if (isTranslated && originalContent) {
      // Restore original content
      const contentElement = document.querySelector('[data-content="main-content"]');
      if (contentElement) {
        contentElement.innerHTML = originalContent;
      }
      setIsTranslated(false);
    } else {
      translateContent();
    }
  };

  return (
    <div className={styles.translateContainer}>
      <button
        className={`${styles.translateButton} ${isTranslated ? styles.translated : ''}`}
        onClick={toggleTranslation}
        disabled={isTranslating}
        title={isTranslated ? "Switch back to English" : "Translate to Urdu"}
      >
        {isTranslating ? (
          <span>🔄 Translating...</span>
        ) : isTranslated ? (
          <span>🇬🇧 English</span>
        ) : (
          <span>🇵🇰 Urdu</span>
        )}
      </button>
    </div>
  );
};

export default UrduTranslateButton;