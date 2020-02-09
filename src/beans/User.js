import { Pos } from './Pos';
import { UUID } from '../utils';

export class User {
  constructor(uuid, teamId, pos, delta = new Pos(0, 0), hasOwnKey = true, hasStolenKey = false, isFlashing = false, isScanning = false) {
    this.uuid = uuid;
    this.teamId = teamId;
    this._pos = pos;
    this._delta = delta;
    this._hasOwnKey = hasOwnKey;
    this._hasStolenKey = hasStolenKey;
    this._isFlashing = isFlashing;
    this._isScanning = isScanning;
  }

  static restore(userJson) {
    const { uuid, teamId, _pos, _delta, _hasOwnKey, _hasStolenKey, _isFlashing, _isScanning } = userJson;
    const UserClass = uuid === UUID ? Me : User;
    return new UserClass(uuid, teamId, Pos.restore(_pos), Pos.restore(_delta), _hasOwnKey, _hasStolenKey, _isFlashing, _isScanning);
  }

  sync(server) {
    this.server = server;
  }

  get pos() {
    if (this.isScanning) {
      return new Pos([40, 120][this._pos.teamId], 40);
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

  get hasOwnKey() {
    return this._hasOwnKey;
  }

  set hasOwnKey(hasOwnKey) {
    this._hasOwnKey = hasOwnKey;
    this.server && this.server.updateUser(this);
  }

  get hasStolenKey() {
    return this._hasStolenKey;
  }

  set hasStolenKey(hasStolenKey) {
    this._hasStolenKey = hasStolenKey;
    this.server && this.server.updateUser(this);
  }

  get isFlashing() {
    return this._isFlashing;
  }

  set isFlashing(isFlashing) {
    this._isFlashing = isFlashing;
    this.server && this.server.updateUser(this);
  }

  get isScanning() {
    return this._isScanning;
  }

  set isScanning(isScanning) {
    this._isScanning = isScanning;
    this.server && this.server.updateUser(this);
  }

  get angle() {
    return Math.atan2(-this.delta.y, this.delta.x);
  }

  get nextPos() {
    return this.pos.plus(this.delta);
  }

  isOurBase(pos) {
    return this.teamId === pos.teamId;
  }

  isInJail() {
    return this.pos.x < 4 || this.pos.x > 156;
  }
}

export class Me extends User {
}