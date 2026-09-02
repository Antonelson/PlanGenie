import PromptPage from "../Pages/PromptPage";
import Layout from "../Layout/Layout";

const PostRouter = [
{
    path:"/promptpage",
    element:<Layout/>,
    children:[
    
    {
        index:true,
        element:<PromptPage/>
    }]
}
]
export default PostRouter;