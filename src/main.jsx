import React from "react";
import ReactDOM from "react-dom/client";
import Booklet from "./Booklet.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/Home";
import Page2 from "./routes/Page2";

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
    path: "/Page2",
    element: <Page2 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
