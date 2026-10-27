import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Chat.module.css";
import { sendMsg } from "../api/authApi";
import AuthContext from "../context/AuthContext";
import Applayout from "../components/Applayout";
import Markdown from "react-markdown";

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { accessTokens } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const bottomScroll = useRef(null);

  // Send message and receive bot response
  const sendData = async (e) => {
    e.preventDefault();

    const message = inputMessage.trim();

    if (!message || loading) return;

    // Display user's message immediately
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    setInputMessage("");
    setLoading(true);
    setError(false);

    try {
      const res = await sendMsg(message, accessTokens);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.response_message,
        },
      ]);
    } catch (error) {
      setError(true);
      console.error("Error in sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    bottomScroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <Applayout>
      {/* Chat messages */}
      <section className={styles.chat}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "bot" ? styles.resMessage : styles.reqMessage
            }
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}

        {loading && <div className={styles.resMessage}>Typing...</div>}

        {error && (
          <div className={styles.resMessage}>
            Something went wrong. Please try again.
          </div>
        )}

        <div ref={bottomScroll}></div>
      </section>

      {/* Message input */}
      <footer className={styles.messageFooter}>
        <form onSubmit={sendData} className={styles.messageBox}>
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
          />

          <button className={styles.sendChat} type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </footer>
    </Applayout>
  );
}

export default Chat;
