import { Me, User } from './User';
import { Window } from './Window';
import { Map } from './Map';
import { Team } from './Team';
import { Pos } from './Pos';

export class Game {
  constructor(id, map, users = [], teams = [new Team(0, 0), new Team(1, Math.PI)], window) {
    this.id = id;
    this.map = map;
    this.users = users;
    this.teams = teams;
    this._window = window;
  }

  static restore(gameJson) {
    const { id, map, users, teams, _window } = gameJson;
    return new Game(id, Map.restore(map), users.map(User.restore), teams.map(Team.restore), Window.restore(_window));
  }

  sync(server) {
    this.server = server;
    this.map.sync(server);
    this.users.forEach(user => user.sync(server));
    this.teams.forEach(team => team.sync(server));
  }

  get me() {
    return this.users.find(user => user instanceof Me);
  }

  get allies() {
    const { teamId } = this.me;
    return this.users.filter(user => user.teamId === teamId);
  }

  get otherUsers() {
    return this.users.filter(user => !(user instanceof Me));
  }

  get window() {
    if (this.me.isScanning) {
      return new Window((this.map.height + 1) / 2 | 0, this.map.width, false);
    }
    return this._window;
  }

  getSpawnPos(teamId) {
    const allies = this.users.filter(user => user.teamId === teamId);
    const pos = new Pos([5 + allies.length, this.map.height - 1 - 5 - allies.length][teamId], this.map.center.y);
    this.map.clear(pos);
    return pos;
  }
}