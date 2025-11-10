import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import MyServices from "../pages/MyServices";
import Services from "../pages/Services";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoutes>
            <MyServices></MyServices>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoutes>
            <AddService></AddService>
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoutes>
            <MyBookings></MyBookings>
          </PrivateRoutes>
        ),
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/registration",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
