import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home.jsx";
const router = createBrowserRouter([
  {
    path:"/",element:<Home/>
  },
  {
    path:"/login",element:<Login/>
  },
  {
    path:"/register",element:<Register/>
  }
])
function App() {
  return <RouterProvider router={router} />;
}

export default App;