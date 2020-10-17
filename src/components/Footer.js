import React from 'react';
// Had to comment out. Was getting Functions are not valid as a React child error.
// something about how the function is written in the JSX? See error note
export default function Footer(fullYear) {
  return (
    <footer>
      <p>&copy; Slicks's Slices {new Date().getFullYear()}</p>
    </footer>
  );
}
