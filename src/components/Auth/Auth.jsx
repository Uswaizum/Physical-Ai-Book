import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState({
    experienceLevel: '',
    interests: [],
    learningPace: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/v1/auth/signin' : '/api/v1/auth/signup';
      const payload = isLogin
        ? { email, password }
        : {
            email,
            password,
            name,
            background_info: backgroundInfo
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth token and user info
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_id', data.user_id);

        setIsLoggedIn(true);
        alert(data.message);
      } else {
        setError(data.detail || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleBackgroundInfoChange = (field, value) => {
    setBackgroundInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoggedIn) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.loggedIn}>
          <p>Welcome back! You are logged in.</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <div className={styles.formHeader}>
          <h3>{isLogin ? 'Sign In' : 'Sign Up'}</h3>
          <button
            className={styles.toggleButton}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Your full name"
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>

          {!isLogin && (
            <div className={styles.backgroundInfo}>
              <h4>Tell us about your background:</h4>

              <div className={styles.formGroup}>
                <label>Experience Level</label>
                <select
                  value={backgroundInfo.experienceLevel}
                  onChange={(e) => handleBackgroundInfoChange('experienceLevel', e.target.value)}
                >
                  <option value="">Select your experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Learning Pace</label>
                <select
                  value={backgroundInfo.learningPace}
                  onChange={(e) => handleBackgroundInfoChange('learningPace', e.target.value)}
                >
                  <option value="">Select your pace</option>
                  <option value="fast">Fast</option>
                  <option value="moderate">Moderate</option>
                  <option value="slow">Slow</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Interests in Robotics/AI (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., humanoid robots, machine learning, computer vision"
                  onChange={(e) => handleBackgroundInfoChange('interests', e.target.value.split(',').map(i => i.trim()))}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;