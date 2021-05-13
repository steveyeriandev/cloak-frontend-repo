import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function useGetContentTypeObj(search) {
  // Searches for a content type id or model and returns the full object.
  const contentTypes = useSelector((state) => state.contentTypes.entities);

  const type = typeof search;
  if (type === "number") return contentTypes.find((ct) => ct.id === search);
  else if (type === "string")
    return contentTypes.find((ct) => ct.model === search);

  return {};
}

useGetContentTypeObj.propTypes = {
  // Either the ct id (int) or the ct model (string) to search for.
  search: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default useGetContentTypeObj;
