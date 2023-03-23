import { useState } from 'react';
import Head from 'next/head';
import LoginPage from './LoginPage';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setLoggedIn(true);
    } else {
      alert(data.message);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success) {
      setLoggedIn(false);
    } else {
      alert(data.message);
    }
  };

  const handleRegister = async (email, password) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setLoggedIn(true);
    } else {
      alert(data.message);
    }
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
  }

  console.log("User is logged in");
  console.log("User input is: ", userInput);
  console.log("Is generating: ", isGenerating);
  console.log("API output is: ", apiOutput);

  return (
    <div className="root">
      <Head>
        <title>DreamDecoder</title>
      </Head>
      <div className="container">
        {loggedIn ? (
          <Logout onLogout={handleLogout} />
        ) : (
          <div className="header">
            <div className="header-title">
              <h1>Welcome to your DreamDecoder</h1>
            </div>
            <div className="header-subtitle">
              <h2>Describe your dream, the more detail the better!</h2>
              <div>
                (Usually takes a few seconds)
              </div>
            </div>
            <div className="prompt-container">
              <textarea placeholder="Dream goes here..." className="prompt-box" value={userInput} onChange={onUserChangedText} />
              <div className="prompt-buttons">
                <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                  <div className="generate">
                    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
              </div>
              {apiOutput && (
                <div className="output">
                  <div className="output-header-container">
                    <div className="output-header">
                      <h3>Meaning</h3>
                    </div>
                  </div>
                  <div className="output-content">
                    <p>{apiOutput}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!loggedIn && (
          <>
            <Login onLogin={handleLogin}/>
            <Register onRegister={handleRegister}/>
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
