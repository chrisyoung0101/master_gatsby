import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number and convert
    // destructured value from e.target
    // we are not using this validation in this course but it will be useful elsewhere
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that change in the input
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
