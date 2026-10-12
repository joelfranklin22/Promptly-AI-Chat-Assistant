import { useState } from "react";
import styles from "../styles/Chat.module.css";
import { sendMsg } from "../api/authApi";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    console.log(msg);

    try {
      const res = await sendMsg(msg);
      console.log(res);

      setMsg("");
    } catch (error) {
      console.log("error in sending msg", error);
    }
  };

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
                <button className={styles.chatItems}>
                  <i>a</i> History
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
            <div className={styles.resMessage}>
              <p>
                Use flexbox — display flex, align items center, justify content
                center.
              </p>
            </div>
            <div className={styles.reqMessage}>
              <p>{msg}</p>
            </div>
          </section>
          {/* Footer */}
          <footer className="messageFooter">
            <form action="" onSubmit={sendData} className={styles.messageBox}>
              <input
                type="text"
                name=""
                placeholder="Type a message"
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />

              <button className={styles.sendChat} type="sumbit">
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
