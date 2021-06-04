import { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

let socket;


const Chat = ({location}) => {
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState('');
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');


   useEffect(() => {
      const { name, room } = queryString.parse(location.search);
      socket = io(ENDPOINT, {
       transports: ['websocket', 'polling', 'flashsocket'],
         });

      setRoom(room);
      setName(name);

      socket.emit('join', { name, room });
   }, [location.search, ENDPOINT])

   useEffect(() => {
      socket.on('AddNewMessage', (obj) => {
        setMessages([...messages, obj]);
      });
    });

   const sendMessage = () => {
      socket.emit('sendMessage', {message, name})
      setMessage('')
   }
   return (
      <div>
         <div className="chat__messages">
         {messages &&
          messages.map((item) => (
            <li className={item.name === name ? 'my-msg' : null}>
              {item.name === name ? 'Я' : item.name} : {item.message}
            </li>
          ))}
         </div>
         <div className="chat__form">
            <input value={message} type="text" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>отправить сообщение</button>
         </div>
      </div>
   )
}

export default Chat