import { sq } from '../utils';

export class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static restore(posJson) {
    const { x, y } = posJson;
    return new Pos(x, y);
  }

  plus(pos) {
    return new Pos(this.x + pos.x, this.y + pos.y);
  }

  minus(pos) {
    return new Pos(this.x - pos.x, this.y - pos.y);
  }

  clone() {
    return new Pos(this.x, this.y);
  }

  distanceTo(pos) {
    return Math.sqrt(sq(this.x - pos.x) + sq(this.y - pos.y));
  }

  get indices() {
    return [Math.round(this.x), Math.round(this.y)];
  }

  get magnitude() {
    return Math.sqrt(sq(this.x) + sq(this.y));
  }

  equals(pos) {
    return this.x === pos.x && this.y === pos.y;
  }
}
