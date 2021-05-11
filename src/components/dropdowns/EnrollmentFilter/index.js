import React from "react";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import PropTypes from "prop-types";

import Select from "components/controls/Select";
import FormGroup from "components/forms/shared/FormGroup";
import { convertEnumToArray } from "utils/general";
import { enrollmentStatus } from "utils/enums";

const StudentFilterForm = styled(Form)`
  width: 15rem;
  padding: 1rem;
`;

function EnrollmentFilterDropdown({ filterState, tierOptions, ...props }) {
  const [filters, setFilters] = filterState;

  return (
    <DropdownButton title="Filter" variant="light" {...props}>
      <StudentFilterForm>
        <FormGroup label="Registration tier">
          <Select
            isClearable
            options={tierOptions}
            onChange={(tier) =>
              setFilters({
                ...filters,
                tiers: tier === null ? [] : [tier.value],
              })
            }
          />
        </FormGroup>
        <FormGroup label="Status">
          <Select
            isClearable
            options={convertEnumToArray(enrollmentStatus)}
            onChange={(status) =>
              setFilters({
                ...filters,
                statuses: status === null ? [] : [status.value],
              })
            }
          />
        </FormGroup>
        <FormGroup label="Name">
          <Form.Control
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </FormGroup>
      </StudentFilterForm>
    </DropdownButton>
  );
}

EnrollmentFilterDropdown.propTypes = {
  // State to manage which filters are selected.
  filterState: PropTypes.array.isRequired,

  // An array of available tiers.
  tierOptions: PropTypes.array.isRequired,
};

export default EnrollmentFilterDropdown;
