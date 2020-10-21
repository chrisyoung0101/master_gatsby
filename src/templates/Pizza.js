import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
// Template for creating single pizza page when pizza selected from Pizza Menu
// { data: { pizza } } is an example of destructuring two levels deep
export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
}

// import graphql from gatsby
// import { styled } from 'styled-components';
// this is where we will interpolate variables into our query
// Wes note : this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      #gatsby-image
      image {
        asset {
          #resize the image.  also could use fixed if wanted.
          fluid(maxWidth: 800) {
            #GraphQL fragment : collection of fields we don't have to retype
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
