import React, { useEffect, useState } from 'react';
import "./chat3.css";
// import "./chat2.css";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';



function Chat(props) {

    const { room } = props;

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
            );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let fetchedMessages = [];
            snapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(fetchedMessages); // Update messages state with fetched messages
        });

        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        try {
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room,
            });

            console.log("Message sent successfully!");
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    return (
        <div className='chat-app'>
            <div className='headerChat'> WorkShop: {room.toUpperCase()}</div>
            <div className='messagesChat'>

                {messages.map((message) => (
                    <div className='messageChat' key={message.id}>
                        <span className='userChat'>{message.user}</span>
                        {message.text}

                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className='new-message-form'>
                <input className='new-message-input' placeholder="msg"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    )
}

export default Chat