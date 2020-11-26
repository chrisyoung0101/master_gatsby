import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  //  reduce() : this is a good use case for reduce(). A reduce() is where you take
  //      an array of items & reduce it down into something else.
  //      Here we will take an array of orders and reduce it down into a single number.
  //  reduce() takes two things :
  //        First arg : A callback function that gives us an accumulator (call it what you want) and takes the single item in the order.
  //        Second arg : what do you start with.  Here we start with zero.
  return order.reduce((runningTotal, singleOrder) => {
    // find the pizza we are working with.  It looks in the pizzas array.
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    // runningTotal accumulates the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  // Calc the total for that pizza
  // add that total to the running total
}
