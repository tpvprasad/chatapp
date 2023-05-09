import React from 'react';
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className='homeContainer'>
        <div className='homeWrapper'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}
