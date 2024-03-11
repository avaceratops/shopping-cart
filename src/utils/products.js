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

export const GAME_DESCRIPTIONS = {
  'warhammer-40k':
    "Embark on an intergalactic odyssey with Warhammer 40k at Shopping Cart. Whether you're a seasoned warrior or a newcomer, our extensive array of miniatures, rulebooks, and accessories promises an immersive gaming experience like no other. From the mighty Space Marines to the cunning Orks and beyond, gather your forces and brace yourself for epic tabletop battles.\n\nTake advantage of competitive prices that allow you to bolster your armies without compromise. Need help assembling your Warhammer 40k army? Our knowledgeable staff is on hand to offer assistance every step of the way. And with free delivery on all orders over £50, conquering the galaxy has never been more convenient.",
  'age-of-sigmar':
    'Plunge into an epic journey through Age of Sigmar at Shopping Cart. Discover the vast lore and captivating world of this legendary tabletop game, as you command your armies across the Mortal Realms. From the stalwart Stormcast Eternals to the cunning Orruks and beyond, muster your legions and ready yourself for grand skirmishes.\n\nTake advantage of competitive prices to expand your collection and conquer the Mortal Realms without breaking the bank. If you need assistance selecting the perfect miniatures, our knowledgeable staff are here to help. And with free delivery on all orders over £50, building the perfect army has never been easier.',
};

export function getGameByProductId(id) {
  const start = id.charAt(0);
  return start === '0' ? 'warhammer-40k' : start === '1' ? 'age-of-sigmar' : null;
}

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
