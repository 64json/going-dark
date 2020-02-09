import React, { useEffect, useState } from 'react';
import './Lobby.scss';
import { Game, Map, Window } from './beans';

function Lobby({ socket }) {
  const [gameIds, setGameIds] = useState([]);

  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    socket.on('listGames', setGameIds);
  }, [socket]);
  return (
    <div className="Lobby">
      <div className="logo"/>
      <div className="room-list">
        {
          gameIds.map(gameId => (
            <div className="room" key={gameId} onClick={() => {
              socket.emit('joinGame', gameId);
            }}>
              {gameId}
            </div>
          ))
        }
      </div>
      <div className="create-container">
        <input className="room-name" type="text" value={roomName} onChange={({ target }) => setRoomName(target.value)}/>
        <button className="create" onClick={() => {
          const map = new Map(161, 81);
          const game = new Game(roomName, map, undefined, undefined, new Window(11, 22));
          socket.emit('createGame', game.id, game);
        }}>
          Create a Game
        </button>
      </div>
    </div>
  );
}

export default Lobby;