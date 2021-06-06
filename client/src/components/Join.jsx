import { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='join__wrapper'>
      <input
        value={name}
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={room}
        type="text"
        placeholder="room"
        onChange={(e) => setRoom(e.target.value)}
      />
      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}>
        <button className='btn join__btn' type="submit">join</button>
      </Link>
    </div>
  );
};

export default Join;
