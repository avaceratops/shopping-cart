export const MAX_PURCHASE_QUANTITY = 8;

export function sortByAvailability(a, b) {
  if (a.stock === 0 && b.stock > 0) {
    return 1;
  } else if (a.stock > 0 && b.stock === 0) {
    return -1;
  }
  return 0;
}

function sortByBestSelling(a, b) {
  return b.sold - a.sold;
}

function sortByNameAsc(a, b) {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
}

function sortByNameDes(a, b) {
  return b.name > a.name ? 1 : a.name > b.name ? -1 : 0;
}

function sortByPriceAsc(a, b) {
  return a.price - b.price;
}

function sortByPriceDes(a, b) {
  return b.price - a.price;
}

export function getSortFunction(sortMethod) {
  switch (sortMethod) {
    case 'best-selling':
      return sortByBestSelling;
    case 'name-ascending':
      return sortByNameAsc;
    case 'name-descending':
      return sortByNameDes;
    case 'price-ascending':
      return sortByPriceAsc;
    case 'price-descending':
      return sortByPriceDes;
    default:
      throw new Error('Invalid sort method specified');
  }
}
