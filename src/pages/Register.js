import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage ,db} from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import image from "../assets/fileadd.png";

export default function Register() {

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = createUserWithEmailAndPassword(auth, email, password);
      // console.log((await res).user.uid);
      const user = (await res).user;
      console.log(displayName);
      const storageRef = ref(storage, displayName);

      const uploadTask = await uploadBytes(storageRef, file);

         
          getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
            await updateProfile(user , {
              displayName,
              photoURL : downloadURL,
            });
            // console.log(downloadURL);
            await setDoc(doc(db,"users",user.uid), {
              uid : user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"userChats",user.uid),{});
            navigate("/");
          });
    } catch (err) {
      setErr(true);
    };
  }
  return (
    <div className='registerContainer'>
      <div className="registerWrapper">
        <h2>Chat App</h2>
        <p>Register</p>
        <form onSubmit={handleSubmit} autoComplete="new-password">
          <input type="text" placeholder='Display the name' required />
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor='file'>
            <img src={image} alt="profile"/>
            <span>Add the file</span>
          </label>
          <button>Sign Up</button>
          {err && <p>Something wrong...</p>}
        </form>
        <p>Already have an Account?<Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}
