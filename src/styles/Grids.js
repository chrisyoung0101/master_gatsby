import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// Single Grid Item (for Home Page)
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    ${'' /* border: 1px solid red; */}
    height: auto;
    ${'' /* img can have ghost space.  Two inline elements next to each other you'll get spacing
    between the elements which is not margin, padding or boarder or anything it is ghost space and 
    font-size is here to handle that.  Although, it doesn't really have much effect in this case ;-)  */}
    font-size: 0;
  }
  p {
    transform: rotate(-2deg) translateY(-140%);
    position: absolute;
    width: 100%;
    left: 0;
  }
  .mark {
    display: inline;
  }
  ${'' /* animation for the shine effect */}
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  ${'' /* for an image with a loading class */}
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;
