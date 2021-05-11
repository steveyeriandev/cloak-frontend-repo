import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import CarouselNavigationButton from "../NavigationButton";

function CarouselNextButton() {
  return (
    <CarouselNavigationButton className="bg-white">
      <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" color="black" />
    </CarouselNavigationButton>
  );
}

export default CarouselNextButton;
