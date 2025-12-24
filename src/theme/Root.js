import React from 'react';
import RAGChatWidget from '../components/RAGChatWidget';

// Default wrapper for the whole Docusaurus app
function Root({ children }) {
  return (
    <>
      {children}
      <RAGChatWidget />
    </>
  );
}

export default Root;