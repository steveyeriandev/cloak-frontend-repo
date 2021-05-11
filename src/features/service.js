import { axiosInstance } from "features/api";

import { appendUrlParameters } from "utils/general";

class ApiService {
  /* Provides a general api service with standard actions against a resource.

     For each resource, there could be modifications to this class, in that case this should be
     inherited and modified for the given use cases of that resource.
  */

  _getDetailUrl(objectId) {
    return `${this.listUrl}${objectId}/`;
  }

  fetch(objectId) {
    // Fetches a single object from the resource.
    const url = `${this.listUrl}${objectId}/`;
    return axiosInstance.get(url);
  }

  list(parameters) {
    /* Lists projects.

       :parameters Object: Query parameters to pass for filtering.
    */
    let url = this.listUrl;
    if (parameters) url = appendUrlParameters(url, parameters);

    return axiosInstance.get(url);
  }

  create(payload) {
    /* Creates a new object for the resource.

       :param payload Object: The payload to send with the request.
    */
    return axiosInstance.post(this.listUrl, payload);
  }

  update(objectId, payload) {
    /* Updates an object with a given payload.

       :param objectId int: The id of the object that we're wantint to update.
       :param payload Object: The payload to send with the request.
    */
    const url = `${this.listUrl}${objectId}/`;
    return axiosInstance.patch(url, payload);
  }

  delete(objectId) {
    /* Deletes an object from the resource.

       :param objectId int: The id of the object that we're wantint to update.
    */
    const url = `${this.listUrl}${objectId}/`;
    return axiosInstance.delete(url);
  }
}

export default ApiService;
