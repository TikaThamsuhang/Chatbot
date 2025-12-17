import { useEffect, useState} from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput' // Import the ChatInput component
import { ChatMessages } from './components/ChatMessages' // Import the ChatMessages component

function App(){
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]); // Dependency array: run this effect whenever chatMessages change

  return(
    <div className="app-container">
      {chatMessages.length === 0 && (
        <div className="welcome-message">
          <h1>Welcome to Chatbot</h1>
          <p>Start a conversation with the chatbot by typing a message below.</p>
        </div>
      )}
      
      <ChatMessages 
        chatMessages={chatMessages} 
      />

      <ChatInput 
        chatMessages={chatMessages} 
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

      

export default App
