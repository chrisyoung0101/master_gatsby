import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  ${'' /* z-index is ignored without position relative and another maybe absolute  */}
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;
// 1. Query the data
// 2. Loop over the data
// 3. Display the data
// 4. Pagination

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        // data.slicemasters.totalCount comes from our query below
        totalCount={data.slicemasters.totalCount}
        // OR 1 because we might be on the page withouth the "/1" in the URL
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {/* map over array of slicemasters.  Implicitly return each person */}
        {slicemasters.map((person) => (
          <SlicemasterStyles>
            {/* create a link based off the current person's slug */}
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                {/* start here to test by rendering out all the names */}
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

// allSanityPerson is the name of the query we want in GraphiQL
// We need to know how many people there are to do our pagination : so we use totalCount
// totalCount is metadata about the query
export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
