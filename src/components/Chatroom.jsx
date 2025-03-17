import { useState, useEffect, useRef } from "react";
import { auth, db } from "../index";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Question from "./Question";
import "../chatroom.css";
import Button from "./Button";

const Chatroom = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(auth.currentUser);
      } else {
        setUser(null);
      }
    });

    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, 'messages'), {
          userId: user.uid,
          message: message,
          userName: user.displayName,
          timestamp: new Date()
        });
        setMessage('');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  }

  return (
    <div id="chatroom-container">
      <Question />
      <div id="chatroom-messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.userName}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form id="chatroom-input-container" onSubmit={sendMessage}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <Button id="send-btn" type="submit">Send</Button>
      </form>
    </div>
  );
}

export default Chatroom;