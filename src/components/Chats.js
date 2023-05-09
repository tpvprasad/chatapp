import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const currentUser = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        
      })
      return () => {
        unsub();
      }
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({type:"USER_CHANGE" , payload: u})
  }

  // console.log(Object.entries(chats));
  return (
    <div className='Chats'>
      {Object.entries(chats).sort((a,b)=>b[1].date - a[1].date)?.map((chat) => (
        <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="user profile " />
          <div className='userChatInfo'>
            <div className='userName'>{chat[1].userInfo.displayName}</div>
            <div className='lastMessage'>{chat[1].lastMessage?.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
