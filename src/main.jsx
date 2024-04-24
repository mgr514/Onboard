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
    path: "/Booklet",
    element: <Booklet />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/PatientView",
    element: <PatientView />,
  },
  {
    path: "/Point",
    element: <Point />,
  },
  {
    path: "/Library",
    element: <Library />,
  },
  {
    path: "/Fontaccess",
    element: <Fontaccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
