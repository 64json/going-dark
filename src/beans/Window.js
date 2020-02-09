import { Pos } from './Pos';

export class Window {
  constructor(height, width, resize = true) {
    this.height = height;
    this.width = width;
    if (resize) this.resize();
  }

  static restore(windowJson) {
    const { height, width } = windowJson;
    return new Window(height, width);
  }

  get gridSize() {
    return `${(100 / this.height).toFixed(2)}vw`;
  }

  get center() {
    return new Pos(
      this.height / 2 | 0,
      this.width / 2 | 0,
    );
  }

  resize() {
    this.width = window.innerHeight / window.innerWidth * this.height + .5 | 0;
  }
}