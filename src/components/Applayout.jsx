import { useState } from "react";
import styles from "../styles/Chat.module.css";
import { useNavigate } from "react-router-dom";

function Applayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={`${styles.leftNav} ${isOpen ? styles.open : ""}`}>
        <div className={styles.closeButton}>
          <button onClick={closeSidebar}>✕</button>
        </div>

        <div className={styles.botName}>Promptly</div>

        <div className={styles.chatNav}>
          <ul className={styles.chatOptions}>
            <li>
              <button
                type="button"
                className={styles.chatItems}
                onClick={closeSidebar}
              >
                <i>a</i>
                <span>Chat</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className={styles.chatItems}
                onClick={() => {
                  closeSidebar();
                  navigate("/chat/history");
                }}
              >
                Chat History
              </button>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.profile}>
            <p>Profile joel</p>
            <button type="button">Signout</button>
          </div>
        </div>
      </aside>

      {/* Right Side */}
      <div className={styles.rightNav}>
        {/* Header */}
        <header className={styles.headerNav}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ☰
          </button>

          <div className={styles.headTitle}>
            <p>Chatname</p>
            <i>Dark theme</i>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
}

export default Applayout;
