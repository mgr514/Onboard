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
    path: "/booklet",
    element: <Booklet />,
    children: [
      {
        path: ":id",
        element: <Booklet />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/patientview", // Lowercased the path
    element: <PatientView />,
  },
  {
    path: "/point", // Lowercased the path
    element: <Point />,
  },
  {
    path: "/library", // Lowercased the path
    element: <Library />,
  },
  {
    path: "/fontaccess", // Lowercased the path
    element: <Fontaccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
