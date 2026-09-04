import PromptPage from "../Pages/promptPage/PromptPage";
import Layout from "../Layout/Layout";
import CheckList from "../Pages/CheckList/Checklist";
import Profile from "../Pages/Profile/ProfilePage";
import Description from "../Pages/Description/DescriptionPage";

const PostRouter = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/promptpage",
        element: <PromptPage />,
      },
      {
        path: "/checklist",
        element: <CheckList />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/description",
        element: <Description />,
      },
    ],
  },
];
export default PostRouter;
