import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleJoinChat = () => {
    if (username.trim()) {
      setError("");
    } else {
      setError("Please enter a valid username.");
    }
  };

  return (
    <div className="app">
      {!username ? (
        <div className="username-form">
          <h1>Welcome to ChatApp</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleJoinChat}>Join Chat</button>
        </div>
      ) : (
        <ChatWindow username={username} />
      )}
    </div>
  );
}

export default App;
