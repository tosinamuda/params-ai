import { useAppSelector } from "@/app/redux/hook";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUserAuth } from "../redux/slice/authSlice";

const AuthRoutes = () => {
  const { authenticated } = useAppSelector(selectCurrentUserAuth);

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoutes;
