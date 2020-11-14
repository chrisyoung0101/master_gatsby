import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

// // We will destructure the props into hildren, location, description, title, image
export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  // // site.siteMetadata.title is being queried from above query
  // // titleTemplate will append site.siteMetadata.title value whenever we use a title tag
  // // add back { } to the titleTemplate
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Using Fav Icons from our static folder.  favicon.ico is for browsers that don't support svg */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Meta Tags */}
      {/* <meta> helps out with responsive design */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph aka og -  is a specification for social media sites that want to gulp up info about your site */}
      {/* here we are passing the URL for the website.  
      location is available on templates/Pizza.js somehow */}
      {location && <meta property="og:url" content={location.href} />}
      {/* here we are passing in a custom image or fallback to the logo.svg.  
      Because logo.svg is in the static folder we can reference it with the absolute path */}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* children is for when we want to add or overwrite a property  */}
      {children}
    </Helmet>
  );
}
