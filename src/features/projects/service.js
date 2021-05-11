import { axiosInstance } from "features/api";
import { projectsUrl } from "./api";

import ApiService from "features/service";

class ProjectService extends ApiService {
  // Handles requests to the project api endpoint.

  listUrl = projectsUrl;

  connectAccount(projectId) {
    // Connects a user's account to stripe.
    const url = `${this._getDetailUrl(projectId)}connect/`;
    return axiosInstance.post(url);
  }

  getStripeDashboard(projectId) {
    // Returns the data for accessing the project's stripe dashboard.
    const url = `${this._getDetailUrl(projectId)}stripe_dashboard/`;
    return axiosInstance.get(url);
  }

  createTeacher(projectId, payload) {
    // Creates a teacher and adds their split percent.
    const url = `${this._getDetailUrl(projectId)}/add_teacher/`;
    return axiosInstance.post(url, payload);
  }

  sendContactEmail(projectId, payload) {
    // Sends a contact email to the teacher(s) of the project.
    const url = `${this._getDetailUrl(projectId)}/contact/`;
    return axiosInstance.post(url, payload);
  }

  listEnrollments(projectId) {
    // Returns a list of the project's enrollments.
    return axiosInstance.get(`${this._getDetailUrl(projectId)}enrollments/`);
  }

  listAccounts(projectId) {
    // Return data about the stripe accounts associated with the project.
    const url = `${this._getDetailUrl(projectId)}stripe_accounts/`;
    return axiosInstance.get(url);
  }

  share(projectId) {
    // Shares the project to the global feed.
    const url = `${this._getDetailUrl(projectId)}share/`;
    return axiosInstance.post(url);
  }

  comments(projectId) {
    // Fetches the comments for a given project.
    const url = `${this._getDetailUrl(projectId)}comments/`;
    return axiosInstance.get(url);
  }
}

export default ProjectService;
