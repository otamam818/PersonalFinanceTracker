import {useState} from 'react';

/** Returns the useState variable as its own object
 *  @param   initalValue {any} The initalValue that a useState hook uses
 *  @returns An object with its own `get` and `set` values.
 *           The `set` is a mathod, whereas the `get` is an attribute
 */
export function makeState(initalValue) {
  let [get, set] = useState(initalValue);

  return {get, set};
}

