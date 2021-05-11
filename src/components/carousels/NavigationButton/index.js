import React from "react";

function CarouselNavigationButton({ className, children, ...props }) {
  // Base button component for carousel navigation.
  return (
    <div
      className={`carousel-navigation-btn p-2 rounded border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default CarouselNavigationButton;
