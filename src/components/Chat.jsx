import React,{useContext} from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Messages from './Messages';
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';

export default function Chat() {
  const friends = [
    "john",
    "jane",
    "pavan",
    "sabrina"
  ]
  const {data} = useContext(ChatContext);
 const dropdown = () => {
     return(
      <div className="dropdownOptions">
            {friends.map((item) => (
              <p
                onClick={() => {
                
                }}
                className="genreOption"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
     )
 }
  // console.log(data);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>   
        <div className="chatIcons">
          <VideocamIcon></VideocamIcon>
          <PersonAddIcon onClick={dropdown}></PersonAddIcon>
          <MoreVertIcon></MoreVertIcon>
        </div>    
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
