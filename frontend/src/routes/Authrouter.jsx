import Home from "../Auth/Home.jsx";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
const Authrouter = [
  {
    path:"/login",element:<Login/>
  },
  {
    path:"/register",element:<Register/>
  },
  {
    path:"/",
    element:<Home/>
  }
]

export default Authrouter;