import React from "react";
import { useSelector } from "react-redux";

import EnrollmentTable from "components/tables/Enrollments";

function ManageEnrollmentsRoute() {
  // Route to manage the buckets of a project.
  const enrollments = useSelector((state) => state.projects.detail.enrollments);

  return <EnrollmentTable enrollments={enrollments} />;
}

export default ManageEnrollmentsRoute;
