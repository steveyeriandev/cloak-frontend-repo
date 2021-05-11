import slugify from "slugify";
import moment from "moment";

import { projectTemplate } from "utils/enums";

export function getProjectInfoSlug(project) {
  // Receive a project object instance and return the slug for its info bucket navigation.
  return slugify(project.infoBucketLabel, { lower: true });
}

export function getProjectBaseUrl(project) {
  // Returns the base url for a project, without any bucket.
  const projectTitleSlug = slugify(project.title, { lower: true });
  const formattedDate = moment(project.created).format("YYYY-MM-DD");
  return `/projects/${project.id}/${formattedDate}/${projectTitleSlug}`;
}

export function getProjectUrl(project) {
  // Returns the full detail url for a project, including the info bucket.
  const projectTitleSlug = slugify(project.title, { lower: true });
  const formattedDate = moment(project.created).format("YYYY-MM-DD");
  return `/projects/${
    project.id
  }/${formattedDate}/${projectTitleSlug}/${getProjectInfoSlug(project)}`;
}

export function getProjectManagementUrl(project) {
  // Returns the full detail url for a project, including the info bucket.
  return `${getProjectBaseUrl(project)}/manage/tiers`;
}

export function isProjectAdmin(user, project) {
  /* Determines if the user has admin access to a given project.

    :param user object: The user object, generally of the current user.
    :param project object: The project object that we're checking if the user is admin of.
  */
  return (
    project.teachers.map((teacher) => teacher.id).includes(user.id) ||
    project.owner === user.id ||
    user.isAdmin
  );
}

export function getProjectDescriptor(project) {
  /* Returns the descriptor that should be used for the project.

     NOTE: the definiition of "class" probably will change, so it's made a variable here instead of
     directly using from project.

     :param project object: The project that we're getting the descriptor for.
     :param upperCase bool: Determines if the descriptor should start with an upper case letter.
  */
  return project.template === projectTemplate.liveClass ? "Class" : "Project";
}

export function getProjectType(project) {
  /* Returns the type of the project, which helps with changing wording to be more specific to that
     type of project.

     :param project object: The project object that we're getting the type of.
     :return str: Returns the string of the type of project that we're working with.
  */
  return project.template;
}
