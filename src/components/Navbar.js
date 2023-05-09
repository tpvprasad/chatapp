import React from 'react';
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const currentUser = useContext(AuthContext);
 
  const navigate = useNavigate();

  const handleLogout = () => {
    if(currentUser){
      signOut(auth);
      navigate("/login");
    }
    else {
      console.log("Not logged in");
    }
    }
  return (
    <div className='navbar'>
        <p>Chat App</p>
        <div className='navbarRight'>
        <img src={currentUser.photoURL} alt=""/>
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}
