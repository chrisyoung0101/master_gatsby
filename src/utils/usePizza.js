import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function add things to our order
  // takes in an ordered pizza as an arg
  // we run setOrder that takes in an array of our existing order items as ...order and adds
  // the orderedPizza to this existing array.
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from our order
  //  removeFromOrder takes in an index that needs to be removed
  //  With setOrder, here we pass in an array that contains everything before & after the item we want to
  //  remove essentially creating a new array that does not contain the item we want to remove.
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to a serverless function when they checkout
  // TODO

  //  Return all the functionality that this custom hook needs to surface aka make the functions available
  //  outside this hook :
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
