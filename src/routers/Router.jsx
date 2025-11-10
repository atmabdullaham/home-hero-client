import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import MyServices from "../pages/MyServices";
import Services from "../pages/Services";

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
        element: <MyServices></MyServices>,
      },
      {
        path: "/add-service",
        element: <AddService></AddService>,
      },
      {
        path: "/my-bookings",
        element: <MyBookings></MyBookings>,
      },
    ],
  },
]);

export default router;
