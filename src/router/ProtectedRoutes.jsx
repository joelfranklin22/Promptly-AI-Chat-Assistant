import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoutes() {
  const { accessTokens } = useContext(AuthContext);
  
  if (!accessTokens) return <Navigate to={"/login"} />;
  return <Outlet />;
}

export default ProtectedRoutes;
