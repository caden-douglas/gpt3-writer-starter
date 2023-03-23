import { useState } from 'react';
import Head from 'next/head';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
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
