import path, { resolve } from 'path'; // node API
import fetch from 'isomorphic-fetch';

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
  // console.log('DATA : ');
  // console.log(data.pizzas.nodes); // must restart gatsby project
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
  // console.log(`Turning the Toppings into Pages!!!`);
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
    // console.log(`Creating page for topping`, topping.name);
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

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId, // provides us a unique ID.  We get this from Gatsby
  createContentDigest,
}) {
  // For 1, 2, & 3, all we are doing is 1. getting the data 2. looping over the data
  // & (I think 2 & 3 do this) put the data in GraphQL API for you
  // 1. Fetch a list of beers.  res = response
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  // we assume that "res" above returns some JSON so here we turn it into JSON
  const beers = await res.json();
  // console.log(beers);
  // 2. Loop over each one  Note: we could use a forEach loop but here he wants to show a for of loop
  for (const beer of beers) {
    // create a node for each beer
    // provide metadata to this node
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      // internal subobject
      internal: {
        // specifies our query name
        type: 'Beer',
        // allows other plugins to find the type of media they might be looking for
        mediaType: 'application/json',
        // internal thing with Gatsby so it knows if the data has changed or not
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: 2. Turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  // 3. Figure out how many pages there are based on how many
  // slicemasters there are, and how many per page.
  /// //////parseInt() because GATSBY_PAGE_SIZE even if number comes in as a String
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  /// //////take how many people there are divided by how many people per page, round up
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // console.log(`There are ${data.slicemasters.totalCount} total people.
  // And we have ${pageCount} pages with ${pageSize} per page`);
  // 4. Loop from 1 to n and create the pages for each of them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  // Note: just adding Promise.all now in the expectation we will be adding more asyn funcs here later
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

// createPages is a specific function name from the API
export async function createPages(params) {
  // console.log here shows in the terminal build
  console.log('CREATING PAGES');
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
