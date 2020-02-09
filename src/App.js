import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { GameRenderer } from './GameRenderer';
import io from 'socket.io-client';
import Lobby from './Lobby';
import { Game, Me, Team, User } from './beans';
import { UUID } from './utils';

function App() {
  const appRef = useRef(null);
  const app = appRef.current;
  const [socket, setSocket] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const socket = io.connect('http://172.24.96.188:8080');
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const server = {
      updateGame: updatedGame => socket.emit('updateGame', updatedGame),
      updateMap: (i, j, value) => socket.emit('updateMap', game.id, i, j, value),
      updateUser: updatedUser => socket.emit('updateUser', game.id, updatedUser),
      updateTeam: updatedTeam => socket.emit('updateTeam', game.id, updatedTeam),
    };

    if (game) {
      game.sync(server);
    }

    const handleJoinGame = gameJson => {
      const game = Game.restore(gameJson);
      const teamId = game.users.filter(user => user.teamId === 0).length * 2 < game.users.length ? 0 : 1;
      const allies = game.users.filter(user => user.teamId === teamId);
      game.users.push(new Me(UUID, teamId, game.getSpawnPos(teamId, allies.length)));
      setGame(game);
      socket.emit('updateGame', game);
    };

    const handleUpdateGame = gameJson => {
      if (!game) return;
      const updatedGame = Game.restore(gameJson);
      game.sync(null);
      Object.assign(game, updatedGame);
      game.sync(server);
    };

    const handleUpdateMap = (i, j, value) => {
      if (!game) return;
      game.map.map[i][j] = value;
    };

    const handleUpdateUser = userJson => {
      if (!game) return;
      const updatedUser = User.restore(userJson);
      const user = game.users.find(user => user.uuid === updatedUser.uuid);
      if (!user) return;
      user.sync(null);
      Object.assign(user, updatedUser);
      user.sync(server);
    };

    const handleUpdateTeam = teamJson => {
      if (!game) return;
      const updatedTeam = Team.restore(teamJson);
      const team = game.teams.find(team => team.id === updatedTeam.id);
      if (!team) return;
      team.sync(null);
      Object.assign(team, updatedTeam);
      team.sync(server);
    };

    socket.on('joinGame', handleJoinGame);
    socket.on('updateGame', handleUpdateGame);
    socket.on('updateMap', handleUpdateMap);
    socket.on('updateUser', handleUpdateUser);
    socket.on('updateTeam', handleUpdateTeam);

    return () => {
      socket.removeListener('joinGame', handleJoinGame);
      socket.removeListener('updateGame', handleUpdateGame);
      socket.removeListener('updateMap', handleUpdateMap);
      socket.removeListener('updateUser', handleUpdateUser);
      socket.removeListener('updateTeam', handleUpdateTeam);
    };
  }, [game, socket]);

  return (
    <div className="App" ref={appRef}
         onClick={() => {
           if (!document.fullscreenElement) {
             if (app && app.requestFullscreen) {
               app.requestFullscreen().catch(alert);
             }
           }
         }}>
      {
        game &&
        <GameRenderer game={game}/>
      }
      {
        !game && socket &&
        <Lobby socket={socket}/>
      }
    </div>
  );
}

export default App;
