import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  // usually a [] but here we use {} because useForm() is returning an object - check useForm.js
  const { values, updateValue } = useForm({
    // must explicitly set the defaults of whatever inputs we have
    name: '',
    email: '',
    mapleSyrup: '',
  });
  // bring in functionality of custom hook usePizza as well as passing in our pizzas and inputs
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });
  // if there is a message, return the message and ignore everything else
  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          {/* TODO : trying to fix this error in the labels here.  We added id to both and need to nest them.  How? */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />

          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset disabled={loading} className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              {/* the reason we queried the image at 100px x 100px is so it'll look crisp on high res screens */}
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {/* When someone clicks the button, run addToOrder() which comes from our usePizza hook & add the object 
                    which is `id` & `size` -- see how we are passing in an object as the arg?  This is the orderedPizza that addToOrder
                    takes in and adds to the existing array of objects */}
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>Order</legend>
          {/* order ties to usePizza above  */}
          {/* we have to bring in removeFromOrder because this way it will bind to our list of state.
          If we did not bind it, we'd end up with a separate list of pizzas that can't talk to eachother */}
          {/* Understanding the attributes here : Think of PizzaOrder({ order, pizzas, removeFromOrder } from PizzaOrder 
            as the same thing as 
           <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
            ...and the value of order attribute which is order is coming from the scope of this OrderPage component 

          */}
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        {/* order total */}
        {/* We pass calculateOrderTotal the order and our list of pizzas */}
        <fieldset>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          {/* If there's an error show it otherwise show nothing */}
          {error ? <p>Error: {error}</p> : ''}
          {/* disable the button when loading is true */}
          {/* handler function lives on usePizza custom hook */}
          <button type="submit" disabled={loading}>
            {/* if loading is true show Placing order otherwise show Order Ahead */}
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
