import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/create",
          element: <BookForm />,
        },
        {
          path: "/edit/:id",
          element: <BookForm />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/books/:id",
          element: <BookDetail />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  let { authReady } = useContext(AuthContext);
  return authReady && <RouterProvider router={router} />;
}
