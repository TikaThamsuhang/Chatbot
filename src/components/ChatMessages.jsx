import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage' // Import the ChatMessage component

export function ChatMessages({chatMessages}){
    const chatMessagesRef = useRef(null); // Create a ref to the chat messages container div

    useEffect(() => {
        // This code runs after every render (when chatMessages change)

        const containerElement = chatMessagesRef.current;
        if (containerElement){ // Check if the ref is attached to a DOM element
        // Scroll to the bottom of the chat container
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        } 
        
    }, [chatMessages]); // Dependency array: run this effect whenever chatMessages change

    return(
        <div className='chat-container' ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) =>{
            return(
            <ChatMessage 
                message={chatMessage.message} 
                sender={chatMessage.sender}
                key={chatMessage.id}
                time={chatMessage.time}
            />
            );
        })}
        </div>
    );
    }
