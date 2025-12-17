import React from 'react';
import { PersonalizeButton, UrduTranslateButton } from '../index';
import RAGChatWidget from '../RAGChatWidget';
import styles from './BookLayout.module.css';

const BookLayout = ({ children, chapterId }) => {
  return (
    <div className={styles.bookLayout}>
      <div className={styles.contentWrapper}>
        {/* Add buttons above the content */}
        <div className={styles.toolbar}>
          {chapterId && (
            <>
              <PersonalizeButton chapterId={chapterId} />
              <UrduTranslateButton chapterId={chapterId} />
            </>
          )}
        </div>

        {/* Main content */}
        <div data-content="main-content" className={styles.mainContent}>
          {children}
        </div>
      </div>

      {/* Chat widget floating */}
      <RAGChatWidget />
    </div>
  );
};

export default BookLayout;