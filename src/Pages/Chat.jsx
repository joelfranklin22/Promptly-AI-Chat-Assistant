import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Chat.module.css";
import { sendMsg, getHistory } from "../api/authApi";
import AuthContext from "../context/AuthContext";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { accessTokens } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bottomScroll = useRef();

  const sendData = async (e) => {
    e.preventDefault();

    console.log(inputMessage);
    const message = inputMessage.trim();
    if (!message) return;

    // adding input msg in the state
    setMessages((prev) => [...prev, { sender: "user", text: inputMessage }]);

    setInputMessage(" ");
    try {
      const res = await sendMsg(inputMessage, accessTokens);
      setLoading(true);
      console.log(res.data.response_message);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.response_message },
      ]);
    } catch (error) {
      setError(true);
      console.log("error in sending msg", error);
    }
  };

  // Calling function to get chat history

  const getChats = async () => {
    console.log("History function called");

    const resChat = await getHistory(accessTokens);
    console.log(resChat.data.history[3].sender_req);
    console.log(
      resChat.data.history.map((index, msg) => {
        console.log(index, msg.sender_req);
      }),
    );

    console.log(resChat.data.history);
  };

  //   Auto scroll to bottom in chat
  useEffect(() => {
    bottomScroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <>
      <div className={styles.container}>
        {/* Left Nav Side */}

        <div className={`${styles.leftNav} ${isOpen ? styles.open : ""}`}>
          <div className={styles.closeButton}>
            <button onClick={() => setIsOpen(!isOpen)}>✕</button>
          </div>
          <div className={styles.botName}>Bot name</div>
          <div className={styles.chatNav}>
            <ul className={styles.chatOptions}>
              <li>
                <button className={styles.chatItems}>
                  <i>a</i> Chat
                </button>
              </li>
              <li>
                <button className={styles.chatItems} onClick={getChats}>
                  Chat History
                </button>
              </li>
            </ul>
            <div className={styles.divider}></div>
            <div className={styles.profile}>
              <p>Profile joel</p>
              <button>Signout</button>
            </div>
          </div>
        </div>

        {/* Right Nav Side */}
        <div className={styles.rightNav}>
          {/* Header */}

          <header className={styles.headerNav}>
            <div className={styles.menuButton}>
              <button onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
            <div className={styles.headTitle}>
              <p>Chatname</p>
              <i>dark theme</i>
            </div>
          </header>

          {/* section */}
          <section className={styles.chat}>
            {messages.map((messages, index) => (
              <div
                key={index}
                className={
                  messages.sender === "bot"
                    ? styles.resMessage
                    : styles.reqMessage
                }
              >
                <div>{messages.text}</div>
              </div>
            ))}
            {loading && <div className={styles.resMessage}>Typing... </div>}
            {error && (
              <div className={styles.resMessage}>something went wrong</div>
            )}
            <div ref={bottomScroll}></div>
          </section>

          {/* Footer */}
          <footer className="messageFooter">
            <form action="" onSubmit={sendData} className={styles.messageBox}>
              <input
                type="text"
                name=""
                placeholder="Type a message"
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                }}
              />

              <button className={styles.sendChat} type="submit">
                Send
              </button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Chat;
