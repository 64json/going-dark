import React, { useEffect, useState } from 'react';
import './Character.scss';
import { Game, Map, Window } from './beans';
import { RANDOM_GAME_ID } from './utils';

function Lobby({ socket }) {
  const [gameIds, setGameIds] = useState([]);

  useEffect(() => {
    socket.on('listGames', setGameIds);
  }, [socket]);
  return (
    <div className="Lobby">
      <div className="roomList">
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
      <button className="create" onClick={() => {
        const map = new Map(161, 81);
        const game = new Game(RANDOM_GAME_ID, map, undefined, undefined, new Window(11, 22));
        socket.emit('createGame', game.id, game);
      }}>Create a Game
      </button>
    </div>
  );
}

export default Lobby;