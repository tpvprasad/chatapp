import React, { useContext ,useEffect,useRef} from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Message({message}) {
  const currentUser = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  // console.log(message);
  // `${Math.floor((new Date().getTime()/1000) - message.date.seconds)} seconds ago`
  const ref = useRef();
  useEffect(()=> {
    ref.current?.scrollIntoView({behaviour: "smooth"});
  },[message]);
  return (
    <div className={`message ${message.senderId === currentUser.uid && `owner`}`} ref={ref}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=""/>
            <span>{`${new Date(message.date.seconds * 1000).toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}</span>
        </div>
        <div className="messageContainer">
            {message.text && <p>{message.text}</p>}
            {/* {message.img && message.img === "image/jpeg" ? message.img : <a href={message.img} target="_blank"><img src={image} alt="images"/></a>} */}
             {message.img && <img src={message.img} alt="images"/>}
             
        </div>
    </div>
  )
}
