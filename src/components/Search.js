import React, { useState ,useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, getDocs,getDoc ,setDoc,doc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";
import image from "../assets/searchimg.png";

export default function Search() {
  const currentUser = useContext(AuthContext);
  const [username , setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err,setErr] = useState(false);

  const handleSearch= async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try{
        const querySnapshot = await getDocs(q);      
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setUser(doc.data());
        });   
    }catch(error) {
      // setErr(true);
    }
  }
  const handleKey = (e) => {
     e.code === "Enter" && handleSearch();
  }
  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db,"chats",combinedId));
       if(!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db,"chats",combinedId),{messages: []});

        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
           [combinedId+".userInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL : user.photoURL
           },
           [combinedId+".date"]: serverTimestamp()       
           
        });
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
           uid: currentUser.uid,
           displayName: currentUser.displayName,
           photoURL : currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()       
          
       });
       setUser(null);
       setUsername("");
        }
       }catch(error) {
      setErr(true);
    }
    }
  return (
    <div className='search'>
     <div className='searchform'>
    <input type="text" placeholder='find an user' 
    onChange={e=> setUsername(e.target.value)} onKeyDown={handleKey} value={username}/>
    <img className='searchIcon' src={image} alt=""/>
     </div>
     {err && <p>User not found..</p>}
     {user && 
     <div className='searchUser' onClick={handleSelect}>
      <img src={user.photoURL} alt="user profile" />
      <span>{user.displayName}</span>
     </div> }
    </div>
  )
}
