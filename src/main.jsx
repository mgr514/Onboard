import React from "react";
import ReactDOM from "react-dom/client";
import Booklet from "./Booklet.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/Home";
import PatientView from "./routes/PatientView";
import Point from "./components/Point";
import Library from "./routes/Library";
import Fontaccess from "./components/Fontaccess";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/booklet",
    element: <Booklet />,
    children: [
      {
        path: ":bookletId",
        element: <Booklet />,
      },
    ],
  },
  {
    path: "/patientview/:bookletId",
    element: <PatientView />,
  },
  {
    path: "/point",
    element: <Point />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/fontaccess",
    element: <Fontaccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
