export default class Player {
  constructor(id, x, y, isMe = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isMe = isMe;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}