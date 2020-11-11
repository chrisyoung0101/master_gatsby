import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  ${'' /* grab each flex item. & > * says And the direct decendent */}
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    ${'' /* & anything that has an aria-current property or a class of current */}
    &[aria-current],
    &.current {
      color: var(--red);
    }
    ${'' /* for anything that has the disabled attribute, make it non-clickable */}
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  // make some variables
  // ///With totalPages, we are calculating a value again instead of passing it in.
  // ///We already did this in slicemasters.js or maybe gatsby-node.js I think
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  //   ///these two vars are used to enable/disable the Prev & Next links if we are trying to navigate to a page that doesn't exist like page 0 or page 6
  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;
  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {/* create an array that is the length of totalPages. 
      Map over each one we return a link tag that has i + 1.  
      i + 1 allows the next higher numbered link to be named such. */}

      {/* For Link tag : if i is greater than zero, then return i + 1 otherwise return a blank string  */}

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          // if the currentPage is 1 and the index is 0 give it a class of current otherwise don't give it a class
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;
      </Link>
    </PaginationStyles>
  );
}
