import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AddService from "../pages/AddService";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import MyProfile from "../pages/MyProfile";
import MyServices from "../pages/MyServices";
import ServiceDetails from "../pages/ServiceDetails";
import Services from "../pages/Services";
import UpdateService from "../pages/UpdateService";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/service/:id",
        element: (
          <PrivateRoutes>
            <UpdateService></UpdateService>
          </PrivateRoutes>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
            <ServiceDetails></ServiceDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile></MyProfile>
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
