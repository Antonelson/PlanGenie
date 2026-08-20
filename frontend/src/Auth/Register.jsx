import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Dfsdf")
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: JSON.stringify({ gmail:email,password: password }),
      headers: { "Content-Type": "application/json" },   
    });
    const data = await response.json();
    console.log(data)
  }
  return (
    <>
      <form
        onSubmit={
          handleSubmit
        }
      >
        <label> Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit"/>
      </form>
    </>
  );
}
