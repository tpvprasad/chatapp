import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        
        // console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
   
  }
  return (
    <div className='registerContainer'>
      <div className="registerWrapper">
        <h2>Chat App</h2>
        <p>Login</p>
        <form onSubmit={handleSubmit} autoComplete="new-password">
          <input type="email" placeholder='Email'
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Password'
            onChange={(e) => setPassword(e.target.value)} required />
          <button>Login</button>
        </form>
        <p>Don't have an Account?<Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
