// createGlobalyStyle : function from our styled components library Wes has installed for us
import { createGlobalStyle } from 'styled-components';

// this makes sure that all our stuff goes through Gatsby although it is not regulary valid to put
// here like this
// font variable : contains the url of the font (../assets/fonts/frenchfries.woff)
// using this variable allows you to declare it in the @font-face
// Gatsby is taking this font out of our assets folder and add it to our static folder for us
import font from '../assets/fonts/frenchfries.woff';

const Typography = createGlobalStyle`
  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  /* Base font stack on our HTML. Ensures we don't get any CSS styling sneaking in */
  html {
    font-family: FrenchFries, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  /* Styles our links */
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
  }

  /* mark here is both a tag and a class */
  mark, .mark {
    background: var(--yellow);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }
/* The tilt animation  */
  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
