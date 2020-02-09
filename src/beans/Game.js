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
    return this.users.filter(user => user !== this.me && user.teamId === teamId );
  }

  get enemies() {
    const { teamId } = this.me;
    return this.users.filter(user => user.teamId !== teamId);
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

  getSpawnPos(teamId, order = 0) {
    const pos = new Pos([5 + order, this.map.height - 1 - 5 - order][teamId], this.map.center.y);
    this.map.clear(pos);
    return pos;
  }

  getJailPos(teamId) {
    return new Pos([3, this.map.height - 1 - 3][teamId], 40);
  }

  getJailX(teamId) {
    return [4, this.map.height - 4][teamId];
  }

  getProgress(teamId) {
    const enemies = this.users.filter(user => user.teamId !== teamId);
    return this.teams[teamId].achievedKeyCount / enemies.length;
  }

  get done() {
    return this.teams.some(team => this.getProgress(team.id) >= 1);
  }

  get win() {
    return this.getProgress(this.me.teamId) >= 1;
  }
}