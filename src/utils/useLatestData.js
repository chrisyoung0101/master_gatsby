import { useEffect, useState } from 'react';

// fake vs code to autoformat and syntax highlight our query
const gql = String.raw;

// create a vairable for our query since otherwise we would be writing the same thing twice
// and this gives us only one place to go should we need to edit the query.
const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

// when useLatestData runs :
// create two pieces of state
// when component mounts, run useEffect()
// when useEffect() runs, use fetch().
// when the fetch is done, we want to set the data to JSON

export default function useLatestData() {
  // hot slices
  const [hotslices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // Use a side effect to fetch the data from the graphql endpoint
  // useEffect() : when the component mounts, useEffect() is invoked.  We will
  //                also make it rerun when data changes.
  useEffect(function () {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body here is an object that has a query inside of it.
      // since we can't just send an object over the wires we need to stringify the object
      // Note : note that we have an object that we stringify so we can send it.  When we
      // get back our response it must be as a string because whatever it is gets put back into
      // an object.
      // we've modified this query to query sanity directly so some of the query syntax is a little different like _id vs id.
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set the data to state
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []); // Note we could set this to run whenever a variable like store name or whatever changes and put
  //        //  that variable in [].  Ours will be empty.
  return {
    hotslices,
    slicemasters,
  };
}
