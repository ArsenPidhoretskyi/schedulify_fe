export default function responseHandler(response) {
  if (response.status === 401) {
    window.location = "/authentication/sign-in";
  }

  if (!response.ok) {
    return Promise.reject(response);
  }

  if (response.status === 204) {
    return {};
  }

  return response.json();
}
