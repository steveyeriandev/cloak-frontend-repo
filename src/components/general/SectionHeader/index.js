import React from "react";

function SectionHeader({ children, ...props }) {
  /* Returns a header to separate sections, used in various text-based components. */
  return (
    <div {...props}>
      <h6 className="text-muted text-uppercase">{children}</h6>
    </div>
  );
}

export default SectionHeader;
