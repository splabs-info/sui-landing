import { Navigate, useRoutes } from "react-router-dom";
import ClientLayout from "./layouts";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import ComingSoon from "./pages/PageComingSoon";
import Register from "./pages/Register";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <Login />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "/", element: <Homepage /> },
      ],
    },
    { path: "404", element: <NotFound /> },
    { path: "coming-soon", element: <ComingSoon /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
