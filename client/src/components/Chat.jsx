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


   // добавление пользователя в комнату
   useEffect(() => {
      const { name, room } = queryString.parse(location.search);
      socket = io(ENDPOINT, {
       transports: ['websocket', 'polling', 'flashsocket'],
         });

      setRoom(room);
      setName(name);

      socket.emit('join', { name, room });
   }, [location.search, ENDPOINT])

   // добавление сообщений в массив message
   useEffect(() => {
      socket.on('AddNewMessage', (obj) => {
        setMessages([...messages, obj]);
      });
    });

    // отправка сообщений
   const sendMessage = () => {
      socket.emit('sendMessage', {message, name})
      setMessage('')
   }
   return (
      <div className='chat__wrapper'>
         <div className="chat__messages">
         {messages &&
          messages.map((item) => (
            <div className={item.name === name ? 'my-msg msg' : 'alien-msg msg'}>
               {
                 item.name === name 
                 ? null
                 : <div className='msg__name'>{item.name}</div>
               }
               <div className={item.name === name ? 'msg__text' : 'msg__text msg__text-alien'}>
                  {item.message}
               </div>
            </div>
          ))}
         </div>
         <div className="chat__form">
            <input value={message} type="text" onChange={(e) => setMessage(e.target.value)} />
            <button className='btn' onClick={sendMessage}>отправить сообщение</button>
         </div>
      </div>
   )
}

export default Chat