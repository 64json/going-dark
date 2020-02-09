import { Me, User } from './User';
import { Window } from './Window';
import { Map } from './Map';

export class Game {
  constructor(id, map, users, window) {
    this.id = id;
    this.map = map;
    this.users = users;
    this._window = window;
  }

  static restore(gameJson) {
    const { id, map, users, _window } = gameJson;
    return new Game(id, Map.restore(map), users.map(user => User.restore(user)), Window.restore(_window));
  }

  sync(server) {
    this.server = server;
    this.map.sync(server);
    this.users.forEach(user => user.sync(server));
  }

  get me() {
    return this.users.find(user => user instanceof Me);
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
}