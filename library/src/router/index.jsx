import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Search from "../pages/Search";
import Layouts from "../pages/layouts/Layouts";
import BookDetail from "../pages/components/BookDetail";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts/>,
      children:[
        {
            path: "/",
            element: <Home/>,
          },
        {
            path: "/create",
            element: <Create/>,
          },
          {
            path: "/search",
            element: <Search/>,
          },
          {
            path: "/books/:id",
            element: <BookDetail/>,
          },
      ]
    }
    
  ]);
  export default router;