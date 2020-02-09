import { Pos } from './Pos';

export class Team {
  constructor(id, scanAngle, achievedKeyCount = 0) {
    this.id = id;
    this._scanAngle = scanAngle;
    this._achievedKeyCount = achievedKeyCount;
  }

  static restore(teamJson) {
    const { id, _scanAngle, _achievedKeyCount } = teamJson;
    return new Team(id, _scanAngle, _achievedKeyCount);
  }

  sync(server) {
    this.server = server;
  }

  get scanAngle() {
    return this._scanAngle;
  }

  set scanAngle(scanAngle) {
    this._scanAngle = scanAngle;
    this.server && this.server.updateTeam(this);
  }

  get achievedKeyCount() {
    return this._achievedKeyCount;
  }

  set achievedKeyCount(achievedKeyCount) {
    this._achievedKeyCount = achievedKeyCount;
    this.server && this.server.updateTeam(this);
  }
}