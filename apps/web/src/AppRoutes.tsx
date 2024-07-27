import { Route, Routes } from "react-router-dom";
import Login from "@/components/Auth/Login";
import PrivateRoute from "@/components/Auth/PrivateRoute";
import routes from "./config/routes";
import Signup from "@/components/Auth/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.signup} element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path={routes.home} element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
