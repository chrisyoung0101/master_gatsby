import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

// pizzas.js / PizzasPage() handles displaying the ToppingsFilter & Pizza grid / list
export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      {/* If there is pageContext, render "Pizzas with someTopping" otherwise render "All Pizzas" */}
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzasList pizzas={pizzas} />
    </>
  );
}

// name it what you like but there is most likely a convention
export const query = graphql`
  #name the query or not
  query PizzaQuery($toppingRegex: String) {
    #rename to pizzas
    pizzas: allSanityPizza(
      #filter allSanityPizza for toppings that match the element with the name ...
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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
