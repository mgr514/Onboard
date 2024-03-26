import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

//import Root, { rootLoader } from "./routes/root";
//import Team, { teamLoader } from "./routes/team";

// const router = createHashRouter([
//   {
//     path: "/",
//     element: <Root />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "team",
//         element: <Team />,
//         loader: teamLoader,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //<RouterProvider router={router} />
);
