
// TODO: Add this as a componant of navbar
// take userId of logged in user & user they are speaking to
// props: (senderId, recipientId)
// add these + time stamp to message object
// save these messages in a chat document in Mongo
// load chat history in useEffect

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getHistory, sendMessageToDB } from '../../services/chat';
import { getOneUser } from '../../services/user';

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const UserChat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [CID, setCID] = useState();
  const userId = localStorage.getItem("userId");
  let chatRoomId = null
  const token = localStorage.getItem('token');
  const sender = localStorage.getItem('userId');
  const recipient = props.chatterId;

  useEffect(() => {
    getHistory(token, sender, recipient)
      .then((data) => {
        console.log(data.chatId);
        setMessages(data.history);
        chatRoomId = data.chatId
        socket.emit('join room', chatRoomId);
      })

    getOneUser(token, userId)
      .then((data) => {
        setName(data.user.forename)
      })

    socket.on('message', (msg) => {
      console.log("Message posted");
      console.log(msg)
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('dm room joined', () => {
      console.log("Room ID: ", chatRoomId)
      setCID(chatRoomId);
    })

    // Clean up the effect
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log(CID)
      let today = new Date().toLocaleString()
      let message_obj = {
        author: name,
        message: message,
        timestamp: today
      }
      socket.emit('message', message_obj, CID);
      setMessage('');
      sendMessageToDB(token, CID, message_obj);
    }
  };

  const closeChat = () => {
    props.setChatting(false);
  };

  return (
    <div>
      <div>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.author}:</strong> {msg.message}
              <small>   ({msg.timestamp})</small>
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={closeChat}>Close Chat</button>
    </div>
  );
};