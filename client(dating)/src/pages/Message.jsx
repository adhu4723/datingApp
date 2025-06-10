import React, { useContext } from 'react'
import Chat from '../components/Chat'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Message() {
    const{user}=useContext(AuthContext)
    console.log('users',user);
    
  
    const {id}=useParams()
   

    
  return (
    <div>
           <Chat receiverId={id} senderId={user?._id}/>

    </div>
  )
}

export default Message
