import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// destructures one argument called element
// here we are returning the OrderProvider element from OrderContext
// we are wrapping the root element in OrderProvider
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
