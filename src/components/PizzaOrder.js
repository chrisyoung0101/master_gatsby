// Holds the displaying of our order items in Order.js's Order panel
import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

// order arg : needs the actual order so we can display it
// pizzas arg : list of pizzas with name, image, price, etc
// removeFromOrder arg : allows us to remove and item from the order
export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  // we don't want to return a <div> but we want to return fragments
  return (
    <>
      {/* singleOrder will be each item to be looped over in the order array */}
      {/* we need index so we can remove the item if needed */}
      {/* We'll style with MenuItemStyles */}
      {/* We'll make the key singleOrder.id */}
      {/* import Img from gatsby-image */}
      {/* because order array only contains the pizzas size and id.  If we want all the info
      about the pizza, we get that from the pizzas array  */}
      {/* to grab the pizza that we want as in from the pizzas array, we use find() to say 
      "return the pizza where the pizza.id is equal to the singleOrder.id"  */}

      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            {/* calculate the pizza price using our utils functions */}
            {/* we need to pass in the size as singleOrder.size */}
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                // pass in the index to remove the order you want to remove
                onClick={() => removeFromOrder(index)}
              >
                {/* HTML Entity for multiplication sign.  Adding title above in <Button> prevents 
              folks using a screen reader hearing "Multiplication sign" */}
                &times;
              </button>
            </p>
            {/* add a remove button */}
            {/* make sure MenuItemStyles has a position: relative for button to position correctly */}
          </MenuItemStyles>
        );
      })}
    </>
  );
}
