import { useState } from 'react'
import { getChatResponse } from '../services/gemini';
import Loading from '../assets/loading-spinner.gif'
import './ChatInput.css'
import dayjs from 'dayjs'

export function ChatInput({ chatMessages, setChatMessages }){
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event){
    setInputText(event.target.value);
  }

  async function sendMessage(){
    if (isLoading) {
      // Prevent sending a new message while waiting for a response
      return;
    }
    if (inputText.trim() === "") {
      // Don't send empty messages
      return;
    }

    setIsLoading(true); // lock input

    const newChatMessages = [
      ...chatMessages, // spread operator (...) is used to copy all existing chat messages into the new array.
      { 
        message: inputText, 
        sender: "user", 
        id: crypto.randomUUID(),
        time: dayjs().valueOf() 
      }
    ];

    setInputText(""); // Clear the input field
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages, // spread operator (...) is used to copy all existing chat messages into the new array.
      { 
        message: <img src={Loading} className="loading-spinner" />, 
        sender: "robot", 
        id: crypto.randomUUID(),
        time: dayjs().valueOf() 
      }
    ]);
      
    

    const response = await getChatResponse(inputText);
    setChatMessages([
      ...newChatMessages, // spread operator (...) is used to copy all existing chat messages into the new array.
      { message: response, 
        sender: "robot", 
        id: crypto.randomUUID(),
        time: dayjs().valueOf() 
      }
    ]);

    setIsLoading(false); // unlock input
    
  }

  const clearMessage = () => {
    setChatMessages([]);
  }

  return(
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to chatbot" 
        size="30"
        onChange={saveInputText} 
        value={inputText}
        className="chat-input"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      /> 
      <button onClick={sendMessage} className="btn">Send</button>
      <button onClick={clearMessage} className="btn-clear">Clear</button>
    </div>
  );
}
