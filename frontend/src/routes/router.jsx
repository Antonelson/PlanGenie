import { createBrowserRouter } from "react-router-dom";
import Authrouter from "./Authrouter.jsx";
import PostRouter from "./Postrouter.jsx";
const router = createBrowserRouter([
    ...Authrouter,
    ...PostRouter,
])

export default router;