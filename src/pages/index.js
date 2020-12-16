import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by to slice you up!</p>
      {/* if no slicemasters, show the loading grid */}
      {!slicemasters && <LoadingGrid count={4} />}
      {/* handle if there is an empty slicemasters array - basically if no one is working */}
      {/* so, if there are slicemasters and there is no slicemasters.length then render the <p> tag  */}
      {/* Why the question mark ? adding a ? to slicemasters check there are slicemasters before 
      accessing length which without ? we would get back "cannot access property length of undefined" */}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {/* if there is slicemasters with a length, we will loop over them */}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

// for the conditional logic here, we just mirror what we did with CurrentlySlicing
function HotSlices({ hotslices }) {
  console.log(hotslices);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotslices && <LoadingGrid count={4} />}
      {hotslices && !hotslices?.length && <p>No pizzas in the case.</p>}
      {hotslices?.length && <ItemGrid items={hotslices} />}
    </div>
  );
}

export default function HomePage() {
  // When the HomePage renders out, custom React hook useLatestData() is run.
  // This hook in turn runs a side effect which is a fetch request.
  // const result = useLatestData();
  // after destructuring the above line we get this :
  const { slicemasters, hotslices } = useLatestData();
  // console.log(result);
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotslices={hotslices} />
      </HomePageGrid>
    </div>
  );
}
