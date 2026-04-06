class InputHandler {
  constructor() {
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    this.listeners = [];
  }

  init() {
    window.addEventListener("keydown", (e) => {
      if (Object.prototype.hasOwnProperty.call(this.keys, e.key)) {
        this.keys[e.key] = true;
        this.notify();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (Object.prototype.hasOwnProperty.call(this.keys, e.key)) {
        this.keys[e.key] = false;
        this.notify();
      }
    });
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.keys));
  }
}

export const inputHandler = new InputHandler();