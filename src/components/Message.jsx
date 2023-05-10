import React, { useContext ,useEffect,useRef} from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import image from "../assets/pdfimage.png";
import docximage from "../assets/docx_icon.png";
export default function Message({message}) {
  const currentUser = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();
  useEffect(()=> {
    ref.current?.scrollIntoView({behaviour: "smooth"});
  },[message]);
  
  const handleDispatch = (m) => {
  
       switch (m.type) {
       case "jpeg":
         return <img src={m.url} alt=""/>;
       case "png":
         return <img src={m.url} alt=""/>
       case "pdf":
         return <a href={m.url} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>  
       default:
         return <a href={m.url} target="_blank" rel="noreferrer"><img src={docximage} alt=""/></a>
        
    }
  }
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
            {message.img &&  handleDispatch(message.img)}
                  
        </div>
    </div>
  )
}
