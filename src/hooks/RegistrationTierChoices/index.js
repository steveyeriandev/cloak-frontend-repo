import { useSelector } from "react-redux";

function useProfileImage() {
  // Return an array of available registration tier choices to be displayed in a dropdown.
  const project = useSelector((state) => state.projects.detail);

  return project.tiers.map((registrationTier) => {
    return { value: registrationTier.id, label: registrationTier.title };
  });
}

export default useProfileImage;
