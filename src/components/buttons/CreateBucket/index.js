import React from "react";
import TierBucketSettingButton from "../TierBucketSetting";

function CreateBucketButton(props) {
  // Button for creating a new bucket in a registration tier setting.
  return (
    <TierBucketSettingButton {...props}>
      Create New Bucket
    </TierBucketSettingButton>
  );
}

export default CreateBucketButton;
