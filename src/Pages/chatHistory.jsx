import { useContext, useEffect, useState } from "react";
import Applayout from "../components/Applayout";
import { getHistory } from "../api/authApi";
import AuthContext from "../context/AuthContext";
import styles from "../styles/ChatHistory.module.css";

function ChatHistory() {
  const { accessTokens } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChats = async () => {
      try {
        const query = "all";
        const res = await getHistory(accessTokens, query);
        console.log(res.data);

        setHistory(res.data.history);
      } catch (error) {
        console.log("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessTokens) {
      getChats();
    } else {
      setLoading(false);
    }
  }, [accessTokens]);

  return (
    <Applayout>
      <div className={styles.historyContainer}>
        <h2>Chat History</h2>

        {loading && <p>Loading history...</p>}

        {!loading && history.length === 0 && <p>No chat history found.</p>}

        {history.map((chat) => (
          <div key={chat.id}>
            <p className="date-time">{chat.created_at}</p>
            <div className={styles.historyItem}>
              <p>
                <strong>You:</strong> {chat.sendmsg}
              </p>
              <p>
                <strong>Promptly:</strong> {chat.receivemsg}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Applayout>
  );
}

export default ChatHistory;
