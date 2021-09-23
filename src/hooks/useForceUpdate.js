import { useState } from "react";

export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // Integer state
  return () => setValue((value) => value + 1); //Update the state to force render
};
