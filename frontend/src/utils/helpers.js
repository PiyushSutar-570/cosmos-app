// clamp value between min and max
export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

// generate random position
export const randomPosition = (maxX = 500, maxY = 500) => {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

// format time for chat
export const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString();
};