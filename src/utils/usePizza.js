import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider OrderContext.js
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function setOrder().
  const [order, setOrder] = useContext(OrderContext);
  // below is state used to for our order email.
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // this is the function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    // console.log(e);
    setLoading(true);
    // intitialize
    setError(null);
    setMessage(null);

    // gather all the data
    const body = {
      // takes what we have (id & size) and adds name, price, & thumbnail to the returned array of pizzas
      // // in our order
      order: attachNamesAndPrices(order, pizzas),
      // tallies up the total of all the pizzas in the order
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      // from user input
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };
    // console.log(body);

    // 4. Send this data to a serverless function when they checkout
    //  Tip : always easier to add the "/" like this instead of having it on the variable
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // send the email data from here to placeOrder.js
        // we can test what is being sent over with console.log(event.body) in placeOrder.js
        body: JSON.stringify(body),
      }
    );
    // fetch response has two stages -
    //  //first we immediately get the headers ( I think )
    //  //second we if we need to wait for the body to finish which is the const text below :
    // // the response is coming from the server in JSON so we need to parse it
    const text = JSON.parse(await res.text());
    // check if everything worked
    // // check all status codes between 400 & 599 cause they mean something went wrong
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      // set the error message - comes from the server
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for you pizza.');
    }
  }
  //  Return all the functionality that this custom hook needs to surface aka make the functions available
  //  outside this hook :
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
