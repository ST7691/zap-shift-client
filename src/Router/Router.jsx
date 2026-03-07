import { createBrowserRouter } from "react-router";
import MainRoot from "../Layout/MainRoot";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Pages/Authetication/SignIn";
import SignUp from "../Pages/Authetication/SignUp";
import About from "../Pages/About/About";
import Coverage from "../Pages/Coverage/coverage";
import PrivetRoutes from "../Pages/Routes/PrivetRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/sendparcel",
        loader: () => fetch("../../public/data/districts.json"),
        element: (
          <PrivetRoutes>
            <SendParcel></SendParcel>
          </PrivetRoutes>
        ),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("../../public/data/districts.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
    ],
  },
]);
