import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

export default function SlicemasterPage({ data: { person } }) {
  console.log(person);
  return (
    <div className="center">
      <Img fluid={person.image.asset.fluid} />
      <h2>
        <span className="mark">{person.name}</span>
      </h2>
      <p>{person.description}</p>
    </div>
  );
}

/// query :
/// $slug will be a string that is required.

/// We will ask for a person which is really sanityPerson (just renamed to person)
/// where the slug.current is equal to the slug variable we passed in.

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
