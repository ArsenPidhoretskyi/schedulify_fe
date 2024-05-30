import environment from "../../environment";
import responseHandler from "../../auth";
import { serializeQuery } from "../../commons";

export default class DashboardController {
  static getStatistic() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return fetch(`${environment.API_BASE_URL}/api/v1/events/statistic/`, requestOptions).then(
      (response) => responseHandler(response)
    );
  }
}
