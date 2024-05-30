import environment from "../../environment";
import responseHandler from "../../auth";
import { serializeQuery } from "../../commons";

export default class EventController {
  static getEvents(parameters) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    let queryParams = serializeQuery(parameters);

    return fetch(`${environment.API_BASE_URL}/api/v1/events/?${queryParams}`, requestOptions).then(
      (response) => responseHandler(response)
    );
  }

  static createEvent(formData) {
    const requestOptionsRegister = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        start: formData.start,
        end: formData.end,
        attendees: formData.attendees,
        teams: formData.teams,
      }),
    };

    fetch(`${environment.API_BASE_URL}/api/v1/events/`, requestOptionsRegister)
      .then((response) => responseHandler(response))
      .then((data) => {
        window.location = `/events/`;
      })
      .catch((error) => console.log({ error }));
  }

  static updateEvent(eventId, formData) {
    const requestOptionsRegister = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        start: formData.start,
        end: formData.end,
        attendees: formData.attendees,
        teams: formData.teams,
      }),
    };

    fetch(`${environment.API_BASE_URL}/api/v1/events/${eventId}/`, requestOptionsRegister)
      .then((response) => responseHandler(response))
      .then((data) => {
        window.location = `/events/`;
      })
      .catch((error) => console.log({ error }));
  }

  static getAvailableSlots(payload) {
    payload.teams = payload.teams?.map((team) => team.id);
    payload.participants = payload.participants?.map((attendee) => attendee.id);
    payload.time_start = payload.timeStart;
    payload.time_end = payload.timeEnd;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    };

    return fetch(`${environment.API_BASE_URL}/api/v1/events/slots/`, requestOptions)
      .then((response) => responseHandler(response))
      .catch((error) => console.log({ error }));
  }

  static getEvent(eventId) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    return fetch(`${environment.API_BASE_URL}/api/v1/events/${eventId}/`, requestOptions)
      .then((response) => responseHandler(response))
      .catch((error) => console.log({ error }));
  }
}
