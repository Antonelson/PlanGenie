import {useState} from "react"

export default function Login(){
    const [gmail,setgmail]=useState("")
    const [password,setPassword]=useState("")


    async function handleSubmit(e){
        e.preventDefault()
        console.log("SAfasf")
        const response=await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({gmail:gmail,password:password})
        })

        console.log(response)
    }

   
    return (<> <form onSubmit={handleSubmit}>
        <label>gmail</label>
        <input type="gmail" value={gmail} onChange={(e)=>{setgmail(e.target.value)}}/>
        <br></br>
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <br></br>
        <button type="submit">Login</button>
    </form></>)
}