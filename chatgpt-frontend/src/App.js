import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const createImg = async () => {
    const response = await axios.post('http://127.0.0.1:5000/img', { prompt: userInput });
    setMessages([...messages, { role: 'user', content: userInput }, { role: 'assistant', content: response.data.assistant_message }]);
    setUserInput('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      createImg();
      e.preventDefault();  // To prevent any default behavior, such as a line break in a textarea
    }
  }
  const createTxt = async () =>{
    const response = await axios.post('http://127.0.0.1:5000/txt', { prompt: userInput });
    setmessages([...txtmessages, { role: 'user', content: userInput }, { role: 'assistant', content: response.data.assistant_message }]);
    setUserInput('');
  }
  function createTxtForImg(msg, idx){
    if(msg.role === "user"){
      return <p className = {msg.role}  key = {idx}>{msg.content}</p>
    }
    if(msg.role === "assistant"){
      return <img className  = {msg.role} key = {idx} src = {msg.content}></img>
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>img</h1>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            createTxtForImg(msg, idx)
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />

          <button onClick={createImg}>Send</button>
        </div>
      </div>
    </div>
  );

}

export default App;
