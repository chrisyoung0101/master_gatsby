// takes in the order itself along with a list of pizzas
import formatMoney from './formatMoney';
import calculatePizzaPrice from './calculatePizzaPrice';

export default function attachNamesAndPrices(order, pizzas) {
  // map over the order and return it
  return order.map((item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);
    // ...item is a copy of everything we already have which is id & size
    // So, we will return a copy of everything we have with ...item
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
