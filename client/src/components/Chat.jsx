import { useState, useEffect } from 'react';



const Chat = () => {
   const [message, setMessage] = useState('');


   const sendMessage = () => {
      console.log(message)
      setMessage('')
   }
   return (
      <div>
         <div className="chat__messages"></div>
         <div className="chat__form">
            <input value={message} type="text" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>отправить сообщение</button>
         </div>
      </div>
   )
}

export default Chat