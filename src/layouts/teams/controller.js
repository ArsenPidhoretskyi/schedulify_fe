import environment from "../../environment";
import responseHandler from "../../auth";
import ErrorNotification from "../notifications/error";

export default class TeamController {
  static createTeam(formData) {
    const requestOptionsRegister = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    };

    fetch(`${environment.API_BASE_URL}/api/v1/accounts/teams/`, requestOptionsRegister)
      .then((response) => responseHandler(response))
      .then((data) => {
        window.location = `/teams/${data.id}`;
      })
      .catch((error) => console.log({ error }));
  }

  static async getTeam(teamId) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return await fetch(
      `${environment.API_BASE_URL}/api/v1/accounts/teams/${teamId}/`,
      requestOptions
    )
      .then((response) => responseHandler(response))
      .catch((error) => console.log({ error }));
  }

  static getTeams(parameters) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return fetch(
      `${environment.API_BASE_URL}/api/v1/accounts/teams/?limit=${parameters?.pageSize}&offset=${parameters.offset}`,
      requestOptions
    ).then((response) => responseHandler(response));
  }

  static searchTeams(searchTerm) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return fetch(
      `${environment.API_BASE_URL}/api/v1/accounts/teams/?title=${searchTerm}`,
      requestOptions
    ).then((response) => responseHandler(response));
  }

  static changeTeam(teamId, formData) {
    const requestOptionsRegister = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    };

    fetch(`${environment.API_BASE_URL}/api/v1/accounts/teams/${teamId}/`, requestOptionsRegister)
      .then((response) => responseHandler(response))
      .then((data) => {
        window.location = `/teams/${data.id}`;
      })
      .catch((error) => console.log({ error }));
  }

  static deleteTeam(teamId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    fetch(`${environment.API_BASE_URL}/api/v1/accounts/teams/${teamId}/`, requestOptions)
      .then((response) => responseHandler(response))
      .then((content) => (window.location = "/teams"))
      .catch((error) => console.log(error));
  }

  static sendInvite(teamId, email, errorCallback) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    };

    return fetch(
      `${environment.API_BASE_URL}/api/v1/accounts/teams/${teamId}/invite/`,
      requestOptions
    )
      .then((response) => responseHandler(response))
      .catch((error) => errorCallback(error));
  }

  static deleteTeamMember(teamId, memberId, catchCallback) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        member: memberId,
      }),
    };

    return fetch(
      `${environment.API_BASE_URL}/api/v1/accounts/teams/${teamId}/remove_member/`,
      requestOptions
    )
      .then((response) => responseHandler(response))
      .catch((error) => catchCallback(error));
  }
}
