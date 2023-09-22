import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    const response = await axios.post('http://localhost:5000/message', { prompt: userInput });
    setMessages([...messages, { role: 'user', content: userInput }, { role: 'assistant', content: response.data.assistant_message }]);
    setUserInput('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      sendMessage();
      e.preventDefault();  // To prevent any default behavior, such as a line break in a textarea
    }
  }


  return (
    <div className="App">
      <div className="App-header">
        <h1>My Own ChatGPT!</h1>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role}>{msg.content}</div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );

}

export default App;
