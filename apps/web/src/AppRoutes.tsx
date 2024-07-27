import { Route, Routes } from "react-router-dom";
import Login from "@/components/Auth/Login";
import PrivateRoute from "@/components/Auth/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
