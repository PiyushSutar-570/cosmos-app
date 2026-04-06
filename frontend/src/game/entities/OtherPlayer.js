export default class OtherPlayer {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}