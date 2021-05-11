import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { deleteMediaItem } from "features/mediaItems/thunks";

export function useDeleteMediaItem() {
  // Hook to share functionality around deleting a media item.

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function handleDelete(itemId, e) {
    dispatch(deleteMediaItem(itemId));
    addToast("Media item removed", { appearance: "success" });
    e.stopPropagation();
  }

  return handleDelete;
}
