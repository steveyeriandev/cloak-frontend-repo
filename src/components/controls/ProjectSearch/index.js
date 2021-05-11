import React, { useState, useEffect } from "react";
import { useLocation, navigate } from "@reach/router";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

import { searchProjects } from "features/projects/thunks";
import { clearSearch } from "features/projects/slice";

const StyledDebounceInput = styled(DebounceInput)`
  background-color: white;
  border-top-right-radius: ${(props) => props.theme.borderRadius}!important;
  border-bottom-right-radius: ${(props) => props.theme.borderRadius}!important;
`;

function ProjectSearchControl() {
  // Provides the input for searching projects.
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState();
  const dispatch = useDispatch();

  const minimumSearchLength = 3;

  useEffect(() => {
    // Perform the search and set the data in redux.
    if (!searchTerm) dispatch(clearSearch());
    else if (searchTerm) {
      dispatch(
        searchProjects({
          payload: {
            search: searchTerm,
          },
        })
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    // Navigate the user to the search route if they are not already there.
    const searchPathname = "/projects/search";
    if (
      location.pathname !== searchPathname &&
      searchTerm &&
      searchTerm.length >= minimumSearchLength
    )
      navigate(searchPathname);
  }, [searchTerm]);

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text className="bg-white">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <StyledDebounceInput
        element={FormControl}
        placeholder="Search projects..."
        minLength={minimumSearchLength}
        debounceTimeout={300}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InputGroup.Append className="d-md-none">
        <Button>Go</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default ProjectSearchControl;
