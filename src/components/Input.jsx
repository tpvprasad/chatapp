import React, { useContext, useState } from 'react';
import image from "../assets/editing.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
// import moment from "moment";



export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, img.name);
      
      console.log((img.type));
      const uploadTask = await uploadBytes(storageRef, img);

      getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
        // console.log('File available at', downloadURL);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL
          }),
        });
      });

    } 
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        }),
      });
    };
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    setText("");
    setImg(null);
  };
  const handleKey = (e) => {
     e.code === "Enter" && handleSend();
  }
  return (
    <div className='input'>
      <input type="text" placeholder='Type something' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={(e)=>handleKey(e)}/>
      <div className="inputOptions">
        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={image} alt="file add" className='uploadfile' />
        </label>
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}
