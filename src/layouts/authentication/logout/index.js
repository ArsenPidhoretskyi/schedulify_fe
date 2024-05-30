export default function Logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location = "/authentication/sign-in";
}
