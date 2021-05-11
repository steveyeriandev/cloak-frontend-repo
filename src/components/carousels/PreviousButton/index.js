import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import CarouselNavigationButton from "../NavigationButton";

function CarouselPreviousButton() {
  return (
    <CarouselNavigationButton className="bg-dark">
      <FontAwesomeIcon color="white" icon={faLongArrowAltLeft} size="2x" />
    </CarouselNavigationButton>
  );
}

export default CarouselPreviousButton;
