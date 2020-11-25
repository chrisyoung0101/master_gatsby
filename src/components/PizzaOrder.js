// Holds the displaying of our order items in Order.js's Order panel
import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';

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
          <MenuItemStyles key={singleOrder.id}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{singleOrder.id}</h2>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
