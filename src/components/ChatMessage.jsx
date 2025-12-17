import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import dayjs from 'dayjs'
import './ChatMessage.css'

export function ChatMessage({message, sender, time}){
  return(
    <div className={sender === 'user' ? 'user-message' : 'robot-message'}>  
      {sender === 'robot' && (
        <img src={RobotProfileImage} alt="" className='chat-profile'/>
      )}   
      <div className='chat-message-text'>   
        {message}
        <p className='time'>
          {time ? dayjs(time).format('h:mma') : ''}
        </p>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} alt="" className='chat-profile'/>
      )}  
    </div>
  );
  
}