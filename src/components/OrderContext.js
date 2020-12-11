import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext();

//  Provider :
//  A component that lives at a higher level
//  We inject it around our root
//  We will stick the state here in our Provider

//  Why are we using children here?
export function OrderProvider({ children }) {
  // we need to stick state in here
  const [order, setOrder] = useState([]);
  return (
    //   using value here surfaces the state we created here in OrderProvider
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
