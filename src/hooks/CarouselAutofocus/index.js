import { useEffect } from "react";

function useCarouselAutofocus() {
  /* Allows a carousel to be auto focused initially, allowing the keyboard controls to work without
     requiring to first click on the carousel.

     react-bootstrap issue: https://github.com/react-bootstrap/react-bootstrap/issues/5045
  */
  useEffect(() => {
    let elem = document.querySelector(".carousel-control-next");
    elem.setAttribute("tabindex", 0);
    elem.focus();
  });
}

export default useCarouselAutofocus;
