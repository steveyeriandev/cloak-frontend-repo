import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

import ProjectDetailContent from "components/projects/DetailContent";
import UploadsBucket from "components/buckets/Uploads";
import FeedBucket from "components/buckets/Feed";
import InfoBucket from "components/buckets/Info";
import BucketNavigation from "components/navbars/Buckets";
import LoadingContainer from "components/loading/Container";
import ProjectActAsContext from "context/ProjectActAs";
import { fetchBucket } from "features/buckets/thunks";
import { setCurrentBucket } from "features/buckets/slice";
import { bucketType } from "utils/enums";
import { getProjectInfoSlug, getProjectUrl } from "utils/projects.js";

function BucketRoute({ bucketSlug }) {
  /*
  Route to display the content of a project bucket.

  The main goal of this component is to load the full data for the bucket and then pass that data
  down into the proper bucket component, determined by its `kind` field.
  */
  const dispatch = useDispatch();
  const bucketState = useSelector((state) => state.buckets);
  const [errorMessage, setErrorMessage] = useState(null);

  // Get the active bucket from the url string.
  const activeBucket = useSelector((state) => {
    return state.projects.detail.buckets.find(
      (bucket) => bucket.slug === bucketSlug
    );
  });

  // Need to get the project since the bucket slug is not unique by itself, and we need the id.
  const project = useSelector((state) => state.projects.detail);

  useEffect(() => {
    async function fetchData() {
      // Fetches the bucket data and handles errors.
      setErrorMessage(null);
      const bucket = project.buckets.find(
        (bucket) => bucket.slug === bucketSlug
      );
      if (bucket !== undefined) {
        try {
          // Get the bucket data and then perform any follow-up actions.
          const action = await dispatch(fetchBucket(bucket.id));
          if (action.type === "FETCH_BUCKET/rejected") {
            setErrorMessage("Error fetching the bucket data.");
          } else {
            // Set the current bucket so that we know where we are for other actions.
            dispatch(
              setCurrentBucket({
                id: action.payload.id,
                title: action.payload.title,
              })
            );
          }
        } catch (e) {
          setErrorMessage("Error fetching the bucket data.");
        }
      }
    }

    fetchData();
  }, [project, dispatch, bucketSlug]);

  function renderBucketByType() {
    /* Return the bucket type component depending on the bucket's "kind" data - also we'll be adding
       the bucket extra data before sending it to the Component.
    */
    if (bucketState.isLoading) {
      // Need to render the loading container inside of the `BucketRouteContainer`.
      return <LoadingContainer text="Loading bucket data" />;
    }

    let extraBucketData = [];
    if (activeBucket !== undefined)
      extraBucketData = bucketState.entities.find(
        (bucket) => bucket.id === activeBucket.id
      );

    const fullBucketData = {
      ...activeBucket,
      ...extraBucketData,
    };

    if (bucketSlug === getProjectInfoSlug(project)) {
      // Return the project info bucket instead of an actual bucket.
      return (
        <ProjectActAsContext.Consumer>
          {(props) => <InfoBucket project={project} actAsContext={props} />}
        </ProjectActAsContext.Consumer>
      );
    }

    if (activeBucket === undefined) {
      // If the user goes to a bucket url that no longer exists, send them to info.
      navigate(getProjectUrl(project));
      return null;
    }

    if (activeBucket.kind === bucketType.images) {
      return <UploadsBucket bucket={fullBucketData} />;
    } else if (activeBucket.kind === bucketType.feed) {
      return <FeedBucket bucket={fullBucketData} />;
    } else return <div>Unrecognized bucket type "{activeBucket.kind}"</div>;
  }

  if (errorMessage)
    return (
      <div className="w-100 d-flex align-items-center justify-content-center">
        <p className="bg-white text-center p-3 w-50 m-5 text-danger">
          {errorMessage}
        </p>
      </div>
    );

  return (
    <ProjectDetailContent className="bucket-route">
      <BucketNavigation project={project} />
      {renderBucketByType()}
    </ProjectDetailContent>
  );
}

BucketRoute.propTypes = {
  bucketSlug: PropTypes.string,
};

export default BucketRoute;
