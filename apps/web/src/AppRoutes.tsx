import { Route, Routes } from "react-router-dom";
import Login from "@/components/Auth/Login";
import PrivateRoute from "@/components/Auth/PrivateRoute";
import routes from "./config/routes";
import Signup from "@/components/Auth/Signup";
import TaskProvider from "./components/Task/TaskProvider";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.signup} element={<Signup />} />
      <Route
        element={
          <TaskProvider>
            <PrivateRoute />
          </TaskProvider>
        }
      >
        <Route path={routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
