import { useState } from "react";

/**
 * Method for causing react to re-render.
 */
export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // Integer state
  return () => setValue((value) => value + 1); //Update the state to force render
};
