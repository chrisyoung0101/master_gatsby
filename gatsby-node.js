import path from 'path'; // node API

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js'); // path is a node api
  // 2. Query all pizzas
  // note that how we are coding graphql here is different than with our previous single page queries
  // because we are using the node api here.
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data); // must restart gatsby project
  // 3. Loop over each pizza and create a page for that pizza with actions.createPage()
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
    // shows each pizza in the terminal after npm start
    // console.log(`hi : ${pizza.name}`);
  }); // using forEach because we are not returning anything & just doing work with some data
}

// destructure graphql & actions from params
async function turnToppingsIntoPages({ graphql, actions }) {
  console.log(`Turning the Toppings into Pages!!!`);
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping by looping over the topping and creating a page for the topping
  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating page for topping`, topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

// createPages is a specific function name from the API
export async function createPages(params) {
  // console.log here shows in the terminal build
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
