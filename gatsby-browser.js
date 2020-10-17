import React from 'react';
import Layout from './src/components/Layout';

// Used to wrap all of our elements in the Layout component
// element = Gatsby page component
// props =
// prevents us from having to individually wrap and import each Gatsby page component's return in <Layout>

// Looking in the console.dir(props);, it appears that whichever page was selected gets run through this function component?

export function wrapPageElement({ element, props }) {
  // for logging props : look in "location" and you'll see the URL of the page you are currently on in the browser
  // console.dir(props);
  // console.dir(element);
  return <Layout {...props}>{element}</Layout>;
}
