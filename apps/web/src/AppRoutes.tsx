import { Route, Routes } from "react-router-dom";
import Login from "@/components/Auth/Login";
import PrivateRoute from "@/components/Auth/PrivateRoute";
import routes from "./config/routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path={routes.home} element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
