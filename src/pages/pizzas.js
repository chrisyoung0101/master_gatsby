import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter />
      <PizzasList pizzas={pizzas} />
    </>
  );
}

// name it what you like but there is most likely a convention
export const query = graphql`
  #name the query or not
  query PizzaQuery {
    #rename to pizzas
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              #GraphQL fragment :
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
