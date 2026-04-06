export function isNear(user1, user2, radius = 100) {
  const dx = user1.x - user2.x;
  const dy = user1.y - user2.y;

  return Math.sqrt(dx * dx + dy * dy) < radius;
}