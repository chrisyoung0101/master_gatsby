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
  console.log(data); // must restart gatsby project
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

// createPages is a specific function name from the API
export async function createPages(params) {
  // console.log here shows in the terminal build
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
}
