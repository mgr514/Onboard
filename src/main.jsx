import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/Home";

const router = createHashRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
