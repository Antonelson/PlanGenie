import {useState} from "react"

export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    async function handleSubmit(e){
        e.preventDefault()
        console.log("SAfasf")
        const response=await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({gmail:email,password:password})
        })
    const result = await response.json();
    console.log(result)
    }

   
    return (<> <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <br></br>
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <br></br>
        <button type="submit">Login</button>
    </form></>)
}