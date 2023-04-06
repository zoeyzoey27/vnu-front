import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const UnLoggedRoutes = () => {
  let userLogged = localStorage.getItem("token");
  return !userLogged ? <Outlet /> : <Navigate to="/majors" />;
};
