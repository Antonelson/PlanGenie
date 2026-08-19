import {useNavigate} from 'react-router-dom'


export default function  Home() {
  const navigate=useNavigate()
  return (
    <>
      <h1><button onClick={() => {navigate("/login")}}>Login</button></h1>
      <h1><button onClick={() => {navigate("/register")}}>Register</button></h1>
    </>
  )
}   