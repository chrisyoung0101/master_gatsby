import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

// takes in a prop that is a count of the number of loader items to show
// count will be set on the attribute of the <LoadingGrid count={4} /> tag
export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {/* makes an array of count = 4 empty spots. */}
      {/* the second arg of Array.from() is a map function */}
      {/* if we don't need a parameter we can just use underscore _ so we can get to the next param */}
      {/* second param of the second arg : i = index */}
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles>
          <p>
            <span className="mark">Loading...</span>
          </p>

          {/* src is from https://png-pixel.com/ */}
          {/* src is a blank image with a ratio of 5px Wide X 4px High  */}
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
