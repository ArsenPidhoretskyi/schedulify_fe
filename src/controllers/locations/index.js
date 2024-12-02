import environment from "../../environment";
import responseHandler from "../../auth";

export default class LocationController {
  static getLocationSuggestions(query) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return fetch(
      `${environment.API_BASE_URL}/api/v1/commons/locations/suggestions/?query=${query}`,
      requestOptions
    ).then((response) => responseHandler(response));
  }
}
