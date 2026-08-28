import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home";
import PromptPage from "../Pages/PromptPage";

const PostRouter = [
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/promptpage",
        element:<PromptPage/>
    }
]
export default PostRouter;