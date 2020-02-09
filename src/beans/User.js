import { Pos } from './Pos';
import { UUID } from '../utils';

export class User {
  constructor(uuid, teamId, pos, delta = new Pos(0, 0), hasKey = true, isFlashing = false, isScanning = false) {
    this.uuid = uuid;
    this.teamId = teamId;
    this._pos = pos;
    this._delta = delta;
    this._hasKey = hasKey;
    this._isFlashing = isFlashing;
    this._isScanning = isScanning;
  }

  static restore(userJson) {
    const { uuid, teamId, _pos, _delta, _hasKey, _isFlashing, _isScanning } = userJson;
    const UserClass = uuid === UUID ? Me : User;
    return new UserClass(uuid, teamId, Pos.restore(_pos), Pos.restore(_delta), _hasKey, _isFlashing, _isScanning);
  }

  sync(server) {
    this.server = server;
  }

  get pos() {
    if (this.isScanning) {
      return new Pos(40, 40);
    }
    return this._pos;
  }

  set pos(pos) {
    if (this.isScanning) {
      return;
    }
    if (this._pos.equals(pos)) {
      return;
    }
    this._pos = pos;
    this.server && this.server.updateUser(this);
  }

  get delta() {
    return this._delta;
  }

  set delta(delta) {
    if (this._delta.equals(delta)) {
      return;
    }
    this._delta = delta;
    this.server && this.server.updateUser(this);
  }

  get hasKey() {
    return this._hasKey;
  }

  set hasKey(hasKey) {
    this._hasKey = hasKey;
    this.server && this.server.updateUser(this);
  }

  get isFlashing() {
    return this._isFlashing;
  }

  set isFlashing(isFlashing) {
    this._isFlashing = isFlashing;
    this.server && this.server.updateUser(this);
  }

  get isScanning(){
    return this._isScanning;
  }

  set isScanning(isScanning){
    this._isScanning = isScanning;
    this.server && this.server.updateUser(this);
  }

  get angle() {
    return Math.atan2(-this.delta.y, this.delta.x);
  }

  get nextPos() {
    return this.pos.plus(this.delta);
  }
}

export class Me extends User {
}