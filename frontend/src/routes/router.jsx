import { createBrowserRouter } from "react-router-dom";
import Authrouter from "./Authrouter.jsx";
import PostRouter from "./Postrouter.jsx";
// import ErrorPage from "../Pages/ErrorPage.jsx";
const router = createBrowserRouter([
    ...Authrouter,
    ...PostRouter,
//     {
//     path: "*",
//     element: <ErrorPage />,
//   },
])

export default router;