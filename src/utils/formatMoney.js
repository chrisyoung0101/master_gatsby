// Intl.NumberFormat is built into the browser as well as node.js
// en-CA tells you where to put the commas and decimals
// CAD formats the number as a currency
const formatter = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
