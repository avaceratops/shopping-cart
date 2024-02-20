export function formatPrice(pence) {
  const pounds = pence / 100;
  return pounds.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
}
