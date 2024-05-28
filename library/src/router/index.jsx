import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import Layouts from "../pages/layouts/Layouts";
import BookDetail from "../pages/components/BookDetail";
import Register from "../pages/components/Register";
import Login from "../pages/components/Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function index() {
  let { authReady, user } = useContext(AuthContext);
  let isAuthenticated = Boolean(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          path: "/",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/create",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/edit/:id",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/search",
          element: isAuthenticated ? <Search /> : <Navigate to="/login" />,
        },
        {
          path: "/books/:id",
          element: isAuthenticated ? <BookDetail /> : <Navigate to="/login" />,
        },
        {
          path: "/register",
          element: !isAuthenticated ? <Register /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return authReady && <RouterProvider router={router} />;
}
