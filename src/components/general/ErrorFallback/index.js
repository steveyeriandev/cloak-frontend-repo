import React from "react";

function ErrorFallback() {
  // Provides a component to show when there is a frontend error.
  return (
    <div className="m-4 text-center">
      Oops, an error has occured. We're looking into the issue and are working
      on a solution.
    </div>
  );
}

export default ErrorFallback;
