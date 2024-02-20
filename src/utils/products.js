export function sortByAvailability(a, b) {
  if (a.stock === 0 && b.stock > 0) {
    return 1;
  } else if (a.stock > 0 && b.stock === 0) {
    return -1;
  }
  return 0;
}
