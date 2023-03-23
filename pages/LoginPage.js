import { useState } from 'react';
import Head from 'next/head';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful, call the onLogin callback
        onLogin();
      } else {
        // Login failed, display error message
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="root">
      <Head>
        <title>Login - DreamDecoder</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Login to DreamDecoder</h1>
          </div>
          <div className="prompt-container">
            <input type="text" placeholder="Username" className="prompt-box" id="username-input" value={username} onChange={(event) => setUsername(event.target.value)} />
            <input type="password" placeholder="Password" className="prompt-box" id="password-input" value={password} onChange={(event) => setPassword(event.target.value)} />
            <div className="prompt-buttons">
              <a className="login-button" onClick={handleLogin}>
                <div className="login">
                  <p>Login</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;