import { useRef, useEffect } from "react";

function usePrevious(value) {
  /* Hook to access the previous value of a prop.
     https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
  */

  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
