import { useState, useEffect } from "react";
import socket from "../socket";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_typing", (username) => {
      setIsTyping(`${username} is typing...`);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { username, message };
      socket.emit("send_message", data);
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", username);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} username={msg.username} message={msg.message} />
        ))}
      </div>
      {isTyping && <TypingIndicator text={isTyping} />}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
