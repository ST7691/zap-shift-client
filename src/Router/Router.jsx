import { createBrowserRouter } from "react-router";
import MainRoot from "../Layout/MainRoot";
import Home from "../Pages/Home/Home";


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
        Component: Home,
      },
    ],
  },
]);
