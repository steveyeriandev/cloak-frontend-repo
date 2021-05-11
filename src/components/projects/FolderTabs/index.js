import React from "react";
import Tabs from "react-bootstrap/Tabs";

function FolderTabs() {
  // Renders all the folder tabs for a project.

  return (
    <Tabs>
      <Tabs.Tab>Info</Tabs.Tab>
      <Tabs.Tab>Homework</Tabs.Tab>
    </Tabs>
  );
}

export default FolderTabs;
