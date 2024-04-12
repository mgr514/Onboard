import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Booklet.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/Home";

const router = createHashRouter([
  {
    path: "/Booklet",
    element: <Booklet />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
