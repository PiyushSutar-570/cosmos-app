class GameLoop {
  constructor() {
    this.subscribers = [];
    this.running = false;
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  start() {
    if (this.running) return;
    this.running = true;

    const loop = () => {
      this.subscribers.forEach((fn) => fn());
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

// singleton
export const gameLoop = new GameLoop();