import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [txtmessages, settxtMessages] = useState([]);
  const [txtuserInput, settxtUserInput] = useState("");
  const [ttsmessages, setttsMessages] = useState([]);
  const [ttsuserInput, setttsUserInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const createImg = async () => {
    const response = await axios.post("http://127.0.0.1:5000/img", {
      prompt: userInput,
    });
    setMessages([
      ...messages,
      { role: "user", content: userInput },
      { role: "assistant", content: response.data.assistant_message },
    ]);
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      createImg();
      e.preventDefault(); // To prevent any default behavior, such as a line break in a textarea
    }
  };
  const createTxt = async () => {
    const response = await axios.post("http://127.0.0.1:5000/txt", {
      prompt: txtuserInput,
    });
    settxtMessages([
      ...txtmessages,
      { role: "user", content: txtuserInput },
      { role: "assistant", content: response.data.assistant_message },
    ]);
    settxtUserInput("");
  };
  const createTTS = async () => {
    const response = await axios.post("http://127.0.0.1:5000/tts", {
      prompt: ttsuserInput,
    });
    setttsMessages([
      ...ttsmessages,
      { role: "user", content: ttsuserInput },
      { role: "assistant", content: response.data.assistant_message },
    ]);
    setttsUserInput("");
  };
  function createTxtForImg(msg, idx) {
    if (msg.role === "user") {
      return (
        <p className={msg.role} key={idx}>
          {msg.content}
        </p>
      );
    }
    if (msg.role === "assistant") {
      return (
        <img className={msg.role} key={idx} src={msg.content} alt="image"></img>
      );
    }
  }
  function createTxtForTTS(msg, idx) {
    if (msg.role === "user") {
      return (
        <p className={msg.role} key={idx}>
          {msg.content}
        </p>
      );
    } else {
      return (
        <audio controls autoPlay className={msg.role} key={idx}>
          <source src={msg.content} type="audio/mpeg"></source>
        </audio>
      );
    }
  }
  const [showInput, setShowInput] = useState(false);

  const handleLogin = () => {
    // You can implement your authentication logic here
    if (
      // username === process.env.REACT_APP_USERNAME &&
      // password === process.env.REACT_APP_PASSWORD
      username == "asad" &&
      password == "123"
    ) {
      setLoggedIn(true); // Update loggedIn state to true
      setShowInput(true); // Show the input field
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="login-container" style={{ padding: "0 50px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!showInput ? (
            <div className="login-form">
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "200px" }}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "200px" }} // Adjust the width value as needed
              />
              <br />
              <button onClick={handleLogin}>Login</button>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome, {username}!</h2>
              <button
                onClick={() => {
                  setShowInput(false);
                  setLoggedIn(false);
                  //loggedIn = true;
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="App-header">
        <h1>Image Generation</h1>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {messages.map((msg, idx) => createTxtForImg(msg, idx))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {loggedIn && (
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <input
                style={{ width: "100%" }}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={createImg}>
                {setShowInput ? "Send" : "Login to Input!"}
              </button>{" "}
            </div>
          )}
        </div>
      </div>
      <div className="App-header">
        <h1>Text Generation</h1>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {txtmessages.map((msg, idx) => (
            <p className={msg.role} key={idx}>
              {msg.content}
            </p>
          ))}
        </div>
        <div>
          {loggedIn && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ width: "100%" }}
                value={txtuserInput}
                onChange={(e) => settxtUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={createTxt}>Send</button>
            </div>
          )}
          {/* <button onClick={() => setShowInput(!showInput)}>
            {showInput ? "Login to Input!" : "Send"}
          </button> */}
        </div>
      </div>
      <div className="App-header">
        <h1>Text-To-Speech Generation</h1>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {ttsmessages.map((msg, idx) => createTxtForTTS(msg, idx))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {loggedIn && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <input
                style={{ width: "100%" }}
                value={ttsuserInput}
                onChange={(e) => setttsUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={createTTS}>
                {setShowInput ? "Send" : "Login to Input!"}
              </button>
            </div>
          )}
          {/* <button onClick={createTTS}>Send</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
