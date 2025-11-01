import { useAppSelector } from "@/app/redux/hook";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUserAuth } from "../redux/slice/authSlice";
const ProtectedRoutes = () => {
  const { authenticated } = useAppSelector(selectCurrentUserAuth);
  const location = useLocation();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
