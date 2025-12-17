import React, { useState, useEffect } from 'react';
import styles from './RAGChatWidget.module.css';

const RAGChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Physical AI & Humanoid Robotics assistant. Ask me anything about the book content!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the RAG backend API - using the environment variable for the backend URL
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
          user_id: localStorage.getItem('user_id') || 'anonymous',
          context: messages.length > 0 ? messages.slice(-3).map(m => `${m.sender}: ${m.text}`).join('\n') : null,
          parameters: {
            top_k: 5,
            threshold: 0.5
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Backend error: ${response.status} ${response.statusText}`);
      }

      const botMessage = {
        text: data.response || "I processed your query but didn't get a proper response. Please try rephrasing your question.",
        sender: 'bot',
        timestamp: new Date(),
        sources: data.citations || [],
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: `Sorry, I encountered an error: ${error.message}. Please make sure the RAG backend service is running at ${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Physical AI Assistant</h3>
            <button onClick={toggleChat} className={styles.closeButton}>
              ×
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageText}>{message.text}</div>
                {message.sources && message.sources.length > 0 && (
                  <div className={styles.sources}>
                    <small>Sources: {message.sources.length} references</small>
                    <ul>
                      {message.sources.slice(0, 3).map((source, idx) => (
                        <li key={idx} className={styles.sourceItem}>
                          <a href={source} target="_blank" rel="noopener noreferrer">
                            {source.length > 50 ? source.substring(0, 50) + '...' : source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.typingIndicator}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.chatInput}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Physical AI or Humanoid Robotics..."
              rows="2"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className={styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.chatButton} onClick={toggleChat}>
          💬 Ask AI
        </button>
      )}
    </div>
  );
};

export default RAGChatWidget;