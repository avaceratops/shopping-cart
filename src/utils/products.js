export const MAX_PURCHASE_QUANTITY = 8;

export const FACTION_NAMES = {
  'warhammer-40k': [
    'Aeldari',
    'Astra Militarum',
    'Blood Angels',
    'Dark Angels',
    'Necrons',
    'Orks',
    "T'au Empire",
    'Thousand Sons',
    'Tyranids',
    'World Eaters',
  ],
  'age-of-sigmar': [
    'Nighthaunt',
    'Orruk Warclans',
    'Ossiarch Bonereapers',
    'Seraphon',
    'Skaven',
    'Slaves to Darkness',
    'Sons of Behemat',
    'Sylvaneth',
  ],
};

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

export const SORT_METHODS = {
  'Best Selling': sortByBestSelling,
  'Alphabetically, A-Z': sortByNameAsc,
  'Alphabetically, Z-A': sortByNameDes,
  'Price, low to high': sortByPriceAsc,
  'Price, high to low': sortByPriceDes,
};

export function getSortFunction(sortMethod) {
  const sortFunction = SORT_METHODS[sortMethod];
  if (!sortFunction) {
    throw new Error('Invalid sort method specified');
  }
  return sortFunction;
}
