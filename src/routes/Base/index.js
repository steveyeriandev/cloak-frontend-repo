import React from "react";
import { Router, Redirect, Location } from "@reach/router";

import DashboardRoute from "routes/Dashboard";
import SiteFeedRoute from "routes/SiteFeed";
import ProjectListRoute from "routes/Projects/ListAll";
import ProjectCreateRoute from "routes/Projects/Create";
import ProjectSearchRoute from "routes/Projects/Search";
import ProjectDetailRoute from "routes/Projects/Detail";
import ProjectManageRoute from "routes/Projects/Manage";
import ManageTiersRoute from "routes/Projects/Manage/Tiers";
import ManageStudentsRoute from "routes/Projects/Manage/Students";
import ManagePaymentsRoute from "routes/Projects/Manage/Payments";
import BucketRoute from "routes/Projects/Bucket";
import VerifyPaymentRoute from "routes/Projects/VerifyPayment";
import ResetPasswordRoute from "routes/Authentication/ResetPassword";
import ConfirmEmailRoute from "routes/Authentication/ConfirmEmail";
import TermsOfUseRoute from "routes/General/TermsOfUse";
import PrivacyPolicyRoute from "routes/General/PrivacyPolicy";
import UserProfileRoute from "routes/UserProfile";

class OnRouteChangeWorker extends React.Component {
  /* Scrolls the window to the top, preventing loading new routes scrolled down.

     https://stackoverflow.com/questions/53058110/stop-reach-router-scrolling-down-the-page-after-navigating-to-new-page
  */

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.action();
    }
  }

  render() {
    return null;
  }
}

const OnRouteChange = ({ action }) => (
  <Location>
    {({ location }) => (
      <OnRouteChangeWorker location={location} action={action} />
    )}
  </Location>
);

export default function BaseRouter() {
  // Main router for our entire application.

  return (
    <>
      <Router>
        <Redirect noThrow from="/" to="feed" />
        <TermsOfUseRoute path="terms-of-use" />
        <PrivacyPolicyRoute path="privacy-policy" />
        <DashboardRoute path="/">
          <SiteFeedRoute path="feed" />
          <ProjectListRoute path="projects" />
          <ProjectCreateRoute path="projects/create" />
          <ProjectSearchRoute path="projects/search" />
          <UserProfileRoute path="users/:username" />
          <VerifyPaymentRoute path="tiers/:registrationTierId/verify-payment" />
          <ProjectDetailRoute path="projects/:projectId/:date/:projectSlug">
            <ProjectManageRoute path="manage">
              <ManageTiersRoute path="tiers" />
              <ManageStudentsRoute path="students" />
              <ManagePaymentsRoute path="payments" />
            </ProjectManageRoute>
            <BucketRoute path=":bucketSlug" />
          </ProjectDetailRoute>
          <ResetPasswordRoute path="password-reset/confirm/:uid/:token/" />
        </DashboardRoute>
        <ConfirmEmailRoute path="confirm-email/:emailKey" />
      </Router>
      <OnRouteChange action={() => window.scrollTo(0, 0)} />
    </>
  );
}
