import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";

import TableHeader from "components/tables/Header";
import BaseTable from "components/tables/Base";
import EnrollmentFilterDropdown from "components/dropdowns/EnrollmentFilter";
import FormModal from "components/modals/Form";
import EnrollmentForm from "components/forms/Enrollment";
import EmailForm from "components/forms/Email";
import InfoTooltip from "components/tooltips/Info";
import BigCheckbox from "components/controls/BigCheckbox";
import { baseUrl } from "features/api";
import EnrollmentRow from "./Row";

function EnrollmentTable({ enrollments }) {
  // Displays the table of data for enrollments of a project.
  const { addToast } = useToasts();
  const [showEnrollmentModal, hideEnrollmentModal] = useModal(() => {
    return (
      <FormModal title="Add student" onHide={hideEnrollmentModal}>
        <EnrollmentForm closeModal={hideEnrollmentModal} />
      </FormModal>
    );
  });

  const [filteredEnrollments, setFilteredEnrollments] = useState(enrollments);

  // An array of enrollment objects that are currently selected.
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [showBulkEmailModal, hideBulkEmailModal] = useModal(() => {
    // Opens a modal to send an email to multiple enrollments.
    const bcc = [
      ...new Set(
        selectedEnrollments.map((enrollment) => enrollment.student.email)
      ),
    ];
    return (
      <FormModal title="Send bulk email" onHide={hideBulkEmailModal}>
        <EmailForm
          toDisabled
          isBcc
          apiUrl={`${baseUrl}email/`}
          email={{ bcc }}
          closeModal={hideBulkEmailModal}
        />
      </FormModal>
    );
  }, [selectedEnrollments]);

  const [filters, setFilters] = useState({
    tiers: [],
    statuses: [],
    name: "",
  });

  useEffect(() => {
    // When the filters change, we should change the filtered enrollments.
    const filtered = enrollments
      .filter((enrollment) => {
        if (filters.statuses.length === 0) return true;
        return filters.statuses.includes(enrollment.status);
      })
      .filter((enrollment) => {
        if (filters.tiers.length === 0) return true;
        return filters.tiers.includes(enrollment.registrationTier.id);
      })
      .filter((enrollment) => {
        if (filters.name === "") return true;

        // Filter on name or username
        const { name, username } = enrollment.student;
        return (
          name.toLowerCase().includes(filters.name.toLowerCase()) ||
          username.toLowerCase().includes(filters.name.toLowerCase())
        );
      });
    setFilteredEnrollments(filtered);
  }, [enrollments, filters]);

  useEffect(() => {
    // When the filtered enrollments changes, we should remove from selected.
    const filteredSelected = selectedEnrollments.filter((selected) =>
      filteredEnrollments.includes(selected)
    );
    setSelectedEnrollments(filteredSelected);
  }, [filteredEnrollments]);

  function comingSoonToast() {
    addToast("Coming soon", { appearance: "info" });
  }

  function toggleSelectAll(e) {
    // Toggles if we should select all the enrollments or unselect them.
    const { checked } = e.target;
    checked
      ? setSelectedEnrollments(filteredEnrollments)
      : setSelectedEnrollments([]);
  }

  function toggleSelectedEnrollment(enrollment) {
    // Toggles if an enrollment row is selected.
    let newSelectedEnrollments;
    if (
      selectedEnrollments
        .map((enrollment) => enrollment.id)
        .includes(enrollment.id)
    ) {
      // Remove the enrollment from selected array.
      newSelectedEnrollments = selectedEnrollments.filter(
        (selectedEnrollment) => {
          return selectedEnrollment.id !== enrollment.id;
        }
      );
    } else {
      // Add the enrollment to the selected array.
      newSelectedEnrollments = selectedEnrollments.concat(enrollment);
    }

    setSelectedEnrollments(newSelectedEnrollments);
  }

  function renderEnrollmentRows() {
    return filteredEnrollments.map((enrollment) => {
      return (
        <EnrollmentRow
          key={enrollment.id}
          enrollment={enrollment}
          toggleSelected={toggleSelectedEnrollment}
          isSelected={selectedEnrollments.includes(enrollment)}
        />
      );
    });
  }

  function getTierOptions() {
    // Returns an array of distinct tier objects to pass into the select component.
    let distinctArray = [];
    enrollments.forEach((enrollment) => {
      const { id, title } = enrollment.registrationTier;
      const exists = distinctArray.filter(
        (obj) => obj.value === enrollment.registrationTier.id
      );
      if (exists.length === 0) distinctArray.push({ value: id, label: title });
    });

    return distinctArray;
  }

  function renderActions() {
    // Returns the bulk select and table-level actions.
    return (
      <>
        <EnrollmentFilterDropdown
          filterState={[filters, setFilters]}
          tierOptions={getTierOptions()}
        />
        <DropdownButton title="Actions" variant="secondary">
          <Dropdown.Item onClick={showBulkEmailModal}>Email</Dropdown.Item>
          <Dropdown.Item onClick={comingSoonToast}>Refund</Dropdown.Item>
          <Dropdown.Item onClick={showEnrollmentModal}>+ Student</Dropdown.Item>
        </DropdownButton>
      </>
    );
  }

  const infoTooltip = (
    <InfoTooltip
      id="student-table-header"
      text="View and manage the enrollments for your classes."
    />
  );

  return (
    <div className="mt-4 border rounded-top">
      <TableHeader
        text={
          <span>
            Students{" "}
            <span className="text-muted">({filteredEnrollments.length})</span>
            {infoTooltip}
          </span>
        }
        renderActions={renderActions}
      />
      <BaseTable withHeader>
        <thead>
          <tr>
            <th className="pl-4">
              <BigCheckbox onChange={toggleSelectAll} />
            </th>
            <th></th>
            <th>Name</th>
            <th>Tier</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderEnrollmentRows()}</tbody>
      </BaseTable>
    </div>
  );
}

EnrollmentTable.propTypes = {
  // Data for the enrollments that are shown in the table.
  enrollments: PropTypes.arrayOf(PropTypes.object),
};

export default EnrollmentTable;
