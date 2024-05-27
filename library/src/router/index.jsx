import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import Layouts from "../pages/layouts/Layouts";
import BookDetail from "../pages/components/BookDetail";

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
    ],
  },
]);
export default router;
