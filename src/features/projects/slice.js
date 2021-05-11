import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjects,
  fetchProject,
  updateProject,
  fetchProjectEnrollments,
  fetchProjectAccounts,
  createTeacher,
  searchProjects,
} from "./thunks";
import { createMediaItem, deleteMediaItem } from "features/mediaItems/thunks";
import {
  createEnrollment,
  refundEnrollment,
  updateEnrollment,
} from "features/enrollments/thunks";
import {
  updateBucket,
  createBucket,
  deleteBucket,
} from "features/buckets/thunks";
import {
  updateRegistrationTier,
  createRegistrationTier,
  deleteRegistrationTier,
} from "features/tiers/thunks";
import {
  updateRevenueSplit,
  createRevenueSplit,
} from "features/revenueSplits/thunks";
import { initialState } from "features/api";
import { enrollmentStatus, projectTemplate } from "utils/enums";

const projectInitialState = {
  ...initialState,

  // Each key in the entiries will be a project "type", such as classes or recordings.
  entities: {},

  // Used to store a single project detail data.
  detail: {},

  // Used to store an active image block used to view the carousel of data.
  activeImageBlock: {},

  // The results of a project search
  search: {
    results: [],
    next: null,
  },
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectInitialState,
  reducers: {
    clearProjects: (state) => {
      return projectInitialState;
    },
    activateImageBlock: (state, action) => {
      // Find the block that we've selected to get all the images
      const { imageId } = action.payload;
      const block = state.detail.imageBlocks.find((block) => {
        return block.items.some((image) => image.id === imageId);
      });
      state.activeImageBlock = { ...block, initial: imageId };
    },
    deactivateImageBlock: (state) => {
      state.activeImageBlock = {};
    },
    clearSearch: (state) => {
      state.search = projectInitialState.search;
    },
  },
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      const { params } = action.meta.arg;

      // For now we only have class and recordings, this will change in the future.
      const key =
        params.template === projectTemplate.liveClass
          ? "classes"
          : "recordings";

      state.entities[key] = action.payload.results;
    },

    [fetchProject.fulfilled]: (state, action) => {
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },

    [updateProject.fulfilled]: (state, action) => {
      // When we update a project, we need to update the project detail state.
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },

    [createRegistrationTier.fulfilled]: (state, action) => {
      state.detail.tiers.push(action.payload);
    },
    [updateRegistrationTier.fulfilled]: (state, action) => {
      // When we update a registration tier, we also need to update the project detail state.
      state.detail.tiers = state.detail.tiers.map((tier) => {
        if (tier.id === action.payload.id)
          return { ...tier, ...action.payload };
        return tier;
      });
    },
    [deleteRegistrationTier.fulfilled]: (state, action) => {
      state.detail.tiers = state.detail.tiers.filter(
        (tier) => tier.id !== action.meta.arg
      );
    },

    [createMediaItem.fulfilled]: (state, action) => {
      let block = state.detail.imageBlocks.find(
        (block) => block.id === action.payload.block
      );
      block.items.push(action.payload);
    },
    [deleteMediaItem.pending]: (state, action) => {
      // Optimistically remove the item.
      const itemId = action.meta.arg;
      const updated = state.detail.imageBlocks.map((block) => {
        const items = block.items.filter((item) => item.id !== itemId);
        block.items = items;
        return block;
      });
      state.detail.imageBlocks = updated;
    },

    [updateBucket.fulfilled]: (state, action) => {
      /* When we update a bucket, we need to update the project detail tiers and buckets data, since
         they are related.
      */
      state.detail.buckets = state.detail.buckets.map((bucket) => {
        return bucket.id === action.payload.id ? action.payload : bucket;
      });

      state.detail.tiers = state.detail.tiers.map((tier) => {
        /* This part is a bit more complicated. Inside each tier, we need to update the bucket data
           if it's the one we updated. We need to check if we've either removed or added a the
           bucket from this tier, and modify the data accordingly.
        */
        let buckets = tier.buckets;
        const bucketId = action.payload.id;

        if (
          action.payload.registrationTiers.includes(tier.id) &&
          !tier.buckets.map((bucket) => bucket.id).includes(bucketId)
        ) {
          // The bucket needs to be added to this tier as it's being created.
          buckets = buckets.concat(action.payload);
        }
        if (
          action.payload.registrationTiers.includes(tier.id) &&
          tier.buckets.map((bucket) => bucket.id).includes(bucketId)
        ) {
          // Find and update the bucket that we just updated.
          buckets = tier.buckets.map((bucket) =>
            bucket.id === bucketId ? action.payload : bucket
          );
        } else if (
          !action.payload.registrationTiers.includes(tier.id) &&
          tier.buckets.map((bucket) => bucket.id).includes(bucketId)
        ) {
          // The bucket needs to be removed from this tier.
          buckets = buckets.filter((bucket) => bucket.id !== bucketId);
        }

        return { ...tier, buckets };
      });
    },
    [createBucket.fulfilled]: (state, action) => {
      // When we create a bucket we need to add it to the project detail buckets and tiers.
      state.detail.buckets.push(action.payload);

      // Now we can add it to the tier data, if there were tiers passed into the action.
      const { registrationTiers } = action.payload;
      if (registrationTiers && registrationTiers.length > 0) {
        state.detail.tiers = state.detail.tiers.map((tier) => {
          if (registrationTiers.includes(tier.id)) {
            tier.buckets.push(action.payload);
            return tier;
          }
          return tier;
        });
      }
    },
    [deleteBucket.pending]: (state, action) => {
      // When we delete a bucket, we need to remove it from the bucket and tiers state.
      const bucketId = action.meta.arg;
      state.detail.buckets = state.detail.buckets.filter((bucket) => {
        return bucket.id !== bucketId;
      });

      // Remove the bucket from the tier data.
      state.detail.tiers = state.detail.tiers.map((tier) => {
        const buckets = tier.buckets.filter((bucket) => bucket.id !== bucketId);
        return { ...tier, buckets };
      });
    },

    [fetchProjectEnrollments.fulfilled]: (state, action) => {
      state.detail.enrollments = action.payload;
    },

    [refundEnrollment.fulfilled]: (state, action) => {
      const enrollmentId = action.meta.arg;
      state.detail.enrollments = state.detail.enrollments.map((enrollment) => {
        if (enrollment.id === enrollmentId)
          return { ...enrollment, status: enrollmentStatus.refunded };
        return enrollment;
      });
    },
    [updateEnrollment.fulfilled]: (state, action) => {
      const enrollmentId = action.payload.id;
      state.detail.enrollments = state.detail.enrollments.map((enrollment) => {
        return enrollment.id === enrollmentId ? action.payload : enrollment;
      });
    },
    [createEnrollment.fulfilled]: (state, action) => {
      state.detail.enrollments.push(action.payload);
    },

    [createTeacher.fulfilled]: (state, action) => {
      state.detail = action.payload;
    },

    [fetchProjectAccounts.fulfilled]: (state, action) => {
      state.detail.accounts = action.payload;
    },

    [updateRevenueSplit.fulfilled]: (state, action) => {
      // When the revenue split is updated, the registration tier may become valid or invalid.
      const { id, canReceivePayments } = action.payload.registrationTier;
      const updatedRegistrationTiers = state.detail.tiers.map((tier) => {
        if (tier.id !== id) return tier;

        return { ...tier, canReceivePayments };
      });

      state.detail.tiers = updatedRegistrationTiers;
    },
    [createRevenueSplit.fulfilled]: (state, action) => {
      // When a new revenue split is created, the registration tier may become valid or invalid.
      const { id, canReceivePayments } = action.payload.registrationTier;
      const updatedRegistrationTiers = state.detail.tiers.map((tier) => {
        if (tier.id !== id) return tier;

        return { ...tier, canReceivePayments };
      });

      state.detail.tiers = updatedRegistrationTiers;
    },

    [searchProjects.pending]: (state, action) => {
      state.search.isLoading = true;
    },
    [searchProjects.fulfilled]: (state, action) => {
      // Set the results and the next url for pagination of the search results.
      state.search = { ...action.payload, isLoading: false };
    },
  },
});

export const {
  clearProjects,
  clearSearch,
  activateImageBlock,
  deactivateImageBlock,
} = projectsSlice.actions;

export default projectsSlice.reducer;
