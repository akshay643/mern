import { Navigate, Outlet } from "react-router-dom";
import {useCookies} from "react-cookie"

const PrivateRoutes = () => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const cookiesStored = cookies.jwt;
  return cookiesStored ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
