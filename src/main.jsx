import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";

import Page2 from "./routes/Page2";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Page2 />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
