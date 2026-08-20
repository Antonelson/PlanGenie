import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
const Authrouter = [
  {
    path:"/login",element:<Login/>
  },
  {
    path:"/register",element:<Register/>
  }
]

export default Authrouter;