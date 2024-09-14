import React, { useState, useRef } from "react";
import Chat from "./Chat";
import "./chat2.css"
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from '../../firebase-config'

const cookies = new Cookies();

function ChatComponent({ setIsAuth }) {
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false); // Call setIsAuth to update authentication state
    setRoom(null);
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <div className="content-wrapper">
            <div className='left'></div>
            <div className='mid'> Enter the Room ID </div>
            <div className='right'></div>
          </div>
          <div className="toptop">
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Enter Workshop
            </button>
          </div>
        </div>
      )}

      <div className="sign-out">
        <button onClick={signUserOut}>Leave</button>
      </div>
    </>
  );
}

export default ChatComponent;
