import {
  BORDER_BOTTOM,
  BORDER_BOTTOM_LEFT,
  BORDER_BOTTOM_RIGHT,
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_TOP,
  BORDER_TOP_LEFT,
  BORDER_TOP_RIGHT,
  DIVIDER,
  JAIL,
  ROCK0,
  ROCK1,
  ROCK2,
  TOWER,
  TREE,
} from '../blocks';
import { Pos } from './Pos';

export class Map {
  constructor(height, width, map) {
    this.height = height;
    this.width = width;
    if (map) {
      this.map = map;
    } else {
      this.map = new Array(height).fill(0).map((_, i) =>
        new Array(width).fill(0).map((_, j) => {
          let flag = 0;

          const top = i === 0;
          const bottom = i === height - 1;
          const left = j === 0;
          const right = j === width - 1;
          if (top && left) flag |= BORDER_TOP_LEFT;
          else if (top && right) flag |= BORDER_TOP_RIGHT;
          else if (bottom && left) flag |= BORDER_BOTTOM_LEFT;
          else if (bottom && right) flag |= BORDER_BOTTOM_RIGHT;
          else if (top) flag |= BORDER_TOP;
          else if (bottom) flag |= BORDER_BOTTOM;
          else if (left) flag |= BORDER_LEFT;
          else if (right) flag |= BORDER_RIGHT;
          else if (i === 80) flag |= DIVIDER;
          else if (i === 4 || i === height - 1 - 4) flag |= JAIL;
          else if (Math.random() < .01) flag |= [ROCK0, ROCK1, ROCK2][Math.random() * 3 | 0];
          else if (Math.random() < .02) flag |= TREE;
          return flag;
        }));
      this.map[40][width / 2 | 0] |= TOWER;
      this.map[height - 1 - 40][width / 2 | 0] |= TOWER;
    }
  }

  static restore(mapJson) {
    const { height, width, map } = mapJson;
    return new Map(height, width, map);
  }

  sync(server) {
    this.server = server;
  }

  crop(pos, height, width) {
    let [i, j] = pos.indices;
    let topPad = 0;
    let bottomPad = 0;
    let leftPad = 0;
    let rightPad = 0;
    if (i < 0) {
      topPad = -i;
      i = 0;
      height -= topPad;
    }
    if (j < 0) {
      leftPad = -j;
      j = 0;
      width -= leftPad;
    }
    if (i + height >= this.height) {
      bottomPad = i + height - this.height;
      height -= bottomPad;
    }
    if (j + width >= this.width) {
      rightPad = j + width - this.width;
      width -= rightPad;
    }
    return [
      ...new Array(topPad).fill(0).map(() => new Array(width).fill(0)),
      ...this.map.slice(i, i + height).map(row => [...new Array(leftPad).fill(0), ...row.slice(j, j + width), ...new Array(rightPad).fill(0)]),
      ...new Array(bottomPad).fill(0).map(() => new Array(width).fill(0)),
    ];
  }

  add(pos, flag) {
    const [i, j] = pos.indices;
    this.map[i][j] |= flag;
    this.server && this.server.updateMap(i, j, this.map[i][j]);
  }

  remove(pos, flag) {
    const [i, j] = pos.indices;
    this.map[i][j] &= ~flag;
    this.server && this.server.updateMap(i, j, this.map[i][j]);
  }

  clear(pos) {
    const [i, j] = pos.indices;
    this.map[i][j] = 0;
    this.server && this.server.updateMap(i, j, this.map[i][j]);
  }

  has(pos, flag) {
    const [i, j] = pos.indices;
    return (this.map[i][j] & flag) > 0;
  }

  forEach(callback) {
    return this.map.forEach(callback);
  }

  get center() {
    return new Pos(
      this.height / 2 | 0,
      this.width / 2 | 0,
    );
  }
}