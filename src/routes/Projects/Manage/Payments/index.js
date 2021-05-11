import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import LoadingContainer from "components/loading/Container";
import PaymentAccountTable from "components/tables/PaymentAccounts";
import { fetchProjectAccounts } from "features/projects/thunks";

function ManagePaymentsRoute() {
  // Route to manage the project's payment settings and view their payment data.

  const project = useSelector((state) => state.projects.detail);
  const revenueSplits = useSelector((state) => state.revenueSplits.entities);
  const [accountsAreLoading, setAccountsAreLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    /* When the project has an account but is not yet marked as payments enabled, we need to get the
       data from stripe to see if it is now enabled.
    */
    async function _fetchProjectAccounts() {
      // Fetch the account revenue split data.
      setAccountsAreLoading(true);
      await dispatch(fetchProjectAccounts({ projectId: project.id }));
      setAccountsAreLoading(false);
    }

    _fetchProjectAccounts();
  }, [dispatch, project.id]);

  if (accountsAreLoading)
    return <LoadingContainer text="Loading account data" />;

  const showUnconnectedWarning = revenueSplits.some((revenueSplit) => {
    return (
      !revenueSplit.user.account || !revenueSplit.user.account.payoutsEnabled
    );
  });

  return (
    <div className="my-4">
      {showUnconnectedWarning && (
        <Alert variant="warning">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          All teachers must connect their account before registrations can be
          received.
        </Alert>
      )}
      <PaymentAccountTable project={project} />
    </div>
  );
}

export default ManagePaymentsRoute;
