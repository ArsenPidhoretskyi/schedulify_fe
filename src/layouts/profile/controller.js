import environment from "../../environment";
import responseHandler from "../../auth";

export default class UserController {
  static searchUsers(email) {
    return fetch(`${environment.API_BASE_URL}/api/v1/accounts/users/?email=${email}`)
      .then((response) => responseHandler(response))
      .catch((error) => console.log({ error }));
  }
}
