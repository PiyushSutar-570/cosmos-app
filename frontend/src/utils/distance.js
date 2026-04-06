export const getDistance = (u1, u2) => {
  return Math.sqrt(
    (u1.x - u2.x) ** 2 + (u1.y - u2.y) ** 2
  );
};