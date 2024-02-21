export const MAX_PURCHASE_QUANTITY = 8;

export function sortByAvailability(a, b) {
  if (a.stock === 0 && b.stock > 0) {
    return 1;
  } else if (a.stock > 0 && b.stock === 0) {
    return -1;
  }
  return 0;
}

export function sortByBestSelling(a, b) {
  return b.sold - a.sold;
}

export function sortByNameAsc(a, b) {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
}

export function sortByNameDes(a, b) {
  return b.name > a.name ? 1 : a.name > b.name ? -1 : 0;
}

export function sortByPriceAsc(a, b) {
  return a.price - b.price;
}

export function sortByPriceDes(a, b) {
  return b.price - a.price;
}
